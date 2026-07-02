// src/Componentes/Login.jsx
import React, { useState } from 'react';

function Login({ setAdminActivo }) {
    // Estados estándar para controlar el formulario
    const [modo, setModo] = useState('login'); // 'login' o 'registro'
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [rut, setRut] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [usuarioLogueado, setUsuarioLogueado] = useState(null);

    // Funciones simples para cambiar de pestaña en el formulario
    const irARegistro = () => {
        setModo('registro');
        setMensaje('');
    };

    const irALogin = () => {
        setModo('login');
        setMensaje('');
    };

    // Función para procesar el inicio de sesión
    const handleFormLogin = (e) => {
        e.preventDefault();
        setMensaje('');

        // CASO 1: Validar si es el Administrador
        if (correo.trim() === 'j.hewstone@profesor.cl' && password === 'admin123') {
            setUsuarioLogueado('James Hewstone (Admin)');
            setAdminActivo(true);
            return;
        }

        // CASO 2: Validar cliente normal en el LocalStorage
        const datosLocales = localStorage.getItem('astroshop_bd_usuarios');
        const usuariosBD = JSON.parse(datosLocales) || [];

        // Buscar al usuario con un ciclo tradicional (find)
        const clienteEncontrado = usuariosBD.find(function (u) {
            return u.correo === correo.trim() && u.password === password;
        });

        // Verificar si se encontró y su estado
        if (clienteEncontrado) {
            if (clienteEncontrado.estado === 'inactivo') {
                setMensaje('❌ Esta cuenta ha sido desactivada por el administrador.');
                return;
            }
            setUsuarioLogueado(clienteEncontrado.nombre);
            setAdminActivo(false);
        } else {
            setAdminActivo(false);
            setMensaje('❌ Credenciales incorrectas. Correo o contraseña no válidos.');
        }
    };

    // Función para procesar el registro de un nuevo cliente
    const handleRegistroCliente = (e) => {
        e.preventDefault();
        setMensaje('');

        const datosLocales = localStorage.getItem('astroshop_bd_usuarios');
        const usuariosBD = JSON.parse(datosLocales) || [];

        // Validar si el correo ya existe en la lista
        const existeCorreo = usuariosBD.some(function (u) {
            return u.correo === correo.trim();
        });

        if (existeCorreo) {
            setMensaje('❌ El correo electrónico ya se encuentra registrado.');
            return;
        }

        // Crear el objeto del nuevo usuario de forma explícita
        const nuevoCliente = {
            id: Date.now().toString(),
            nombre: nombre,
            rut: rut,
            correo: correo.trim(),
            password: password,
            estado: 'activo'
        };

        // Agregar el nuevo registro al arreglo e imprimirlo en LocalStorage
        const nuevaLista = [...usuariosBD, nuevoCliente];
        localStorage.setItem('astroshop_bd_usuarios', JSON.stringify(nuevaLista));

        alert('🚀 ¡Cuenta creada con éxito! Ya puedes iniciar sesión con tus credenciales.');

        // Limpiar el formulario y regresar a la pestaña de login
        setModo('login');
        setNombre('');
        setRut('');
        setCorreo('');
        setPassword('');
        setMensaje('');

        // Forzar recarga simple del sitio
        window.location.reload();
    };

    // Función básica para cerrar sesión
    const handleLogout = () => {
        setUsuarioLogueado(null);
        setAdminActivo(false);
        setCorreo('');
        setPassword('');
        setMensaje('');
    };

    return (
        <div className="p-4 bg-dark text-white rounded border border-secondary" style={{ width: '100%' }}>

            {/* Encabezado del contenedor */}
            <div className="d-flex justify-content-between border-bottom border-secondary pb-2 mb-3">
                <h5 className="text-warning text-uppercase fw-bold m-0" style={{ fontSize: '0.9rem' }}>
                    {usuarioLogueado ? 'Sesión Activa' : modo === 'login' ? 'Identificarse' : 'Crear Cuenta'}
                </h5>

                {/* Botón para alternar vistas */}
                {!usuarioLogueado && (
                    <>
                        {modo === 'login' ? (
                            <button type="button" className="btn btn-sm btn-link text-info p-0 text-decoration-none" style={{ fontSize: '11px' }} onClick={irARegistro}>
                                ¿No tienes cuenta? Regístrate
                            </button>
                        ) : (
                            <button type="button" className="btn btn-sm btn-link text-info p-0 text-decoration-none" style={{ fontSize: '11px' }} onClick={irALogin}>
                                Volver al Login
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* VISTA 1: Sesión ya iniciada */}
            {usuarioLogueado ? (
                <div className="text-center py-2">
                    <p className="text-white small mb-3">
                        Bienvenid@ <span className="text-info fw-bold">{usuarioLogueado}</span>
                    </p>
                    <button type="button" className="btn btn-sm btn-outline-danger w-100 fw-bold text-uppercase" onClick={handleLogout} style={{ fontSize: '11px' }}>
                        Cerrar Sesión
                    </button>
                </div>
            ) : (
                /* VISTA 2: Formularios de Login o Registro */
                <>
                    {modo === 'login' ? (
                        <form onSubmit={handleFormLogin} style={{ fontSize: '0.8rem' }}>
                            <div className="mb-2">
                                <label className="text-white-50 d-block mb-1" style={{ fontSize: '11px' }}>Correo Electrónico:</label>
                                <input type="email" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="ejemplo@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-white-50 d-block mb-1" style={{ fontSize: '11px' }}>Contraseña:</label>
                                <input type="password" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            {mensaje && (
                                <div className="alert alert-danger bg-danger bg-opacity-10 border-danger text-danger small py-1 mb-2" style={{ fontSize: '11px' }}>
                                    {mensaje}
                                </div>
                            )}
                            <button type="submit" className="btn btn-sm btn-info text-dark w-100 fw-bold text-uppercase py-2" style={{ fontSize: '11px' }}>
                                Ingresar al Sistema
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegistroCliente} style={{ fontSize: '0.8rem' }}>
                            <div className="mb-2">
                                <label className="text-white-50 d-block mb-1" style={{ fontSize: '11px' }}>Nombre Completo:</label>
                                <input type="text" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="Juan Pérez" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            </div>
                            <div className="mb-2">
                                <label className="text-white-50 d-block mb-1" style={{ fontSize: '11px' }}>RUT:</label>
                                <input type="text" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="19.876.543-2" value={rut} onChange={(e) => setRut(e.target.value)} required />
                            </div>
                            <div className="mb-2">
                                <label className="text-white-50 d-block mb-1" style={{ fontSize: '11px' }}>Correo Electrónico:</label>
                                <input type="email" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="juan@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="text-white-50 d-block mb-1" style={{ fontSize: '11px' }}>Crea tu Contraseña:</label>
                                <input type="password" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="Contraseña segura" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            {mensaje && (
                                <div className="alert alert-info bg-info bg-opacity-10 border-info text-info small py-1 mb-2" style={{ fontSize: '11px' }}>
                                    {mensaje}
                                </div>
                            )}
                            <button type="submit" className="btn btn-sm btn-success w-100 fw-bold text-uppercase py-2" style={{ fontSize: '11px' }}>
                                Registrar Nueva Cuenta
                            </button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
}

export default Login;