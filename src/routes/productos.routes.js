import express from 'express';
import { Router } from 'express';
import data from '../db/data.json' assert {type: 'json'};



const router = Router();

router.get('/productos', (req, res)=>{
  res.json({
    status: 200,
    data: data
  })
});

router.get('/productos/:id', (req, res)=>{
  const idBuscado = parseInt(req.params.id);
  //console.log( idBuscado)

  const productoBuscado = data.find(producto => producto.id === idBuscado);
  if(!productoBuscado){
    return res.status(404).json({
      msg: 'Producto no encontrado'
    })
  }

  res.status(200).json({
    data: productoBuscado
  })
})

router.get('/productos/:idProducto/categorias/:categoria', (req, res)=>{
  const {idProducto, categoria} = req.params;
  console.log(idProducto, categoria);

  const productoBuscado = data.find(producto => producto.id === parseInt(idProducto) && producto.categoria === categoria);

  if(!productoBuscado){
    return res.status(404).json({
      msg: "Producto no encontrado"
    })
  }

  res.status(200).json({
    data: productoBuscado
  })
})


/*
Query params
limit	Cuántos registros devolver (ej. 10, 20, 50, etc.)
offset	Desde qué posición empezar a devolver los registros
*/


router.get('/productosLimit', (req, res)=>{
  const {limit, offset}= req.query;
  console.log("🚀 ~ router.get ~ limit, offset:", limit, offset)

  if(limit && offset){
    const productosPaginados = data.slice(parseInt(offset), (parseInt(limit)+parseInt(offset)))
    console.log(productosPaginados);

    return res.status(200).json(
      {
        data: productosPaginados
      }
    );
  }else{
    return res.status(200).json(
      {
        data: data
      }
    )
  }
})
export default router;
