export default function ListaMaterias({ materias, handleDelete }) {
    if (!materias || materias.length === 0) {
      return <p style={{ marginTop: '20px', color: '#94a3b8' }}>No hay materias registradas.</p>;
    }
  
    return (
      <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '8px', border: '1px solid #334155', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
        <h3 style={{ marginTop: 0, color: '#f8fafc', marginBottom: '20px', fontSize: '1.25rem', fontWeight: '500' }}>Materias</h3>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          {materias.map((materia) => (
            <div 
              key={materia.codigo} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '16px', 
                borderRadius: '6px', 
                border: '1px solid #334155', 
                backgroundColor: 'transparent' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ 
                  border: '1px solid #475569', 
                  borderRadius: '20px', 
                  padding: '4px 12px', 
                  fontSize: '0.85rem', 
                  color: '#94a3b8' 
                }}>
                  Código {materia.codigo}
                </span>
                <div>
                  <div style={{ color: '#f8fafc', fontWeight: '500', fontSize: '1rem' }}>{materia.nombre}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '2px' }}>
                    {materia.cargaHoraria} hs — Estado: {materia.estado}
                  </div>
                </div>
              </div>
  
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button 
                  onClick={() => handleDelete(materia.codigo, materia.nombre)}
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: '#ef4444', 
                    border: 'none', 
                    padding: '6px 12px', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold', 
                    textTransform: 'uppercase', 
                    fontSize: '0.85rem' 
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }