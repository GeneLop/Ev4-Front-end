import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Componentes/Navbar';
import Footer from './Componentes/Footer';

import Inicio from './Paginas/Inicio';
import Nosotros from './Paginas/Nosotros';
import Contacto from './Paginas/Contacto';
import Terminos from './Paginas/Terminos';
import Manual from './Paginas/Manual';

// Funciones de ayuda para el rut y todo el otro formulario dsps
import { encriptarRut, guardarPedidoEnBD } from './funciones';


function MonitorDeRutas({ setAdminActivo }) {
  return null;
}

function App() {
  // Estados de la aplicación
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [adminActivo, setAdminActivo] = useState(false);
  const [pestañaAdmin, setPestañaAdmin] = useState('usuarios');
  const [cargandoAPI, setCargandoAPI] = useState(true);

  // Controlar si se ve el panel de administración
  const [verPanelAdmin, setVerPanelAdmin] = useState(false);

  // Estados de las monedas
  const [moneda, setmoneda] = useState('CLP');
  const [divisas, setdivisas] = useState({ uf: 1, eur: 1, utm: 1 });

  // Estados de los datos 
  const [usuarios, setusuarios] = useState([]);
  const [productos, setproductos] = useState([]);

  // Estados para el formulario de editar/añadir productos
  const [idProdEditando, setIdProdEditando] = useState(null);
  const [nombreProd, setnombreProd] = useState('');
  const [precioProd, setprecioProd] = useState('');
  const [categoriaProd, setcategoriaProd] = useState('');
  const [descripcionProd, setdescripcionProd] = useState('');
  const [imagenProd, setimagenProd] = useState('');

  // Lista de pedidos guardados
  const [pedidos, setpedidos] = useState([]);

  // Estados del carrito de compras
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [verFormulario, setVerFormulario] = useState(false);
  const [conEnvio, setconEnvio] = useState(false);
  const [direccion, setDireccion] = useState('');
  const [rut, setRut] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [edad, setEdad] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  //Cargar el valor de las monedas desde la API
  useEffect(() => {
    const obtenerDivisas = async () => {
      try {
        const res = await fetch('https://mindicador.cl/api');
        const datos = await res.json();
        setdivisas({
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

  //Cargar los usuarios y los productos iniciales
  useEffect(() => {
    const bdLocal = localStorage.getItem('astroshop_bd_usuarios');
    if (bdLocal) {
      setusuarios(JSON.parse(bdLocal));
    } else {
      const usuariosIniciales = [
        { id: "1", nombre: "James Hewstone", rut: "12.345.678-9", correo: "j.hewstone@admin.cl", estado: "activo", passwordEncriptada: "$2a$12$K7Y8mN92PzQ1wXvR3bT5eO2gH4jK" },
        { id: "2", nombre: "Antonia Astrea", rut: "20.441.302-K", correo: "antonia@explorador.cl", estado: "activo", passwordEncriptada: "$2a$12$X9vW2zQ1mN82P7bT5eO4jK3bH2gM" }
      ];
      setusuarios(usuariosIniciales);
      localStorage.setItem('astroshop_bd_usuarios', JSON.stringify(usuariosIniciales));
    }

    // Carga de productos
    const prodLocal = localStorage.getItem('astroshop_bd_productos_v4');
    if (prodLocal) {
      setproductos(JSON.parse(prodLocal));
      setCargandoAPI(false);
    } else {
      fetch("https://6a455557aab3faec3f69d15d.mockapi.io/Productos")
        .then(res => res.json())
        .then(datos => {
          setproductos(datos);
          localStorage.setItem("astroshop_bd_productos_v4", JSON.stringify(datos));
          setCargandoAPI(false);
        })
        .catch(err => {
          console.error("Error al cargar catálogo:", err);
          setCargandoAPI(false);
        });
    }
  }, []);

  //Traer los pedidos si el admin está activo
  useEffect(() => {
    if (adminActivo) {
      fetch("https://6a455557aab3faec3f69d15d.mockapi.io/pedidos")
        .then(res => res.json())
        .then(datos => {
          setpedidos(datos.reverse());
        })
        .catch(err => console.error("Error al recuperar pedidos:", err));
    }
  }, [adminActivo, pestañaAdmin]);

  // Cambiar la vista si cambia el estado del admin
  useEffect(() => {
    setVerPanelAdmin(adminActivo);
  }, [adminActivo]);

  // Funciones LocalStorage
  const guardarUsuarios = (nuevaLista) => {
    setusuarios(nuevaLista);
    localStorage.setItem('astroshop_bd_usuarios', JSON.stringify(nuevaLista));
  };

  const guardarProductos = (nuevaLista) => {
    setproductos(nuevaLista);
    localStorage.setItem('astroshop_bd_productos_v4', JSON.stringify(nuevaLista));
  };

  const cambiarEstadoUsuario = (id) => {
    const actualizados = usuarios.map(u =>
      u.id === id ? { ...u, estado: u.estado === 'activo' ? 'inactivo' : 'activo' } : u
    );
    guardarUsuarios(actualizados);
  };

  const cancelarEdit = () => {
    setIdProdEditando(null);
    setnombreProd(''); setprecioProd(''); setcategoriaProd(''); setdescripcionProd(''); setimagenProd('');
  };

  const guardarProducto = (e) => {
    e.preventDefault();

    if (!categoriaProd) {
      alert("Por favor, seleccione una categoría válida.");
      return;
    }

    const precio = parseInt(precioProd) || 0;
    const imagen = imagenProd.trim() !== ''
      ? imagenProd.trim()
      : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop";

    if (idProdEditando) {
      const nuevosProductos = productos.map(p =>
        p.id === idProdEditando
          ? { ...p, nombre: nombreProd, precio: precio, categoria: categoriaProd, descripcion: descripcionProd || p.descripcion, imagen: imagen }
          : p
      );
      guardarProductos(nuevosProductos);
      setIdProdEditando(null);
      alert("Catálogo actualizado con éxito.");
    } else {
      const nuevoProd = {
        id: Date.now(),
        nombre: nombreProd,
        precio: precio,
        categoria: categoriaProd,
        descripcion: descripcionProd || "Por favor, seleccione una categoría válida.",
        imagen: imagen
      };
      guardarProductos([...productos, nuevoProd]);
      alert("producto añadido con éxito.");
    }

    setnombreProd(''); setprecioProd(''); setdescripcionProd(''); setimagenProd(''); setcategoriaProd('');
  };

  // Funciones del carrito de compras
  const agregarProducto = (producto) => {
    const encontrado = carrito.find(item => item.id === producto.id);
    if (encontrado) {
      setCarrito(carrito.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    setTotal(prev => prev + Number(producto.precio));
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

  // Enviar el pedido 
  const finalizarCompra = async (datosCliente) => {
    setMensajeError('');

    if (adminActivo) {
      alert("Las cuentas de Administrador no pueden realizar compras.");
      return;
    }

    const envio = conEnvio ? 2500 : 0;
    const rutEncriptado = encriptarRut(datosCliente.rutValidado);

    const datosPedido = {
      comprador_nombre: datosCliente.nombreCompleto,
      comprador_correo: datosCliente.correo,
      comprador_telefono: datosCliente.telefono,
      comprador_rut_aes: rutEncriptado,
      metodo_pago: datosCliente.metodoPago,
      requiere_despacho: conEnvio,
      domicilio_entrega: direccion,
      artículos_comprados: carrito.map((i) => {
        return { id: i.id, nombre: i.nombre, cantidad: i.cantidad };
      }),
      monto_neto_transaccion: total,
      monto_total_pagado: total + envio,
      fecha_registro: new Date().toISOString()
    };

    try {
      await guardarPedidoEnBD(datosPedido);
      setMensajeExito(`¡Gracias por tu compra en AstroShop!

Hemos recibido tu pedido correctamente.

Total Pagado: ${formatearPrecio(total + envio)}

¿Qué sigue ahora?
- Recibirás un correo con el seguimiento de tus productos físicos.
- Si compraste cursos, revisa tu bandeja de entrada (incluyendo spam) para obtener tus credenciales de acceso.

Gracias por confiar en nosotros.`);

      setMostrarModalExito(true);

      setCarrito([]);
      setTotal(0);
      setVerFormulario(false);
      setRut('');
      setFechaNacimiento('');
      setDireccion('');
      setconEnvio(false);
    } catch (err) {
      console.error(err);
      alert("Ocurrió un inconveniente al guardar tu compra: " + err.message);
    }
  };

  const formatearPrecio = (precioPesos) => {
    if (moneda === 'UF') {
      return `${(precioPesos / divisas.uf).toFixed(2)} UF`;
    }

    if (moneda === 'EUR') {
      return `€ ${(precioPesos / divisas.eur).toFixed(2)}`;
    }

    if (moneda === 'UTM') {
      return `${(precioPesos / divisas.utm).toFixed(2)} UTM`;
    }

    return `$ ${Math.round(precioPesos).toLocaleString('es-CL')}`;
  };
  // productos del carrooo
  const cantidadCarrito = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);

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
      {mostrarModalExito && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            fontFamily: "Arial, Helvetica, sans-serif"
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white border border-info">

              <div className="modal-header border-secondary">
                <h5 className="modal-title text-info d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill"></i>
                  Compra realizada con éxito
                </h5>
              </div>
              <div
                className="modal-body"
                style={{
                  whiteSpace: 'pre-line',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  padding: '20px'
                }}
              >
                {mensajeExito}
              </div>

              <div className="modal-footer border-secondary">
                <button
                  className="btn btn-info text-dark fw-bold"
                  onClick={() => setMostrarModalExito(false)}
                >
                  <i className="bi bi-x-lg me-1"></i>
                  Cerrar
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
      <MonitorDeRutas setAdminActivo={setAdminActivo} />

      <div className="d-flex flex-column min-vh-screen bg-dark">
        <Navbar
          cantidadCarrito={cantidadCarrito}
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
          onFinalizar={finalizarCompra}
          adminActivo={adminActivo}
          setAdminActivo={setAdminActivo}
          moneda={moneda}
          setmoneda={setmoneda}

          verPanelAdmin={verPanelAdmin}
          setVerPanelAdmin={setVerPanelAdmin}
        />

        {adminActivo && verPanelAdmin ? (
          <div className="bg-dark text-white flex-grow-1 p-5">
            <div className="container mt-4 bg-secondary bg-opacity-10 p-5 rounded border border-secondary shadow-sm">

              <div className="border-bottom border-secondary pb-3 mb-4">
                <h2 className="text-info text-uppercase fw-bold h4 m-0">Panel de Administración</h2>
                <p className="text-white small m-0">Control de inventario, usuarios y registro de ventas</p>
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
                            <th>Contraseña</th>
                            <th>Estado</th>
                            <th className="text-center" style={{ width: '150px' }}>Gestión</th>
                          </tr>
                        </thead>
                        <tbody>
                          {usuarios.map(reg => (
                            <tr key={reg.id}>
                              <td className="text-warning fw-semibold">{reg.rut}</td>
                              <td className="text-white fw-medium">{reg.nombre}</td>
                              <td className="text-white">{reg.correo}</td>
                              <td>
                                <div className="p-2 border border-secondary text-info font-monospace"
                                  style={{
                                    fontSize: '11px',
                                    backgroundColor: '#1a1d20',
                                    color: '#36d399',
                                    wordBreak: 'break-all',
                                    borderRadius: '4px'
                                  }}>
                                  {reg.passwordEncriptada || "Error al generar Hash"}
                                </div>
                              </td>
                              <td>
                                <span className={`badge ${reg.estado === 'activo' ? 'bg-success' : 'bg-danger'} text-white text-uppercase`} style={{ fontSize: '10px' }}>
                                  {reg.estado === 'activo' ? 'Permitido' : 'Suspendido'}
                                </span>
                              </td>
                              <td className="text-center">
                                <button className={`btn btn-xs w-100 ${reg.estado === 'activo' ? 'btn-outline-danger' : 'btn-success text-white'} py-1 px-2`} style={{ fontSize: '11px', fontWeight: '500' }} onClick={() => cambiarEstadoUsuario(reg.id)}>
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
                    <form onSubmit={guardarProducto}>
                      <div className="mb-3">
                        <label className="form-label text-white small">Nombre del Artículo:</label>
                        <input type="text" className="form-control bg-dark text-white border-secondary" value={nombreProd} onChange={e => setnombreProd(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-white small">Precio Unitario ($):</label>
                        <input type="number" className="form-control bg-dark text-white border-secondary" value={precioProd} onChange={e => setprecioProd(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-white small">Categoría:</label>
                        <select className="form-select bg-dark text-white border-secondary" value={categoriaProd} onChange={e => setcategoriaProd(e.target.value)} required>
                          <option value="" disabled>-- Seleccione una categoría --</option>
                          <option value="telescopios">Telescopios</option>
                          <option value="cursos">Cursos Virtuales</option>
                          <option value="experiencias">Kits & Ciencia</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-white small">URL de la Imagen (Opcional):</label>
                        <input type="text" className="form-control bg-dark text-white border-secondary" placeholder="https://..." value={imagenProd} onChange={e => setimagenProd(e.target.value)} />
                      </div>
                      <div className="mb-4">
                        <label className="form-label text-white small">Descripción del Producto:</label>
                        <textarea className="form-control bg-dark text-white border-secondary" rows="2" placeholder="Detalles..." value={descripcionProd} onChange={e => setdescripcionProd(e.target.value)}></textarea>
                      </div>

                      <div className="d-flex gap-2">
                        <button type="submit" className={`btn flex-grow-1 fw-bold text-uppercase py-2 ${idProdEditando ? 'btn-warning text-dark' : 'btn-info text-dark'}`} style={{ fontSize: '12px' }}>
                          {idProdEditando ? 'Actualizar' : 'Añadir Producto'}
                        </button>
                        {idProdEditando && (
                          <button type="button" className="btn btn-outline-secondary fw-bold text-uppercase py-2 px-3 text-white" style={{ fontSize: '12px' }} onClick={cancelarEdit}>
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
                          {productos.map(prod => (
                            <tr key={prod.id}>
                              <td className="text-white font-monospace small">{prod.id}</td>
                              <td className="fw-semibold text-white">{prod.nombre}</td>
                              <td><span className="badge bg-secondary text-white text-uppercase" style={{ fontSize: '10px' }}>{prod.categoria}</span></td>
                              <td className="text-info fw-bold">${prod.precio.toLocaleString('es-CL')}</td>
                              <td className="text-center">
                                <button className="btn btn-sm btn-warning py-1 px-2 me-2" style={{ fontSize: '11px' }} onClick={() => { setIdProdEditando(prod.id); setnombreProd(prod.nombre); setprecioProd(prod.precio); setcategoriaProd(prod.categoria); setdescripcionProd(prod.descripcion || ''); setimagenProd(prod.imagen || ''); }}>Editar</button>
                                <button
                                  className="btn btn-sm btn-danger py-1 px-2"
                                  style={{ fontSize: '11px' }}
                                  onClick={() => {
                                    if (window.confirm(`¿Estás seguro de que deseas eliminar el producto: "${prod.nombre}"?`)) {
                                      guardarProductos(productos.filter(p => p.id !== prod.id));
                                    }
                                  }}
                                >
                                  Eliminar
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

              {pestañaAdmin === 'pedidos' && (
                <div className="row">
                  <div className="col-12">
                    <h4 className="h5 text-warning text-uppercase fw-bold mb-4">Registro de Ventas</h4>
                    {pedidos.length === 0 ? (
                      <p className="text-white bg-dark p-4 rounded text-center small border border-secondary border-opacity-25">
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
                              <th>RUT</th>
                              <th>Artículos</th>
                              <th>Pago</th>
                              <th>Tipo de entrega</th>
                              <th className="text-end text-white">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pedidos.map((pedido) => (
                              <tr key={pedido.id}>
                                <td className="text-info font-monospace fw-bold">#{pedido.id}</td>
                                <td className="text-white">{pedido.fecha_registro ? pedido.fecha_registro.split('T')[0] : 'S/F'}</td>
                                <td>
                                  <div className="text-white fw-medium">
                                    {pedido.comprador_nombre || "Cliente General"}
                                  </div>

                                  <div className="small text-white">
                                    Correo: •••••••••••
                                  </div>

                                  <div className="small text-white">
                                    Teléfono: ••••••••
                                  </div>
                                </td>
                                <td className="font-monospace text-white small text-truncate" style={{ maxWidth: '120px' }} title={pedido.comprador_rut_aes}>
                                  {pedido.comprador_rut_aes}
                                </td>
                                <td>
                                  {pedido.artículos_comprados && pedido.artículos_comprados.map((art, idx) => (
                                    <div key={idx} className="small text-white">
                                      <span className="text-warning fw-semibold">{art.cantidad}x</span> {art.nombre}
                                    </div>
                                  ))}
                                </td>
                                <td className="text-white">
                                  {pedido.metodo_pago || "No registrado"}
                                </td>
                                <td className="small text-white" style={{ maxWidth: '200px' }}>
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
                  productosTelescopios={productos.filter((p) => { return p.categoria === 'telescopios'; })}
                  productosCursos={productos.filter((p) => { return p.categoria === 'cursos'; })}
                  productosExperiencias={productos.filter((p) => { return p.categoria === 'experiencias'; })}
                  agregarProducto={agregarProducto}
                  formatearPrecio={formatearPrecio}
                />
              } />
              <Route path="/nosotros" element={<Nosotros />} />
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