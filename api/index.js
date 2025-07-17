import express, { json } from 'express';
import { faker } from '@faker-js/faker'; //Generador de Data
import cors from 'cors'; //permitir conexiones desde otros dominios
import routerApi from './routes/index.routes.js';
import {  logError, errorHandler, boomErrorHandler} from './middlewares/error.handler.js';


const app = express();
const PORT = process.env.PORT || 3004;
//const IP= '192.168.1.15';

//uso de json
app.use(express.json())

//uso de cors
const origenesPermitidosParaPeticiones = ['http://localhost:5500', 'http://127.0.0.1:5500' , 'http://127.0.0.1:5731/', 'https://myapp.com.mx', '192.168.137.1:3004', 'http://localhost:3004', '*'];
const options ={
  origin: (origin, callback)=>{
    if(!origin || origenesPermitidosParaPeticiones.includes(origin)){
        callback(null, true); //null es de errores, true es que permite el acceso
    }
    else{
      callback(new Error('Acceso: Origen No permitido'));
    }
  }
}
app.use(cors(options)); // habilitando cualquier dominio u origen

//ruta
app.get('api/', (req, res)=>{
  res.send('Hola mundo :D');
})

app.get('api/nueva-ruta', (req, res)=>{
  res.send('Estás visitando una nueva ruta')
});


routerApi(app);

//Los middlewares de tipo error deben usados después del routing y poniendo atención en el orden que se llaman dado que asi se ejecutan
app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

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

export default app;
