import { useEffect, useState } from 'react'
import './header.css'
import ElegirTema from '../ElegirTema.jsx'


function Header({ nombreCafeteria = "Mi Cafetería" }) {

    const [hora, setHora] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setHora(new Date())
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    const fechaFormateada = hora.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
    });

    const horaFormateada = hora.toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
    });


  return (
    <header className='header-container'>
      <div className='header-title'>
        <h1>{nombreCafeteria}</h1>
      </div>

      <ElegirTema />

        <div className='clock-info'>
          <span className='date'>{fechaFormateada}</span>
          <span className='time'>{horaFormateada}</span>
        </div>
    </header>
  )
}

export default Header;