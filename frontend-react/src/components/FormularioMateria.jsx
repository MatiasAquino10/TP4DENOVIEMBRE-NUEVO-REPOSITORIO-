import { useState } from "react"
import { Alert, Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material"

const API_MATERIAS = "http://localhost:3000/materias"

function FormularioMateria({ onMateriaCreada, materiaEditar, onCancelar }) {
    const [formulario, setFormulario] = useState({
        codigo: materiaEditar?.codigo ?? "",
        nombre: materiaEditar?.nombre ?? "",
        descripcion: materiaEditar?.descripcion ?? "",
        cargaHoraria: String(materiaEditar?.cargaHoraria ?? ""),
        estado: materiaEditar?.estado ?? "activa"
    })
    const [error, setError] = useState("")
    const [exito, setExito] = useState("")
    const [guardando, setGuardando] = useState(false)

    function manejarCambio(e) {
        const { name, value } = e.target
        setFormulario({ ...formulario, [name]: value })
    }

    function validar() {
        if (formulario.codigo.trim() === "") return "El código es obligatorio"
        if (formulario.nombre.trim() === "") return "El nombre es obligatorio"
        if (formulario.descripcion !== "" && formulario.descripcion.trim() === "") {
            return "La descripción no puede contener únicamente espacios"
        }
        const carga = Number(formulario.cargaHoraria)
        if (formulario.cargaHoraria.trim() === "" || !Number.isInteger(carga) || carga <= 0) {
            return "La carga horaria debe ser un entero mayor que cero"
        }
        return ""
    }

    async function guardar(e) {
        e.preventDefault()
        setError("")
        setExito("")

        const errorValidacion = validar()
        if (errorValidacion) {
            setError(errorValidacion)
            return
        }

        setGuardando(true)
        const materia = {
            ...formulario,
            codigo: formulario.codigo.trim(),
            nombre: formulario.nombre.trim(),
            descripcion: formulario.descripcion.trim(),
            cargaHoraria: Number(formulario.cargaHoraria)
        }
        const editando = Boolean(materiaEditar)
        const url = editando
            ? `${API_MATERIAS}/${encodeURIComponent(materiaEditar.codigo)}`
            : API_MATERIAS

        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(materia)
            })

            if (!respuesta.ok) {
                const datos = await respuesta.json().catch(() => ({}))
                throw new Error(datos.mensaje || `No se pudo guardar la materia. Estado HTTP: ${respuesta.status}`)
            }

            if (!editando) {
                setFormulario({ codigo: "", nombre: "", descripcion: "", cargaHoraria: "", estado: "activa" })
                setExito("Materia registrada correctamente")
            }
            onMateriaCreada()
        } catch (error) {
            console.error("Error al guardar:", error)
            setError(error.message || "No se pudo conectar con el servidor")
        } finally {
            setGuardando(false)
        }
    }

    return (
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                {materiaEditar ? "Editar materia" : "Nueva Materia"}
            </Typography>
            <Box
                component="form"
                onSubmit={guardar}
                noValidate
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                    gap: 2
                }}
            >
                <TextField id="codigo" name="codigo" label="Código" value={formulario.codigo} onChange={manejarCambio} required fullWidth />
                <TextField id="nombre" name="nombre" label="Nombre" value={formulario.nombre} onChange={manejarCambio} required fullWidth />
                <TextField id="descripcion" name="descripcion" label="Descripción" value={formulario.descripcion} onChange={manejarCambio} fullWidth />
                <TextField id="cargaHoraria" name="cargaHoraria" label="Carga horaria" type="number" value={formulario.cargaHoraria} onChange={manejarCambio} required fullWidth />
                <TextField id="estado" name="estado" label="Estado" select value={formulario.estado} onChange={manejarCambio} required fullWidth>
                    <MenuItem value="activa">Activa</MenuItem>
                    <MenuItem value="inactiva">Inactiva</MenuItem>
                </TextField>
                <Box
                    sx={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        justifyContent: "flex-end",
                        flexWrap: "wrap",
                        gap: 1.5,
                        mt: 1
                    }}
                >
                    <Button type="submit" variant="contained" disabled={guardando}>
                        {guardando ? "Guardando..." : materiaEditar ? "Guardar cambios" : "Guardar"}
                    </Button>
                    {materiaEditar && (
                        <Button type="button" onClick={onCancelar} disabled={guardando} variant="outlined">
                            Cancelar
                        </Button>
                    )}
                </Box>
                {error && (
                    <Alert severity="error" role="alert" sx={{ gridColumn: "1 / -1" }}>
                        {error}
                    </Alert>
                )}
                {exito && (
                    <Alert severity="success" sx={{ gridColumn: "1 / -1" }}>
                        {exito}
                    </Alert>
                )}
            </Box>
        </Paper>
    )
}

export default FormularioMateria