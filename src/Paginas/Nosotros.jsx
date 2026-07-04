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
                        Somos una plataforma especializada en la gestión, distribución y capacitación en astronomía observacional. Nos enfocamos en resolver la brecha de acceso a equipamiento óptico y técnico en la Región de Magallanes.
                    </p>
                </div>
            </div>

            {/* 2. BLOQUE DE ENFOQUE (MISIÓN Y VISIÓN) - TEXTO BLANCO PURO */}
            <div className="p-4 p-md-5 rounded-4 mb-4 shadow-lg" style={{ backgroundColor: '#2c313a', borderLeft: '6px solid #0dcaf0' }}>
                <div className="row g-4">
                    <div className="col-md-6 pe-md-4">
                        <h3 className="h4 fw-bold mb-3 text-info d-flex align-items-center gap-2">
                            Nuestra Misión
                        </h3>
                        <p className="text-white small m-0 lh-lg">
                            Facilitar el acceso a instrumental óptico de alta precisión y herramientas didácticas especializadas mediante un canal de distribución eficiente.
                        </p>
                    </div>
                    <div className="col-md-6 border-start border-secondary ps-md-4">
                        <h3 className="h4 fw-bold mb-3 text-info d-flex align-items-center gap-2">
                            Nuestra Visión
                        </h3>
                        <p className="text-white small m-0 lh-lg">
                            Convertirnos en el principal referente logístico y educativo en astronomía de la zona austral, promoviendo el desarrollo de competencias técnicas.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. INDICADORES TÉCNICOS - TEXTO BLANCO PURO */}
            <div className="row g-3 mb-5 text-center">
                {[
                    { val: "100%", txt: "Calidad Verificada", color: "text-info" },
                    { val: "+240", txt: "Alumnos Online", color: "text-warning" },
                    { val: "+20", txt: "Telescopios", color: "text-success" },
                    { val: "+10", txt: "Cursos Activos", color: "text-danger" }
                ].map((item, i) => (
                    <div key={i} className="col-6 col-md-3">
                        <div className="p-4 rounded-4 h-100 shadow-sm" style={{ backgroundColor: '#2c313a', border: '1px solid #444' }}>
                            <div className={`display-6 fw-black ${item.color} font-monospace`}>{item.val}</div>
                            <div className="text-white uppercase fw-bold mt-2" style={{ fontSize: '10px', letterSpacing: '1px' }}>{item.txt}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 4. PANELES DE TRABAJO - TEXTO BLANCO PURO */}
            <div className="d-flex flex-column gap-4">
                {[
                    { id: "01", t: "Control de Calidad", d: "Sometemos cada componente a validaciones técnicas para garantizar desempeño en condiciones extremas.", color: "#0dcaf0" },
                    { id: "02", t: "Formación Técnica", d: "Capacitaciones con metodología progresiva enfocadas en montaje, alineación y software estelar.", color: "#ffc107" },
                    { id: "03", t: "Soporte Operativo", d: "Asistencia postventa orientada a configuración, calibración de monturas y mantenimiento.", color: "#198754" }
                ].map((p, i) => (
                    <div key={i} className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: '#2c313a', borderLeft: `6px solid ${p.color}` }}>
                        <div className="row align-items-center">
                            <div className="col-md-4 mb-2 mb-md-0 d-flex align-items-center gap-3">
                                <div className="rounded-circle d-none d-md-flex align-items-center justify-content-center fw-bold" style={{ width: '45px', height: '45px', fontSize: '14px', border: `2px solid ${p.color}`, color: p.color }}>{p.id}</div>
                                <h5 className="fw-bold small text-uppercase mb-0" style={{ color: p.color }}>{p.t}</h5>
                            </div>
                            <div className="col-md-8 border-start border-secondary ps-md-4">
                                <p className="text-white small m-0 lh-base">{p.d}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Nosotros;