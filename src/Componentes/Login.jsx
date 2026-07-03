// src/Componentes/Login.jsx
import { validarRutChileno } from "../funciones";
import CryptoJS from 'crypto-js';
import React, { useState, useEffect } from 'react';


function Login({ setAdminActivo }) {

    const [usuarioLogueado, setUsuarioLogueado] = useState(null);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");

        if (usuarioGuardado) {
            setUsuarioLogueado(usuarioGuardado);
        }
    }, []);
    // Estados estándar para controlar el formulario
    const [modo, setModo] = useState('login'); // 'login' o 'registro'
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [rut, setRut] = useState('');
    const [mensaje, setMensaje] = useState('');

    const formatearRut = (valor) => {
        let rut = valor.replace(/[^0-9kK]/g, "").toUpperCase();

        if (rut.length <= 1) return rut;

        let cuerpo = rut.slice(0, -1);
        let dv = rut.slice(-1);

        cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return cuerpo + "-" + dv;
    };

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
            if (!u.passwordEncriptada) return false;

            let passDesencriptada = '';

            try {
                passDesencriptada = CryptoJS.AES.decrypt(
                    u.passwordEncriptada,
                    'clave-secreta-universo-astro'
                ).toString(CryptoJS.enc.Utf8);
            } catch (error) {
                return false;
            }

            return u.correo === correo.trim() && passDesencriptada === password;
        });

        // Verificar si se encontró y su estado
        if (clienteEncontrado) {
            if (clienteEncontrado.estado === 'inactivo') {
                setMensaje('❌ Esta cuenta ha sido desactivada por el administrador.');
                return;
            }
            setUsuarioLogueado(clienteEncontrado.nombre);
            setAdminActivo(false);
            localStorage.setItem("usuario", clienteEncontrado.nombre);
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

        // VALIDAR NOMBRE
        if (nombre.trim().length < 3) {
            setMensaje("❌ El nombre debe tener al menos 3 caracteres.");
            return;
        }

        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

        if (!soloLetras.test(nombre.trim())) {
            setMensaje("❌ El nombre solo puede contener letras.");
            return;
        }

        // VALIDAR RUT
        if (!validarRutChileno(rut.trim())) {
            setMensaje("❌ El RUT ingresado no es válido.");
            return;
        }

        // VALIDAR RUT REPETIDO
        const rutExiste = usuariosBD.some(u =>
            u.rut.replace(/\./g, "").replace("-", "").toUpperCase() ===
            rut.replace(/\./g, "").replace("-", "").toUpperCase()
        );

        if (rutExiste) {
            setMensaje("❌ Ese RUT ya está registrado.");
            return;
        }

        // VALIDAR CORREO
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!correoValido.test(correo.trim())) {
            setMensaje("❌ Debe ingresar un correo válido.");
            return;
        }

        // VALIDAR CORREO REPETIDO
        const correoExiste = usuariosBD.some(u =>
            u.correo.toLowerCase() === correo.trim().toLowerCase()
        );

        if (correoExiste) {
            setMensaje("❌ El correo ya se encuentra registrado.");
            return;
        }

        // VALIDAR CONTRASEÑA
        if (password.length < 6) {
            setMensaje("❌ La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        const nuevoCliente = {
            id: Date.now().toString(),
            nombre: nombre.trim(),
            rut: rut.trim(),
            correo: correo.trim(),
            passwordEncriptada: CryptoJS.AES.encrypt(password, 'clave-secreta-universo-astro').toString(),
            estado: 'activo'
        };

        const nuevaLista = [...usuariosBD, nuevoCliente];

        localStorage.setItem(
            'astroshop_bd_usuarios',
            JSON.stringify(nuevaLista)
        );

        alert('🚀 ¡Cuenta creada con éxito! Ya puedes iniciar sesión.');

        setModo('login');
        setNombre('');
        setRut('');
        setCorreo('');
        setPassword('');
        setMensaje('');

        window.location.reload();
    };

    // Función básica para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("usuario");
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
                                <input
                                    type="text"
                                    className="form-control form-control-sm bg-dark text-white border-secondary"
                                    placeholder="Juan Pérez"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    onBlur={() => {
                                        if (nombre.trim().length < 3) {
                                            setMensaje("❌ El nombre debe tener al menos 3 caracteres.");
                                        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre.trim())) {
                                            setMensaje("❌ El nombre solo puede contener letras.");
                                        } else {
                                            setMensaje("");
                                        }
                                    }}
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="text-white-50 d-block mb-1" style={{ fontSize: '11px' }}>RUT:</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm bg-dark text-white border-secondary"
                                    placeholder="12.345.678-5"
                                    value={rut}
                                    onChange={(e) => setRut(formatearRut(e.target.value))}
                                    onBlur={() => {
                                        if (!validarRutChileno(rut)) {
                                            setMensaje("❌ El RUT ingresado no es válido.");
                                        } else {
                                            setMensaje("");
                                        }
                                    }}
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="text-white-50 d-block mb-1" style={{ fontSize: '11px' }}>Correo Electrónico:</label>
                                <input
                                    type="email"
                                    className="form-control form-control-sm bg-dark text-white border-secondary"
                                    placeholder="juan@correo.com"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    onBlur={() => {
                                        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                        if (!correoValido.test(correo.trim())) {
                                            setMensaje("❌ Debe ingresar un correo válido. Ejemplo: usuario@correo.com");
                                        } else {
                                            setMensaje("");
                                        }
                                    }}
                                    required
                                />
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