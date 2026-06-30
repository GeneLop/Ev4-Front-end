// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importación de Componentes Globales
import Navbar from './Componentes/Navbar';
import Footer from './Componentes/Footer';

// Importación de Vistas / Páginas
import Inicio from './Paginas/Inicio';
import Nosotros from './Paginas/Nosotros';
import Proyecto from './Paginas/Proyecto';
import Contacto from './Paginas/Contacto';
import Terminos from './Paginas/Terminos';
import Manual from './Paginas/Manual';

// Importación de la Base de Datos y Motores Lógicos
import { productosTelescopios, productosCursos, productosExperiencias } from './menu/productos';
import { validarRutChileno, verificarEdad, encriptarRut, guardarPedidoEnBD } from './funciones';

function App() {
  // ⚠️ TRUCO DE DESARROLLO: Limpia el storage viejo al hacer Ctrl + S para que tome los cambios del código al tiro
  localStorage.removeItem('astroshop_bd_productos_v4');

  // ESTADO GLOBAL DE CONTROL DE ACCESO
  const [adminActivo, setAdminActivo] = useState(false);
  const [pestañaAdmin, setPestañaAdmin] = useState('usuarios'); // 'usuarios' o 'productos'

  // ==========================================
  // 🌟 ESTADOS GLOBALES DE DIVISAS (API MULTI-MONEDA)
  // ==========================================
  const [monedaActiva, setMonedaActiva] = useState('CLP');
  const [valoresDivisas, setValoresDivisas] = useState({ uf: 1, eur: 1, utm: 1 });

  // ==========================================
  // ESTADOS CRUD 1: USUARIOS
  // ==========================================
  const [registrosBase, setRegistrosBase] = useState([]);
  const [idEditando, setIdEditando] = useState(null);
  const [nombreInput, setNombreInput] = useState('');
  const [rutInput, setRutInput] = useState('');
  const [correoInput, setCorreoInput] = useState('');

  // ==========================================
  // ESTADOS CRUD 2: PRODUCTOS (Exigido por Rúbrica)
  // ==========================================
  const [inventarioProductos, setInventarioProductos] = useState([]);
  const [idProdEditando, setIdProdEditando] = useState(null);
  const [prodNombre, setProdNombre] = useState('');
  const [prodPrecio, setProdPrecio] = useState('');
  const [prodCategoria, setProdCategoria] = useState('telescopios');

  // ESTADOS GLOBALES DEL CARRITO ORIGINAL
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  // Estados del formulario de Checkout del Carrito
  const [verFormulario, setVerFormulario] = useState(false);
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [direccion, setDireccion] = useState('');
  const [rut, setRut] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  // 🌟 CONSUMO EFECTIVO DE API REMOTA: Mindicador.cl para tipos de cambio reales
  useEffect(() => {
    const obtenerDivisasRemotas = async () => {
      try {
        const respuesta = await fetch('https://mindicador.cl/api');
        const datos = await respuesta.json();
        setValoresDivisas({
          uf: datos.uf.valor,
          eur: datos.euro.valor,
          utm: datos.utm.valor
        });
      } catch (error) {
        console.error("Falla de sincronización externa con la API de divisas:", error);
      }
    };
    obtenerDivisasRemotas();
  }, []);

  // Carga inicial de Local Storage para Usuarios e Inventario
  useEffect(() => {
    // 1. Cargar Usuarios
    const bdLocal = localStorage.getItem('astroshop_bd_usuarios');
    if (bdLocal) {
      setRegistrosBase(JSON.parse(bdLocal));
    } else {
      const datosIniciales = [
        { id: "1", nombre: "James Hewstone", rut: "12.345.678-9", correo: "j.hewstone@profesor.cl" },
        { id: "2", nombre: "Antonia Astrea", rut: "20.441.302-K", correo: "antonia@explorador.cl" }
      ];
      setRegistrosBase(datosIniciales);
      localStorage.setItem('astroshop_bd_usuarios', JSON.stringify(datosIniciales));
    }

    // 2. Cargar Productos combinados en una sola lista para el CRUD
    const prodLocal = localStorage.getItem('astroshop_bd_productos_v4');
    if (prodLocal) {
      setInventarioProductos(JSON.parse(prodLocal));
    } else {
      const todosLosProductos = [
        ...productosTelescopios,
        ...productosCursos,
        ...productosExperiencias
      ];
      setInventarioProductos(todosLosProductos);
      localStorage.setItem('astroshop_bd_productos_v4', JSON.stringify(todosLosProductos));
    }
  }, []);

  // Controladores de persistencia en LocalStorage
  const actualizarBDUsuarios = (nuevaLista) => {
    setRegistrosBase(nuevaLista);
    localStorage.setItem('astroshop_bd_usuarios', JSON.stringify(nuevaLista));
  };

  const actualizarBDProductos = (nuevaLista) => {
    setInventarioProductos(nuevaLista);
    localStorage.setItem('astroshop_bd_productos_v4', JSON.stringify(nuevaLista));
  };

  // Lógica CRUD: Guardar / Editar Usuario
  const handleGuardarUsuario = (e) => {
    e.preventDefault();
    if (idEditando) {
      const modificados = registrosBase.map(r => r.id === idEditando ? { ...r, nombre: nombreInput, rut: rutInput, correo: correoInput } : r);
      actualizarBDUsuarios(modificados);
      setIdEditando(null);
      alert("✨ Transacción: Registro de usuario actualizado.");
    } else {
      const nuevo = { id: Date.now().toString(), nombre: nombreInput, rut: rutInput, correo: correoInput };
      actualizarBDUsuarios([...registrosBase, nuevo]);
      alert("🚀 Transacción: Nuevo usuario almacenado.");
    }
    setNombreInput(''); setRutInput(''); setCorreoInput('');
  };

  // Lógica CRUD: Guardar / Editar Producto
  const handleGuardarProducto = (e) => {
    e.preventDefault();
    const precioNumerico = parseInt(prodPrecio) || 0;

    if (idProdEditando) {
      const modificados = inventarioProductos.map(p => p.id === idProdEditando ? { ...p, nombre: prodNombre, precio: precioNumerico, categoria: prodCategoria } : p);
      actualizarBDProductos(modificados);
      setIdProdEditando(null);
      alert("✨ Transacción: Producto modificado en el catálogo.");
    } else {
      const nuevo = {
        id: Date.now(),
        nombre: prodNombre,
        precio: precioNumerico,
        categoria: prodCategoria,
        imagen: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop"
      };
      actualizarBDProductos([...inventarioProductos, nuevo]);
      alert("🚀 Transacción: Nuevo producto inyectado al catálogo.");
    }
    setProdNombre(''); setProdPrecio('');
  };

  // Funciones del carrito
  const agregarProducto = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(item =>
        item.id === producto.id ? { ...existe, cantidad: existe.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    setTotal(total + producto.precio);
  };

  const cambiarCantidad = (id, delta) => {
    const producto = carrito.find(item => item.id === id);
    if (!producto) return;

    if (producto.cantidad === 1 && delta === -1) {
      eliminarProducto(id);
      return;
    }

    setCarrito(carrito.map(item =>
      item.id === id ? { ...producto, cantidad: producto.cantidad + delta } : item
    ));
    setTotal(total + (producto.precio * delta));
  };

  const eliminarProducto = (id) => {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
      setCarrito(carrito.filter(item => item.id !== id));
      setTotal(total - (producto.precio * producto.cantidad));
    }
  };

  // Lógica de finalización de compra
  const grabarPedido = async () => {
    setMensajeError('');

    if (!validarRutChileno(rut)) {
      setMensajeError('El identificador fiscal (RUT) ingresado no cumple con el algoritmo Módulo 11.');
      return;
    }

    const edadCalculada = verificarEdad(fechaNacimiento);
    if (edadCalculada < 18) {
      setMensajeError('Regulación de Seguridad: Debe ser mayor de 18 años para agendar capacitaciones.');
      return;
    }

    if (deliveryChecked && !direccion.trim()) {
      setMensajeError('Debe ingresar una dirección válida para efectuar el despacho en Punta Arenas.');
      return;
    }

    const rutProtegido = encriptarRut(rut);

    const payloadPedido = {
      comprador_rut_aes: rutProtegido,
      edad_comprador: edadCalculada,
      requiere_despacho: deliveryChecked,
      domicilio_entrega: deliveryChecked ? direccion : 'Retiro en Oficina Central',
      articulos_comprados: carrito.map(i => ({ id: i.id, nombre: i.nombre, cantidad: i.cantidad })),
      monto_neto_transaccion: total,
      monto_total_pagado: deliveryChecked ? total + 2500 : total,
      fecha_registro: new Date().toISOString()
    };

    try {
      await guardarPedidoEnBD(payloadPedido);

      alert(`🌌 ¡Pedido Procesado con Éxito!\n\nSu orden de compra planetaria ha sido inyectada exitosamente en el CRUD de la API remota.\n\nTotal Pagado: $${(deliveryChecked ? total + 2500 : total).toLocaleString('es-CL')}\n🎉 ¡Felicidades! Ha acumulado ${window.puntosDeEstaCompra || 0} Puntos Espaciales asociados a su RUT.`);

      setCarrito([]);
      setTotal(0);
      setVerFormulario(false);
      setRut('');
      setFechaNacimiento('');
      setDireccion('');
      setDeliveryChecked(false);

    } catch (error) {
      alert('❌ Falla crítica: No se pudo sincronizar el registro en la API base de datos.');
      setMensajeError('Falla crítica: No se pudo sincronizar el registro en la API base de datos.');
    }
  };

  // 🌟 MOTOR MATEMÁTICO DE CONVERSIÓN DINÁMICA CON 2 DECIMALES FIJOS
  const formatearPrecio = (precioPesos) => {
    if (monedaActiva === 'UF') return `${(precioPesos / valoresDivisas.uf).toFixed(2)} UF`;
    if (monedaActiva === 'EUR') return `€ ${(precioPesos / valoresDivisas.eur).toFixed(2)}`;
    if (monedaActiva === 'UTM') return `${(precioPesos / valoresDivisas.utm).toFixed(2)} UTM`;
    return `$ ${(precioPesos).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  const cantidadTotalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-screen bg-dark">
        <Navbar
          cantidadCarrito={cantidadTotalItems}
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
          onFinalizar={grabarPedido}
          setAdminActivo={setAdminActivo}
          monedaActiva={monedaActiva}
          setMonedaActiva={setMonedaActiva}
        />

        {/* INTERRUPTOR DE FLUJO: PANEL DE ADMINISTRACIÓN COMPLETO */}
        {adminActivo ? (
          <div className="bg-dark text-white flex-grow-1 p-5">
            <div className="container mt-4 bg-secondary bg-opacity-10 p-5 rounded border border-secondary shadow-lg">

              {/* Encabezado del Panel */}
              <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-4">
                <div>
                  <h2 className="text-info text-uppercase fw-bold h3 m-0">🛡️ Servidor Central Multi-Clase</h2>
                  <p className="text-muted small m-0">Entorno de Control Integrado para Modelos de Datos</p>
                </div>
                <button className="btn btn-sm btn-outline-light px-3 fw-bold" onClick={() => setAdminActivo(false)}>
                  ↩️ Volver a la Tienda
                </button>
              </div>

              {/* Botonera de cambio de clase (Pestañas CRUD) */}
              <div className="btn-group mb-4" role="group">
                <button className={`btn ${pestañaAdmin === 'usuarios' ? 'btn-info text-dark fw-bold' : 'btn-outline-info'}`} onClick={() => setPestañaAdmin('usuarios')}>
                  Gestión de Usuarios
                </button>
                <button className={`btn ${pestañaAdmin === 'productos' ? 'btn-info text-dark fw-bold' : 'btn-outline-info'}`} onClick={() => setPestañaAdmin('productos')}>
                  Gestión de Catálogo
                </button>
              </div>

              {/* PESTAÑA 1: CRUD DE USUARIOS */}
              {pestañaAdmin === 'usuarios' && (
                <div className="row g-5">
                  <div className="col-md-4 border-end border-secondary">
                    <h4 className="h5 text-warning text-uppercase fw-bold mb-4">
                      {idEditando ? 'Modificar Usuario' : 'Registrar Usuario'}
                    </h4>
                    <form onSubmit={handleGuardarUsuario}>
                      <div className="mb-3">
                        <label className="form-label text-white-50 small">Nombre Completo:</label>
                        <input type="text" className="form-control bg-dark text-white border-secondary" value={nombreInput} onChange={e => setNombreInput(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-white-50 small">RUT:</label>
                        <input type="text" className="form-control bg-dark text-white border-secondary" value={rutInput} onChange={e => setRutInput(e.target.value)} required />
                      </div>
                      <div className="mb-4">
                        <label className="form-label text-white-50 small">Correo:</label>
                        <input type="email" className="form-control bg-dark text-white border-secondary" value={correoInput} onChange={e => setCorreoInput(e.target.value)} required />
                      </div>
                      <button type="submit" className={`btn w-100 fw-bold text-uppercase ${idEditando ? 'btn-warning text-dark' : 'btn-info text-dark'}`}>
                        {idEditando ? 'Guardar Cambios' : 'Registrar'}
                      </button>
                    </form>
                  </div>
                  <div className="col-md-8">
                    <h4 className="h5 text-warning text-uppercase fw-bold mb-4">Lista de Usuarios (LocalStorage)</h4>
                    <div className="table-responsive">
                      <table className="table table-dark table-striped align-middle m-0">
                        <thead>
                          <tr className="text-muted border-bottom border-secondary">
                            <th>RUT</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th className="text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {registrosBase.map(reg => (
                            <tr key={reg.id}>
                              <td className="text-warning font-monospace">{reg.rut}</td>
                              <td>{reg.nombre}</td>
                              <td className="text-white-50">{reg.correo}</td>
                              <td className="text-center">
                                <button className="btn btn-sm btn-warning me-2" onClick={() => { setIdEditando(reg.id); setNombreInput(reg.nombre); setRutInput(reg.rut); setCorreoInput(reg.correo); }}>Editar</button>
                                <button className="btn btn-sm btn-danger" onClick={() => actualizarBDUsuarios(registrosBase.filter(r => r.id !== reg.id))}>Eliminar</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* PESTAÑA 2: CRUD DE PRODUCTOS */}
              {pestañaAdmin === 'productos' && (
                <div className="row g-5">
                  <div className="col-md-4 border-end border-secondary">
                    <h4 className="h5 text-warning text-uppercase fw-bold mb-4">
                      {idProdEditando ? 'Modificar Producto' : 'Añadir Producto'}
                    </h4>
                    <form onSubmit={handleGuardarProducto}>
                      <div className="mb-3">
                        <label className="form-label text-white-50 small">Nombre del Artículo:</label>
                        <input type="text" className="form-control bg-dark text-white border-secondary" value={prodNombre} onChange={e => setProdNombre(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-white-50 small">Precio Unitario ($):</label>
                        <input type="number" className="form-control bg-dark text-white border-secondary" value={prodPrecio} onChange={e => setProdPrecio(e.target.value)} required />
                      </div>
                      <div className="mb-4">
                        <label className="form-label text-white-50 small">Categoría de Destino:</label>
                        <select className="form-select bg-dark text-white border-secondary" value={prodCategoria} onChange={e => setProdCategoria(e.target.value)}>
                          <option value="telescopios">Telescopios</option>
                          <option value="cursos">Cursos Virtuales</option>
                          <option value="experiencias">Kits & Ciencia</option>
                        </select>
                      </div>
                      <button type="submit" className={`btn w-100 fw-bold text-uppercase ${idProdEditando ? 'btn-warning text-dark' : 'btn-info text-dark'}`}>
                        {idProdEditando ? 'Actualizar Item' : 'Inyectar Producto'}
                      </button>
                    </form>
                  </div>
                  <div className="col-md-8">
                    <h4 className="h5 text-warning text-uppercase fw-bold mb-4">Inventario Activo</h4>
                    <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                      <table className="table table-dark table-striped align-middle m-0">
                        <thead>
                          <tr className="text-muted border-bottom border-secondary">
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th className="text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventarioProductos.map(prod => (
                            <tr key={prod.id}>
                              <td className="text-muted font-monospace small">{prod.id}</td>
                              <td className="fw-semibold">{prod.nombre}</td>
                              <td><span className="badge bg-secondary text-uppercase">{prod.categoria}</span></td>
                              <td className="text-info">${prod.precio.toLocaleString('es-CL')}</td>
                              <td className="text-center">
                                <button className="btn btn-sm btn-warning me-2" onClick={() => { setIdProdEditando(prod.id); setProdNombre(prod.nombre); setProdPrecio(prod.precio); setProdCategoria(prod.categoria); }}>Editar</button>
                                <button className="btn btn-sm btn-danger" onClick={() => actualizarBDProductos(inventarioProductos.filter(p => p.id !== prod.id))}>Eliminar</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={
                <Inicio
                  productosTelescopios={inventarioProductos.filter(p => p.categoria === 'telescopios')}
                  productosCursos={inventarioProductos.filter(p => p.categoria === 'cursos')}
                  productosExperiencias={inventarioProductos.filter(p => p.categoria === 'experiencias')}
                  agregarProducto={agregarProducto}
                  formatearPrecio={formatearPrecio}
                />
              } />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/proyecto" element={<Proyecto />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/manual" element={<Manual />} />
            </Routes>
          </div>
        )}

        <Footer />
      </div>
    </Router>
  );
}

export default App;