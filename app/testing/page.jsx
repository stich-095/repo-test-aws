"use client"


import axiosInstance from "@/utils/axios_instance"





export default function Page() {

  let handleSender = async () => {
    let token = localStorage.getItem('authTokens')
    let acces = JSON.parse(token).access
    alert(acces)
    try {
      
      const response = await axiosInstance.post(
        "/products/cars/",
        {
          "marca": "1",
          "modelo": "1",
          "year": null,
          "antiguedad": null,
          "precio": null,
          "propiedad": "concesionaria",
          "kilometraje": 12000,
          "combustible": "gasoil",
          "caja": "manual",
          "cilindrada": "110",
          "descripcion": "un auto",
          "airbag": true,
          "abs": true,
          "programa_estabilidad_electronica": true,
          "control_traccion": true,
          "aire_acondicionado": true,
          "butacas": "cuero",
          "levanta_cristales": "no",
          "direccion": "hidraulica",
          "butaca_electrica": true,
          "velocidad_crucero": true,
          "camara_retroceso": true,
          "sensor_estacionamiento": true,
          "control_voz": true,
          "radio": true,
          "bluetooth": true,
          "usb": true
      },
        {
          headers: {
            "Content-Type": "application/json"  // Corregido
          }
        }
      );
      const data =response.data;
      


    } catch (error) {
      // Handle login errors here
      console.error("Error during login:", error);
    }
  }


  return (
    <div>
      <button onClick={handleSender}  >enviar</button>
    </div>
  );
}