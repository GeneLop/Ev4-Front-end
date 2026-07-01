// src/Paginas/Inicio.jsx
import React, { useState } from 'react';
import Banner from '../Componentes/Banner';
import Producto from '../Componentes/Producto';

function Inicio({
    productosTelescopios,
    productosCursos,
    productosExperiencias,
    agregarProducto,
    formatearPrecio // 🌟 RECIBIMOS LA FUNCIÓN DE DIVISAS GLOBAL DESDE APP.JSX
}) {
    const [filtroCategoria, setFiltroCategoria] = useState('todo');

    return (
        <div className="bg-dark min-h-screen text-white">
            <Banner />

            {/* Carrusel Automático Corregido con data-bs-ride */}
            <div id="carruselAstronomia" className="carousel slide shadow-lg border-bottom border-info" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carruselAstronomia" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#carruselAstronomia" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#carruselAstronomia" data-bs-slide-to="2"></button>
                </div>

                <div className="carousel-inner" style={{ maxHeight: '400px' }}>
                    <div className="carousel-item active" data-bs-interval="4000">
                        <img src="imagenes/carrusel1.jpg" className="d-block w-100 object-fit-cover" alt="Telescopios" style={{ height: '400px', filter: 'brightness(55%)' }} />
                        <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3 mb-4">
                            <h5 className="text-info fw-bold text-uppercase">Instrumentación de Alta Precision</h5>
                            <p className="small m-0">Explora el cosmos con nuestra línea oficial de telescopios.</p>
                        </div>
                    </div>

                    <div className="carousel-item" data-bs-interval="4000">
                        <div className="d-flex align-items-center justify-content-center text-white w-100"
                            style={{
                                height: '400px',
                                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("/imagenes/semana.avif")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderTop: '1px solid #0dcaf0'
                            }}>

                            <div className="text-center p-4 position-relative" style={{ zIndex: 2 }}>
                                {/* 🌟 CORREGIDO: Frase superior cambiada a blanco puro (text-white) */}
                                <p className="text-uppercase fw-bold text-white mb-2" style={{ letterSpacing: '1px', fontSize: '0.9rem', opacity: 0.9 }}>
                                    Promoción Exclusiva
                                </p>

                                {/* Título original intacto */}
                                <h2 className="display-3 fw-bold text-uppercase m-0 text-warning"
                                    style={{
                                        textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9)',
                                        letterSpacing: '2px'
                                    }}>
                                    Cyber Space Week
                                </h2>

                                {/* Párrafo central intacto */}
                                <p className="fs-6 mt-3 text-white bg-dark bg-opacity-50 rounded py-2 px-4 mx-auto"
                                    style={{
                                        maxWidth: '650px',
                                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)'
                                    }}>
                                    Válido desde el 8 hasta el 15 de julio. Ingresa tu RUT al finalizar tu compra y acumula un 1% en Puntos Espaciales para canjear en nuestro catálogo.
                                </p>

                                {/* 🌟 CORREGIDO: Frase inferior cambiada a blanco puro (text-white) */}
                                <p className="text-white text-uppercase fw-semibold mt-2 mb-0" style={{ letterSpacing: '1px', fontSize: '0.85rem', opacity: 0.8 }}>
                                    Por tiempo limitado
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="carousel-item" data-bs-interval="4000">
                        <img src="imagenes/kit.jpg" className="d-block w-100 object-fit-cover" alt="Astroturismo" style={{ height: '400px', filter: 'brightness(55%)' }} />
                        <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3 mb-4">
                            <h5 className="text-info fw-bold text-uppercase">MATERIAL DIDÁCTICO Y MODELOS</h5>
                            <p className="small m-0">Aprende ingeniería espacial y óptica con maquetas mecánicas y robótica avanzada.</p>
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carruselAstronomia" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carruselAstronomia" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>

            {/* Colapsable Informativo */}
            {/* Colapsable Informativo */}
            <div className="container mt-4">
                <button className="btn btn-sm btn-outline-info w-100 fw-bold text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#infoDespachoAstronomia">
                    ¿Por qué elegir AstroShop? Conoce nuestros beneficios
                </button>
                <div className="collapse mt-2" id="infoDespachoAstronomia">
                    <div className="card card-body bg-secondary bg-opacity-25 border-secondary text-white small">
                        <p className="m-1"><strong>Envíos a todo Chile:</strong> Despachos rápidos y asegurados con embalaje especial para el cuidado de piezas delicadas.</p>
                        <p className="m-1"><strong>Compra Segura:</strong> Transacciones protegidas y facilidades de pago en cuotas con cualquier tarjeta de crédito o débito.</p>
                        <p className="m-1"><strong>Garantía de Satisfacción:</strong> Soporte técnico dedicado y acompañamiento en tus primeros pasos en la astronomía.</p>
                    </div>
                </div>
            </div>

            {/* Catálogo en Ancho Completo con ID de anclaje */}
            <main className="container py-5" id="carta-productos">
                <div className="text-center mb-5">
                    <h2 className="display-6 fw-bold text-uppercase m-0">Nuestro Catálogo</h2>
                    <div className="bg-info mx-auto mt-2" style={{ width: '80px', height: '4px' }}></div>
                </div>

                {/* Botonera de Filtros Limpia */}
                <div className="d-flex justify-content-center flex-wrap mb-5 gap-2">
                    <button className={`btn btn-sm ${filtroCategoria === 'todo' ? 'btn-info text-dark fw-bold' : 'btn-outline-light'}`} onClick={() => setFiltroCategoria('todo')}>Todo</button>
                    <button className={`btn btn-sm ${filtroCategoria === 'telescopios' ? 'btn-info text-dark fw-bold' : 'btn-outline-light'}`} onClick={() => setFiltroCategoria('telescopios')}>Telescopios</button>
                    <button className={`btn btn-sm ${filtroCategoria === 'cursos' ? 'btn-info text-dark fw-bold' : 'btn-outline-light'}`} onClick={() => setFiltroCategoria('cursos')}>Cursos Virtuales</button>
                    <button className={`btn btn-sm ${filtroCategoria === 'experiencias' ? 'btn-info text-dark fw-bold' : 'btn-outline-light'}`} onClick={() => setFiltroCategoria('experiencias')}>Experiencias</button>
                </div>

                <div className="row">
                    {(filtroCategoria === 'todo' || filtroCategoria === 'telescopios') && (
                        <>
                            <div className="col-12"><h4 className="text-info border-bottom border-secondary pb-2 mb-4 text-uppercase fw-bold fs-5">Telescopios e Instrumentación</h4></div>
                            {productosTelescopios.map((prod) => (
                                <Producto key={prod.id} p={prod} onAgregar={agregarProducto} formatearPrecio={formatearPrecio} />
                            ))}
                        </>
                    )}

                    {(filtroCategoria === 'todo' || filtroCategoria === 'cursos') && (
                        <>
                            <div className="col-12 mt-4"><h4 className="text-info border-bottom border-secondary pb-2 mb-4 text-uppercase fw-bold fs-5">Cursos y Capacitaciones</h4></div>
                            {productosCursos.map((prod) => (
                                <Producto key={prod.id} p={prod} onAgregar={agregarProducto} formatearPrecio={formatearPrecio} />
                            ))}
                        </>
                    )}

                    {(filtroCategoria === 'todo' || filtroCategoria === 'experiencias') && (
                        <>
                            <div className="col-12 mt-4"><h4 className="text-info border-bottom border-secondary pb-2 mb-4 text-uppercase fw-bold fs-5">MATERIAL DIDÁCTICO Y MODELOS</h4></div>
                            {productosExperiencias.map((prod) => (
                                <Producto key={prod.id} p={prod} onAgregar={agregarProducto} formatearPrecio={formatearPrecio} />
                            ))}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Inicio;