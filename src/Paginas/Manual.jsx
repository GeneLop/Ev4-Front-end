// src/Paginas/Manual.jsx
import React from 'react';

function Manual() {
    const colorCeleste = "#0dcaf0";
    const colorAmarillo = "#ffc107";

    const secciones = [
        {
            id: "01",
            t: "Navegación General",
            d: "Utiliza el menú superior para desplazarte entre las páginas principales: Inicio, Nosotros, Contacto, Términos y este Manual. El sistema permite cambiar la moneda de visualización (CLP, UF, EUR, UTM) en cualquier momento desde el selector de divisas.",
            color: colorCeleste
        },
        {
            id: "02",
            t: "Módulo de Inicio",
            d: "Aquí encuentras nuestro catálogo organizado por categorías (Telescopios, Cursos y Kits). Puedes agregar productos al carrito con un solo clic. El resumen de tu compra, incluyendo el total y opciones de despacho, se gestiona desde el botón 'Carrito' en la barra de navegación.",
            color: colorAmarillo
        },
        {
            id: "03",
            t: "Autenticación y Cuentas",
            d: "Accede a 'Mi Cuenta' para iniciar sesión o registrarte. Como cliente, puedes ver tu historial; si eres Administrador, esta sección permite activar el 'Panel de Administración' para acceder a las herramientas de gestión interna.",
            color: colorCeleste
        },
        {
            id: "04",
            t: "Panel de Administrador",
            d: "Sección donde puedes gestionar cuentas de usuario (habilitar/deshabilitar), controlar el inventario (CRUD de productos) y revisar el historial de pedidos realizados por los clientes.",
            color: colorAmarillo
        },
        {
            id: "05",
            t: "Carrito y Checkout",
            d: "Desde esta vista, gestionas las cantidades de tus productos, calculas costos de envío según tu región y finalizas tu compra de forma segura ingresando tus datos personales y validando tu RUT.",
            color: colorCeleste
        },
        {
            id: "06",
            t: "Seguridad y Datos",
            d: "Toda la información sensible está protegida. Las contraseñas se almacenan mediante encriptación y el sistema garantiza la integridad de los datos de los pedidos realizados, manteniendo un registro transparente de cada transacción.",
            color: colorAmarillo
        }
    ];

    return (
        <div className="container py-5 text-white animate-fade-in">
            <div className="row align-items-center mb-5 pb-5 border-bottom border-secondary border-opacity-25">
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <h2 className="text-info text-uppercase fw-black display-4 mb-0" style={{ letterSpacing: '-1px', lineHeight: '1.1' }}>
                        Manual de<br />Usuario
                    </h2>
                    <div className="bg-info mt-3" style={{ height: '4px', width: '50px' }}></div>
                </div>
                {/* ESTA ES LA PARTE QUE CORREGIMOS PARA QUE SEA BLANCO Y FINO */}
                <div className="col-lg-8">
                    <p className="fs-5 text-white m-0 lh-base" style={{ fontWeight: '400' }}>
                        Bienvenido a nuestra plataforma. Esta guía describe las funcionalidades principales para que aproveches al máximo tu experiencia en nuestra tienda.
                    </p>
                </div>
            </div>

            <div className="d-flex flex-column gap-4">
                {secciones.map((item) => (
                    <div key={item.id} className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: '#2c313a', borderLeft: `6px solid ${item.color}` }}>
                        <div className="row align-items-center">
                            <div className="col-md-3 mb-2 mb-md-0 d-flex align-items-center gap-3">
                                <div className="rounded-circle d-none d-md-flex align-items-center justify-content-center fw-bold" style={{ width: '45px', height: '45px', fontSize: '14px', border: `2px solid ${item.color}`, color: item.color }}>{item.id}</div>
                                <h5 className="fw-bold small text-uppercase mb-0" style={{ color: item.color }}>{item.t}</h5>
                            </div>
                            <div className="col-md-9 border-start border-secondary ps-md-4">
                                <p className="m-0 lh-base text-white fw-bold" style={{ fontSize: '15px' }}>{item.d}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Manual;