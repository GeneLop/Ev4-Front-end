// src/Componentes/Login.jsx
import React, { useState } from 'react';

function Login({ setAdminActivo }) {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [usuarioLogueado, setUsuarioLogueado] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        // Si ingresa con la cuenta del profesor, activa la pantalla completa de administración
        if (correo === 'j.hewstone@profesor.cl' && clave === '123456') {
            setAdminActivo(true); // <-- Activa la vista grande
            setUsuarioLogueado('James Hewstone');
        } else if (correo.trim() && clave.trim()) {
            const apodo = correo.split('@')[0];
            setUsuarioLogueado(apodo.charAt(0).toUpperCase() + apodo.slice(1));
        }
    };

    const handleLogout = () => {
        setUsuarioLogueado(null);
        setAdminActivo(false); // Vuelve a la vista normal
        setCorreo(''); setClave('');
    };

    return (
        <div className="position-absolute end-0 mt-2 p-3 bg-dark text-white rounded border border-secondary shadow-lg"
            style={{ width: '320px', zIndex: 9999, top: '100%' }}>
            {usuarioLogueado ? (
                <div className="text-center py-2">
                    <p className="small m-0 mb-2">¡Hola, <b>{usuarioLogueado}</b>!</p>
                    <button className="btn btn-sm btn-danger w-100 py-1" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            ) : (
                <form onSubmit={handleLogin}>
                    <h6 className="text-info text-uppercase fw-bold small border-bottom border-secondary pb-2 mb-3" style={{ fontSize: '11px' }}>Acceso Privado</h6>
                    <div className="mb-2">
                        <label className="form-label text-white-50 m-0" style={{ fontSize: '11px' }}>Correo Electrónico:</label>
                        <input type="email" className="form-control form-control-sm bg-dark text-white border-secondary" value={correo} onChange={e => setCorreo(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white-50 m-0" style={{ fontSize: '11px' }}>Contraseña:</label>
                        <input type="password" className="form-control form-control-sm bg-dark text-white border-secondary" value={clave} onChange={e => setClave(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-sm btn-info text-dark w-100 fw-bold text-uppercase">Ingresar</button>
                </form>
            )}
        </div>
    );
}

export default Login;