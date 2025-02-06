// src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación: Usuario "Jonathan" y contraseña "1234"
    if (username === 'Jonathan' && password === '1234') {
      login({ username });
      navigate('/');
    } else {
      alert('Credenciales inválidas. Intenta nuevamente.');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};
