import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  const testAPI = async () => {
    try {
      const response = await fetch('http://localhost:8000/');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error connecting to backend');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🌾 AI Crop Predictor</h1>
      <button onClick={testAPI}>Test Backend Connection</button>
      <p>{message}</p>
    </div>
  );
}
