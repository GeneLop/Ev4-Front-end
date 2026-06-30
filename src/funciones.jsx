// src/funciones.js
import CryptoJS from 'crypto-js';

// Clave secreta fija para el cifrado simétrico AES exigido por la rúbrica
const SECRET_KEY = 'clave-secreta-universo-astro';

// URL BASE DE MOCKAPI (Reemplázala por la URL de tu endpoint cuando la crees en MockAPI.io)
const API_URL = 'https://667b123456789.mockapi.io/pedidos';

/**
 * Encripta el RUT utilizando el algoritmo simétrico AES de CryptoJS.
 * @param {string} rut - RUT limpio a proteger.
 * @returns {string} String cifrado resultante.
 */
export const encriptarRut = (rut) => {
    if (!rut) return '';
    return CryptoJS.AES.encrypt(rut.trim(), SECRET_KEY).toString();
};

/**
 * Valida si un RUT chileno es matemáticamente correcto usando el algoritmo Módulo 11.
 * Soporta formatos con o sin puntos, espacios y guiones.
 * @param {string} textoRut - Entrada del usuario (ej: "12.345.678-K").
 * @returns {boolean} True si es válido, False en caso contrario.
 */
export const validarRutChileno = (textoRut) => {
    if (!textoRut) return false;

    // Limpieza total: removemos todo lo que no sea número o la letra K
    let limpio = textoRut.replace(/[^0-9kK]/g, '').toUpperCase();
    if (limpio.length < 8 || limpio.length > 9) return false;

    // Separamos el cuerpo numérico del dígito verificador final
    let numero = limpio.slice(0, -1);
    let digito = limpio.slice(-1);

    // Algoritmo ponderado de multiplicación del 2 al 7
    let suma = 0;
    let factor = 2;
    for (let i = numero.length - 1; i >= 0; i--) {
        suma += Number(numero[i]) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }

    let resto = suma % 11;
    let dvReal = 11 - resto;

    // Mapeo final del dígito verificador real obtenido
    if (dvReal === 11) dvReal = '0';
    else if (dvReal === 10) dvReal = 'K';
    else dvReal = dvReal.toString();

    return digito === dvReal;
};

/**
 * Calcula la edad exacta del comprador en base a su fecha de nacimiento.
 * @param {string} fechaNacimiento - String de fecha provisto por el input tipo date.
 * @returns {number} Edad exacta calculada en años cronológicos.
 */
export const verificarEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 0;

    const diaHoy = new Date();
    const cumple = new Date(fechaNacimiento);

    if (isNaN(cumple.getTime())) return 0;

    let edad = diaHoy.getFullYear() - cumple.getFullYear();
    const mes = diaHoy.getMonth() - cumple.getMonth();

    // Si aún no ha pasado el mes de cumpleaños, o es el mismo mes pero no el día, restamos un año
    if (mes < 0 || (mes === 0 && diaHoy.getDate() < cumple.getDate())) {
        edad--;
    }
    return edad;
};

/**
 * ACTIVIDAD N°2 EXIGIDA: Persistencia de datos mediante operaciones CRUD enlazadas (API como Base de Datos).
 * Envía el JSON estructurado del pedido directamente a la nube mediante una petición POST.
 * @param {Object} nuevoPedido - Objeto que mapea los datos del cliente y los productos comprados.
 * @returns {Promise<Object>} Promesa con la respuesta de la base de datos distribuida.
 */
export const guardarPedidoEnBD = async (nuevoPedido) => {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoPedido)
        });

        if (!respuesta.ok) {
            throw new Error(`Error operacional en el servidor de base de datos: ${respuesta.status}`);
        }

        return await respuesta.json();
    } catch (error) {
        console.error("Falla en la persistencia remota del CRUD:", error);
        throw error;
    }
};