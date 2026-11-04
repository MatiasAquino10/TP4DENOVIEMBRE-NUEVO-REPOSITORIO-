import { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioM from '../components/FormularioM';
import ListaMaterias from '../components/ListaMaterias';

export default function Materias() {
  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    cargaHoraria: '',
    estado: 'activa'
  });
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const API_URL = 'http://localhost:3000/materias';

  useEffect(() => {
    const obtenerMaterias = async () => {
      try {
        const response = await axios.get(API_URL);
        setMaterias(response.data);
        setError('');
      } catch (err) {
        setError(err.message || "No se pudo conectar con el servidor backend.");
      }
    };

    obtenerMaterias();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      await axios.post(API_URL, {
        ...form,
        cargaHoraria: Number(form.cargaHoraria)
      });
      setMensaje('¡Materia registrada con éxito!');
      setForm({ codigo: '', nombre: '', descripcion: '', cargaHoraria: '', estado: 'activa' });
      
      const response = await axios.get(API_URL);
      setMaterias(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar la materia.");
    }
  };

  const handleDelete = async (codigo, nombre) => {
    if (!window.confirm(`¿Seguro querés eliminar la materia "${nombre}" (${codigo})?`)) return;

    try {
      await axios.delete(`${API_URL}/${codigo}`);
      setMensaje(`La materia "${nombre}" (${codigo}) fue eliminada correctamente.`);
      
      const response = await axios.get(API_URL);
      setMaterias(response.data);
    } catch (err) {
      setError(err.message || "Error al eliminar la materia.");
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <FormularioM 
        form={form} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        error={error} 
        mensaje={mensaje} 
      />

      <ListaMaterias 
        materias={materias} 
        handleDelete={handleDelete} 
      />
    </div>
  );
}