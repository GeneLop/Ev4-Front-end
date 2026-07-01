// src/Paginas/Nosotros.jsx
import React from 'react';

function Nosotros() {
    return (
        <div className="container py-5 text-white animate-fade-in">

            {/* 1. SECCIÓN ENCABEZADO */}
            <div className="row align-items-center mb-5 pb-5 border-bottom border-secondary border-opacity-25">
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <h2 className="text-info text-uppercase fw-black display-4 mb-0" style={{ letterSpacing: '-1px', lineHeight: '1.1' }}>
                        Sobre<br />Nosotros
                    </h2>
                    <div className="bg-info mt-3" style={{ height: '4px', width: '50px' }}></div>
                </div>
                <div className="col-lg-8 ps-lg-5">
                    {/* 🌟 CORREGIDO: Cambiado a text-white para máxima legibilidad */}
                    <p className="fs-5 text-white m-0 lh-base" style={{ fontWeight: '300' }}>
                        Somos una plataforma especializada en la gestión, distribution y capacitación en astronomía observacional. Nos enfocamos en resolver la brecha de acceso a equipamiento óptico y técnico en la Región de Magallanes, entregando soluciones centralizadas para la comunidad astronómica local.
                    </p>
                </div>
            </div>

            {/* 2. BLOQUE DE ENFOQUE */}
            <div className="p-4 p-md-5 rounded-4 mb-5 shadow-lg" style={{ backgroundColor: '#1a1d20', borderLeft: '4px solid #0dcaf0' }}>
                <div className="row g-4">
                    <div className="col-md-6 pe-md-4">
                        <h3 className="h4 fw-bold mb-3 text-white">Nuestra Misión</h3>
                        {/* 🌟 CORREGIDO: Cambiado a text-white */}
                        <p className="text-white small m-0 lh-lg">
                            Facilitar el acceso a instrumental óptico de alta precisión y herramientas didácticas especializadas mediante un canal de distribución eficiente. Complementamos nuestra oferta con programas de formación técnica estructurados para optimizar el uso de tecnologías de observación en el hemisferio austral.
                        </p>
                    </div>
                    <div className="col-md-6 border-start border-secondary border-opacity-25 ps-md-4">
                        <h3 className="h4 fw-bold mb-3 text-white">Nuestra Visión</h3>
                        {/* 🌟 CORREGIDO: Cambiado a text-white */}
                        <p className="text-white small m-0 lh-lg">
                            Convertirnos en el principal referente logístico y educativo en astronomía de la zona austral, promoviendo el desarrollo de competencias técnicas en aficionados, estudiantes e instituciones interesadas en el estudio y registro del cielo nocturno.
                        </p>
                    </div>
                </div>
            </div>

            {/* Título de la sección inferior */}
            <div className="mb-4 pt-2 ps-2">
                <h3 className="text-info text-uppercase fw-bold h5 mb-0" style={{ letterSpacing: '1px' }}>Cómo Trabajamos</h3>
            </div>

            {/* 3. PANELES DE TRABAJO */}
            <div className="d-flex flex-column g-4 gap-4">
                {/* Panel 01 */}
                <div className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: '#1a1d20', borderLeft: '4px solid #0dcaf0' }}>
                    <div className="row align-items-center">
                        <div className="col-md-4 mb-2 mb-md-0">
                            <h5 className="text-info fw-bold small text-uppercase mb-0">01 / Control de Calidad</h5>
                        </div>
                        <div className="col-md-8 border-start border-secondary border-opacity-25 ps-md-4">
                            {/* 🌟 CORREGIDO: Cambiado a text-white */}
                            <p className="text-white small m-0 lh-base">
                                Sometemos cada componente e instrumental óptico a validaciones técnicas para garantizar su correcto desempeño operativo en condiciones extremas.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Panel 02 */}
                <div className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: '#1a1d20', borderLeft: '4px solid #ffc107' }}>
                    <div className="row align-items-center">
                        <div className="col-md-4 mb-2 mb-md-0">
                            <h5 className="text-warning fw-bold small text-uppercase mb-0">02 / Formación Técnica</h5>
                        </div>
                        <div className="col-md-8 border-start border-secondary border-opacity-25 ps-md-4">
                            {/* 🌟 CORREGIDO: Cambiado a text-white */}
                            <p className="text-white small m-0 lh-base">
                                Capacitaciones con metodología progresiva enfocadas en el montaje mecánico, alineación óptica y uso avanzado de software estelar.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Panel 03 */}
                <div className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: '#1a1d20', borderLeft: '4px solid #198754' }}>
                    <div className="row align-items-center">
                        <div className="col-md-4 mb-2 mb-md-0">
                            <h5 className="text-success fw-bold small text-uppercase mb-0">03 / Soporte Operativo</h5>
                        </div>
                        <div className="col-md-8 border-start border-secondary border-opacity-25 ps-md-4">
                            {/* 🌟 CORREGIDO: Cambiado a text-white */}
                            <p className="text-white small m-0 lh-base">
                                Brindamos asistencia postventa orientada a resolver dudas de configuración, calibración de monturas y mantenimiento básico de los equipos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Nosotros;