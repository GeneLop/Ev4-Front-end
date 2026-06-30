// src/Componentes/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Carrito from './Carrito';
import Login from './Login';

function Navbar({
    cantidadCarrito,
    carrito,
    total,
    eliminarProducto,
    cambiarCantidad,
    verFormulario,
    setVerFormulario,
    deliveryChecked,
    setDeliveryChecked,
    direccion,
    setDireccion,
    rut,
    setRut,
    fechaNacimiento,
    setFechaNacimiento,
    mensajeError,
    onFinalizar,
    setAdminActivo,
    monedaActiva,       // 🌟 Recibimos la moneda activa desde App.jsx
    setMonedaActiva     // 🌟 Recibimos el setter desde App.jsx
}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold text-uppercase d-flex align-items-center" to="/">
                    <span className="text-info me-2"></span> AstroShop
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item"><Link className="nav-link text-white-50" to="/">Inicio</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white-50" to="/nosotros">Nosotros</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white-50" to="/proyecto">Proyecto</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white-50" to="/contacto">Contacto</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white-50" to="/terminos">Términos</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white-50" to="/manual">Manual</Link></li>

                        {/* 🌟 SELECTOR DE DIVISAS INTEGRADO DE FORMA INSTITUCIONAL */}
                        <li className="nav-item dropdown ms-lg-3 mt-2 mt-lg-0">
                            <button
                                className="btn btn-outline-info btn-sm dropdown-toggle fw-bold text-uppercase px-3"
                                type="button"
                                id="dropdownDivisas"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Moneda: {monedaActiva}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow-lg" aria-labelledby="dropdownDivisas">
                                <li><button className="dropdown-item small fw-semibold" type="button" onClick={() => setMonedaActiva('CLP')}>Peso Chileno (CLP)</button></li>
                                <li><button className="dropdown-item small fw-semibold" type="button" onClick={() => setMonedaActiva('UF')}>Unidad de Fomento (UF)</button></li>
                                <li><button className="dropdown-item small fw-semibold" type="button" onClick={() => setMonedaActiva('EUR')}>Euro (€)</button></li>
                                <li><button className="dropdown-item small fw-semibold" type="button" onClick={() => setMonedaActiva('UTM')}>Unidad Tributaria (UTM)</button></li>
                            </ul>
                        </li>

                        {/* DROPDOWN DEL PANEL DE USUARIO */}
                        <li className="nav-item dropdown ms-lg-3 mt-2 mt-lg-0">
                            <button
                                className="btn btn-outline-info btn-sm dropdown-toggle fw-bold text-uppercase px-3"
                                type="button"
                                id="dropdownLogin"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="outside"
                                aria-expanded="false"
                            >
                                Mi Cuenta
                            </button>
                            <div className="dropdown-menu dropdown-menu-end p-0 border-0 shadow-lg mt-2" aria-labelledby="dropdownLogin" style={{ width: '440px', zIndex: 1060 }}>
                                <Login setAdminActivo={setAdminActivo} />
                            </div>
                        </li>

                        {/* DROPDOWN DEL CARRITO DE COMPRAS */}
                        <li className="nav-item dropdown ms-lg-2 mt-2 mt-lg-0">
                            <button
                                className="btn btn-warning text-dark btn-sm position-relative d-flex align-items-center dropdown-toggle fw-bold"
                                type="button"
                                id="dropdownCarrito"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="outside"
                                aria-expanded="false"
                            >
                                Carrito
                                {cantidadCarrito > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cantidadCarrito}
                                    </span>
                                )}
                            </button>

                            <div className="dropdown-menu dropdown-menu-end p-0 border-0 shadow-lg mt-2" aria-labelledby="dropdownCarrito" style={{ width: '460px', zIndex: 1050 }}>
                                <Carrito
                                    carrito={carrito}
                                    total={total}
                                    eliminarProducto={eliminarProducto}
                                    cambiarCantidad={cambiarCantidad}
                                    verFormulario={verFormulario}
                                    setVerFormulario={setVerFormulario}
                                    deliveryChecked={deliveryChecked}
                                    setDeliveryChecked={setDeliveryChecked}
                                    direccion={direccion}
                                    setDireccion={setDireccion}
                                    rut={rut}
                                    setRut={setRut}
                                    fechaNacimiento={fechaNacimiento}
                                    setFechaNacimiento={setFechaNacimiento}
                                    mensajeError={mensajeError}
                                    onFinalizar={onFinalizar}
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;