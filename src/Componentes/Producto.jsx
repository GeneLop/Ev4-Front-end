// src/Componentes/Producto.jsx
import React from 'react';

function Producto({ p, onAgregar, formatearPrecio }) {
    // El precio digitado en el panel es el precio original.
    // El precio Cyber real de oferta se calcula restándole un 30% de descuento.
    const precioOriginal = p.precio;
    const precioOfertaCyber = Math.round(p.precio * 0.7);

    return (
        <div className="col-md-4 mb-4">
            <div className="card bg-dark border-secondary h-100 text-white shadow-sm overflow-hidden">

                {/* 🌟 CORREGIDO: Contenedor con fondo negro puro (bg-black) para ocultar bordes feos */}
                <div
                    className="text-center d-flex align-items-center justify-content-center bg-black"
                    style={{ height: '220px', width: '100%' }}
                >
                    {/* 🌟 CORREGIDO: object-fit-cover para que cualquier imagen por defecto llene el espacio de forma limpia */}
                    <img
                        src={p.imagen}
                        className="w-100 h-100 object-fit-cover"
                        alt={p.nombre}
                    />
                </div>

                <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 className="card-title h6 text-info fw-bold text-uppercase">{p.nombre}</h5>

                        {/* SECCIÓN DE PRECIOS */}
                        <div className="d-flex align-items-center gap-2 my-2 flex-wrap">

                            {/* PRECIO ORIGINAL (ANTES) */}
                            <span className="text-white-50 text-decoration-line-through fw-semibold" style={{ letterSpacing: '0.5px' }}>
                                {formatearPrecio(precioOriginal)}
                            </span>

                            {/* PRECIO NUEVO DE OFERTA (AHORA) */}
                            <p className="text-warning fw-semibold m-0" style={{ letterSpacing: '0.5px' }}>
                                {formatearPrecio(precioOfertaCyber)}
                            </p>

                            {/* Insignia Cyber */}
                            <span className="badge bg-danger bg-opacity-75 font-monospace" style={{ fontSize: '9px', padding: '3px 5px' }}>
                                CYBER
                            </span>
                        </div>

                        <p className="card-text text-white small" style={{ whiteSpace: 'pre-line' }}>
                            {p.descripcion}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="btn btn-sm btn-outline-info w-100 fw-bold text-uppercase mt-3"
                        onClick={() => onAgregar({ ...p, precio: precioOfertaCyber })}
                    >
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Producto;