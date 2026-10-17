import { useState} from 'react'
import './HistorialVentas.css'

function HistorialVentas({ ventas }) {

  const [modalAbierto, setModalAbierto] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const totalGeneral = ventas.reduce((acc, v) => acc + v.total, 0);


  return (
    <>
      {/* BARRA INFERIOR / BOTÓN FIJO */}
      <div className="historial-bar-bottom">
        <div className="historial-info-resumen">
          <span className="badge-ventas">{ventas.length} tickets hoy</span>
          <span className="total-resumen">
            Total: <strong>${totalGeneral.toLocaleString('es-AR')}</strong>
          </span>
        </div>
        <button
          className="btn-abrir-historial"
          onClick={() => setModalAbierto(true)}
        >
          Ver Historial de Ventas
        </button>
      </div>

      {/* MODAL / PESTAÑA CON TODOS LOS TICKETS */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
          <div className="modal-historial-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-historial-header">
              <div>
                <h2>Historial de Ventas del Día</h2>
                <span className="subtitulo-historial">
                  {ventas.length} ventas registradas | Acumulado: ${totalGeneral.toLocaleString('es-AR')}
                </span>
              </div>
              <button className="btn-close-modal" onClick={() => setModalAbierto(false)}>
                ×
              </button>
            </div>

            {/* LISTA COMPLETA DE TICKETS */}
            <div className="modal-historial-body">
              {ventas.length === 0 ? (
                <p className="historial-vacio">Aún no se registraron ventas en este turno.</p>
              ) : (
                <div className="grid-tickets-historial">
                  {ventas.map((venta) => (
                    <div
                      key={venta.id}
                      className="ticket-resumen-card"
                      onClick={() => setVentaSeleccionada(venta)}
                    >
                      <div className="ticket-card-top">
                        <span className="card-mesa">Mesa #{venta.mesaNumero}</span>
                        <span className="card-hora">{venta.hora}</span>
                      </div>
                      <div className="card-body">
                        <span className="card-monto">${venta.total.toLocaleString('es-AR')}</span>
                        <span className="card-pago">({venta.metodoPago})</span>
                      </div>
                      <span className="card-ver-detalles">Ver consumos</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DETALLE DE UN TICKET ESPECÍFICO */}
      {ventaSeleccionada && (
        <div className="modal-overlay z-top" onClick={() => setVentaSeleccionada(null)}>
          <div className="modal-detalle" onClick={(e) => e.stopPropagation()}>
            <div className="modal-detalle-header">
              <h3>Detalle Ticket - Mesa #{ventaSeleccionada.mesaNumero}</h3>
              <button onClick={() => setVentaSeleccionada(null)}>×</button>
            </div>
            <p className="modal-detalle-hora">Hora de cobro: {ventaSeleccionada.hora} hs</p>

            <div className="modal-detalle-items">
              {ventaSeleccionada.items?.map((item, idx) => (
                <div key={idx} className="detalle-item-row">
                  <span>{item.cantidad}x {item.nombre}</span>
                  <span>${((item.precio || 0) * item.cantidad).toLocaleString('es-AR')}</span>
                </div>
              ))}
            </div>

            <div className="modal-detalle-footer">
              <div className="detalle-total">
                <span>Total ({ventaSeleccionada.metodoPago?.toUpperCase()}):</span>
                <strong>${ventaSeleccionada.total?.toLocaleString('es-AR')}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistorialVentas