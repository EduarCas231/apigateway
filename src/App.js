import React, { useState } from 'react';

function App() {
  const [data, setData] = useState({ dev: null, prod: null });
  const [loading, setLoading] = useState({ dev: false, prod: false });

  const fetchAWS = async (env) => {
    const urlBase = "https://pqta0zkb56.execute-api.us-east-2.amazonaws.com/api";
    const endpoint = `${urlBase}/${env}`;
    
    setLoading({ ...loading, [env]: true });
    
    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      setData(prev => ({ ...prev, [env]: result }));
    } catch (error) {
      setData(prev => ({ ...prev, [env]: "Error de conexión" }));
    } finally {
      setLoading(prev => ({ ...prev, [env]: false }));
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Ejercicio api gateway</h1>
      </header>

      <div style={styles.grid}>
        {/* Tarjeta de Desarrollo */}
        <div style={{...styles.card, borderColor: '#007bff'}}>
          <h2 style={{color: '#007bff'}}>API Dev</h2>
          <button 
            onClick={() => fetchAWS('dev')} 
            style={{...styles.button, backgroundColor: '#007bff'}}
            disabled={loading.dev}
          >
            {loading.dev ? 'Consultando...' : 'Consultar /api/dev'}
          </button>
          <div style={styles.responseBox}>
            <code>{data.dev || "Sin datos..."}</code>
          </div>
        </div>

        {/* Tarjeta de Producción */}
        <div style={{...styles.card, borderColor: '#28a745'}}>
          <h2 style={{color: '#28a745'}}>Entorno: Prod</h2>
          <button 
            onClick={() => fetchAWS('prod')} 
            style={{...styles.button, backgroundColor: '#28a745'}}
            disabled={loading.prod}
          >
            {loading.prod ? 'Consultando...' : 'Consultar /api/prod'}
          </button>
          <div style={styles.responseBox}>
            <code>{data.prod || "Sin datos..."}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '40px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { color: '#333', fontSize: '2.5rem' },
  grid: { display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' },
  card: { backgroundColor: '#fff', borderTop: '5px solid', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '350px' },
  info: { fontSize: '0.9rem', color: '#666', marginBottom: '20px' },
  button: { width: '100%', padding: '12px', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' },
  responseBox: { marginTop: '20px', padding: '15px', backgroundColor: '#2d2d2d', color: '#00ff00', borderRadius: '6px', minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};

export default App;