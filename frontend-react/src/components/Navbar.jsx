import { Link } from "react-router-dom";

export function Navbar(){
    return (
        <nav>
            <Link to="/">Inicio</Link> | 
            <Link to="/alumnos">Alumnos</Link> | 
            <Link to="/docentes">Docentes</Link> | 
            <Link to="/materias">Materias</Link>
        </nav>
    )
}

// export default Navbar