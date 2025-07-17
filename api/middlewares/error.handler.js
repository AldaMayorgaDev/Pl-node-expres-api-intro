//Crear todos los middlewares de vamos a pasar a ala api de forma global

//middleware que se encarga de capturar el error
function logError(error, req, res, next){
  console.log("🚀 ~ Ejecutando logError:")
  console.error(error);
  next(error); //sigue el flujo con un midelware de tipo error
}

//Middleware que detecta un error pero crear un formato para devolvérselo al cliente
function errorHandler(error, req, res, next){
  console.log("🚀 ~ Ejecutando errorHandler:")
  res.status(500).json({
    msg: error.message,
    stack: error.stack
  })
}

//Middleware que detecta un error pero crear un formato para devolvérselo al cliente usando boom
function boomErrorHandler(error, req, res, next){
  console.log("🚀 ~ Ejecutando boomErrorHandler")

  //identifica si el error es de tipo o echo de por la librería Boom
  if(error.isBoom){
    const {output}= error; //obtiene toda la información del error, eso se encuentra en output
    res.status(output.statusCode).json(output.payload); //el código http de status es dinámico y viene de output.statusCode, la información del código http status, viene de output.payload
  }else{
    next(error);
  }
}

export {
  logError,
  errorHandler,
  boomErrorHandler
}
