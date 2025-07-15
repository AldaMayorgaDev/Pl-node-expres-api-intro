import { Router } from 'express';

/*
//Si ocupamos los productos de un archivo .json
import data from '../db/data.json' with { type: 'json' };
*/

//Importando servicio
import ProductosService from '../services/productos.service.js';
import validatorHandler from '../middlewares/validator.handler.js';
import {  crearProductoSchema,
  actualizarProductoSchema,
  buscarProductoSchema,
  eliminarProductoSchema} from '../schemas/producto.schema.js'

const router = Router();
const instanciaServicio = new ProductosService;

//! Los endpoints específicos ejemplo /?limits=,  /filtros van siempre antes de los dinámicos ejemplo  productos/ , /:id

/*
Query params
limit	Cuántos registros devolver (ej. 10, 20, 50, etc.)
offset	Desde qué posición empezar a devolver los registros
*/

router.get('/', async (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    const productosPaginados = await instanciaServicio.buscarTodos().slice(
      parseInt(offset),
      parseInt(limit) + parseInt(offset),
    );
    console.log(productosPaginados);

    return res.status(200).json({
      data: productosPaginados,
    });
  } else {
    return res.status(200).json({
      data: await instanciaServicio.buscarTodos(),
    });
  }
});

// Todos los productos
router.get('/', async (req, res) => {
  const listaProductos = await instanciaServicio.buscarTodos()
  res.json({
    status: 200,
    data: listaProductos
  });
});

router.get('/:id', validatorHandler(buscarProductoSchema, 'params'), async (req, res, next) => {

  try {
  const idBuscado = parseInt(req.params.id);
  //console.log( idBuscado)
  const productoBuscado = await instanciaServicio.buscarUno(idBuscado)
    res.status(200).json({
      data: productoBuscado,
    });

  } catch (error) {
    next(error); //Llama al middleware de tipo error explicitamente

  }
});

router.get('/:idProducto/categorias/:categoria', (req, res) => {
  const { idProducto, categoria } = req.params;
  console.log(idProducto, categoria);

  const productoBuscado = data.find(
    (producto) =>
      producto.id === parseInt(idProducto) && producto.categoria === categoria,
  );

  if (!productoBuscado) {
    return res.status(404).json({
      msg: 'Producto no encontrado',
    });
  }

  res.status(200).json({
    data: productoBuscado,
  });
});

router.post('/',validatorHandler(crearProductoSchema, 'body') ,async (req, res) => {
  const body = req.body;
  const nuevoProducto = await instanciaServicio.crear(body);
  res
    .json({
      msg: 'Producto creado',
      producto: nuevoProducto,
    })
    .status(201);
});

//PUT
router.put('/:id', (req, res) => {
  const idBuscado = req.params.id;
  const productoActualizado = req.body;

  let productoAActualizar = data.find(
    (producto) => producto.id === parseInt(idBuscado),
  );
  //console.log('🚀 ~ router.put ~ productoAActualizar:', productoAActualizar);

  if (!productoAActualizar) {
    return res.status(404).json({
      msg: 'No se encontró ese id',
    });
  } else {
    data.forEach(producto =>{
      if(producto.id === idBuscado){
        producto.id = idBuscado;
        producto.nombre= productoActualizado.nombre;
        producto.precio= productoActualizado.precio;
        producto. categoria= productoActualizado.categoria;
      }
    })

  }
  res
    .json({
      msg: 'Se Actualizo producto',
      producto: {productoActualizado, id:idBuscado},
    })
    .status(200);
});


router.patch('/:id',validatorHandler(buscarProductoSchema, 'params'),validatorHandler(actualizarProductoSchema, 'body'), async (req, res, next)=>{

  try {
      const idBuscado = req.params.id;
  const nuevaInfo = req.body;
  const productoActualizado=  await instanciaServicio.actualizar(idBuscado, nuevaInfo);
    return res.status(200).json({
      msg: 'Producto actualizado correctamente',
      data: productoActualizado}
  );
  } catch (error) {
      next(error)
  }

})

router.delete('/:id',validatorHandler(eliminarProductoSchema, 'params'), async (req, res)=>{
  const idBuscado = req.params.id;

  const sinProductoEliminado = await instanciaServicio.eliminar(idBuscado)

  res.status(200).json({
      msg:  sinProductoEliminado,
  })
})
export default router;
