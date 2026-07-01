// src/Componentes/Producto.jsx
import React from 'react';

function Producto({ p, onAgregar, formatearPrecio }) {
    // Detectamos si el producto pertenece a la categoría de telescopios
    const esTelescopio = p.categoria === 'telescopios';

    // Calculamos el precio antiguo (un 30% más alto)
    const precioAntes = Math.round(p.precio * 1.3);

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

                        {/* SECCIÓN DE PRECIOS DEL MISMO TAMAÑO Y MÁXIMA VISIBILIDAD */}
                        <div className="d-flex align-items-center gap-2 my-2 flex-wrap">

                            {/* PRECIO ANTIGUO: En blanco semitransparente para que sea legible en fondo oscuro */}
                            <span className="text-white-50 text-decoration-line-through fw-semibold" style={{ letterSpacing: '0.5px' }}>
                                {formatearPrecio(precioAntes)}
                            </span>

                            {/* PRECIO NUEVO: Mismo tamaño que el anterior, respetando tu estilo amarillo original */}
                            <p className="text-warning fw-semibold m-0" style={{ letterSpacing: '0.5px' }}>
                                {formatearPrecio(p.precio)}
                            </p>

                            {/* Insignia Cyber discreta */}
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