import React from 'react';

function Banner() {
    return (
        <div className="position-relative overflow-hidden p-5 text-center text-white"
            style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url("/imagenes/banner.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderBottom: '3px solid #0dcaf0'
            }}>

            {/* Contenido del Banner */}
            <div className="col-md-6 p-lg-5 mx-auto my-5 position-relative" style={{ zIndex: 2 }}>
                <h1 className="display-3 fw-bold text-uppercase tracking-tight"
                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}>
                    Explora el <span className="text-info">Universo</span>
                </h1>
                <p className="lead my-4"
                    style={{ fontSize: '1.2rem', fontWeight: '700', textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)' }}>
                    Equipamiento astronómico de alta gama, capacitaciones certificadas y recursos interactivos de exploración científica escolar y profesional.
                </p>
                <button
                    className="btn btn-info text-dark btn-lg fw-bold text-uppercase px-4 shadow"
                    onClick={() => document.getElementById('carta-productos').scrollIntoView({ behavior: 'smooth' })}
                >
                    Ver nuestro catálogo
                </button>
            </div>
        </div>
    );
}

export default Banner;