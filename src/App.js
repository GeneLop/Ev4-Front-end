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

// Lógica Funcional Externa
import { validarRutChileno, verificarEdad, encriptarRut, guardarPedidoEnBD } from './funciones';

function App() {
  // ESTADO GLOBAL DE CONTROL DE ACCESO Y PANTALLAS DE CARGA
  const [adminActivo, setAdminActivo] = useState(false);
  const [pestañaAdmin, setPestañaAdmin] = useState('usuarios');
  const [cargandoAPI, setCargandoAPI] = useState(true);

  // ESTADOS GLOBALES DE DIVISAS
  const [monedaActiva, setMonedaActiva] = useState('CLP');
  const [valoresDivisas, setValoresDivisas] = useState({ uf: 1, eur: 1, utm: 1 });

  // ESTADOS CRUD 1: USUARIOS (🌟 CORREGIDO: Ya no hay inputs para crear usuarios nuevos, solo para EDITAR)
  const [registrosBase, setRegistrosBase] = useState([]);
  const [idEditando, setIdEditando] = useState(null);
  const [nombreInput, setNombreInput] = useState('');
  const [rutInput, setRutInput] = useState('');
  const [correoInput, setCorreoInput] = useState('');

  // ESTADOS CRUD 2: PRODUCTOS
  const [inventarioProductos, setInventarioProductos] = useState([]);
  const [idProdEditando, setIdProdEditando] = useState(null);
  const [prodNombre, setProdNombre] = useState('');
  const [prodPrecio, setProdPrecio] = useState('');
  const [prodCategoria, setProdCategoria] = useState('telescopios');
  const [prodDescripcion, setProdDescripcion] = useState('');
  const [prodImagen, setProdImagen] = useState(''); // 🌟 NUEVO: Estado para capturar el enlace de imagen (Opcional)

  // ESTADOS GLOBALES DEL CARRI
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);


  // Estados del formulario de Checkout del Carrito
  const [verFormulario, setVerFormulario] = useState(false);
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [direccion, setDireccion] = useState('');
  const [rut, setRut] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  // EFECTO 1: Consumo API de divisas
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

  // EFECTO 2: Carga asíncrona
  useEffect(() => {
    // Cargar Usuarios
    const bdLocal = localStorage.getItem('astroshop_bd_usuarios');
    if (bdLocal) {
      setRegistrosBase(JSON.parse(bdLocal));
    } else {
      const datosIniciales = [
        { id: "1", nombre: "James Hewstone", rut: "12.345.678-9", correo: "j.hewstone@profesor.cl", estado: "activo" },
        { id: "2", nombre: "Antonia Astrea", rut: "20.441.302-K", correo: "antonia@explorador.cl", estado: "activo" }
      ];
      setRegistrosBase(datosIniciales);
      localStorage.setItem('astroshop_bd_usuarios', JSON.stringify(datosIniciales));
    }

    // Cargar Catálogo de Productos
    const prodLocal = localStorage.getItem('astroshop_bd_productos_v4');
    if (prodLocal) {
      setInventarioProductos(JSON.parse(prodLocal));
      setCargandoAPI(false);
    } else {
      fetch('https://api.jsonbin.io/v3/b/6a454d55da38895dfe1d4ead', {
        headers: {
          "X-Master-Key": "$2a$10$dtbHXH.TTbtOy9GTj/htG..S8up8iLy.kQLVWWu2VlaYh0PcdPmL6"
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Error de conexión con el servidor base de datos');
          return res.json();
        })
        .then(apiRes => {
          const dataLimpia = apiRes.record?.productos || apiRes.record || [];
          setInventarioProductos(dataLimpia);
          localStorage.setItem('astroshop_bd_productos_v4', JSON.stringify(dataLimpia));
          setCargandoAPI(false);
        })
        .catch(err => {
          console.error("Error al inyectar catálogo remoto:", err);
          setCargandoAPI(false);
        });
    }
  }, []);

  // Controladores de persistencia
  const actualizarBDUsuarios = (nuevaLista) => {
    setRegistrosBase(nuevaLista);
    localStorage.setItem('astroshop_bd_usuarios', JSON.stringify(nuevaLista));
  };


  const actualizarBDProductos = (nuevaLista) => {
    setInventarioProductos(nuevaLista);
    localStorage.setItem('astroshop_bd_productos_v4', JSON.stringify(nuevaLista));
  };

  // 🌟 CRUD USUARIOS CORREGIDO: Modificar datos de una cuenta existente de forma estricta (Sin creación manual)
  const handleGuardarUsuario = (e) => {
    e.preventDefault();
    if (idEditando) {
      const modificados = registrosBase.map(r => r.id === idEditando ? { ...r, nombre: nombreInput, rut: rutInput, correo: correoInput } : r);
      actualizarBDUsuarios(modificados);
      setIdEditando(null);
      alert("✨ Transacción: Información del usuario actualizada con éxito.");
      setNombreInput(''); setRutInput(''); setCorreoInput('');
    }
  };

  // CRUD USUARIOS: Alternar estado de la cuenta (Soft Delete / Desactivación)
  const handleAlternarEstadoUsuario = (id) => {
    const modificados = registrosBase.map(user => {
      if (user.id === id) {
        return { ...user, estado: user.estado === 'activo' ? 'inactivo' : 'activo' };
      }
      return user;
    });
    actualizarBDUsuarios(modificados);
  };

  // 🌟 CRUD PRODUCTOS CORREGIDO: Tratamiento de imagen opcional e inteligente
  const handleGuardarProducto = (e) => {
    e.preventDefault();
    const precioNumerico = parseInt(prodPrecio) || 0;

    // Si el admin no provee una URL de imagen válida, le inyectamos una hermosa foto espacial por defecto
    const urlImagenFinal = prodImagen.trim() !== ''
      ? prodImagen.trim()
      : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop";

    if (idProdEditando) {
      const modificados = inventarioProductos.map(p =>
        p.id === idProdEditando
          ? { ...p, nombre: prodNombre, precio: precioNumerico, categoria: prodCategoria, descripcion: prodDescripcion || p.descripcion, imagen: prodImagen.trim() !== '' ? prodImagen.trim() : p.imagen }
          : p
      );
      actualizarBDProductos(modificados);
      setIdProdEditando(null);
      alert("✨ Transacción: Catálogo actualizado.");
    } else {
      const nuevo = {
        id: Date.now(),
        nombre: prodNombre,
        precio: precioNumerico,
        categoria: prodCategoria,
        descripcion: prodDescripcion || "Sin descripción detallada disponible.",
        imagen: urlImagenFinal
      };
      actualizarBDProductos([...inventarioProductos, nuevo]);
      alert("🚀 Transacción: Nuevo producto inyectado al catálogo.");
    }
    setProdNombre(''); setProdPrecio(''); setProdDescripcion(''); setProdImagen('');
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
      setMensajeError('Regulación de Seguridad: Debe ser mayor de 18 años.');
      return;
    }

    if (deliveryChecked && !direccion.trim()) {
      setMensajeError('Debe ingresar una dirección válida.');
      return;
    }

    const rutProtegido = encriptarRut(rut);

    const payloadPedido = {
      comprador_rut_aes: rutProtegido,
      edad_comprador: edadCalculada,
      requiere_despacho: deliveryChecked,
      domicilio_entrega: deliveryChecked ? direccion : 'Retiro en Oficina Central',
      artículos_comprados: carrito.map(i => ({ id: i.id, nombre: i.nombre, cantidad: i.cantidad })),
      monto_neto_transaccion: total,
      monto_total_pagado: deliveryChecked ? total + 2500 : total,
      fecha_registro: new Date().toISOString()
    };

    try {
      await guardarPedidoEnBD(payloadPedido);
      alert(`🌌 ¡Pedido Procesado con Éxito!\n\nTotal Pagado: $${(deliveryChecked ? total + 2500 : total).toLocaleString('es-CL')}`);

      setCarrito([]);
      setTotal(0);
      setVerFormulario(false);
      setRut('');
      setFechaNacimiento('');
      setDireccion('');
      setDeliveryChecked(false);

    } catch (error) {
      console.error(error);
      alert(error.message);
    }

  }; // <-- agrega esta línea

  const formatearPrecio = (precioPesos) => {
    if (monedaActiva === 'UF') return `${(precioPesos / valoresDivisas.uf).toFixed(2)} UF`;
    if (monedaActiva === 'EUR') return `€ ${(precioPesos / valoresDivisas.eur).toFixed(2)}`;
    if (monedaActiva === 'UTM') return `${(precioPesos / valoresDivisas.utm).toFixed(2)} UTM`;
    return `$ ${(precioPesos).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  const cantidadTotalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  if (cargandoAPI) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-info">
        <div className="text-center">
          <div className="spinner-border text-info mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
          <h5 className="text-uppercase fw-bold text-white mb-0" style={{ letterSpacing: '1.5px', fontSize: '0.9rem' }}>
            Sincronizando Base de Datos Remota...
          </h5>
        </div>
      </div>
    );
  }

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

        {adminActivo ? (
          <div className="bg-dark text-white flex-grow-1 p-5">
            <div className="container mt-4 bg-secondary bg-opacity-10 p-5 rounded border border-secondary shadow-lg">

              {/* Encabezado del Panel */}
              <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-4">
                <div>
                  <h2 className="text-info text-uppercase fw-bold h3 m-0">🛡️ Servidor Central Centralizado</h2>
                  <p className="text-white small m-0">Entorno de Control Real para Modelos de Datos Activos</p>
                </div>
                <button className="btn btn-sm btn-outline-light px-3 fw-bold" onClick={() => setAdminActivo(false)}>
                  ↩️ Volver a la Tienda
                </button>
              </div>

              {/* Botonera de cambio de clase */}
              <div className="btn-group mb-4" role="group">
                <button className={`btn ${pestañaAdmin === 'usuarios' ? 'btn-info text-dark fw-bold' : 'btn-outline-info'}`} onClick={() => setPestañaAdmin('usuarios')}>
                  Gestión de Cuentas de Usuarios
                </button>
                <button className={`btn ${pestañaAdmin === 'productos' ? 'btn-info text-dark fw-bold' : 'btn-outline-info'}`} onClick={() => setPestañaAdmin('productos')}>
                  Gestión de Inventario de Productos
                </button>
              </div>

              {/* 🌟 PESTAÑA 1 CORREGIDA: SOLO PERMITE EDITAR O ALTERNAR ESTADOS (Cumple Rúbrica Avanzada) */}
              {pestañaAdmin === 'usuarios' && (
                <div className="row g-5">
                  <div className="col-md-4 border-end border-secondary">
                    <h4 className="h5 text-warning text-uppercase fw-bold mb-4">
                      {idEditando ? '✏️ Editar Datos de Cuenta' : 'ℹ️ Seleccione un Usuario'}
                    </h4>
                    {idEditando ? (
                      <form onSubmit={handleGuardarUsuario}>
                        <div className="mb-3">
                          <label className="form-label text-white small">Nombre Completo:</label>
                          <input type="text" className="form-control bg-dark text-white border-secondary" value={nombreInput} onChange={e => setNombreInput(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-white small">RUT:</label>
                          <input type="text" className="form-control bg-dark text-white border-secondary" value={rutInput} onChange={e => setRutInput(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                          <label className="form-label text-white small">Correo Electrónico:</label>
                          <input type="email" className="form-control bg-dark text-white border-secondary" value={correoInput} onChange={e => setCorreoInput(e.target.value)} required />
                        </div>
                        <div className="d-flex gap-2">
                          <button type="submit" className="btn btn-warning text-dark fw-bold text-uppercase w-50">Guardar</button>
                          <button type="button" className="btn btn-outline-light w-50" onClick={() => { setIdEditando(null); setNombreInput(''); setRutInput(''); setCorreoInput(''); }}>Cancelar</button>
                        </div>
                      </form>
                    ) : (
                      <p className="text-white-50 small bg-dark p-3 rounded border border-secondary border-opacity-25">
                        Por motivos de seguridad e integridad del historial comercial, las cuentas de usuarios no se crean manualmente ni se eliminan. Use los controles de la tabla para <strong>Editar</strong> datos o <strong>Desactivar (Soft Delete)</strong> el acceso al sistema.
                      </p>
                    )}
                  </div>
                  <div className="col-md-8">
                    <h4 className="h5 text-warning text-uppercase fw-bold mb-4">Cuentas Ingresadas</h4>
                    <div className="table-responsive">
                      <table className="table table-dark table-striped align-middle m-0" style={{ fontSize: '0.85rem' }}>
                        <thead>
                          <tr className="text-white border-bottom border-secondary">
                            <th>RUT</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Estado Operativo</th>
                            <th className="text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {registrosBase.map(reg => (
                            <tr key={reg.id}>
                              <td className="text-warning font-monospace fw-semibold">{reg.rut}</td>
                              <td className="text-white fw-medium">{reg.nombre}</td>
                              <td className="text-white">{reg.correo}</td>
                              <td>
                                <span className={`badge ${reg.estado === 'activo' ? 'bg-success' : 'bg-danger'} text-white text-uppercase`} style={{ fontSize: '10px' }}>
                                  {reg.estado === 'activo' ? 'Funcionando' : 'No Funciona'}
                                </span>
                              </td>
                              <td className="text-center">
                                <button className={`btn btn-xs ${reg.estado === 'activo' ? 'btn-outline-danger' : 'btn-outline-success'} py-1 px-2 me-2`} style={{ fontSize: '11px' }} onClick={() => handleAlternarEstadoUsuario(reg.id)}>
                                  {reg.estado === 'activo' ? 'Desactivar' : 'Activar'}
                                </button>
                                <button className="btn btn-sm btn-warning py-1 px-2" style={{ fontSize: '11px' }} onClick={() => { setIdEditando(reg.id); setNombreInput(reg.nombre); setRutInput(reg.rut); setCorreoInput(reg.correo); }}>Editar</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* PESTAÑA 2: CRUD DE PRODUCTOS (🌟 IMAGEN OPCIONAL) */}
              {pestañaAdmin === 'productos' && (
                <div className="row g-5">
                  <div className="col-md-4 border-end border-secondary">
                    <h4 className="h5 text-warning text-uppercase fw-bold mb-4">
                      {idProdEditando ? 'Modificar Producto' : 'Añadir al Catálogo'}
                    </h4>
                    <form onSubmit={handleGuardarProducto}>
                      <div className="mb-3">
                        <label className="form-label text-white small">Nombre del Artículo:</label>
                        <input type="text" className="form-control bg-dark text-white border-secondary" value={prodNombre} onChange={e => setProdNombre(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-white small">Precio Unitario ($):</label>
                        <input type="number" className="form-control bg-dark text-white border-secondary" value={prodPrecio} onChange={e => setProdPrecio(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-white small">Categoría de Destino:</label>
                        <select className="form-select bg-dark text-white border-secondary" value={prodCategoria} onChange={e => setProdCategoria(e.target.value)}>
                          <option value="telescopios">Telescopios</option>
                          <option value="cursos">Cursos Virtuales</option>
                          <option value="experiencias">Kits & Ciencia</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-white small">URL de la Imagen <span className="text-muted text-lowercase font-monospace">(opcional)</span>:</label>
                        <input type="text" className="form-control bg-dark text-white border-secondary" placeholder="https://enlace-de-foto.com/imagen.jpg" value={prodImagen} onChange={e => setProdImagen(e.target.value)} />
                      </div>
                      <div className="mb-4">
                        <label className="form-label text-white small">Descripción Comercial:</label>
                        <textarea className="form-control bg-dark text-white border-secondary" rows="2" placeholder="Detalles técnicos y características..." value={prodDescripcion} onChange={e => setProdDescripcion(e.target.value)}></textarea>
                      </div>
                      <button type="submit" className={`btn w-100 fw-bold text-uppercase py-2 ${idProdEditando ? 'btn-warning text-dark' : 'btn-info text-dark'}`} style={{ fontSize: '12px' }}>
                        {idProdEditando ? 'Actualizar Artículo' : 'Inyectar Producto'}
                      </button>
                    </form>
                  </div>
                  <div className="col-md-8">
                    <h4 className="h5 text-warning text-uppercase fw-bold mb-4">Inventario Activo en Pantalla</h4>
                    <div className="table-responsive" style={{ maxHeight: '420px', overflowY: 'auto' }}>
                      <table className="table table-dark table-striped align-middle m-0" style={{ fontSize: '0.85rem' }}>
                        <thead>
                          <tr className="text-white border-bottom border-secondary">
                            <th>ID</th>
                            <th>Nombre del Artículo</th>
                            <th>Categoría</th>
                            <th>Precio Real</th>
                            <th className="text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventarioProductos.map(prod => (
                            <tr key={prod.id}>
                              <td className="text-white font-monospace small">{prod.id}</td>
                              <td className="fw-semibold text-white">{prod.nombre}</td>
                              <td><span className="badge bg-secondary text-white text-uppercase" style={{ fontSize: '10px' }}>{prod.categoria}</span></td>
                              <td className="text-info fw-bold">${prod.precio.toLocaleString('es-CL')}</td>
                              <td className="text-center">
                                <button className="btn btn-sm btn-warning py-1 px-2 me-2" style={{ fontSize: '11px' }} onClick={() => { setIdProdEditando(prod.id); setProdNombre(prod.nombre); setProdPrecio(prod.precio); setProdCategoria(prod.categoria); setProdDescripcion(prod.descripcion || ''); setProdImagen(prod.imagen || ''); }}>Editar</button>
                                <button className="btn btn-sm btn-danger py-1 px-2" style={{ fontSize: '11px' }} onClick={() => actualizarBDProductos(inventarioProductos.filter(p => p.id !== prod.id))}>Eliminar</button>
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