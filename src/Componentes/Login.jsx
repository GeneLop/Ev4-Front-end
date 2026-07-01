// src/Componentes/Login.jsx
import React, { useState } from 'react';

function Login({ setAdminActivo }) {
    const [modo, setModo] = useState('login'); // 'login' o 'registro'
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [rut, setRut] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [usuarioLogueado, setUsuarioLogueado] = useState(null);

    const handleFormLogin = (e) => {
        e.preventDefault();
        setMensaje('');

        // 🛡️ CASO 1: Ingresa el Administrador (James)
        if (correo.trim() === 'j.hewstone@profesor.cl' && password === 'admin123') {
            setUsuarioLogueado('James Hewstone (Admin)');
            setAdminActivo(true);
            setMensaje('✨ ¡Acceso Concedido! Panel de control activado.');
            return;
        }

        // 👥 CASO 2: Ingresa un Cliente Normal (Validación Estricta)
        const usuariosBD = JSON.parse(localStorage.getItem('astroshop_bd_usuarios')) || [];

        // Buscamos si existe un usuario con ese correo Y con esa contraseña exacta
        const clienteEncontrado = usuariosBD.find(
            u => u.correo === correo.trim() && u.password === password
        );

        if (clienteEncontrado) {
            if (clienteEncontrado.estado === 'inactivo') {
                setMensaje('❌ Esta cuenta ha sido desactivada por el administrador.');
                return;
            }
            setUsuarioLogueado(clienteEncontrado.nombre);
            setAdminActivo(false); // Es cliente, no admin (no muestra el botón de panel)
            setMensaje(`🌌 ¡Bienvenido de vuelta, ${clienteEncontrado.nombre}!`);
        } else {
            // 🌟 AQUÍ ESTÁ EL BLOQUEO: Si no existe o la clave está mal, no pasa nadie
            setAdminActivo(false);
            setMensaje('❌ Credenciales incorrectas. Correo o contraseña no válidos.');
        }
    };

    const handleRegistroCliente = (e) => {
        e.preventDefault();
        setMensaje('');

        const usuariosBD = JSON.parse(localStorage.getItem('astroshop_bd_usuarios')) || [];

        // Verificar si el correo ya existe para no duplicar
        if (usuariosBD.some(u => u.correo === correo.trim())) {
            setMensaje('❌ El correo electrónico ya se encuentra registrado.');
            return;
        }

        // Crear nuevo cliente guardando también su contraseña para poder validarla en el login
        const nuevoCliente = {
            id: Date.now().toString(),
            nombre: nombre,
            rut: rut,
            correo: correo.trim(),
            password: password, // 🌟 Guardamos la clave de forma real
            estado: 'activo'
        };

        const nuevaLista = [...usuariosBD, nuevoCliente];
        localStorage.setItem('astroshop_bd_usuarios', JSON.stringify(nuevaLista));

        alert('🚀 ¡Cuenta creada con éxito! Ya puedes iniciar sesión con tus credenciales.');

        // Limpiamos los campos y volvemos al modo login
        setModo('login');
        setNombre(''); setRut(''); setCorreo(''); setPassword(''); setMensaje('');

        // Recargamos ligeramente para que App.jsx sepa que hay un usuario nuevo en la BD local
        window.location.reload();
    };

    const handleLogout = () => {
        setUsuarioLogueado(null);
        setAdminActivo(false);
        setCorreo('');
        setPassword('');
        setMensaje('Sesión cerrada.');
    };

    return (
        <div className="p-4 bg-dark text-white rounded border border-secondary" style={{ width: '100%' }}>
            <div className="d-flex justify-content-between border-bottom border-secondary pb-2 mb-3">
                <h5 className="text-warning text-uppercase fw-bold m-0" style={{ fontSize: '0.9rem' }}>
                    {usuarioLogueado ? 'Sesión Activa' : modo === 'login' ? 'Identificarse' : 'Crear Cuenta'}
                </h5>
                {!usuarioLogueado && (
                    <button
                        type="button"
                        className="btn btn-sm btn-link text-info p-0 text-decoration-none"
                        style={{ fontSize: '11px' }}
                        onClick={() => { setModo(modo === 'login' ? 'registro' : 'login'); setMensaje(''); }}
                    >
                        {modo === 'login' ? '¿No tienes cuenta? Regístrate' : 'Volver al Login'}
                    </button>
                )}
            </div>

            {usuarioLogueado ? (
                <div className="text-center py-2">
                    <p className="text-white small mb-3">Conectado como: <span className="text-info fw-bold">{usuarioLogueado}</span></p>
                    <div className="alert alert-success bg-success bg-opacity-10 border-success text-success small py-2 mb-3">{mensaje}</div>
                    <button type="button" className="btn btn-sm btn-outline-danger w-100 fw-bold text-uppercase" onClick={handleLogout} style={{ fontSize: '11px' }}>Cerrar Sesión</button>
                </div>
            ) : modo === 'login' ? (
                <form onSubmit={handleFormLogin} style={{ fontSize: '0.8rem' }}>
                    <div className="mb-2">
                        <label className="text-white-50 d-block mb-1" style={{ fontSize: '11px' }}>Correo Electrónico:</label>
                        <input type="email" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="ejemplo@correo.com" value={correo} onChange={e => setCorreo(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="text-white-50 d-block mb-1" style={{ fontSize: '11px' }}>Contraseña:</label>
                        <input type="password" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    {mensaje && <div className="alert alert-danger bg-danger bg-opacity-10 border-danger text-danger small py-1 mb-2" style={{ fontSize: '11px' }}>{mensaje}</div>}
                    <button type="submit" className="btn btn-sm btn-info text-dark w-100 fw-bold text-uppercase py-2" style={{ fontSize: '11px' }}>Ingresar al Sistema</button>
                </form>
            ) : (
                <form onSubmit={handleRegistroCliente} style={{ fontSize: '0.8rem' }}>
                    <div className="mb-2">
                        <label className="text-white-50 d-block mb-1" style={{ fontSize: '11px' }}>Nombre Completo:</label>
                        <input type="text" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="Juan Pérez" value={nombre} onChange={e => setNombre(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <label className="text-white-50 d-block mb-1" style={{ fontSize: '11px' }}>RUT:</label>
                        <input type="text" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="19.876.543-2" value={rut} onChange={e => setRut(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <label className="text-white-50 d-block mb-1" style={{ fontSize: '11px' }}>Correo Electrónico:</label>
                        <input type="email" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="juan@correo.com" value={correo} onChange={e => setCorreo(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="text-white-50 d-block mb-1" style={{ fontSize: '11px' }}>Crea tu Contraseña:</label>
                        <input type="password" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="Contraseña segura" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    {mensaje && <div className="alert alert-info bg-info bg-opacity-10 border-info text-info small py-1 mb-2" style={{ fontSize: '11px' }}>{mensaje}</div>}
                    <button type="submit" className="btn btn-sm btn-success w-100 fw-bold text-uppercase py-2" style={{ fontSize: '11px' }}>Registrar Nueva Cuenta</button>
                </form>
            )}
        </div>
    );
}

export default Login;