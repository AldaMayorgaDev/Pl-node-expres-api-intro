import usuariosRouter from './usuarios.routes.js';
import productosRouter from './productos.routes.js';

function apiRoutes (app){
  app.use('/usuarios', usuariosRouter);
  app.use('/productos', productosRouter);
}


export default apiRoutes;
