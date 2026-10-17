import { useState } from 'react';

import Header from './components/layout/Header/Header.jsx';
import MapaMesas from './components/mapa/MapaMesas.jsx';
import MESAS_INICIALES from './constants/mesasIniciales.js';
import POSLayout from './components/POSLayout/POSLayout.jsx';

// css
import './components/layout/Header/Header.css';
import './components/mapa/MapaMesas.jsx';
import './components/mapa/TarjetaMesa.jsx';




function App() {

  const [mesas, setMesas] = useState(MESAS_INICIALES);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [vistaActual, setVistaActual] = useState('MAPA'); 
  const [ventasDelDia, setVentasDelDia] = useState([]);

  const mesaActual = mesas.find((m) => m.id === mesaSeleccionada);



  const handleSelectMesa = (idMesa) => {
    setMesaSeleccionada(idMesa);
    setVistaActual('POS');
  };

  const handleVolver = () => {
    setMesaSeleccionada(null);
    setVistaActual('MAPA');
  };

  const handleAgregarProducto = (producto) => {
    if (!mesaSeleccionada) return;

    setMesas((prev) =>
      prev.map((m) => {
        if (m.id === mesaSeleccionada) {
          const itemsExistentes = m.items || [];
          const itemIndex = itemsExistentes.findIndex((i) => i.id === producto.id);

          let nuevosItems;
          if (itemIndex >= 0) {
            nuevosItems = itemsExistentes.map((item, idx) =>
              idx === itemIndex ? { ...item, cantidad: item.cantidad + 1 } : item
            );
          } else {
            nuevosItems = [...itemsExistentes, { ...producto, cantidad: 1 }];
          }

          const nuevoTotal = m.total + producto.precio;

          return { 
            ...m,
            estado: 'ocupada',
            items: nuevosItems, 
            total: nuevoTotal 
          };
        }
        return m;
      })
    );
  };

  const handleEnviarComanda = () => {
    alert ('Comanda enviada a cocina para la mesa ' + mesaActual?.numero)
  };

  const handleCobrarMesa = (metodoPago, vuelto) => {
   if (!mesaActual || mesaActual.total === 0) return;

   const nuevaVenta = {
    id: Date.now(),
    mesaNumero: mesaActual.numero,
    items: [...mesaActual.items],
    total: mesaActual.total,
    metodoPago: metodoPago,
    vuelto: vuelto,
    hora: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
  };

  setVentasDelDia((prev) => [nuevaVenta, ...prev]);

   setMesas((prev) =>
      prev.map((m) => {
        if (m.id === mesaSeleccionada) {
          return { ...m, estado: 'libre', total: 0, items: [] };
        }
        return m;
      })
    );

    handleVolver();
  };

  return (
    <div>
      <Header />
      <main>
        {vistaActual === 'MAPA' ? (
        <MapaMesas 
          mesas={mesas} 
          onSelectMesa={handleSelectMesa}ventasDelDia={ventasDelDia} />
          ) : (
          <POSLayout 
            mesa={mesaActual} 
            onVolver={handleVolver} 
            onAgregarProducto={handleAgregarProducto} 
            onEnviarComanda={handleEnviarComanda} 
            onCobrarMesa={handleCobrarMesa} />
          )}
      </main>
    </div>
  );
}

export default App;