// src/Componentes/Producto.jsx
import React from 'react';

function Producto({ p, onAgregar, formatearPrecio }) {
    // Detectamos si el producto pertenece a la categoría de telescopios
    const esTelescopio = p.categoria === 'telescopios';

    return (
        <div className="col-md-4 mb-4">
            <div className="card bg-dark border-secondary h-100 text-white shadow-sm overflow-hidden">

                {/* Contenedor de la imagen */}
                <div
                    className={`text-center d-flex align-items-center justify-content-center ${esTelescopio ? 'bg-white p-2' : 'bg-secondary bg-opacity-10'
                        }`}
                    style={{ height: '220px', width: '100%' }}
                >
                    <img
                        src={p.imagen}
                        className={`w-100 h-100 ${esTelescopio ? 'object-fit-contain' : 'object-fit-cover'}`}
                        alt={p.nombre}
                    />
                </div>

                <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 className="card-title h6 text-info fw-bold text-uppercase">{p.nombre}</h5>

                        {/* 🌟 CORREGIDO: Eliminado 'font-monospace' y ajustado a un estilo comercial fluido */}
                        <p className="text-warning fw-semibold fs-5 my-2" style={{ letterSpacing: '0.5px' }}>
                            {formatearPrecio(p.precio)}
                        </p>

                        <p className="card-text text-white-50 small" style={{ whiteSpace: 'pre-line' }}>
                            {p.descripcion}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="btn btn-sm btn-outline-info w-100 fw-bold text-uppercase mt-3"
                        onClick={() => onAgregar(p)}
                    >
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Producto;