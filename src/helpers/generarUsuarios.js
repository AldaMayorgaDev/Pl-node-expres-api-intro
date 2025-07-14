import { faker } from "@faker-js/faker";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const generarUsuarios = (limite)=>{
  const usuarios = [];
  const aGenerar =  parseInt(limite)

  for(let index= 0; index < aGenerar; index++){
    usuarios.push({
      nombre: faker.person.firstName() + faker.person.middleName(),
      apPaterno: faker.person.lastName(),
      apMaterno: faker.person.lastName(),
      genero: faker.person.sex(),
      ocupacion: faker.person.jobTitle(),
      fotoPerfil: faker.image.url(),
      telefono: faker.phone.number(),
      direccion:{
        calle:faker.location.streetAddress(),
        ciudad: faker.location.city(),
        estado:faker.location.state() ,
        cp: faker.location.zipCode('####'),
        pais: faker.location.country(),
      }
    })

  }
  //console.log('Usuarios generados', usuarios)
  return usuarios;
}

const generarArchivoUsuarios = (numeroUsuarios)=>{
  const listaUsuarios = generarUsuarios(numeroUsuarios)
  const datosJson = JSON.stringify(listaUsuarios);
  const nombreArchivo = 'dataUsuarios.json';

  const __filename = fileURLToPath(import.meta.url); // obtiene la ruta absoluta hasta este archivo
  const __dirname = path.dirname(__filename); // obtiene la ruta absoluta hasta este directorio

  const rutaDirectorioDestino = path.join(__dirname, '../../src/db/');
  fs.writeFile(`${rutaDirectorioDestino}${nombreArchivo}`, datosJson, (error)=>{
    if(error){
      return console.log('Hubo un error')
    }else{
      return console.log('Ya cree el archivo')
    }
  })
}
export {
  generarArchivoUsuarios
}
