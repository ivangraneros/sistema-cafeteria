import { useState } from 'react';
import PRODUCTOS_INICIALES from '../../constants/productosIniciales.js';
import ModalCobro from '../ModalCobro/ModalCobro';
import './POSLayout.css';

function POSLayout({ mesa, onVolver, onAgregarProducto, onEnviarComanda, onCobrarMesa, onEliminarProducto, onPedirCuenta }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');

  const [mostrarModalCobro, setMostrarModalCobro] = useState(false);

  const categorias = ['Todos', 'Cafés', 'Pastelería', 'Salado', 'Bebidas'];

  // Filtrado dinámico por búsqueda y categoría
  const productosFiltrados = PRODUCTOS_INICIALES.filter((prod) => {
    const coincideNombre = prod.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === 'Todos' || prod.categoria === categoriaSeleccionada;
    return coincideNombre && coincideCategoria;
  });


  return (
    <div className="pos-container">
      <div className="pos-panel-productos">
        <div className="pos-top-bar">
          <button className="btn-volver" onClick={onVolver}>
            ← volver
          </button>
          <button 
              className="btn-cuenta" 
              onClick={onPedirCuenta}
              disabled={!mesa?.items || mesa.items.length === 0}>
              pedir cuenta
            </button>
          <span className="mesa-titulo">Mesa {mesa?.numero}</span>
        </div>

        
        <div className="pos-controles">
          <input
            type="text"
            placeholder="buscar productos..."
            className="input-buscador"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <div className="filtros-categorias">
            {categorias.map((cat) => (
              <button
                key={cat}
                className={`btn-filtro ${categoriaSeleccionada === cat ? 'activo' : ''}`}
                onClick={() => setCategoriaSeleccionada(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        
        <div className="grilla-productos">
          {productosFiltrados.map((prod) => (
            <div
              key={prod.id}
              className="tarjeta-producto"
              onClick={() => onAgregarProducto(prod)}
            >
              <span className="prod-nombre">{prod?.nombre}</span>
              <span className="prod-precio">${prod?.precio.toLocaleString('es-AR')}</span>
            </div>
          ))}
        </div>
      </div>

      
      <div className="pos-panel-ticket">
        <h2 className="ticket-titulo">ticket</h2>

        <div className="ticket-header-columnas">
          <span>Producto</span>
          <span>cantidad</span>
        </div>
        
        <div className="ticket-items-lista">
          {mesa && mesa.items && mesa.items.length > 0 ? (
            mesa.items.map((item, index) => (
              <div key={item.id || index} className="ticket-item">
                <button 
                  className="btn-eliminar" 
                  onClick={() => onEliminarProducto(item.id)}
                  title="Eliminar producto">
                  ✕
                </button>
                <span className="item-nombre">{item.nombre}</span>
                <span className="item-cantidad">x{item.cantidad || 1}</span>
              </div>
            ))
          ) : (
            <p className="ticket-vacio">Sin consumos cargados</p>
          )}
        </div>
        
        <div className="ticket-footer">
          <div className="ticket-total-linea">
            <span>total:</span>
            <strong>${mesa?.total ? mesa.total.toLocaleString('es-AR') : 0}</strong>
          </div>

          <div className="ticket-acciones">
            <button className="btn-comanda" onClick={onEnviarComanda}>
              enviar comanda
            </button>
            <button className="btn-cobrar" 
            onClick={() => setMostrarModalCobro(true)}
            disabled={!mesa?.items || mesa.items.length === 0}> 
              cobrar mesa
            </button>
          </div>
        </div>
      </div>
      {mostrarModalCobro && (
      <ModalCobro 
        mesa={mesa}
        onClose={() => setMostrarModalCobro(false)}
        onConfirmarCobro={(metodoPago, vuelto) => {
          setMostrarModalCobro(false);
          onCobrarMesa(metodoPago, vuelto);
        }}
        />
      )}
    </div>
  );
};

export default POSLayout;