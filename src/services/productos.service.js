import { faker } from "@faker-js/faker";
import  boom  from "@hapi/boom"; //libreria para manejar los errores con statusCode

class ProductosService {

  //Toda la lógica con respecto a productos



  //constructor de la clase
  constructor(){
    this.productos = [];
    this.generar(); //Se generan los productos iniciales
  }

  /*** Funciones de lógica  */

  //Generate()
  async generar(){
    const cantidadDeProductos = 100;
    for (let index = 0; index < cantidadDeProductos; index++) {
      this.productos.push({
        id: faker.number.int(),
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription,
        precio: parseFloat(faker.commerce.price()),
        imagen: faker.image.url(),
        isBlock : faker.datatype.boolean(),
      })
    }
  }
  // create()
  async crear(data){
    const id = faker.number.int();
    const nuevoProducto = {
      id,
      ...data
    }

    this.productos.push(nuevoProducto);
    return nuevoProducto;

  }

  // find()
  async buscarTodos(){
    return new Promise((resolve, reject)=>{

      setTimeout(()=>{
        resolve(this.productos);
      }, 5000)
    })
  }

  //findOne()
  async buscarUno(id){
    const producto =  this.productos.find((producto) => producto.id === id);
    if (!producto) {
      throw boom.notFound('Producto no encontrado');
    }
    //regla de negocio validando si el porducto esta bloqueado o no
    if (producto.isBlock) {
      throw boom.conflict('Producto está bloqueado');
    }
    return producto;
  }

  //update()
  async actualizar(id, nuevaData){
    const index = this.productos.findIndex((producto) => producto.id === parseInt(id))

    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    } else {
      //Persistir la informacion existente y actualizando co la nueva
      const producto = this.productos[index]
      this.productos[index]= {
        ...producto,
        ...nuevaData
      };
      return this.productos[index];
    }
  }

  // delete ()
  async eliminar(id){
    const indexAEliminar = this.productos.findIndex((producto)=>producto.id === parseInt(id))

    if(indexAEliminar === -1){
      throw boom.notFound('Producto no encontrado');
    }

    this.productos.splice(indexAEliminar, 1);
    return {msg: `Producto con el id ${id} Eliminado con éxito`}
  }

}


export default ProductosService;
