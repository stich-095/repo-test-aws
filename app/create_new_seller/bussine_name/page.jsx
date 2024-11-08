"use client";
import { useState } from 'react';
import axiosInstance from "@/utils/axios_instance";
import { useRouter } from "next/navigation";

export default function CreateNewBussine() {
    // Definimos el estado para manejar los valores del formulario
    let [bussineName, setBussineName] = useState('');
    const router = useRouter();




    
    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();  // Previene el comportamiento por defecto del formulario (recargar la página)
        let token = localStorage.getItem('authTokens')
        let acces = JSON.parse(token).access
        try {
            const response = await axiosInstance.post('users/create_new_bussine', {
                "name": bussineName,
            },
                {
                    headers: {
                        'Authorization': `Bearer ${acces}`
                    }
                }
            );
            console.log(response.data);  // Mostrar el mensaje de éxito o error
            router.push(`/dashboard/seller/${response.data.uid}/tool/all_products/`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Crear nuevo vendedor</h1>


            <label>Correo</label>
            <input
                type="text"
                name="name_bussine"
                value={bussineName}
                onChange={(e) => setBussineName(e.target.value)}
            />

            <button onClick={handleSubmit} >Crear</button>

        </div>
    );
}
