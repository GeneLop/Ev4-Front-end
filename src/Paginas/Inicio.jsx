// src/Paginas/Inicio.jsx
import React, { useState, useEffect } from 'react';
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

    // Estados para la foto del día de la NASA
    const [fotoNasa, setFotoNasa] = useState(null);
    const [cargandoNasa, setCargandoNasa] = useState(true);

    // Llamada automática a la API pública de la NASA (APOD)
    useEffect(() => {
        fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
            .then((res) => res.json())
            .then((data) => {
                setFotoNasa(data);
                setCargandoNasa(false);
            })
            .catch((err) => {
                console.error("Error cargando API de NASA:", err);
                setCargandoNasa(false);
            });
    }, []);

    // Tomamos solo dos productos de referencia para el panel compacto
    const favoritosComunidad = [
        ...productosTelescopios.slice(0, 1),
        ...productosCursos.slice(0, 1)
    ];

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
                                <p className="text-uppercase fw-bold text-white mb-2" style={{ letterSpacing: '1px', fontSize: '0.9rem', opacity: 0.9 }}>
                                    Promoción Exclusiva
                                </p>

                                <h2 className="display-3 fw-bold text-uppercase m-0 text-warning"
                                    style={{
                                        textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9)',
                                        letterSpacing: '2px'
                                    }}>
                                    Cyber Space Week
                                </h2>

                                <p className="fs-6 mt-3 text-white bg-dark bg-opacity-50 rounded py-2 px-4 mx-auto"
                                    style={{
                                        maxWidth: '650px',
                                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)'
                                    }}>
                                    Válido desde el 8 hasta el 15 de julio. Ingresa tu RUT al finalizar tu compra y acumula un 1% en Puntos Espaciales para canjear en nuestro catálogo.
                                </p>

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

            {/* Colapsable Informativo Original */}
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

            {/* LOS MÁS VALORADOS CON ENLACES INTELIGENTES */}
            {filtroCategoria === 'todo' && favoritosComunidad.length > 0 && (
                <div className="container mt-5">
                    <div className="p-4 rounded-4 shadow-lg border border-info border-opacity-25"
                        style={{
                            background: 'linear-gradient(135deg, #1a1d20 0%, rgba(13, 202, 240, 0.08) 100%)',
                            borderLeft: '5px solid #0dcaf0 !important'
                        }}>
                        <div className="row align-items-center g-3">
                            <div className="col-md-3 text-center text-md-start ps-md-4">
                                <span className="text-info text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1.5px' }}>Recomendado</span>
                                <h5 className="text-white fw-black mb-0" style={{ fontSize: '18px', letterSpacing: '-0.5px' }}>Lo Más Destacado</h5>
                            </div>
                            <div className="col-md-9">
                                <div className="row g-2 me-md-2">
                                    {favoritosComunidad.map((prod) => {
                                        const esCurso = productosCursos.some(c => c.id === prod.id);
                                        const destinoAnclaje = esCurso ? "#seccion-cursos" : "#seccion-telescopios";

                                        return (
                                            <div key={`fav-mini-${prod.id}`} className="col-sm-6">
                                                <div className="p-2 rounded-3 d-flex align-items-center justify-content-between bg-black border border-info border-opacity-10 shadow-sm">
                                                    <div className="d-flex align-items-center gap-2 overflow-hidden flex-grow-1">
                                                        <img src={prod.imagen || 'imagenes/carrusel1.jpg'} alt="" className="rounded border border-secondary border-opacity-25 object-fit-cover" style={{ width: '45px', height: '45px', flexShrink: 0 }} />
                                                        <div className="text-truncate pe-2">
                                                            <div className="text-white fw-bold small text-truncate">{prod.nombre}</div>
                                                            <div className="text-info small fw-bold">{formatearPrecio(prod.precio)}</div>
                                                        </div>
                                                    </div>
                                                    <a
                                                        href={destinoAnclaje}
                                                        className="btn btn-sm btn-info fw-bold px-3 py-1 text-dark text-uppercase"
                                                        style={{ fontSize: '11px', letterSpacing: '0.5px', flexShrink: 0 }}
                                                        onClick={(e) => {
                                                            e.preventDefault(); // evita pantalla blanca del router

                                                            const el = document.querySelector(destinoAnclaje);
                                                            if (el) {
                                                                el.scrollIntoView({ behavior: 'smooth' });
                                                            }
                                                        }}
                                                    >
                                                        Ver
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Catálogo en Ancho Completo */}
            <main className="container py-5" id="carta-productos">
                <div className="text-center mb-5">
                    <h2 className="display-6 fw-bold text-uppercase m-0">Nuestro Catálogo</h2>
                    <div className="bg-info mx-auto mt-2" style={{ width: '80px', height: '4px' }}></div>
                </div>

                {/* Botonera de Filtros Limpia */}
                <div className="d-flex justify-content-center flex-wrap mb-5 gap-2">
                    <button className={`btn btn-sm ${filtroCategoria === 'todo' ? 'btn-info text-dark' : 'btn-outline-light'}`} onClick={() => setFiltroCategoria('todo')}>Todo</button>
                    <button className={`btn btn-sm ${filtroCategoria === 'telescopios' ? 'btn-info text-dark' : 'btn-outline-light'}`} onClick={() => setFiltroCategoria('telescopios')}>Telescopios</button>
                    <button className={`btn btn-sm ${filtroCategoria === 'cursos' ? 'btn-info text-dark' : 'btn-outline-light'}`} onClick={() => setFiltroCategoria('cursos')}>Cursos Virtuales</button>
                    <button className={`btn btn-sm ${filtroCategoria === 'experiencias' ? 'btn-info text-dark' : 'btn-outline-light'}`} onClick={() => setFiltroCategoria('experiencias')}>Experiencias</button>
                </div>

                <div className="row">
                    {(filtroCategoria === 'todo' || filtroCategoria === 'telescopios') && (
                        <>
                            <div className="col-12" id="seccion-telescopios">
                                <h4 className="text-info border-bottom border-secondary pb-2 mb-4 text-uppercase fw-bold fs-5">Telescopios e Instrumentación</h4>
                            </div>
                            {productosTelescopios.map((prod) => (
                                <Producto key={prod.id} p={prod} onAgregar={agregarProducto} formatearPrecio={formatearPrecio} />
                            ))}
                        </>
                    )}

                    {(filtroCategoria === 'todo' || filtroCategoria === 'cursos') && (
                        <>
                            <div className="col-12 mt-4" id="seccion-cursos">
                                <h4 className="text-info border-bottom border-secondary pb-2 mb-4 text-uppercase fw-bold fs-5">Cursos y Capacitaciones</h4>
                            </div>
                            {productosCursos.map((prod) => (
                                <Producto key={prod.id} p={prod} onAgregar={agregarProducto} formatearPrecio={formatearPrecio} />
                            ))}
                        </>
                    )}

                    {(filtroCategoria === 'todo' || filtroCategoria === 'experiencias') && (
                        <>
                            <div className="col-12 mt-4">
                                <h4 className="text-info border-bottom border-secondary pb-2 mb-4 text-uppercase fw-bold fs-5">MATERIAL DIDÁCTICO Y MODELOS</h4>
                            </div>
                            {productosExperiencias.map((prod) => (
                                <Producto key={prod.id} p={prod} onAgregar={agregarProducto} formatearPrecio={formatearPrecio} />
                            ))}
                        </>
                    )}
                </div>
            </main>

            {/* MÓDULO DE CIERRE: FOTO DEL DIA NASA */}
            {filtroCategoria === 'todo' && (
                <section className="container pb-5 mb-3 border-top border-secondary border-opacity-25 pt-5">
                    {/* 🌟 TITULOS CORREGIDOS: Estructura de texto limpia, natural y nivelada proporcionalmente */}
                    <div className="mb-4 ps-2">
                        <span className="text-info text-uppercase fw-bold fs-5 d-block" style={{ letterSpacing: '0.5px' }}>
                            NASA
                        </span>
                        <h3 className="text-white fw-bold fs-4 m-0 mt-1">
                            Foto astronómica del día
                        </h3>
                    </div>

                    <div className="p-4 rounded-4 shadow-lg border border-secondary border-opacity-25" style={{ backgroundColor: '#141619' }}>
                        {cargandoNasa ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-info mb-2" role="status"></div>
                                <div className="text-white-50 small">Conectando con el servidor...</div>
                            </div>
                        ) : fotoNasa ? (
                            <div className="row g-4 align-items-center">
                                <div className="col-md-5">
                                    <div className="rounded-3 overflow-hidden border border-secondary border-opacity-25 bg-dark shadow-sm">
                                        {fotoNasa.media_type === 'image' ? (
                                            <img
                                                src={fotoNasa.url}
                                                alt={fotoNasa.title}
                                                className="img-fluid d-block w-100 object-fit-cover"
                                                style={{ maxHeight: '250px' }}
                                            />
                                        ) : (
                                            <iframe
                                                title={fotoNasa.title}
                                                src={fotoNasa.url}
                                                width="100%"
                                                height="200px"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                            ></iframe>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-7 ps-md-4">
                                    <span className="badge bg-info text-dark rounded-1 uppercase fw-bold mb-2" style={{ fontSize: '9px', letterSpacing: '0.5px' }}>
                                        NASA APOD // {fotoNasa.date}
                                    </span>
                                    <h4 className="text-white fw-bold mb-2 fs-5" style={{ letterSpacing: '-0.2px' }}>{fotoNasa.title}</h4>
                                    <p className="text-white-50 m-0 lh-base" style={{ fontSize: '12.5px', textAlign: 'justify' }}>
                                        {fotoNasa.explanation ? fotoNasa.explanation.slice(0, 240) + '...' : 'Cargando detalles de la captura.'}
                                    </p>
                                    {fotoNasa.copyright && (
                                        <div className="mt-2 text-warning small fw-semibold" style={{ fontSize: '11px' }}>
                                            Créditos: {fotoNasa.copyright}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-3 text-danger small">
                                No se pudo cargar la imagen de hoy. Reintente más tarde.
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}

export default Inicio;