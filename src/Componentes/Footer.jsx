// src/Componentes/Footer.jsx
import React from 'react';

function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-4 border-top border-secondary mt-auto">
            <div className="container">
                {/* Botones de Redes Sociales */}
                <div className="d-flex justify-content-center gap-3 mb-3">
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm text-white fw-semibold px-3 shadow-sm"
                        style={{
                            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                            border: 'none'
                        }}
                    >
                        <i className="bi bi-instagram me-1"></i> Instagram
                    </a>

                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm text-white fw-semibold px-3 shadow-sm"
                        style={{
                            backgroundColor: '#1877f2',
                            border: 'none'
                        }}
                    >
                        <i className="bi bi-facebook me-1"></i> Facebook
                    </a>
                </div>

                {/* Derechos de autor - Simple y todo blanco excepto el text-info */}
                <p className="mb-1 small text-white">
                    © 2026 <span className="text-info fw-bold">AstroShop Inc.</span> - Todos los derechos reservados.
                </p>

                {/* Descripción - Blanco puro directo */}
                <p className="m-0 text-white" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                    Distribuidor Oficial de Soluciones Ópticas, Material Educativo Certificado y Experiencias Científicas.
                </p>
            </div>
        </footer>
    );
}

export default Footer;