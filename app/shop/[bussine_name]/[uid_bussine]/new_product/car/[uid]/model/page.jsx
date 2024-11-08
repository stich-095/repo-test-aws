"use client"

import "./model_page.css"
import { useRouter } from "next/navigation"
import axiosInstance from "@/utils/axios_instance"
import { useState } from "react"

export default function ModelPage({ params }) {

    let [model, setModel] = useState()
    let { uid_bussine } = params
    let { uid } = params
    let router = useRouter()



    let handleSender = async () => {
        let token = localStorage.getItem('authTokens')
        let acces = JSON.parse(token).access
        
        try {

            const response = await axiosInstance.patch(
                `products/cars/${uid}/`,
                {
                    "modelo": model,

                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            const data = response.data;
            router.push(`/shop/bussine_name/${uid_bussine}/new_product/car/${data.uid}/year`);
           



        } catch (error) {
            // Handle login errors here
            console.error("Error during login:", error);
        }
    }



    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingBottom: "15vh", justifyContent: "center" }} >
            <div>
                <h1 style={{ fontSize: "3vw" }} >Modelo</h1>
            </div>

            <div style={{ display: "flex", marginTop: "2vh", alignItems: "center" }} >
                <div>
                    <input id="input_type_text_model" type="text" onChange={(e) => setModel(e.target.value)} value={model}  placeholder="Escribi el modelo" />
                </div>
                <div style={{ backgroundColor: "#2b61e5", color: "white", padding: "0.5vh 1vw", marginLeft: "2vw", borderRadius: 10 }}>
                    <button style={{ fontSize: "1.5vw" }} id="button_brand" onClick={handleSender}  >continuar</button>
                </div>

            </div>
        </div>

    )
}