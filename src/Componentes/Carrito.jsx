import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { validarRutChileno, verificarEdad } from '../funciones';

function Carrito({
    carrito,
    total,
    formatearPrecio,
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
    onFinalizar
}) {
    // Estados estándar para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correoLocal, setCorreoLocal] = useState('');
    const [telefonoDigitos, setTelefonoDigitos] = useState('');
    const [metodoEntrega, setMetodoEntrega] = useState('retiro');
    const [metodoPago, setMetodoPago] = useState('tarjeta');
    const [aceptaTerminos, setAceptaTerminos] = useState(false);
    const [regionSeleccionada, setRegionSeleccionada] = useState('Magallanes');
    const [comunaSeleccionada, setComunaSeleccionada] = useState('Punta Arenas');
    const [calleNumero, setCalleNumero] = useState('');

    // Estados para guardar los mensajes de error en pantalla
    const [errorRut, setErrorRut] = useState('');
    const [errorEdad, setErrorEdad] = useState('');
    const [errorCorreo, setErrorCorreo] = useState('');
    const [errorTelefono, setErrorTelefono] = useState('');
    const [errorDespacho, setErrorDespacho] = useState('');
    const [puntosEspaciales, setPuntosEspaciales] = useState(0);

    // Costo de despacho con un if/else simple
    let costoDespacho = 0;
    if (metodoEntrega === 'despacho') {
        if (regionSeleccionada === 'Magallanes') {
            costoDespacho = 2500;
        } else {
            costoDespacho = 15000;
        }
    }

    const regionesChile = {
        "Magallanes": ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"],
        "Metropolitana": ["Santiago", "Providencia", "Las Condes", "Maipú", "Ñuñoa"],
        "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
        "Biobío": ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chillán"]
    };

    useEffect(() => {
        setPuntosEspaciales(Math.floor(total * 0.01));
    }, [total]);

    // Maneja la escritura del RUT formateándolo automáticamente
    const handleRutChange = (e) => {
        let valor = e.target.value.replace(/[^0-9kK]/g, '');
        if (valor.length > 9) valor = valor.slice(0, 9);

        let rutFormateado = "";
        if (valor.length > 1) {
            const dv = valor.slice(-1);
            const cuerpo = valor.slice(0, -1);
            if (cuerpo.length <= 3) {
                rutFormateado = cuerpo + "-" + dv;
            } else if (cuerpo.length <= 6) {
                rutFormateado = cuerpo.slice(0, -3) + "." + cuerpo.slice(-3) + "-" + dv;
            } else {
                rutFormateado = cuerpo.slice(0, -6) + "." + cuerpo.slice(-6, -3) + "." + cuerpo.slice(-3) + "-" + dv;
            }
        } else {
            rutFormateado = valor;
        }
        setRut(rutFormateado.toLowerCase());
    };

    // VALIDACIÓN AL SALIR DEL CAMPO (RUT)
    const validarRutAlSalir = () => {
        if (rut === '') {
            setErrorRut('');
            return;
        }
        const rutLimpio = rut.replace(/[^0-9kK]/g, '');
        const esRepetido = /^(.)\1+$/.test(rutLimpio.slice(0, -1));

        if (!validarRutChileno(rut) || esRepetido || rutLimpio.length < 8) {
            setErrorRut('RUT inválido');
        } else {
            setErrorRut('');
        }
    };

    // VALIDACIÓN AL SALIR DEL CAMPO (CORREO)
    const validarCorreoAlSalir = () => {
        if (correoLocal === '') {
            setErrorCorreo('');
            return;
        }
        const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!regexCorreo.test(correoLocal)) {
            setErrorCorreo('Correo inválido (ejemplo@dominio.cl)');
        } else {
            setErrorCorreo('');
        }
    };

    // VALIDACIÓN AL SALIR DEL CAMPO (FECHA)
    const validarFechaAlSalir = () => {
        if (fechaNacimiento === '') {
            setErrorEdad('');
            return;
        }
        if (verificarEdad(fechaNacimiento) < 18) {
            setErrorEdad('Debe ser mayor de 18 años');
        } else {
            setErrorEdad('');
        }
    };

    // VALIDACIÓN AL SALIR DEL CAMPO (TELEFONO)
    const validarTelefonoAlSalir = () => {
        if (telefonoDigitos === '') {
            setErrorTelefono('');
            return;
        }
        if (telefonoDigitos.length !== 8) {
            setErrorTelefono('El telefono debe tener 8 digitos');
        } else {
            setErrorTelefono('');
        }
    };

    const handleTextoLimpio = (e, setEstado) => {
        const textoFiltrado = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        setEstado(textoFiltrado);
    };

    const handleTelefonoChange = (e) => {
        const valor = e.target.value.replace(/[^0-9]/g, '');
        setTelefonoDigitos(valor);
    };

    const handleRegionChange = (e) => {
        const reg = e.target.value;
        setRegionSeleccionada(reg);
        setComunaSeleccionada(regionesChile[reg][0]);
    };

    const handleMetodoEntregaChange = (e) => {
        const opcion = e.target.value;
        setMetodoEntrega(opcion);
        setDeliveryChecked(opcion === 'despacho');
    };

    const handleCheckoutFinal = (e) => {
        e.preventDefault();

        if (metodoEntrega === 'despacho') {
            if (!calleNumero.trim()) {
                setErrorDespacho('Dirección requerida');
                return;
            }
            setDireccion(`${calleNumero}, ${comunaSeleccionada}, ${regionSeleccionada}`);
        } else {
            setDireccion('Retiro en Oficina Central');
        }

        validarRutAlSalir();
        validarCorreoAlSalir();
        validarTelefonoAlSalir();
        validarFechaAlSalir();

        if (!errorRut && !errorCorreo && !errorTelefono && !errorEdad && rut && correoLocal && telefonoDigitos && fechaNacimiento && aceptaTerminos) {
            window.puntosDeEstaCompra = puntosEspaciales;

            onFinalizar({
                nombreCompleto: `${nombre.trim()} ${apellido.trim()}`,
                correo: correoLocal,
                telefono: "+56 9 " + telefonoDigitos,
                rutValidado: rut,
                metodoPago
            });
        } else {
            alert("Por favor, complete correctamente todos los campos obligatorios.");
        }
    };

    const fechaHoy = new Date().toISOString().split('T')[0];
    const fechaMinima = `${new Date().getFullYear() - 120}-01-01`;

    return (
        <div className="p-4 bg-dark text-white rounded border border-secondary shadow-lg" style={{ width: '550px', maxHeight: '580px', overflowY: 'auto' }}>
            <h5 className="text-warning text-uppercase fw-bold border-bottom border-secondary pb-2 mb-3 d-flex justify-content-between align-items-center" style={{ fontSize: '1.1rem' }}>
                <span>Mi Carrito</span>
                <span className="text-white small fw-normal" style={{ fontSize: '0.8rem' }}>({carrito.length} ítems)</span>
            </h5>

            {carrito.length === 0 ? (
                <p className="text-center text-white my-4 small">Carrito vacío.</p>
            ) : (
                <div>
                    <div className="mb-3">
                        {carrito.map(item => (
                            <div key={item.id} className="d-flex justify-content-between align-items-center bg-secondary bg-opacity-10 p-2 mb-2 rounded border border-secondary" style={{ fontSize: '0.85rem' }}>
                                <div style={{ width: '65%' }}>
                                    <h6 className="m-0 fw-semibold text-truncate" style={{ fontSize: '0.85rem' }}>{item.nombre}</h6>
                                    <small className="text-info fw-semibold">
                                        {formatearPrecio(item.precio)} c/u
                                    </small>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <button type="button" className="btn btn-sm btn-outline-light py-0 px-2" onClick={() => cambiarCantidad(item.id, -1)}>-</button>
                                    <span className="fw-semibold">{item.cantidad}</span>
                                    <button type="button" className="btn btn-sm btn-outline-light py-0 px-2" onClick={() => cambiarCantidad(item.id, 1)}>+</button>
                                    <button type="button" className="btn btn-sm btn-outline-danger py-0 px-2 ms-1" onClick={() => eliminarProducto(item.id)}>✕</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {!verFormulario ? (
                        <div className="pt-2">
                            <div className="d-flex justify-content-between align-items-center px-1 mb-3" style={{ fontSize: '1rem' }}>
                                <span className="text-white fw-light">Total parcial:</span>
                                <span className="text-info fw-bold fs-5" style={{ letterSpacing: '0.5px' }}>{formatearPrecio(total)}</span>
                            </div>
                            <button type="button" className="btn btn-warning w-100 fw-bold py-2 text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }} onClick={() => setVerFormulario(true)}>
                                Proceder al Pago
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleCheckoutFinal} className="p-3 bg-secondary bg-opacity-10 rounded border border-secondary" style={{ fontSize: '0.8rem' }}>

                            <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-3">
                                <h6 className="text-info text-uppercase fw-bold m-0" style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>Datos de Envío</h6>
                                <button type="button" className="btn btn-xs btn-outline-light py-1 px-2 fw-semibold" style={{ fontSize: '10px', textTransform: 'uppercase' }} onClick={() => setVerFormulario(false)}>
                                    ← Volver al Carrito
                                </button>
                            </div>

                            <div className="row g-2 mb-2">
                                <div className="col-6">
                                    <label className="text-white d-block mb-1" style={{ fontSize: '11px' }}>Nombre:</label>
                                    <input type="text" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="Ej: Juan" value={nombre} onChange={e => handleTextoLimpio(e, setNombre)} required />
                                </div>
                                <div className="col-6">
                                    <label className="text-white d-block mb-1" style={{ fontSize: '11px' }}>Apellido:</label>
                                    <input type="text" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="Ej: Pérez" value={apellido} onChange={e => handleTextoLimpio(e, setApellido)} required />
                                </div>
                            </div>

                            <div className="mb-2">
                                <label className="text-white d-block mb-1" style={{ fontSize: '11px' }}>RUT:</label>
                                <input type="text" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="12.345.678-9" value={rut} onChange={handleRutChange} onBlur={validarRutAlSalir} required />
                                {errorRut && <small className="text-danger d-block mt-1 fw-medium" style={{ fontSize: '11px' }}>{errorRut}</small>}
                            </div>

                            <div className="row g-2 mb-2">
                                <div className="col-6">
                                    <label className="text-white d-block mb-1" style={{ fontSize: '11px' }}>Correo Electrónico:</label>
                                    <input type="email" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="juan@correo.cl" value={correoLocal} onChange={e => setCorreoLocal(e.target.value)} onBlur={validarCorreoAlSalir} required />
                                    {errorCorreo && <small className="text-danger d-block mt-1 fw-medium" style={{ fontSize: '11px' }}>{errorCorreo}</small>}
                                </div>
                                <div className="col-6">
                                    <label className="text-white d-block mb-1" style={{ fontSize: '11px' }}>Teléfono Móvil:</label>
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-text bg-dark border-secondary text-white" style={{ fontSize: '12px' }}>+56 9</span>
                                        <input type="tel" className="form-control bg-dark text-white border-secondary" placeholder="12345678" value={telefonoDigitos} onChange={handleTelefonoChange} onBlur={validarTelefonoAlSalir} maxLength="8" required />
                                    </div>
                                    {errorTelefono && <small className="text-danger d-block mt-1 fw-medium" style={{ fontSize: '11px' }}>{errorTelefono}</small>}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="text-white d-block mb-1" style={{ fontSize: '11px' }}>Fecha de Nacimiento:</label>
                                <input type="date" className="form-control form-control-sm bg-dark text-white border-secondary" min={fechaMinima} max={fechaHoy} value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} onBlur={validarFechaAlSalir} required />
                                {errorEdad && <small className="text-danger d-block mt-1 fw-medium" style={{ fontSize: '11px' }}>{errorEdad}</small>}
                            </div>

                            <div className="mb-3">
                                <label className="text-white d-block mb-1" style={{ fontSize: '11px' }}>Modalidad de Entrega:</label>
                                <select className="form-select form-select-sm bg-dark text-white border-secondary" value={metodoEntrega} onChange={handleMetodoEntregaChange}>
                                    <option value="retiro">Retiro en Tienda Local ($0)</option>
                                    <option value="despacho">Despacho a Domicilio</option>
                                </select>
                            </div>
                            {metodoEntrega === 'despacho' && (
                                <div className="mb-3 p-2 bg-dark bg-opacity-50 rounded border border-secondary border-opacity-50">
                                    <div className="row g-2 mb-2">
                                        <div className="col-6">
                                            <label className="text-white d-block mb-1" style={{ fontSize: '11px' }}>Región de Destino:</label>
                                            <select className="form-select form-select-sm bg-dark text-white border-secondary" value={regionSeleccionada} onChange={handleRegionChange}>
                                                {Object.keys(regionesChile).map(reg => (
                                                    <option key={reg} value={reg}>{reg === 'Magallanes' ? 'Magallanes (Envío Local)' : `${reg} (Otras Regiones)`}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-6">
                                            <label className="text-white d-block mb-1" style={{ fontSize: '11px' }}>Comuna:</label>
                                            <select className="form-select form-select-sm bg-dark text-white border-secondary" value={comunaSeleccionada} onChange={e => setComunaSeleccionada(e.target.value)}>
                                                {regionesChile[regionSeleccionada].map(com => (
                                                    <option key={com} value={com}>{com}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <label className="text-white d-block mb-1" style={{ fontSize: '11px' }}>Dirección (Calle y Número):</label>
                                    <input type="text" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="Ej: Av. Alemania 450" value={calleNumero} onChange={e => setCalleNumero(e.target.value)} required={metodoEntrega === 'despacho'} />
                                    {errorDespacho && <small className="text-danger d-block mt-1 fw-medium" style={{ fontSize: '11px' }}>{errorDespacho}</small>}
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="text-white d-block mb-1" style={{ fontSize: '11px' }}>
                                    Método de Pago:
                                </label>

                                <select
                                    className="form-select form-select-sm bg-dark text-white border-secondary"
                                    value={metodoPago}
                                    onChange={(e) => setMetodoPago(e.target.value)}
                                >
                                    <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                                    <option value="transferencia">Transferencia Bancaria</option>
                                    <option value="mercadopago">Mercado Pago</option>
                                    <option value="paypal">PayPal</option>
                                </select>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" id="terms" checked={aceptaTerminos} onChange={e => setAceptaTerminos(e.target.checked)} required />
                                <label className="form-check-label text-white" htmlFor="terms" style={{ fontSize: '11px', userSelect: 'none' }}>
                                    Acepto los <Link to="/terminos" className="text-info text-decoration-underline fw-medium">Términos y Condiciones</Link> de la tienda
                                </label>
                            </div>

                            <div className="bg-dark bg-opacity-50 p-3 rounded border border-secondary mb-3" style={{ fontSize: '0.8rem' }}>
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-white">Subtotal Neto:</span>
                                    <span className="fw-semibold">{formatearPrecio(total)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-white">Costo de Envío:</span>
                                    <span className="fw-semibold">${costoDespacho.toLocaleString('es-CL')}</span>
                                </div>
                                <div className="d-flex justify-content-between text-info fw-semibold mb-2 border-bottom border-secondary border-opacity-25 pb-2">
                                    <span>Beneficio Cyber Week (1%):</span>
                                    <span>+{puntosEspaciales.toLocaleString('es-CL')} pts</span>
                                </div>
                                <div className="d-flex justify-content-between fw-bold align-items-center pt-1" style={{ fontSize: '1rem' }}>
                                    <span className="text-info">Total Final:</span>
                                    <span className="text-info fw-bold">
                                        {formatearPrecio(total + costoDespacho)}
                                    </span>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-sm w-100 fw-bold text-uppercase py-2 btn-info text-dark" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
                                Confirmar Compra
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}

export default Carrito;