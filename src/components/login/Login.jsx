import { useState } from 'react';
import "./login.css";

function Login({ onLoginSuccess }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    
    if (usuario.trim() === 'admin' && password === '1234') {
      onLoginSuccess();
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-titulo">Sistema para Cafeteria</h2>
        <p className="login-subtitulo">Iniciar Sesión</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Usuario:</label>
            <input 
              type="text" 
              placeholder="admin"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <div className="input-group">
            <label>Contraseña:</label>
            <input 
              type="password" 
              placeholder="1234"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="btn-ingresar">
            Entrar
          </button>
        </form>

        <div className="login-ayuda">
          <small>Demo: <b>admin</b> / <b>1234</b></small>
        </div>
      </div>
    </div>
  );
}

export default Login;