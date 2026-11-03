const express = require('express');
const router = express.Router();
const {
  getMaterias,
  getMateriaByCodigo,
  createMateria,
  updateMateria,
  deleteMateria
} = require('../controllers/materiaController');

// Definición de las rutas REST para materias
router.get('/', getMaterias);
router.get('/:codigo', getMateriaByCodigo);
router.post('/', createMateria);
router.put('/:codigo', updateMateria);
router.delete('/:codigo', deleteMateria);

module.exports = router;