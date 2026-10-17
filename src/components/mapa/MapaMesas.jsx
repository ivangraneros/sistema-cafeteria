import React from 'react'
import TarjetaMesa from './TarjetaMesa'
import HistorialVentas from '../HistorialVentas/HistorialVentas'
import './MapaMesas.css'

function MapaMesas({ mesas, onSelectMesa, ventasDelDia = [] }) {
  return (
    <div className='mapa-container'>
            <div className='mapa-grilla'>
                {mesas.map((mesa) => (
                    <TarjetaMesa key={mesa.id} mesa={mesa} onClick={onSelectMesa} />
                ))}
            </div>

        <HistorialVentas ventas={ventasDelDia} />
    </div>
    
  )
}

export default MapaMesas