const Materia = require("../models/Materia")

const ESTADOS = ["activa", "inactiva"]

function normalizarCodigo(codigo) {
    return String(codigo ?? "").trim().toUpperCase()
}

function validarMateria({ codigo, nombre, descripcion, cargaHoraria, estado }) {
    if (typeof codigo !== "string" || codigo.trim() === "") {
        return "El código es obligatorio"
    }
    if (typeof nombre !== "string" || nombre.trim() === "") {
        return "El nombre es obligatorio"
    }
    if (nombre.trim().length < 3 || nombre.trim().length > 100) {
        return "El nombre debe tener entre 3 y 100 caracteres"
    }
    if (descripcion !== undefined && descripcion !== null && descripcion !== "") {
        if (typeof descripcion !== "string" || descripcion.trim() === "") {
            return "La descripción no puede contener únicamente espacios"
        }
        if (descripcion.trim().length > 500) {
            return "La descripción es demasiado larga"
        }
    }
    if (typeof cargaHoraria !== "number" || !Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
        return "La carga horaria debe ser un entero mayor que cero"
    }
    if (!ESTADOS.includes(estado)) {
        return "El estado debe ser activa o inactiva"
    }
    return null
}

function responderError(res, error, accion) {
    if (error.code === 11000) {
        return res.status(409).json({ mensaje: "Ya existe una materia con ese código" })
    }
    if (error.name === "ValidationError" || error.name === "CastError") {
        return res.status(400).json({ mensaje: "Los datos de la materia no son válidos" })
    }
    console.error(`Error al ${accion}:`, error)
    return res.status(500).json({ mensaje: `No se pudo ${accion} la materia` })
}

async function obtenerMaterias(req, res) {
    try {
        const materias = await Materia.find().sort({ codigo: 1 })
        res.json(materias)
    } catch (error) {
        responderError(res, error, "obtener")
    }
}

async function obtenerMateria(req, res) {
    try {
        const materia = await Materia.findOne({ codigo: normalizarCodigo(req.params.codigo) })
        if (!materia) {
            return res.status(404).json({ mensaje: "Materia no encontrada" })
        }
        res.json(materia)
    } catch (error) {
        responderError(res, error, "obtener")
    }
}

async function crearMateria(req, res) {
    try {
        const errorValidacion = validarMateria(req.body)
        if (errorValidacion) {
            return res.status(400).json({ mensaje: errorValidacion })
        }
        const { nombre, descripcion, cargaHoraria, estado } = req.body
        const codigo = normalizarCodigo(req.body.codigo)

        const existe = await Materia.findOne({ codigo })
        if (existe) {
            return res.status(409).json({ mensaje: "Ya existe una materia con ese código" })
        }

        const nueva = await Materia.create({ codigo, nombre, descripcion, cargaHoraria, estado })
        res.status(201).json(nueva)
    } catch (error) {
        responderError(res, error, "registrar")
    }
}

async function actualizarMateria(req, res) {
    try {
        const codigoActual = normalizarCodigo(req.params.codigo)
        const datos = { ...req.body, codigo: req.body.codigo ?? codigoActual }

        const errorValidacion = validarMateria(datos)
        if (errorValidacion) {
            return res.status(400).json({ mensaje: errorValidacion })
        }

        const existente = await Materia.findOne({ codigo: codigoActual })
        if (!existente) {
            return res.status(404).json({ mensaje: "Materia no encontrada" })
        }

        const codigoNuevo = normalizarCodigo(datos.codigo)
        if (codigoNuevo !== codigoActual) {
            const duplicada = await Materia.findOne({ codigo: codigoNuevo })
            if (duplicada) {
                return res.status(409).json({ mensaje: "Ya existe una materia con ese código" })
            }
        }

        const { nombre, descripcion, cargaHoraria, estado } = datos
        const actualizada = await Materia.findOneAndUpdate(
            { codigo: codigoActual },
            { codigo: codigoNuevo, nombre, descripcion, cargaHoraria, estado },
            { new: true, runValidators: true }
        )
        res.json(actualizada)
    } catch (error) {
        responderError(res, error, "modificar")
    }
}

async function eliminarMateria(req, res) {
    try {
        const eliminada = await Materia.findOneAndDelete({ codigo: normalizarCodigo(req.params.codigo) })
        if (!eliminada) {
            return res.status(404).json({ mensaje: "Materia no encontrada" })
        }
        res.json({ mensaje: "Materia eliminada correctamente" })
    } catch (error) {
        responderError(res, error, "eliminar")
    }
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
}