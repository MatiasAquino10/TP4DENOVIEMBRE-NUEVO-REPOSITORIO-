import { useState } from "react"
import FormularioMateria from "../components/FormularioMateria"
import ListaMaterias from "../components/ListaMaterias"

export default function Materias() {
    const [actualizar, setActualizar] = useState(0)
    const [materiaEditar, setMateriaEditar] = useState(null)

    function materiaCreada() {
        setActualizar(valor => valor + 1)
        setMateriaEditar(null)
    }

    return (
        <>
            <FormularioMateria
                key={materiaEditar?.codigo ?? "nuevo"}
                onMateriaCreada={materiaCreada}
                materiaEditar={materiaEditar}
                onCancelar={() => setMateriaEditar(null)}
            />
            <ListaMaterias
                actualizar={actualizar}
                onMateriaCreada={materiaCreada}
                onEditarMateria={setMateriaEditar}
            />
        </>
    )
}