// src/Paginas/Contacto.jsx
import React, { useState, useEffect } from 'react';

function Contacto() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [errorCorreo, setErrorCorreo] = useState('');
    const [formularioValido, setFormularioValido] = useState(false);

    const handleNombreChange = (e) => {
        const input = e.target.value;
        const textoLimpio = input.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        setNombre(textoLimpio);
    };

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
            {/* 1. ENCABEZADO PRINCIPAL */}
            <div className="row align-items-center mb-5 pb-5 border-bottom border-secondary border-opacity-25">
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <h2 className="text-info text-uppercase fw-black display-4 mb-0" style={{ letterSpacing: '-1px', lineHeight: '1.1' }}>
                        Canales de<br />Contacto
                    </h2>
                    <div className="bg-info mt-3" style={{ height: '4px', width: '50px' }}></div>
                </div>
                <div className="col-lg-8 ps-lg-5">
                    <p className="fs-5 text-white m-0 lh-base" style={{ fontWeight: '400' }}>
                        ¿Tienes dudas sobre la compatibilidad de un equipo, la disponibilidad técnica o el acceso a los cursos virtuales? Puedes enviarnos un mensaje o ubicarnos directamente en nuestra oficina central en la Región de Magallanes.
                    </p>
                </div>
            </div>

            {/* Distribución de Paneles Estilo Control Técnico */}
            <div className="row g-4 align-items-stretch">

                {/* COLUMNA 1: FORMULARIO */}
                <div className="col-lg-5">
                    <div className="p-4 rounded-4 h-100 shadow-lg" style={{ backgroundColor: '#2c313a', borderLeft: '6px solid #0dcaf0' }}>
                        <h3 className="h5 text-white text-uppercase fw-bold mb-4" style={{ letterSpacing: '0.5px' }}>Contacto</h3>

                        <form onSubmit={handleEnviar}>
                            <div className="mb-3">
                                <label className="form-label text-white small text-uppercase fw-bold" style={{ fontSize: '11px' }}>Nombre Completo</label>
                                <input type="text" className="form-control bg-dark text-white border-secondary p-2 small" placeholder="Ej: Carlos Astroza" value={nombre} onChange={handleNombreChange} required style={{ fontSize: '14px' }} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-white small text-uppercase fw-bold" style={{ fontSize: '11px' }}>Correo Electrónico</label>
                                <input type="email" className="form-control bg-dark text-white border-secondary p-2 small" placeholder="ejemplo@correo.cl" value={correo} onChange={(e) => setCorreo(e.target.value)} required style={{ fontSize: '14px' }} />
                                {errorCorreo && (
                                    <div className="mt-1 fw-bold" style={{ fontSize: '12px', color: errorCorreo.includes('inválido') ? '#ff6b6b' : '#51cf66' }}>{errorCorreo}</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="form-label text-white small text-uppercase fw-bold" style={{ fontSize: '11px' }}>Mensaje o Detalle Técnico</label>
                                <textarea className="form-control bg-dark text-white border-secondary p-2 small" rows="5" placeholder="Detalla las especificaciones de tu consulta..." value={mensaje} onChange={(e) => setMensaje(e.target.value)} required style={{ fontSize: '14px', resize: 'none' }}></textarea>
                            </div>

                            <button type="submit" className={`btn w-100 fw-bold text-uppercase py-2 ${formularioValido ? 'btn-info text-dark' : 'btn-secondary text-muted'}`} disabled={!formularioValido} style={{ letterSpacing: '1px', fontSize: '12px' }}>
                                Procesar Envío
                            </button>
                        </form>
                    </div>
                </div>

                {/* COLUMNA 2: INFORMACIÓN Y MAPA */}
                <div className="col-lg-7 d-flex flex-column gap-4">
                    <div className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: '#2c313a', borderLeft: '6px solid #0dcaf0' }}>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <div className="text-warning text-uppercase fw-bold mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Teléfono</div>
                                <div className="text-white fs-6 fw-bold">+56 61 220 4000</div>
                            </div>
                            <div className="col-sm-6 border-start border-secondary ps-sm-4">
                                <div className="text-warning text-uppercase fw-bold mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Ubicación</div>
                                <div className="text-white fs-6 fw-bold" style={{ lineHeight: '1.4' }}>Av. España 1230, Punta Arenas</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow-1 rounded-4 overflow-hidden shadow-lg d-flex flex-column" style={{ backgroundColor: '#2c313a', borderLeft: '6px solid #0dcaf0', minHeight: '300px' }}>
                        <iframe
                            title="Mapa Base Punta Arenas"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=-70.88413774967195%2C-53.13273051062996%2C-70.87705671787263%2C-53.12986599112521&amp;layer=mapnik&amp;marker=-53.13129827474737%2C-70.88059723377228"
                            width="100%" height="100%"
                            style={{ border: 0, flexGrow: 1 }}
                            allowFullScreen="" loading="lazy"
                        ></iframe>
                        <div className="p-2 text-center border-top border-secondary border-opacity-25" style={{ backgroundColor: '#2c313a' }}>
                            <a href="https://www.openstreetmap.org/?mlat=-53.131298&amp;mlon=-70.880597#map=18/-53.131298/-70.880597" target="_blank" rel="noopener noreferrer" className="text-info small text-decoration-underline fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>
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