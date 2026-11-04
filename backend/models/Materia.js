const mongoose = require("mongoose")

const materiaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: [true, "El código es obligatorio"],
        unique: true,
        trim: true,
        uppercase: true
    },
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
        minlength: [3, "El nombre es demasiado corto"],
        maxlength: [100, "El nombre es demasiado largo"]
    },
    descripcion: {
        type: String,
        trim: true,
        maxlength: [500, "La descripción es demasiado larga"]
    },
    cargaHoraria: {
        type: Number,
        required: [true, "La carga horaria es obligatoria"],
        validate: {
            validator: v => Number.isInteger(v) && v > 0,
            message: "La carga horaria debe ser un entero mayor que cero"
        }
    },
    estado: {
        type: String,
        required: [true, "El estado es obligatorio"],
        enum: {
            values: ["activa", "inactiva"],
            message: "El estado debe ser activa o inactiva"
        }
    }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model("Materia", materiaSchema)