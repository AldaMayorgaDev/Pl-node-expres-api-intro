import { Router } from 'express';
import usuariosRouter from './usuarios.routes.js';
import productosRouter from './productos.routes.js';


function apiRoutes (app){
  const router = Router();
  app.use('/api/v1', router); //Endpoint General
  router.use('/usuarios', usuariosRouter); // localhost:3004/api/v1/usuarios
  router.use('/productos', productosRouter);
}


export default apiRoutes;
