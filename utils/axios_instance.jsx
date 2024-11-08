"use client";

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 10000,  // (  milisegundos)
    headers: {
        'Content-Type': 'application/json',


    }
});

export default axiosInstance;



{/*

// Opcional: Interceptores para manejo de respuestas y errores
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Manejo de errores (puedes personalizar esto)
    if (error.response && error.response.status === 401) {
      console.error("No autorizado. Redirigir al login.");
    }
    return Promise.reject(error);
  }
);




//
*/}


{/*

//con autenticacion
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',  
    timeout: 10000,  // (  milisegundos)
    headers: {
        'Content-Type': 'application/json',
     
        // Puedes agregar más cabeceras si es necesario

      'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Si tienes autenticación con token

        
      
    }
});
  
    
*/}