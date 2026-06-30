// src/Componentes/itemCarrito.jsx
import React from 'react';

function ItemCarrito({ item, cambiarCantidad, eliminarProducto }) {
    // Función auxiliar para desplegar los precios en pesos chilenos de forma óptima
    const formatearPrecio = (valor) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
    };

    return (
        <div className="d-flex align-items-center justify-content-between p-2 mb-2 bg-secondary bg-opacity-10 border border-secondary rounded text-white">
            <div className="flex-grow-1 me-2">
                {/* Nombre y precio unitario */}
                <span className="d-block small fw-bold text-info text-truncate" style={{ maxWidth: '180px' }}>
                    {item.nombre}
                </span>
                <span className="text-warning small fw-semibold">
                    {formatearPrecio(item.precio)}
                </span>
            </div>

            {/* Controles de volumen de stock (Cantidades) */}
            <div className="d-flex align-items-center gap-1 me-2">
                <button
                    className="btn btn-xs btn-outline-light px-2 py-0"
                    onClick={() => cambiarCantidad(item.id, -1)}
                    disabled={item.cantidad <= 1}
                >
                    -
                </button>
                <span className="badge bg-dark px-2 border border-secondary text-white" style={{ fontSize: '0.8rem' }}>
                    {item.cantidad}
                </span>
                <button
                    className="btn btn-xs btn-outline-light px-2 py-0"
                    onClick={() => cambiarCantidad(item.id, 1)}
                >
                    +
                </button>
            </div>

            {/* Botón de remoción inmediata */}
            <button
                className="btn btn-sm btn-outline-danger border-0 py-1 px-2"
                onClick={() => eliminarProducto(item.id)}
                title="Eliminar del carrito"
            >
                🗑️
            </button>
        </div>
    );
}

export default ItemCarrito;