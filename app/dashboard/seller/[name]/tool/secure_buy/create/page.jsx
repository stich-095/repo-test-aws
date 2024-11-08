"use client"
import "./css_create_secure_buy.css"
import { useState } from "react"
import axiosInstance from "@/utils/axios_instance"
import { useRouter } from "next/navigation"



export default function CreateSecureBuy({params}) {

    const router = useRouter()
    const { name } = params
    const [cuit_or_cuil, setCuitOrCuil] = useState("")
    const [clientName, setClientName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    


    const handleSendSecureBuy = async () => {
        alert(name)
        try{
            const response = await axiosInstance.post("secure_payment/create_secure_payment",{
                cuit_or_cuil: cuit_or_cuil,
                name: clientName,
                email: email,
                phone: phone,
                bussine: name
            })
            console.log(response)
            router.push(`/dashboard/seller/${name}/tool/secure_buy/create/${response.data.secure_payment_uid}/select_car`)

    
        } catch (error) {
            console.log(error)
        }
        




        
    }



    return (
        <div id="cont_all_form_dataclient_create_secure_buy" >
            <div id="cont_form_dataclient_create_secure_buy" >
                <h2 style={{ textAlign: "center" }} >Sobre el cliente</h2>
                <h2>Cuit / cuil (sin guiones)</h2>
                <input className="input_data_client_secure_buy"value={cuit_or_cuil} onChange={(e) => setCuitOrCuil(e.target.value)}  type="number" />
                <h2>Nombre completo</h2>
                <input className="input_data_client_secure_buy" value={clientName} onChange={(e) => setClientName(e.target.value)}  type="text" />
                <h2>Correo electronico</h2>
                <input className="input_data_client_secure_buy" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                <h2>Telefono</h2>
                <input className="input_data_client_secure_buy" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
                <div style={{width:"100%", display:"flex", justifyContent:"center"}} >
                    <button onClick={handleSendSecureBuy} style={{padding:"1vh 5vw", backgroundColor:"black", color:"white", borderRadius:5}} href={`hola`} >Siguiente</button>
                </div>

            </div>
        </div>
    )
}