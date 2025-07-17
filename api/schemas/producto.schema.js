/* También se puede llamar DTO, (Data Transfer Object)
Su funcionalidad es validad la data que nos envía el cliente antes de entrar en el servicio
*/

import Joi from 'joi';

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(45);
const precio = Joi.number().precision(2).min(10);
const imagen = Joi.string().uri();

const crearProductoSchema = Joi.object({
  nombre: nombre.required(),
  precio: precio.required(),
  imagen: imagen.required()
});

const actualizarProductoSchema = Joi.object({
  nombre: nombre,
  precio: precio,
  imagen: imagen
});

const buscarProductoSchema = Joi.object({
  id: id.required(),
});

const eliminarProductoSchema = Joi.object({
  id: id.required(),
});

export {
  crearProductoSchema,
  actualizarProductoSchema,
  buscarProductoSchema,
  eliminarProductoSchema,
};
