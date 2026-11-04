export default function FormularioM({ form, handleChange, handleSubmit, error, mensaje }) {
    return (
      <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '8px', border: '1px solid #334155', color: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0, color: '#f8fafc', marginBottom: '20px', fontSize: '1.25rem', fontWeight: '500' }}>Nueva Materia</h3>
        
        {error && <p style={{ color: '#f87171', fontWeight: 'bold', marginBottom: '12px' }}>{error}</p>}
        {mensaje && <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>{mensaje}</p>}
  
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input 
              type="text" 
              name="codigo" 
              placeholder="Código *" 
              value={form.codigo} 
              onChange={handleChange} 
              required
              style={{ padding: '10px 12px', borderRadius: '4px', border: '1px solid #475569', color: '#fff', backgroundColor: 'transparent', outline: 'none' }}
            />
            <input 
              type="text" 
              name="nombre" 
              placeholder="Nombre *" 
              value={form.nombre} 
              onChange={handleChange} 
              required
              style={{ padding: '10px 12px', borderRadius: '4px', border: '1px solid #475569', color: '#fff', backgroundColor: 'transparent', outline: 'none' }}
            />
          </div>
  
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input 
              type="text" 
              name="descripcion" 
              placeholder="Descripción (opcional)" 
              value={form.descripcion} 
              onChange={handleChange} 
              style={{ padding: '10px 12px', borderRadius: '4px', border: '1px solid #475569', color: '#fff', backgroundColor: 'transparent', outline: 'none' }}
            />
            <input 
              type="number" 
              name="cargaHoraria" 
              placeholder="Carga Horaria *" 
              value={form.cargaHoraria} 
              onChange={handleChange} 
              required
              min="1"
              style={{ padding: '10px 12px', borderRadius: '4px', border: '1px solid #475569', color: '#fff', backgroundColor: 'transparent', outline: 'none' }}
            />
          </div>
  
          <select 
            name="estado" 
            value={form.estado} 
            onChange={handleChange}
            style={{ padding: '10px 12px', borderRadius: '4px', border: '1px solid #475569', color: '#fff', backgroundColor: '#1e293b', outline: 'none' }}
          >
            <option value="activa" style={{ backgroundColor: '#1e293b', color: '#fff' }}>Activa</option>
            <option value="inactiva" style={{ backgroundColor: '#1e293b', color: '#fff' }}>Inactiva</option>
          </select>
  
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button 
              type="submit" 
              style={{ backgroundColor: '#cbd5e1', color: '#0f172a', border: 'none', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    );
  }