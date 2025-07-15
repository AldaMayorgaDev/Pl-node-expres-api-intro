import { Router } from 'express';
//import data from '../db/data.json' assert {type: 'json'};
import data from '../db/data.json' with { type: 'json' };

const router = Router();

//! Los endpoints específicos ejemplo /?limits=,  /filtros van siempre antes de los dinámicos ejemplo  productos/ , /:id

/*
Query params
limit	Cuántos registros devolver (ej. 10, 20, 50, etc.)
offset	Desde qué posición empezar a devolver los registros
*/

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  console.log('🚀 ~ router.get ~ limit, offset:', limit, offset);

  if (limit && offset) {
    const productosPaginados = data.slice(
      parseInt(offset),
      parseInt(limit) + parseInt(offset),
    );
    console.log(productosPaginados);

    return res.status(200).json({
      data: productosPaginados,
    });
  } else {
    return res.status(200).json({
      data: data,
    });
  }
});

// Todos los productos
router.get('/', (req, res) => {
  res.json({
    status: 200,
    data: data,
  });
});

router.get('/:id', (req, res) => {
  const idBuscado = parseInt(req.params.id);
  //console.log( idBuscado)

  const productoBuscado = data.find((producto) => producto.id === idBuscado);
  if (!productoBuscado) {
    return res.status(404).json({
      msg: 'Producto no encontrado',
    });
  }

  res.status(200).json({
    data: productoBuscado,
  });
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

router.post('/', (req, res) => {
  const body = req.body;
  data.push({
    id: Symbol(),
    nombre: body.nombre,
    precio: body.precio,
    categoria: body.categoria,
  });

  res
    .json({
      msg: 'Producto creado',
      producto: body,
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
  console.log('🚀 ~ router.put ~ productoAActualizar:', productoAActualizar);

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


router.patch('/:id', (req, res)=>{
  const idBuscado = req.params.id;
  const dataActualizada = req.body;

  // buscar el elemento a actualizar
  const productoAActualizar = data.find(producto => producto.id === parseInt(idBuscado));

  if(!productoAActualizar){
    return res.status(404).json({
      msg: "Producto no encontrado"
    })
  }else{

  // Lista blanca de campos que sí se pueden actualizar
  const camposPermitidosParaActualizar = ['nombre', 'precio', 'categoria'];

  // Recorremos solo los campos permitidos
  for (const key of camposPermitidosParaActualizar) {
    if (dataActualizada[key] !== undefined) {
      productoAActualizar[key] = dataActualizada[key];
    }
  }

    return res.status(200).json({
    msg: 'Producto actualizado correctamente',
    data: productoAActualizar
  });
  }
})



router.delete('/:id', (req, res)=>{
  const idBuscado = req.params.id;

  const dataFiltrada =  data.filter(producto => producto.id !== parseInt(idBuscado));

  console.log('dataFiltrada', dataFiltrada);

  if(!dataFiltrada){
    return res.status(404).json({
      msg: "No se encontró el prodcuto"
    })
  }
  else{
    return res.status(200).json({
      msg: "Producto eliminado",
      data: dataFiltrada,
      elementoEliminado: data.find(producto => producto.id === parseInt(idBuscado))
    })
  }
})
export default router;
