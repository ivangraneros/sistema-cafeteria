import { useState} from 'react'
import './ModalCobro.css'

function ModalCobro({ mesa, onClose, onConfirmarCobro }) {
    
    const [metodoPago, setMetodoPago] = useState('efectivo');
    const [montoEntregado, setMontoEntregado] = useState(mesa.total || 0);
    const [ticketEmitido, setTicketEmitido] = useState(false);

    const total = mesa.total || 0;
    const vuelto = Math.max(0, montoEntregado - total);

    const handleFinalizar = () => {
        setTicketEmitido(true);
    };

    const handleCerrarTodo = () => {
        onConfirmarCobro(metodoPago, vuelto);
    };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {!ticketEmitido ? (
          <>
            {/* CABECERA */}
            <div className="modal-header">
              <h2>Cobrar Mesa #{mesa.numero}</h2>
              <button className="btn-close" onClick={onClose}>×</button>
            </div>

            <div className="modal-body">
              {/* TOTAL A PAGAR */}
              <div className="total-destacado">
                <span>Total a Cobrar</span>
                <strong>${total.toLocaleString('es-AR')}</strong>
              </div>

              {/* MÉTODOS DE PAGO */}
              <div className="metodos-pago">
                <label className="section-label">Método de Pago</label>
                <div className="grid-metodos">
                  <button
                    className={`btn-metodo ${metodoPago === 'efectivo' ? 'activo' : ''}`}
                    onClick={() => { setMetodoPago('efectivo'); setMontoEntregado(total); }}
                  >
                    💵 Efectivo
                  </button>
                  <button
                    className={`btn-metodo ${metodoPago === 'transferencia' ? 'activo' : ''}`}
                    onClick={() => { setMetodoPago('transferencia'); setMontoEntregado(total); }}
                  >
                    📱 Transferencia / MP
                  </button>
                  <button
                    className={`btn-metodo ${metodoPago === 'tarjeta' ? 'activo' : ''}`}
                    onClick={() => { setMetodoPago('tarjeta'); setMontoEntregado(total); }}
                  >
                    💳 Tarjeta
                  </button>
                </div>
              </div>

              {/* CÁLCULO DE VUELTO (SOLO EFECTIVO) */}
              {metodoPago === 'efectivo' && (
                <div className="seccion-vuelto">
                  <div className="input-field">
                    <label>Monto recibido:</label>
                    <input
                      type="number"
                      value={montoEntregado}
                      onChange={(e) => setMontoEntregado(Number(e.target.value))}
                      onClick={(e) => e.target.select()}
                    />
                  </div>
                  <div className="vuelto-linea">
                    <span>Vuelto a entregar:</span>
                    <strong className={vuelto >= 0 ? 'vuelto-ok' : 'vuelto-error'}>
                      ${vuelto.toLocaleString('es-AR')}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            {/* BOTÓN COBRAR */}
            <div className="modal-footer">
              <button className="btn-cancelar" onClick={onClose}>
                Cancelar
              </button>
              <button
                className="btn-confirmar"
                onClick={handleFinalizar}
                disabled={metodoPago === 'efectivo' && montoEntregado < total}
              >
                Confirmar Cobro e Imprimir
              </button>
            </div>
          </>
        ) : (
          /* VISTA DE PREVIEW DEL TICKET TÉRMICO */
          <div className="modal-ticket-preview">
            <div className="ticket-papel">
              <div className="ticket-header-print">
                <h3>CAFÉ MARTÍNEZ</h3>
                <p>Sucursal Centro</p>
                <p>--------------------------------</p>
                <p>Mesa #{mesa.numero} - Ticket No Fiscal</p>
                <p>Fecha: {new Date().toLocaleDateString('es-AR')} {new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</p>
                <p>--------------------------------</p>
              </div>

              <div className="ticket-body-print">
                {mesa.items.map((item, idx) => (
                  <div key={idx} className="ticket-linea-item">
                    <span>{item.cantidad}x {item.nombre}</span>
                    <span>${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
                  </div>
                ))}
              </div>

              <div className="ticket-footer-print">
                <p>--------------------------------</p>
                <div className="ticket-total-print">
                  <strong>TOTAL:</strong>
                  <strong>${total.toLocaleString('es-AR')}</strong>
                </div>
                <p>Pago: {metodoPago.toUpperCase()}</p>
                {metodoPago === 'efectivo' && <p>Vuelto: ${vuelto.toLocaleString('es-AR')}</p>}
                <p>--------------------------------</p>
                <p className="ticket-gracias">¡Muchas gracias por su visita!</p>
              </div>
            </div>

            <div className="actions-ticket">
              <button className="btn-confirmar" onClick={handleCerrarTodo}>
                Aceptar y Liberar Mesa
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModalCobro