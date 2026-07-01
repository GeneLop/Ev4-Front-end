// src/Paginas/Terminos.jsx
import React from 'react';

function Terminos() {
    return (
        <div className="container py-5 text-white animate-fade-in">

            {/* ENCABEZADO DE LA PÁGINA */}
            <div className="row mb-5">
                <div className="col-12 border-bottom border-secondary pb-3">
                    <h1 className="h4 text-uppercase fw-bold text-info m-0">
                        Términos y Condiciones
                    </h1>
                </div>
            </div>

            {/* =======================================================================
                ESTILO 1: BOOTSTRAP FRAMEWORK (Alert estándar)
               ======================================================================= */}
            <div className="mb-5">
                <div className="alert border-primary text-white p-4 rounded-3" style={{ backgroundColor: '#1e2125' }}>
                    <h2 className="h6 fw-bold text-primary text-uppercase mb-3">
                        1. Registro de Usuarios y Datos Personales
                    </h2>
                    <p className="small m-0 lh-base">
                        De conformidad con la Ley Nº 19.628 sobre Protección de la Vida Privada, los datos ingresados en los formularios de registro (Nombre, RUT, Correo Electrónico) serán utilizados exclusivamente para validar los accesos al sistema y procesar las órdenes de compra. El usuario garantiza la autenticidad de los datos provistos y es el único responsable de mantener la confidencialidad de sus credenciales. La cuenta es personal e intransferible.
                    </p>
                </div>
            </div>

            {/* =======================================================================
                ESTILO 2: MATERIALIZE CSS (Card panel plano con sombra fuerte)
               ======================================================================= */}
            <div className="mb-5">
                <div className="p-4 border-0" style={{ backgroundColor: '#1a1a1a', borderLeft: '5px solid #ee6e73', borderRadius: '0px', boxShadow: '0 4px 10px 0 rgba(0,0,0,0.5), 0 4px 20px 0 rgba(0,0,0,0.3)' }}>
                    <h2 className="fw-bold text-uppercase mb-3" style={{ color: '#ee6e73', fontSize: '0.875rem', letterSpacing: '1px' }}>
                        2. Condiciones de Despacho y Entrega
                    </h2>
                    <p className="small m-0 lh-lg" style={{ color: '#e0e0e0' }}>
                        Las compras quedan sujetas a la disponibilidad de stock del inventario. Los costos de envío calculados se suman al valor neto de la transacción. Los plazos de entrega rigen a partir de la confirmación del pago. Para la Región de Magallanes, los tiempos de distribución pueden variar debido a retrasos logísticos por factores climáticos o de transporte en zonas extremas, lo cual será informado oportunamente.
                    </p>
                </div>
            </div>

            {/* =======================================================================
                ESTILO 3: BULMA CSS (Message Box estructurado)
               ======================================================================= */}
            <div className="mb-5">
                <div className="overflow-hidden border-0 mb-3" style={{ borderRadius: '4px', backgroundColor: '#202324' }}>
                    <div className="px-4 py-2 fw-bold text-white small text-uppercase" style={{ backgroundColor: '#48c774' }}>
                        3. Garantías, Cambios y Devoluciones
                    </div>
                    <div className="p-4 border-start border-success border-opacity-50" style={{ fontSize: '0.85rem', color: '#b5b5b5' }}>
                        Los productos comercializados cuentan con la garantía legal de seis meses estipulada en la Ley Nº 19.496 sobre Protección de los Derechos de los Consumidores. Los cambios o devoluciones por fallas de fabricación exigen la presentación de la boleta o comprobante de compra respectivo. La garantía no cubre daños provocados por el desarme, mala manipulación o el quiebre de componentes ópticos por parte del usuario.
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Terminos;