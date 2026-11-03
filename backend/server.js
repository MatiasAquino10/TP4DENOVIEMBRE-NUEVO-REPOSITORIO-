require("dotenv").config() 

const express = require("express") 
const cors = require("cors")

const conectarDB = require("./config/database")
const alumnosRoutes = require("./routes/alumnos.routes") 
const docentesRoutes = require("./routes/docentes.routes")
const materiaRoutes = require("./routes/materiaRoutes")

const app = express() 

app.use(express.json()) 
app.use(cors()) 
app.use((req, res, next) => {
    console.log(`Método: ${req.method} - URL: ${req.url}`)
    next() 
})

app.use("/alumnos", alumnosRoutes) 
app.use("/docentes", docentesRoutes)
app.use("/materias", materiaRoutes)

const PORT = process.env.PORT 

conectarDB() 

console.log("Ejecutado con nodemon")

app.listen(PORT, () => { 
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})


// Creo un middleware
// app.use((req, res, next) => {
//     console.log(req.method)
//     console.log(req.url)
//     next()
// })