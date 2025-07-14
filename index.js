import express from 'express';
import routerProductos  from './src/routes/productos.routes.js';

const app = express();
const PORT = 3004;
//const IP= '192.168.1.15';

//ruta
app.get('/', (req, res)=>{
  res.send('Hola mundito');
})

app.get('/nueva-ruta', (req, res)=>{
  res.send('Estás visitando una nueva ruta')
});


app.use(routerProductos);
/* app.get('/productos', (req, res)=>{
  res.json([
    {
      id: 1,
      nombre: 'Terminal de venta',
      precio: 1200
    },
    {
      id: 2,
      nombre: 'Impresora',
      precio: 2200
    },
    {
      id: 3,
      nombre: 'Papel de ticket',
      precio: 100
    }, {
      id: 4,
      nombre: 'Lápiz óptico',
      precio: 450
    }
  ]
  )
}) */
app.listen(PORT, ()=>{
  //console.log(`Servidor http://${IP}:${PORT}`);
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
