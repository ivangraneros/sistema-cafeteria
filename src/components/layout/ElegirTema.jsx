import { useState } from 'react'
import PALETAS from '../../constants/paletas.js'
import './ElegirTema.css'

function ElegirTema() {
  const [temaSeleccionado, setTemaSeleccionado] = useState('cafe')

  const cambiarTema = (nombreTema) => {
    const paleta = PALETAS[nombreTema]
    if (!paleta) return;

    Object.entries(paleta.colores).forEach(([variable, valor]) => {
        document.documentElement.style.setProperty(variable, valor);
    });

    setTemaSeleccionado(nombreTema);
  }

    return (
        <div className="selector-tema-bar">
        {Object.keys(PALETAS).map((clave) => (
            <button
            key={clave}
            className={`btn-tema ${temaSeleccionado === clave ? 'activo' : ''}`}
            onClick={() => cambiarTema(clave)}
            >
            {PALETAS[clave].nombre}
            </button>
        ))}
        </div>
    );
    };

export default ElegirTema