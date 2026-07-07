import React, { useState } from 'react';

function Terminos() {
    const [estiloActivo, setEstiloActivo] = useState('todos');
    return (
        <div className="container py-5 text-white animate-fade-in">

            <div className="row align-items-center mb-5 pb-5 border-bottom border-secondary border-opacity-25">
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <h2 className="text-info text-uppercase fw-black display-4 mb-0">
                        <i className="bi bi-file-earmark-text me-2"></i>
                        Términos y<br />Condiciones
                    </h2>
                    <div className="bg-info mt-3" style={{ height: '4px', width: '50px' }}></div>
                </div>
                <div className="col-lg-8 ps-lg-5">
                    <p className="fs-5 text-white m-0 lh-base" style={{ fontWeight: '400' }}>
                        Por favor, lee atentamente las condiciones comerciales que rigen el uso de nuestra plataforma virtual, la adquisición de equipamiento técnico y el acceso a los programas de formación en la Región de Magallanes.
                    </p>
                </div>
            </div>

            <div className="mb-4 d-flex flex-wrap gap-2 justify-content-center bg-dark p-3 rounded-3 border border-secondary border-opacity-25">
                <button
                    onClick={() => setEstiloActivo('todos')}
                    className={`btn btn-sm ${estiloActivo === 'todos' ? 'btn-info' : 'btn-outline-secondary text-white'}`}
                >
                    Ver Todos los Estilos
                </button>
                <button
                    onClick={() => setEstiloActivo('bootstrap')}
                    className={`btn btn-sm ${estiloActivo === 'bootstrap' ? 'btn-primary' : 'btn-outline-secondary text-white'}`}
                >
                    Bootstrap
                </button>
                <button
                    onClick={() => setEstiloActivo('materialize')}
                    className={`btn btn-sm ${estiloActivo === 'materialize' ? 'btn-warning text-dark' : 'btn-outline-secondary text-white'}`}
                    style={estiloActivo === 'materialize' ? { backgroundColor: '#ee6e73', borderColor: '#ee6e73' } : {}}
                >
                    Materialize
                </button>
                <button
                    onClick={() => setEstiloActivo('bulma')}
                    className={`btn btn-sm ${estiloActivo === 'bulma' ? 'btn-success' : 'btn-outline-secondary text-white'}`}
                    style={estiloActivo === 'bulma' ? { backgroundColor: '#48c774', borderColor: '#48c774' } : {}}
                >
                    Bulma
                </button>
            </div>

            {(estiloActivo === 'todos' || estiloActivo === 'bootstrap') && (
                <div className="mb-5 animate-fade-in">
                    <span className="badge bg-primary mb-2">Bootstrap</span>
                    <div className="alert border-primary text-white p-4 rounded-3" style={{ backgroundColor: '#1e2125' }}>
                        <h2 className="h6 fw-bold text-primary text-uppercase mb-3" style={{ letterSpacing: '0.5px' }}>
                            1. Registro de Usuarios y Protección de Datos Personales
                        </h2>
                        <p className="small m-0 lh-base" style={{ color: '#f8fafc' }}>
                            De conformidad con la Ley Nº 19.628 sobre Protección de la Vida Privada, los datos ingresados en los formularios de registro (tales como Nombre Completo, RUT, Dirección y Correo Electrónico) serán utilizados exclusivamente para validar los accesos al sistema informático y procesar correctamente las órdenes de compra. El usuario garantiza la total autenticidad de los datos provistos y es el único responsable de mantener la confidencialidad de sus credenciales de acceso. La cuenta de usuario es estrictamente personal e intransferible.
                        </p>
                    </div>
                </div>
            )}

            {(estiloActivo === 'todos' || estiloActivo === 'materialize') && (
                <div className="mb-5 animate-fade-in">
                    <span className="badge mb-2" style={{ backgroundColor: '#ee6e73' }}>Materialize</span>
                    <div className="p-4 border-0" style={{ backgroundColor: '#1a1a1a', borderLeft: '5px solid #ee6e73', borderRadius: '0px', boxShadow: '0 4px 10px 0 rgba(0,0,0,0.5), 0 4px 20px 0 rgba(0,0,0,0.3)' }}>
                        <h2 className="fw-bold text-uppercase mb-3" style={{ color: '#ee6e73', fontSize: '0.875rem', letterSpacing: '1px' }}>
                            2. Condiciones de Logística, Despacho y Entrega
                        </h2>
                        <p className="small m-0 lh-lg" style={{ color: '#e0e0e0' }}>
                            Todas las compras quedan estrictamente sujetas a la disponibilidad de stock del inventario centralizado. Los costos de envío calculados se sumarán de manera transparente al valor neto de la transacción antes de procesar el pago. Los plazos estimados rigen a partir de la confirmación bancaria del pago. <strong>Nota geográfica:</strong> Para la Región de Magallanes y zonas extremas, los tiempos finales de distribución pueden presentar variaciones debido a retrasos logísticos derivados de factores climáticos adversos o conectividad de transporte, lo cual será debidamente notificado.
                        </p>
                    </div>
                </div>
            )}

            {(estiloActivo === 'todos' || estiloActivo === 'bulma') && (
                <div className="mb-5 animate-fade-in">
                    <span className="badge mb-2" style={{ backgroundColor: '#48c774' }}>Bulma</span>
                    <div className="overflow-hidden border-0 mb-3" style={{ borderRadius: '4px', backgroundColor: '#202324' }}>
                        <div className="px-4 py-2 fw-bold text-white small text-uppercase" style={{ backgroundColor: '#48c774', letterSpacing: '0.5px' }}>
                            3. Políticas de Garantías, Cambios y Devoluciones Técnicas
                        </div>
                        <div className="p-4 border-start border-success border-opacity-50" style={{ fontSize: '0.85rem', color: '#b5b5b5', lineHeight: '1.6' }}>
                            Los productos de hardware y equipamiento comercializados cuentan con la garantía legal de seis meses estipulada en la Ley Nº 19.496 sobre Protección de los Derechos de los Consumidores. Los cambios o solicitudes de devolución por fallas demostrables de fabricación exigen la presentación obligatoria de la boleta, factura o comprobante de compra respectivo. Esta garantía técnica no cubrirá, bajo ninguna circunstancia, daños provocados por el desarme no autorizado, mala manipulación o el quiebre accidental de componentes ópticos/electrónicos por parte del usuario.
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Terminos;