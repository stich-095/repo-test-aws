"use client";
import { useState } from 'react';
import axiosInstance from "@/utils/axios_instance";

export default function CreateNewSeller() {
    // Definimos el estado para manejar los valores del formulario
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

   
    

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();  // Previene el comportamiento por defecto del formulario (recargar la página)
        try {
            const response = await axiosInstance.post('users/create_new_seller', {
                password: password,
                email: email
            });
            alert(response.data.message);  // Mostrar el mensaje de éxito o error
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Crear nuevo vendedor</h1>
           
                
                <label>Correo</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Contraseña</label>
                <input
                    type="text"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSubmit} >Crear</button>
            
        </div>
    );
}
