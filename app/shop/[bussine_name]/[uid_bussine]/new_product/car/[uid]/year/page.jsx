
"use client"
import "./yeard_page.css"
import { useRouter } from "next/navigation"
import axiosInstance from "@/utils/axios_instance"
import { useState } from "react"

export default function YeardPage({ params }) {
    let [year, setYear] = useState()
   
    let { uid, uid_bussine } = params
    let router = useRouter()


    let handleChangeNumber = async (e) => {
        const newYear = e.target.value; // Captura el nuevo valor aquí
        await setYear(newYear); // Actualiza el estado (opcional si no lo necesitas)
    
        if (newYear.length === 4) {
            let token = localStorage.getItem('authTokens');
            let acces = JSON.parse(token).access;
    
            try {
                const response = await axiosInstance.patch(
                    `products/cars/${uid}/`,
                    {
                        "year": newYear, // Usa el nuevo valor aquí
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                const data = response.data;
                router.push(`/shop/bussine_name/${uid_bussine}/new_product/car/${uid}/upload_imgs`);
    
            } catch (error) {
                // Manejar errores aquí
                console.error("Error during login:", error);
            }
        }
    }
    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingBottom: "15vh", justifyContent: "center" }}  >
            <div>
                <h1 style={{ fontSize: "3vw" }}   >Año</h1>
            </div>
            <div style={{ display: "flex", marginTop: "2vh", alignItems: "center" }} >
                <div>
                    <input id="input_type_num_yeard" type="number" onChange={handleChangeNumber} placeholder="Escribi el modelo" />
                </div>


            </div>
        </div>
    )
}
