// src/Paginas/Contacto.jsx
import React, { useState, useEffect } from 'react';

function Contacto() {
    // Estados para el formulario de contacto
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [mensaje, setMensaje] = useState('');

    // Estados para validación interactiva
    const [errorCorreo, setErrorCorreo] = useState('');
    const [formularioValido, setFormularioValido] = useState(false);

    // Filtro interactivo para evitar que escriban números o símbolos en el nombre
    const handleNombreChange = (e) => {
        const input = e.target.value;
        const textoLimpio = input.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        setNombre(textoLimpio);
    };

    // Escucha en tiempo real para validar todo el formulario antes de activar el botón
    useEffect(() => {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (correo.trim() === '') {
            setErrorCorreo('');
            setFormularioValido(false);
        } else if (!regexCorreo.test(correo)) {
            setErrorCorreo('Formato de correo inválido.');
            setFormularioValido(false);
        } else {
            setErrorCorreo('Correo válido.');
            if (nombre.trim() !== '' && mensaje.trim() !== '') {
                setFormularioValido(true);
            } else {
                setFormularioValido(false);
            }
        }
    }, [nombre, correo, mensaje]);

    const handleEnviar = (e) => {
        e.preventDefault();
        if (formularioValido) {
            alert(`Consulta Recibida\n\nMuchas gracias ${nombre}. Nos pondremos en contacto al correo: ${correo} a la brevedad.`);
            setNombre('');
            setCorreo('');
            setMensaje('');
        }
    };

    return (
        <div className="container py-5 text-white animate-fade-in">
            {/* 1. ENCABEZADO PRINCIPAL (Estilo libre y asimétrico igual a Nosotros) */}
            <div className="row align-items-center mb-5 pb-5 border-bottom border-secondary border-opacity-25">
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <h2 className="text-info text-uppercase fw-black display-4 mb-0" style={{ letterSpacing: '-1px', lineHeight: '1.1' }}>
                        Canales de<br />Contacto
                    </h2>
                    <div className="bg-info mt-3" style={{ height: '4px', width: '50px' }}></div>
                </div>
                <div className="col-lg-8 ps-lg-5">
                    <p className="fs-5 text-white-50 m-0 lh-base" style={{ fontWeight: '300' }}>
                        ¿Tienes dudas sobre la compatibilidad de un equipo, la disponibilidad técnica o el acceso a los cursos virtuales? Puedes enviarnos unmensaje o ubicarnos directamente en nuestra oficina central en la Región de Magallanes.
                    </p>
                </div>
            </div>

            {/* Distribución de Paneles Estilo Control Técnico */}
            <div className="row g-4 align-items-stretch">

                {/* COLUMNA 1: FORMULARIO DE ENTRADA DE DATOS */}
                <div className="col-lg-5">
                    <div className="p-4 rounded-4 h-100 shadow-lg" style={{ backgroundColor: '#1a1d20', borderLeft: '4px solid #0dcaf0' }}>
                        <h3 className="h5 text-white text-uppercase fw-bold mb-4" style={{ letterSpacing: '0.5px' }}>Formulario de Requerimiento</h3>

                        <form onSubmit={handleEnviar}>
                            <div className="mb-3">
                                <label className="form-label text-white-50 small text-uppercase fw-semibold" style={{ fontSize: '11px' }}>Nombre Completo</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white border-secondary p-2 small font-monospace"
                                    placeholder="Ej: Carlos Astroza"
                                    value={nombre}
                                    onChange={handleNombreChange}
                                    required
                                    style={{ fontSize: '13px' }}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-white-50 small text-uppercase fw-semibold" style={{ fontSize: '11px' }}>Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="form-control bg-dark text-white border-secondary p-2 small font-monospace"
                                    placeholder="ejemplo@correo.cl"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    required
                                    style={{ fontSize: '13px' }}
                                />
                                {errorCorreo && (
                                    <div className="mt-1 fw-semibold font-monospace" style={{ fontSize: '11px', color: errorCorreo.includes('inválido') ? '#ff6b6b' : '#51cf66' }}>
                                        {errorCorreo}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="form-label text-white-50 small text-uppercase fw-semibold" style={{ fontSize: '11px' }}>Mensaje o Detalle Técnico</label>
                                <textarea
                                    className="form-control bg-dark text-white border-secondary p-2 small font-monospace"
                                    rows="5"
                                    placeholder="Detalla las especificaciones de tu consulta..."
                                    value={mensaje}
                                    onChange={(e) => setMensaje(e.target.value)}
                                    required
                                    style={{ fontSize: '13px', resize: 'none' }}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={`btn w-100 fw-bold text-uppercase py-2 ${formularioValido ? 'btn-info text-dark' : 'btn-secondary text-muted'}`}
                                disabled={!formularioValido}
                                style={{ letterSpacing: '1px', fontSize: '12px' }}
                            >
                                Procesar Envío
                            </button>
                        </form>
                    </div>
                </div>

                {/* COLUMNA 2: INFORMACIÓN Y MAPA INTEGRADO */}
                <div className="col-lg-7 d-flex flex-column gap-4">

                    {/* Fila superior con Información (Estilo Panel de Control) */}
                    <div className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: '#1a1d20', borderLeft: '4px solid #0dcaf0' }}>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <div className="text-warning text-uppercase fw-bold mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Teléfono de Soporte</div>
                                <div className="text-white fw-bold font-monospace fs-5">+56 61 220 4000</div>
                            </div>
                            <div className="col-sm-6 border-start border-secondary border-opacity-25 ps-sm-4">
                                <div className="text-warning text-uppercase fw-bold mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Oficina Central</div>
                                <div className="text-white small fw-semibold font-monospace">Av. España 1230, Punta Arenas</div>
                            </div>
                        </div>
                    </div>

                    {/* Contenedor del Mapa (Ajustado con la estética de contenedor oscuro) */}
                    <div className="flex-grow-1 rounded-4 overflow-hidden shadow-lg d-flex flex-column" style={{ backgroundColor: '#1a1d20', borderLeft: '4px solid #0dcaf0', minHeight: '300px' }}>
                        <iframe
                            title="Mapa Base Punta Arenas con Marcador"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=-70.88413774967195%2C-53.13273051062996%2C-70.87705671787263%2C-53.12986599112521&amp;layer=mapnik&amp;marker=-53.13129827474737%2C-70.88059723377228"
                            width="100%"
                            height="100%"
                            style={{ border: 0, flexGrow: 1, filter: 'grayscale(100%) invert(92%) contrast(100%)' }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                        <div className="p-2 text-center border-top border-secondary border-opacity-25" style={{ backgroundColor: '#111315' }}>
                            <a
                                href="https://www.openstreetmap.org/?mlat=-53.131298&amp;mlon=-70.880597#map=18/-53.131298/-70.880597"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-info small text-decoration-underline font-monospace fw-bold"
                                style={{ fontSize: '10px', letterSpacing: '0.5px' }}
                            >
                                VER MAPA EN PANTALLA COMPLETA
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Contacto;