const Materia = require('../models/Materia');

// 1. Obtener todas las materias
const getMaterias = async (req, res) => {
  try {
    const materias = await Materia.find();
    res.json(materias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las materias', error: error.message });
  }
};

// 2. Obtener una materias específica por su codigo funcional
const getMateriaByCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const materia = await Materia.findOne({ codigo });
    if (!materia) {
      return res.status(404).json({ mensaje: 'Materia no encontrada' });
    }
    res.json(materia);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la materia', error: error.message });
  }
};

// 3. Registrar una nueva materia
const createMateria = async (req, res) => {
  try {
    const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body;
    
    const nuevaMateria = new Materia({
      codigo,
      nombre,
      descripcion,
      cargaHoraria,
      estado
    });

    const materiaGuardada = await nuevaMateria.save();
    res.status(201).json(materiaGuardada);
  } catch (error) {
    // Control de código duplicado (índice único de MongoDB)
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: 'Ya existe una materia registrada con ese código' });
    }
    res.status(400).json({ mensaje: 'Error al registrar la materia', error: error.message });
  }
};

// 4. Mofidicar una materia existente por su código
const updateMateria = async (req, res) => {
  try {
    const { codigo } = req.params;
    const { nombre, descripcion, cargaHoraria, estado } = req.body;

    const materiaActualizada = await Materia.findOneAndUpdate(
      { codigo },
      { nombre, descripcion, cargaHoraria, estado },
      { new: true, runValidators: true }
    );

    if (!materiaActualizada) {
      return res.status(404).json({ mensaje: 'Materia no encontrada para modificar' });
    }

    res.json(materiaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al modificar la materia', error: error.message });
  }
};

// 5. Eliminar una materia por su código
const deleteMateria = async (req, res) => {
  try {
    const { codigo } = req.params;
    const materiaEliminada = await Materia.findOneAndDelete({ codigo });

    if (!materiaEliminada) {
      return res.status(404).json({ mensaje: 'Materia no encontrada para eliminar' });
    }

    res.json({ mensaje: 'Materia eliminada correctamente', materia: materiaEliminada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la materia', error: error.message });
  }
};

module.exports = {
  getMaterias,
  getMateriaByCodigo,
  createMateria,
  updateMateria,
  deleteMateria
};