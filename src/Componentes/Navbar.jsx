import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Carrito from './Carrito';
import Login from './Login';

function Navbar({
    cantidadCarrito,
    carrito,
    total,
    eliminarProducto,
    formatearPrecio,
    cambiarCantidad,
    verFormulario,
    setVerFormulario,
    conEnvio,
    setconEnvio,
    direccion,
    setDireccion,
    rut,
    setRut,
    fechaNacimiento,
    setFechaNacimiento,
    mensajeError,
    onFinalizar,
    adminActivo,
    setAdminActivo,
    moneda,
    setmoneda,
    // 🌟 RECIBIMOS LAS PROPS DE CONTROL DE VISTAS DEL ADMIN
    verPanelAdmin,
    setVerPanelAdmin
}) {

    const estiloEnlace = ({ isActive }) =>
        isActive
            ? "nav-link text-info fw-bold border-bottom border-info"
            : "nav-link text-white fw-medium";

    // 🌟 FUNCIÓN ALUMNO: Si el Admin pincha en un link normal de navegación, ocultamos el panel
    const irAPaginaNormal = () => {
        if (adminActivo) {
            setVerPanelAdmin(false);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary shadow-sm sticky-top">
            <div className="container">
                {/* Logo Principal */}
                {/* Logo Principal con Icono */}
                <Link className="navbar-brand fw-bold text-uppercase d-flex align-items-center" to="/" onClick={irAPaginaNormal}>
                    {/* SVG Minimalista */}
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2 text-info">
                        <circle cx="12" cy="12" r="7"></circle>
                        <ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(45 12 12)"></ellipse>
                    </svg>
                    AstroShop
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        {/* Enlaces de navegación con el evento de clic incorporado */}
                        <li className="nav-item">
                            <NavLink className={estiloEnlace} to="/" onClick={irAPaginaNormal}>Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={estiloEnlace} to="/nosotros" onClick={irAPaginaNormal}>Nosotros</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={estiloEnlace} to="/contacto" onClick={irAPaginaNormal}>Contacto</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={estiloEnlace} to="/terminos" onClick={irAPaginaNormal}>Términos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={estiloEnlace} to="/manual" onClick={irAPaginaNormal}>Manual</NavLink>
                        </li>

                        {/* SELECTOR DE DIVISAS */}
                        <li className="nav-item dropdown ms-lg-3 mt-2 mt-lg-0">
                            <button className="btn btn-outline-info btn-sm dropdown-toggle fw-bold text-uppercase px-3" type="button" id="dropdownDivisas" data-bs-toggle="dropdown" aria-expanded="false">
                                Moneda: {moneda}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow-lg" aria-labelledby="dropdownDivisas">
                                <li><button className="dropdown-item small fw-semibold" type="button" onClick={() => setmoneda('CLP')}>Peso Chileno (CLP)</button></li>
                                <li><button className="dropdown-item small fw-semibold" type="button" onClick={() => setmoneda('UF')}>Unidad de Fomento (UF)</button></li>
                                <li><button className="dropdown-item small fw-semibold" type="button" onClick={() => setmoneda('EUR')}>Euro (€)</button></li>
                                <li><button className="dropdown-item small fw-semibold" type="button" onClick={() => setmoneda('UTM')}>Unidad Tributaria (UTM)</button></li>
                            </ul>
                        </li>

                        {/* DROPDOWN DEL PANEL DE USUARIO */}
                        <li className="nav-item dropdown ms-lg-3 mt-2 mt-lg-0">
                            <button className="btn btn-outline-info btn-sm dropdown-toggle fw-bold text-uppercase px-3" type="button" id="dropdownLogin" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                Mi Cuenta
                            </button>
                            <div className="dropdown-menu dropdown-menu-end p-0 border-0 shadow-lg mt-2" aria-labelledby="dropdownLogin" style={{ width: '440px', zIndex: 1060 }}>
                                <Login setAdminActivo={setAdminActivo} />
                            </div>
                        </li>

                        {/* BOTÓN DEL PANEL ADMIN CONDICIONADO - 🌟 CAMBIO ALUMNO: Cambia la vista al panel usando setVerPanelAdmin */}
                        {adminActivo && (
                            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-warning fw-bold text-uppercase px-3 text-dark"
                                    onClick={() => setVerPanelAdmin(true)}
                                >
                                    Panel de administracion
                                </button>
                            </li>
                        )}

                        {/* DROPDOWN DEL CARRITO DE COMPRAS - SE OCULTA SI ADMINACTIVO ES TRUE */}
                        {!adminActivo && (
                            <li className="nav-item dropdown ms-lg-2 mt-2 mt-lg-0">
                                <button className="btn btn-warning text-dark btn-sm position-relative d-flex align-items-center dropdown-toggle fw-bold" type="button" id="dropdownCarrito" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
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
                                        formatearPrecio={formatearPrecio}
                                        eliminarProducto={eliminarProducto}
                                        cambiarCantidad={cambiarCantidad}
                                        verFormulario={verFormulario}
                                        setVerFormulario={setVerFormulario}
                                        conEnvio={conEnvio}
                                        setconEnvio={setconEnvio}
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
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;