import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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
import { encriptarRut, guardarPedidoEnBD } from './funciones';

// COMPONENTE MONITOR: 🌟 CAMBIO ALUMNO: Ya no apaga el admin al cambiar de página
function MonitorDeRutas({ setAdminActivo }) {
  return null;
}

function App() {
  // Estados de control general
  const [adminActivo, setAdminActivo] = useState(false);
  const [pestañaAdmin, setPestañaAdmin] = useState('usuarios');
  const [cargandoAPI, setCargandoAPI] = useState(true);

  // 🌟 ESTADO ALUMNO: Controla si el Admin está mirando el panel o paseando por las páginas
  const [verPanelAdmin, setVerPanelAdmin] = useState(false);

  // Estados de Monedas
  const [monedaActiva, setMonedaActiva] = useState('CLP');
  const [valoresDivisas, setValoresDivisas] = useState({ uf: 1, eur: 1, utm: 1 });

  // Estados del CRUD
  const [registrosBase, setRegistrosBase] = useState([]);
  const [inventarioProductos, setInventarioProductos] = useState([]);

  // Estados para controlar el formulario de edición de productos
  const [idProdEditando, setIdProdEditando] = useState(null);
  const [prodNombre, setProdNombre] = useState('');
  const [prodPrecio, setProdPrecio] = useState('');
  const [prodCategoria, setProdCategoria] = useState('');
  const [prodDescripcion, setProdDescripcion] = useState('');
  const [prodImagen, setProdImagen] = useState('');

  // Historial de pedidos cargados de la API
  const [historialPedidos, setHistorialPedidos] = useState([]);

  // Estados compartidos del Carrito de Compras
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [verFormulario, setVerFormulario] = useState(false);
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [direccion, setDireccion] = useState('');
  const [rut, setRut] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  // 1. Obtener valores de divisas actuales desde la API
  useEffect(() => {
    const obtenerDivisas = async () => {
      try {
        const res = await fetch('https://mindicador.cl/api');
        const datos = await res.json();
        console.log("Respuesta de la API de divisas cargada con éxito:", datos);
        setValoresDivisas({
          uf: datos.uf.valor,
          eur: datos.euro.valor,
          utm: datos.utm.valor
        });
      } catch (err) {
        console.error("Error al cargar divisas:", err);
      }
    };
    obtenerDivisas();
  }, []);

  // 2. Cargar datos iniciales de Usuarios y Catálogo de Productos
  useEffect(() => {
    // Carga de usuarios locales
    const bdLocal = localStorage.getItem('astroshop_bd_usuarios');
    if (bdLocal) {
      setRegistrosBase(JSON.parse(bdLocal));
    } else {
      const usuariosIniciales = [
        { id: "1", nombre: "James Hewstone", rut: "12.345.678-9", correo: "j.hewstone@profesor.cl", estado: "activo", passwordEncriptada: "$2a$12$K7Y8mN92PzQ1wXvR3bT5eO2gH4jK" },
        { id: "2", nombre: "Antonia Astrea", rut: "20.441.302-K", correo: "antonia@explorador.cl", estado: "activo", passwordEncriptada: "$2a$12$X9vW2zQ1mN82P7bT5eO4jK3bH2gM" }
      ];
      setRegistrosBase(usuariosIniciales);
      localStorage.setItem('astroshop_bd_usuarios', JSON.stringify(usuariosIniciales));
    }

    // Carga de productos
    const prodLocal = localStorage.getItem('astroshop_bd_productos_v4');
    if (prodLocal) {
      setInventarioProductos(JSON.parse(prodLocal));
      setCargandoAPI(false);
    } else {
      fetch('https://api.jsonbin.io/v3/b/6a454d55da38895dfe1d4ead', {
        headers: { "X-Master-Key": "$2a$10$dtbHXH.TTbtOy9GTj/htG..S8up8iLy.kQLVWWu2VlaYh0PcdPmL6" }
      })
        .then(res => res.json())
        .then(apiRes => {
          const listaLimpia = apiRes.record?.productos || apiRes.record || [];
          console.log("Catálogo original de JSONBin inyectado:", listaLimpia);
          setInventarioProductos(listaLimpia);
          localStorage.setItem('astroshop_bd_productos_v4', JSON.stringify(listaLimpia));
          setCargandoAPI(false);
        })
        .catch(err => {
          console.error("Error al cargar catálogo remoto:", err);
          setCargandoAPI(false);
        });
    }
  }, []);

  // 3. Sincronizar pedidos de MockAPI al abrir esa sección del panel
  useEffect(() => {
    if (adminActivo) {
      fetch("https://6a455557aab3faec3f69d15d.mockapi.io/pedidos")
        .then(res => res.json())
        .then(datos => {
          console.log("Historial de pedidos MockAPI recuperado de la base de datos:", datos);
          setHistorialPedidos(datos.reverse());
        })
        .catch(err => console.error("Error al recuperar pedidos:", err));
    }
  }, [adminActivo, pestañaAdmin]);

  // Al cambiar el estado de adminActivo, automáticamente decidimos si mostramos el panel o no
  useEffect(() => {
    setVerPanelAdmin(adminActivo);
  }, [adminActivo]);

  // Funciones auxiliares para guardar cambios en LocalStorage
  const guardarUsuariosLocal = (nuevaLista) => {
    setRegistrosBase(nuevaLista);
    localStorage.setItem('astroshop_bd_usuarios', JSON.stringify(nuevaLista));
  };

  const guardarProductosLocal = (nuevaLista) => {
    setInventarioProductos(nuevaLista);
    localStorage.setItem('astroshop_bd_productos_v4', JSON.stringify(nuevaLista));
  };

  const handleAlternarEstadoUsuario = (id) => {
    const actualizados = registrosBase.map(u =>
      u.id === id ? { ...u, estado: u.estado === 'activo' ? 'inactivo' : 'activo' } : u
    );
    guardarUsuariosLocal(actualizados);
  };

  const handleCancelarEdicion = () => {
    setIdProdEditando(null);
    setProdNombre(''); setProdPrecio(''); setProdCategoria(''); setProdDescripcion(''); setProdImagen('');
  };

  const handleGuardarProducto = (e) => {
    e.preventDefault();

    if (!prodCategoria) {
      alert("Por favor, seleccione una categoría válida.");
      return;
    }

    const precioNum = parseInt(prodPrecio) || 0;
    const imagenUrl = prodImagen.trim() !== ''
      ? prodImagen.trim()
      : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop";

    if (idProdEditando) {
      const editados = inventarioProductos.map(p =>
        p.id === idProdEditando
          ? { ...p, nombre: prodNombre, precio: precioNum, categoria: prodCategoria, descripcion: prodDescripcion || p.descripcion, imagen: imagenUrl }
          : p
      );
      guardarProductosLocal(editados);
      setIdProdEditando(null);
      alert("Catálogo actualizado con éxito.");
    } else {
      const nuevoProd = {
        id: Date.now(),
        nombre: prodNombre,
        precio: precioNum,
        categoria: prodCategoria,
        descripcion: prodDescripcion || "Sin descripción detallada disponible.",
        imagen: imagenUrl
      };
      guardarProductosLocal([...inventarioProductos, nuevoProd]);
      alert("Nuevo producto añadido con éxito.");
    }

    setProdNombre(''); setProdPrecio(''); setProdDescripcion(''); setProdImagen(''); setProdCategoria('');
  };

  // Funciones básicas para administrar el Carrito de compras
  const agregarProducto = (producto) => {
    const encontrado = carrito.find(item => item.id === producto.id);
    if (encontrado) {
      setCarrito(carrito.map(item =>
        item.id === producto.id ? { ...encontrado, cantidad: encontrado.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, quantity: 1 }]);
    }
    setTotal(total + producto.precio);
  };

  const cambiarCantidad = (id, delta) => {
    const itemCarrito = carrito.find(item => item.id === id);
    if (!itemCarrito) return;

    if (itemCarrito.cantidad === 1 && delta === -1) {
      eliminarProducto(id);
      return;
    }

    setCarrito(carrito.map(item =>
      item.id === id ? { ...itemCarrito, cantidad: itemCarrito.cantidad + delta } : item
    ));
    setTotal(total + (itemCarrito.precio * delta));
  };

  const eliminarProducto = (id) => {
    const itemCarrito = carrito.find(item => item.id === id);
    if (itemCarrito) {
      setCarrito(carrito.filter(item => item.id !== id));
      setTotal(total - (itemCarrito.precio * itemCarrito.cantidad));
    }
  };

  // Función para procesar el pedido final hacia la API remota
  const grabarPedido = async (datosCliente) => {
    setMensajeError('');

    if (adminActivo) {
      alert("⚠️ Las cuentas de Administrador no pueden realizar compras.");
      return;
    }

    const costoEnvioFinal = deliveryChecked ? 2500 : 0;
    const rutEncriptado = encriptarRut(datosCliente.rutValidado);

    const pedidoPayload = {
      comprador_nombre: datosCliente.nombreCompleto,
      comprador_correo: datosCliente.correo,
      comprador_telefono: datosCliente.telefono,
      comprador_rut_aes: rutEncriptado,
      requiere_despacho: deliveryChecked,
      domicilio_entrega: direccion,
      artículos_comprados: carrito.map((i) => {
        return { id: i.id, nombre: i.nombre, cantidad: i.cantidad };
      }),
      monto_neto_transaccion: total,
      monto_total_pagado: total + costoEnvioFinal,
      fecha_registro: new Date().toISOString()
    };

    try {
      await guardarPedidoEnBD(pedidoPayload);
      alert(`¡Pedido Procesado con Éxito!\n\nTotal Pagado: $${(total + costoEnvioFinal).toLocaleString('es-CL')}`);

      setCarrito([]);
      setTotal(0);
      setVerFormulario(false);
      setRut('');
      setFechaNacimiento('');
      setDireccion('');
      setDeliveryChecked(false);
    } catch (err) {
      console.error(err);
      alert("Ocurrió un inconveniente al guardar tu compra: " + err.message);
    }
  };

  const formatearPrecio = (precioPesos) => {
    if (monedaActiva === 'UF') return `${(precioPesos / valoresDivisas.uf).toFixed(2)} UF`;
    if (monedaActiva === 'EUR') return `€ ${(precioPesos / valoresDivisas.eur).toFixed(2)}`;
    if (monedaActiva === 'UTM') return `${(precioPesos / valoresDivisas.utm).toFixed(2)} UTM`;
    return `$ ${Math.round(precioPesos).toLocaleString('es-CL')}`;
  };

  const cantidadTotalItems = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);

  if (cargandoAPI) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-info">
        <div className="text-center">
          <div className="spinner-border text-info mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
          <h5 className="text-uppercase fw-bold text-white mb-0" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>
            Cargando catálogo...
          </h5>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <MonitorDeRutas setAdminActivo={setAdminActivo} />

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
          adminActivo={adminActivo}
          setAdminActivo={setAdminActivo}
          monedaActiva={monedaActiva}
          setMonedaActiva={setMonedaActiva}
          // 🌟 PASAMOS EL NUEVO CONTROLADOR DE VISTA AL NAVBAR
          verPanelAdmin={verPanelAdmin}
          setVerPanelAdmin={setVerPanelAdmin}
        />

        {/* 🌟 CAMBIO ALUMNO: Si adminActivo Y verPanelAdmin son verdaderos, muestra las tablas, sino muestra las páginas normales */}
        {adminActivo && verPanelAdmin ? (
          <div className="bg-dark text-white flex-grow-1 p-5">
            <div className="container mt-4 bg-secondary bg-opacity-10 p-5 rounded border border-secondary shadow-sm">

              <div className="border-bottom border-secondary pb-3 mb-4">
                <h2 className="text-info text-uppercase fw-bold h4 m-0">Panel de Administración</h2>
                <p className="text-white-50 small m-0">Control de inventario, usuarios y registro de ventas</p>
              </div>

              <div className="btn-group mb-4" role="group">
                <button className={`btn btn-sm ${pestañaAdmin === 'usuarios' ? 'btn-info text-dark fw-bold' : 'btn-outline-info'}`} onClick={() => setPestañaAdmin('usuarios')}>
                  Cuentas
                </button>
                <button className={`btn btn-sm ${pestañaAdmin === 'productos' ? 'btn-info text-dark fw-bold' : 'btn-outline-info'}`} onClick={() => setPestañaAdmin('productos')}>
                  Productos
                </button>
                <button className={`btn btn-sm ${pestañaAdmin === 'pedidos' ? 'btn-info text-dark fw-bold' : 'btn-outline-info'}`} onClick={() => setPestañaAdmin('pedidos')}>
                  Historial de Pedidos
                </button>
              </div>

              {pestañaAdmin === 'usuarios' && (
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="h5 text-warning text-uppercase fw-bold m-0">Cuentas Registradas en el Sistema</h4>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-dark table-striped align-middle m-0" style={{ fontSize: '0.85rem' }}>
                        <thead>
                          <tr className="text-white border-bottom border-secondary">
                            <th>RUT</th>
                            <th>Nombre de Usuario</th>
                            <th>Correo Electrónico</th>
                            <th>Hash Contraseña</th>
                            <th>Estado Operativo</th>
                            <th className="text-center" style={{ width: '150px' }}>Gestión</th>
                          </tr>
                        </thead>
                        <tbody>
                          {registrosBase.map(reg => (
                            <tr key={reg.id}>
                              <td className="text-warning fw-semibold">{reg.rut}</td>
                              <td className="text-white fw-medium">{reg.nombre}</td>
                              <td className="text-white-50">{reg.correo}</td>
                              <td>
                                <div className="p-2 rounded bg-black border border-secondary border-opacity-25 text-warning text-truncate font-monospace" style={{ maxWidth: '180px', fontSize: '11px' }} title={reg.passwordEncriptada}>
                                  {reg.passwordEncriptada}
                                </div>
                              </td>
                              <td>
                                <span className={`badge ${reg.estado === 'activo' ? 'bg-success' : 'bg-danger'} text-white text-uppercase`} style={{ fontSize: '10px' }}>
                                  {reg.estado === 'activo' ? 'Permitido' : 'Suspendido'}
                                </span>
                              </td>
                              <td className="text-center">
                                <button className={`btn btn-xs w-100 ${reg.estado === 'activo' ? 'btn-outline-danger' : 'btn-success text-white'} py-1 px-2`} style={{ fontSize: '11px', fontWeight: '500' }} onClick={() => handleAlternarEstadoUsuario(reg.id)}>
                                  {reg.estado === 'activo' ? 'Deshabilitar' : 'Habilitar'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

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
                        <label className="form-label text-white small">Categoría:</label>
                        <select className="form-select bg-dark text-white border-secondary" value={prodCategoria} onChange={e => setProdCategoria(e.target.value)} required>
                          <option value="" disabled>-- Seleccione una categoría --</option>
                          <option value="telescopios">Telescopios</option>
                          <option value="cursos">Cursos Virtuales</option>
                          <option value="experiencias">Kits & Ciencia</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-white small">URL de la Imagen (Opcional):</label>
                        <input type="text" className="form-control bg-dark text-white border-secondary" placeholder="https://..." value={prodImagen} onChange={e => setProdImagen(e.target.value)} />
                      </div>
                      <div className="mb-4">
                        <label className="form-label text-white small">Descripción del Producto:</label>
                        <textarea className="form-control bg-dark text-white border-secondary" rows="2" placeholder="Detalles..." value={prodDescripcion} onChange={e => setProdDescripcion(e.target.value)}></textarea>
                      </div>

                      <div className="d-flex gap-2">
                        <button type="submit" className={`btn flex-grow-1 fw-bold text-uppercase py-2 ${idProdEditando ? 'btn-warning text-dark' : 'btn-info text-dark'}`} style={{ fontSize: '12px' }}>
                          {idProdEditando ? 'Actualizar' : 'Añadir Producto'}
                        </button>
                        {idProdEditando && (
                          <button type="button" className="btn btn-outline-secondary fw-bold text-uppercase py-2 px-3 text-white" style={{ fontSize: '12px' }} onClick={handleCancelarEdicion}>
                            Cancelar
                          </button>
                        )}
                      </div>
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
                                <button className="btn btn-sm btn-danger py-1 px-2" style={{ fontSize: '11px' }} onClick={() => guardarProductosLocal(inventarioProductos.filter(p => p.id !== prod.id))}>Eliminar</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {pestañaAdmin === 'pedidos' && (
                <div className="row">
                  <div className="col-12">
                    <h4 className="h5 text-warning text-uppercase fw-bold mb-4">Registro de Ventas</h4>
                    {historialPedidos.length === 0 ? (
                      <p className="text-white-50 bg-dark p-4 rounded text-center small border border-secondary border-opacity-25">
                        No se registran transacciones almacenadas en el servidor.
                      </p>
                    ) : (
                      <div className="table-responsive" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                        <table className="table table-dark table-striped align-middle m-0" style={{ fontSize: '0.8rem' }}>
                          <thead>
                            <tr className="text-white border-bottom border-secondary">
                              <th>N° Orden</th>
                              <th>Fecha</th>
                              <th>Cliente / Contacto</th>
                              <th>RUT Encriptado</th>
                              <th>Artículos</th>
                              <th>Destino de Entrega</th>
                              <th className="text-end">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {historialPedidos.map((pedido) => (
                              <tr key={pedido.id}>
                                <td className="text-info font-monospace fw-bold">#{pedido.id}</td>
                                <td className="text-white-50">{pedido.fecha_registro ? pedido.fecha_registro.split('T')[0] : 'S/F'}</td>
                                <td>
                                  <div className="text-white fw-medium">{pedido.comprador_nombre || 'Cliente General'}</div>
                                  <div className="text-info small">{pedido.comprador_correo || 'Sin correo'}</div>
                                  <div className="text-white-50 small" style={{ fontSize: '11px' }}>{pedido.comprador_telefono || 'Sin teléfono'}</div>
                                </td>
                                <td className="font-monospace text-white-50 small text-truncate" style={{ maxWidth: '120px' }} title={pedido.comprador_rut_aes}>
                                  {pedido.comprador_rut_aes}
                                </td>
                                <td>
                                  {pedido.artículos_comprados && pedido.artículos_comprados.map((art, idx) => (
                                    <div key={idx} className="small text-white-50">
                                      <span className="text-warning fw-semibold">{art.cantidad}x</span> {art.nombre}
                                    </div>
                                  ))}
                                </td>
                                <td className="small text-white-50" style={{ maxWidth: '200px' }}>
                                  <span className={`badge ${pedido.requiere_despacho ? 'bg-primary' : 'bg-secondary'} text-white d-inline-block mb-1`} style={{ fontSize: '9px' }}>
                                    {pedido.requiere_despacho ? 'Despacho' : 'Retiro'}
                                  </span>
                                  <div className="text-white text-wrap">{pedido.domicilio_entrega}</div>
                                </td>
                                <td className="text-success fw-bold text-end fs-6">
                                  ${Number(pedido.monto_total_pagado || 0).toLocaleString('es-CL')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
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
                  productosTelescopios={inventarioProductos.filter((p) => { return p.categoria === 'telescopios'; })}
                  productosCursos={inventarioProductos.filter((p) => { return p.categoria === 'cursos'; })}
                  productosExperiencias={inventarioProductos.filter((p) => { return p.categoria === 'experiencias'; })}
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