// src/Paginas/Manual.jsx
import React from 'react';

function Manual() {
    return (
        <div className="container py-5 text-white">

            {/* ENCABEZADO */}
            <div className="row align-items-center mb-5 pb-5 border-bottom border-secondary border-opacity-25">
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <h2 className="text-info text-uppercase fw-black display-4 mb-0" style={{ letterSpacing: '-1px', lineHeight: '1.1' }}>
                        Manual de<br />Usuario
                    </h2>
                    <div className="bg-info mt-3" style={{ height: '4px', width: '50px' }}></div>
                </div>
                <div className="col-lg-8 ps-lg-5">
                    {/* Texto 100% blanco */}
                    <p className="fs-5 m-0 lh-base text-white" style={{ fontWeight: '400' }}>
                        Guía técnica detallada para la navegación, gestión de catálogo y administración de usuarios en Astroshop. Aprende a utilizar cada herramienta de nuestra plataforma.
                    </p>
                </div>
            </div>

            {/* PANELES DE MANUAL */}
            <div className="d-flex flex-column gap-4">

                {[
                    { id: "01", t: "Navegación", d: "Usa la barra superior. Los elementos con flecha (▼) son menús desplegables: haz clic para ver las opciones internas de Servicios y Clientes.", color: "#0dcaf0" },
                    { id: "02", t: "Inicio", d: "Explora telescopios y cursos. Filtra por categoría para encontrar rápido lo que necesitas para tu observación astronómica.", color: "#ffc107" },
                    { id: "03", t: "Creación de Cuenta", d: "Registro con validación de RUT en tiempo real. Si el RUT ya existe, el sistema te bloqueará para evitar duplicados.", color: "#198754" },
                    { id: "04", t: "Sesión", d: "Ingresa con tu correo y clave. El panel especial del administrador permite ver hashes de seguridad y gestionar todo el sistema.", color: "#0dcaf0" },
                    { id: "05", t: "Catálogo", d: "Agrega productos al carrito. Usa el botón 'Ver' para abrir la ficha técnica sin salir de la página actual.", color: "#ffc107" },
                    { id: "06", t: "Edición Admin", d: "Formulario para añadir, editar o borrar productos. Los cambios se guardan automáticamente en nuestro LocalStorage.", color: "#198754" },
                    { id: "07", t: "Perfil y Clientes", d: "Tabla de gestión de usuarios. Visualiza estados y hashes. Solo el Admin puede habilitar o suspender cuentas registradas.", color: "#0dcaf0" },
                    { id: "08", t: "Términos", d: "Normas de uso obligatorias aceptadas durante el registro. Garantiza una experiencia de compra transparente y segura.", color: "#ffc107" }
                ].map((item) => (
                    <div key={item.id} className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: '#2c313a', borderLeft: `6px solid ${item.color}` }}>
                        <div className="row align-items-center">
                            <div className="col-md-3 mb-2 mb-md-0 d-flex align-items-center gap-3">
                                <div className="rounded-circle d-none d-md-flex align-items-center justify-content-center fw-bold" style={{ width: '45px', height: '45px', fontSize: '14px', border: `2px solid ${item.color}`, color: item.color }}>{item.id}</div>
                                <h5 className="fw-bold small text-uppercase mb-0" style={{ color: item.color }}>{item.t}</h5>
                            </div>
                            <div className="col-md-9 border-start border-secondary ps-md-4">
                                {/* TEXTO BLANCO PURO */}
                                <p className="m-0 lh-base text-white" style={{ fontSize: '15px' }}>{item.d}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* SECCIÓN DE TIPS */}
            <div className="row g-3 mt-5 text-center">
                <div className="col-md-4">
                    <div className="p-4 rounded-4 h-100 shadow-sm" style={{ backgroundColor: '#2c313a', border: '1px solid #444' }}>
                        <div className="text-danger fw-black mb-2">⚠ ERROR</div>
                        {/* TEXTO BLANCO PURO */}
                        <div className="small text-white">Si una caja de texto se marca en rojo, el envío está bloqueado hasta corregir la validación de los datos.</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-4 rounded-4 h-100 shadow-sm" style={{ backgroundColor: '#2c313a', border: '1px solid #444' }}>
                        <div className="text-info fw-black mb-2">⌨ ATAJO</div>
                        <div className="small text-white">Presiona la tecla <b>Esc</b> para cerrar cualquier ventana modal o formulario emergente instantáneamente.</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-4 rounded-4 h-100 shadow-sm" style={{ backgroundColor: '#2c313a', border: '1px solid #444' }}>
                        <div className="text-warning fw-black mb-2">🔒 SEGURIDAD</div>
                        <div className="small text-white">Astroshop utiliza hashing de contraseñas. Nunca almacenamos claves en texto plano, garantizando tu privacidad.</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Manual;