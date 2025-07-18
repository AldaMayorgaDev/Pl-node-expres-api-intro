import  boom  from "@hapi/boom";

function validatorHandler(schema, propiedad){
  //Closures
  return (req, res, next) =>{
    const data= req[propiedad];
    const {error} = schema.validate(data, {abortEarly: false})
    if(error){
      next(boom.badRequest(error))
    }
    next();
  }

}

export default validatorHandler;
