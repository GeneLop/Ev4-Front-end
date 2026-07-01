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
                    <p className="fs-5 text-white m-0 lh-base" style={{ fontWeight: '400' }}>
                        Somos una plataforma especializada en la gestión, distribución y capacitación en astronomía observacional. Nos enfocamos en resolver la brecha de acceso a equipamiento óptico y técnico en la Región de Magallanes, entregando soluciones centralizadas para la comunidad astronómica local.
                    </p>
                </div>
            </div>

            {/* 2. BLOQUE DE ENFOQUE (MISIÓN Y VISIÓN) */}
            <div className="p-4 p-md-5 rounded-4 mb-4 shadow-lg" style={{ backgroundColor: '#1a1d20', borderLeft: '4px solid #0dcaf0' }}>
                <div className="row g-4">
                    <div className="col-md-6 pe-md-4">
                        <h3 className="h4 fw-bold mb-3 text-white d-flex align-items-center gap-2">
                            Nuestra Misión
                        </h3>
                        <p className="text-white small m-0 lh-lg">
                            Facilitar el acceso a instrumental óptico de alta precisión y herramientas didácticas especializadas mediante un canal de distribución eficiente. Complementamos nuestra oferta con programas de formación técnica estructurados para optimizar el uso de tecnologías de observación en el hemisferio austral.
                        </p>
                    </div>
                    <div className="col-md-6 border-start border-secondary border-opacity-25 ps-md-4">
                        <h3 className="h4 fw-bold mb-3 text-white d-flex align-items-center gap-2">
                            Nuestra Visión
                        </h3>
                        <p className="text-white small m-0 lh-lg">
                            Convertirnos en el principal referente logístico y educativo en astronomía de la zona austral, promoviendo el desarrollo de competencias técnicas en aficionados, estudiantes e instituciones interesadas en el estudio y registro del cielo nocturno.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. SECCIÓN: INDICADORES TÉCNICOS / MÉTRICAS DE IMPACTO (MÁS CLARAS IMPOSIBLE) */}
            <div className="row g-3 mb-5 text-center">
                <div className="col-6 col-md-3">
                    <div className="p-3 rounded-4 h-100" style={{ backgroundColor: '#141619', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="display-6 fw-black text-info font-monospace">100%</div>
                        <div className="text-white-50 uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '1px' }}>Calidad Verificada</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="p-3 rounded-4 h-100" style={{ backgroundColor: '#141619', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="display-6 fw-black text-warning font-monospace">+240</div>
                        <div className="text-white-50 uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '1px' }}>Alumnos Online</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="p-3 rounded-4 h-100" style={{ backgroundColor: '#141619', border: '1px solid rgba(255,255,255,0.05)' }}>
                        {/* 🌟 CAMBIADO: Mucho más entendible */}
                        <div className="display-6 fw-black text-success font-monospace">+20</div>
                        <div className="text-white-50 uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '1px' }}>Telescopios Disponibles</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="p-3 rounded-4 h-100" style={{ backgroundColor: '#141619', border: '1px solid rgba(255,255,255,0.05)' }}>
                        {/* 🌟 CAMBIADO: Simple, directo y al grano */}
                        <div className="display-6 fw-black text-danger font-monospace">+10</div>
                        <div className="text-white-50 uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '1px' }}>Cursos Activos</div>
                    </div>
                </div>
            </div>

            {/* Título de la sección inferior */}
            <div className="mb-4 pt-2 ps-2">
                <h3 className="text-info text-uppercase fw-bold h5 mb-0" style={{ letterSpacing: '1px' }}>Cómo Trabajamos</h3>
            </div>

            {/* 4. PANELES DE TRABAJO */}
            <div className="d-flex flex-column gap-4">
                {/* Panel 01 */}
                <div className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: '#1a1d20', borderLeft: '4px solid #0dcaf0' }}>
                    <div className="row align-items-center">
                        <div className="col-md-4 mb-2 mb-md-0 d-flex align-items-center gap-3">
                            <div className="rounded-circle bg-info bg-opacity-10 d-none d-md-flex align-items-center justify-content-center text-info fw-bold" style={{ width: '40px', height: '40px', fontSize: '14px', border: '1px solid #0dcaf0' }}>✓</div>
                            <h5 className="text-info fw-bold small text-uppercase mb-0">01 / Control de Calidad</h5>
                        </div>
                        <div className="col-md-8 border-start border-secondary border-opacity-25 ps-md-4">
                            <p className="text-white small m-0 lh-base">
                                Sometemos cada componente e instrumental óptico a validaciones técnicas para garantizar su correcto desempeño operativo en condiciones extremas.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Panel 02 */}
                <div className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: '#1a1d20', borderLeft: '4px solid #ffc107' }}>
                    <div className="row align-items-center">
                        <div className="col-md-4 mb-2 mb-md-0 d-flex align-items-center gap-3">
                            <div className="rounded-circle bg-warning bg-opacity-10 d-none d-md-flex align-items-center justify-content-center text-warning fw-bold" style={{ width: '40px', height: '40px', fontSize: '14px', border: '1px solid #ffc107' }}>◈</div>
                            <h5 className="text-warning fw-bold small text-uppercase mb-0">02 / Formación Técnica</h5>
                        </div>
                        <div className="col-md-8 border-start border-secondary border-opacity-25 ps-md-4">
                            <p className="text-white small m-0 lh-base">
                                Capacitaciones con metodología progresiva enfocadas en el montaje mecánico, alineación óptica y uso avanzado de software estelar.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Panel 03 */}
                <div className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: '#1a1d20', borderLeft: '4px solid #198754' }}>
                    <div className="row align-items-center">
                        <div className="col-md-4 mb-2 mb-md-0 d-flex align-items-center gap-3">
                            <div className="rounded-circle bg-success bg-opacity-10 d-none d-md-flex align-items-center justify-content-center text-success fw-bold" style={{ width: '40px', height: '40px', fontSize: '14px', border: '1px solid #198754' }}>⚙</div>
                            <h5 className="text-success fw-bold small text-uppercase mb-0">03 / Soporte Operativo</h5>
                        </div>
                        <div className="col-md-8 border-start border-secondary border-opacity-25 ps-md-4">
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