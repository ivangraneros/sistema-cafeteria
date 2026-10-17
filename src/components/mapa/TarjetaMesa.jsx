import './TarjetaMesa.css';

function TarjetaMesa ({ mesa, onClick }) {

  const { numero, estado, total} = mesa;

  const getTextoEstado = () => {
    if (mesa.estado === 'ocupada') return 'Ocupada';
    if (mesa.estado === 'cuenta') return 'Pedir Cuenta';
    return 'Disponible';
  };
  
  return (

    <div
      className={`tarjeta-mesa estado-${estado}`}
      onClick={() => onClick(mesa.id)}>

      <div className='mesa-header'>
        <span className="mesa-numero">Mesa {numero}</span>
        <span className="mesa-status-badge">{getTextoEstado()}</span>
      </div>

      <div className="mesa-info">
        {mesa.total > 0 ? (
          <span className="mesa-monto">${total.toLocaleString('es-AR')}</span>
          ) : (
          <span className="mesa-monto-vacio">Libre</span>
        )}  
      </div>
    </div>
  );
};



export default TarjetaMesa;