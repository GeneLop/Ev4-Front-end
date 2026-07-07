import React, { useState } from 'react';

function Producto({ p, onAgregar, formatearPrecio }) {
    const [verTecnico, setVerTecnico] = useState(false);

    const precioOriginal = p.precio;
    const precioOfertaCyber = Math.round(p.precio * 0.7);

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 position-relative overflow-hidden"
                style={{
                    backgroundColor: '#2c313a',
                    border: '1px solid #444',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    borderRadius: '15px'
                }}>

                <div className="text-center bg-black" style={{ height: '220px', width: '100%' }}>
                    <img
                        src={p.imagen}
                        className="w-100 h-100 object-fit-cover"
                        alt={p.nombre}
                    />
                </div>

                <div className="card-body d-flex flex-column justify-content-between p-4">
                    <div>
                        <h5 className="h6 text-info fw-bold text-uppercase">{p.nombre}</h5>
                        <div className="d-flex align-items-center gap-2 my-2 flex-wrap">
                            <span className="text-white-50 text-decoration-line-through fw-semibold" style={{ letterSpacing: '0.5px' }}>
                                {formatearPrecio(precioOriginal)}
                            </span>
                            <p className="text-warning fw-semibold m-0" style={{ letterSpacing: '0.5px' }}>
                                {formatearPrecio(precioOfertaCyber)}
                            </p>
                            <span className="badge bg-danger bg-opacity-75 font-monospace" style={{ fontSize: '9px', padding: '3px 5px' }}>
                                CYBER
                            </span>
                        </div>
                        <p className="text-white small" style={{ whiteSpace: 'pre-line' }}>
                            {p.descripcion.split('\n\n')[0]}
                        </p>
                    </div>

                    <div className="mt-3">
                        <button type="button" className="btn btn-sm btn-outline-info w-100 fw-bold text-uppercase mb-2"
                            onClick={() => setVerTecnico(true)}>
                            Ver ficha técnica
                        </button>
                        <button type="button" className="btn btn-sm btn-info w-100 fw-bold text-uppercase text-dark"
                            onClick={() => onAgregar({ ...p, precio: precioOfertaCyber })}>
                            Añadir al carrito
                        </button>
                    </div>
                </div>

                {verTecnico && (
                    <div className="position-absolute p-4 text-white border border-info"
                        style={{
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(44, 49, 58, 0.92)',
                            backdropFilter: 'blur(2px)',
                            zIndex: '10',
                            overflowY: 'auto'
                        }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-info text-uppercase fw-bold m-0">Especificaciones</h6>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => setVerTecnico(false)}><i className="bi bi-x-lg"></i></button>
                        </div>
                        <div className="small" style={{ whiteSpace: 'pre-line' }}>
                            {p.descripcion.split('\n\n').slice(1).join('\n\n')}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Producto;