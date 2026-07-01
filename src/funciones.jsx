import CryptoJS from 'crypto-js';

const SECRET_KEY = 'clave-secreta-universo-astro';

/* =========================
   URLs MOCKAPI (CORRECTO)
========================= */
const PRODUCTOS_URL = "https://6a455557aab3faec3f69d15d.mockapi.io/Productos";
const PEDIDOS_URL = "https://6a455557aab3faec3f69d15d.mockapi.io/pedidos";

/* =========================
   ENCRIPTAR RUT
========================= */
export const encriptarRut = (rut) => {
    if (!rut) return '';
    return CryptoJS.AES.encrypt(rut.trim(), SECRET_KEY).toString();
};

/* =========================
   VALIDAR RUT
========================= */
export const validarRutChileno = (textoRut) => {
    if (!textoRut) return false;

    let limpio = textoRut.replace(/[^0-9kK]/g, '').toUpperCase();
    if (limpio.length < 8 || limpio.length > 9) return false;

    let numero = limpio.slice(0, -1);
    let digito = limpio.slice(-1);

    let suma = 0;
    let factor = 2;

    for (let i = numero.length - 1; i >= 0; i--) {
        suma += Number(numero[i]) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }

    let resto = suma % 11;
    let dvReal = 11 - resto;

    if (dvReal === 11) dvReal = '0';
    else if (dvReal === 10) dvReal = 'K';
    else dvReal = dvReal.toString();

    return digito === dvReal;
};

/* =========================
   VERIFICAR EDAD
========================= */
export const verificarEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 0;

    const hoy = new Date();
    const cumple = new Date(fechaNacimiento);

    if (isNaN(cumple.getTime())) return 0;

    let edad = hoy.getFullYear() - cumple.getFullYear();
    const mes = hoy.getMonth() - cumple.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < cumple.getDate())) {
        edad--;
    }

    return edad;
};

/* =========================
   GUARDAR PEDIDO (MOCKAPI - CORRECTO)
========================= */
export const guardarPedidoEnBD = async (nuevoPedido) => {

    const respuesta = await fetch(PEDIDOS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoPedido)
    });

    if (!respuesta.ok) {
        const error = await respuesta.text();
        console.log(error);
        throw new Error(`Error ${respuesta.status}: ${error}`);
    }

    return await respuesta.json();
};