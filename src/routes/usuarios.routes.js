import express from 'express';
import { generarArchivoUsuarios } from '../helpers/generarUsuarios.js';

const router = express.Router();


router.get('/generar', (req, res) => {
  generarArchivoUsuarios(100);
  res.status(401).json({msg: 'Usuarios generados y guardados'});
});

export default router;
