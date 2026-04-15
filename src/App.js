import React, { useState } from 'react';

function App() {
  const [data, setData] = useState({ dev: null, prod: null });
  const [loading, setLoading] = useState({ dev: false, prod: false });

  // Mapeo de URLs específicas según el entorno
  const endpoints = {
    dev: "https://pqta0zkb56.execute-api.us-east-2.amazonaws.com/dev/dev",
    prod: "https://pqta0zkb56.execute-api.us-east-2.amazonaws.com/prod/prod"
  };

  const fetchAWS = async (env) => {
    const url = endpoints[env];
    
    setLoading(prev => ({ ...prev, [env]: true }));
    
    try {
      const response = await fetch(url);
      // Verificamos si la respuesta es exitosa
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      const result = await response.json();
      // Si el resultado es un objeto, lo convertimos a string para mostrarlo
      setData(prev => ({ 
        ...prev, 
        [env]: typeof result === 'object' ? JSON.stringify(result) : result 
      }));
    } catch (error) {
      setData(prev => ({ ...prev, [env]: `Error: ${error.message}` }));
    } finally {
      setLoading(prev => ({ ...prev, [env]: false }));
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Ejercicio API Gateway</h1>
        <p style={styles.subtitle}>Consumo de Endpoints AWS Lambda</p>
      </header>

      <div style={styles.grid}>
        {/* Tarjeta de Desarrollo */}
        <div style={{...styles.card, borderColor: '#007bff'}}>
          <h2 style={{color: '#007bff'}}>Entorno: DEV</h2>
          <p style={styles.urlText}>{endpoints.dev}</p>
          <button 
            onClick={() => fetchAWS('dev')} 
            style={{...styles.button, backgroundColor: '#007bff'}}
            disabled={loading.dev}
          >
            {loading.dev ? 'Consultando...' : 'Consultar /dev/dev'}
          </button>
          <div style={styles.responseBox}>
            <code>{data.dev || "Esperando consulta..."}</code>
          </div>
        </div>

        {/* Tarjeta de Producción */}
        <div style={{...styles.card, borderColor: '#28a745'}}>
          <h2 style={{color: '#28a745'}}>Entorno: PROD</h2>
          <p style={styles.urlText}>{endpoints.prod}</p>
          <button 
            onClick={() => fetchAWS('prod')} 
            style={{...styles.button, backgroundColor: '#28a745'}}
            disabled={loading.prod}
          >
            {loading.prod ? 'Consultando...' : 'Consultar /prod/prod'}
          </button>
          <div style={styles.responseBox}>
            <code>{data.prod || "Esperando consulta..."}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '40px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { color: '#333', fontSize: '2.2rem', marginBottom: '10px' },
  subtitle: { color: '#666', fontSize: '1.1rem' },
  grid: { display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' },
  card: { backgroundColor: '#fff', borderTop: '5px solid', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '380px' },
  urlText: { fontSize: '0.75rem', color: '#888', marginBottom: '15px', wordBreak: 'break-all', fontStyle: 'italic' },
  button: { width: '100%', padding: '12px', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: 'opacity 0.2s' },
  responseBox: { marginTop: '20px', padding: '15px', backgroundColor: '#2d2d2d', color: '#00ff00', borderRadius: '6px', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', wordBreak: 'break-all' }
};

export default App;