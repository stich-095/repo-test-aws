"use client"
import "./css_uid_secure_buy.css"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import VerticalLinearStepper from '@/components/only_place/step_secure_payment_seller/page'
import axiosInstance from "@/utils/axios_instance"
import LoaderWithImg from '@/components/multiple_place/loader_with_img/LoaderWithImg'



export default function SecureBuy({ params }) {

    const { uid_secure_buy, name } = params
    const [dataFromApi, setDataFromApi] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`secure_payment/secure_payment_dashboard`,
                    {
                        params: {
                            uid_secure_buy: uid_secure_buy
                           
                        }
                    }   
                );
                setDataFromApi(response.data);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);




    return (
        <div>
            {loading ? <LoaderWithImg /> : (
                <div style={{ marginTop: "5vh" }} >
                    <div id="all_code_section" >
                        <div id="cont_img_code_section"  >
                            <Image style={{ borderRadius: 10 }} src="/images/secure_payment3.png" alt="secure_buy" width={250} height={150} />

                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", alignItems: "center", justifyContent: "space-around" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                                <h2 style={{ fontSize: 35 }} >Codigo de verificación </h2>
                                <input style={{ border: "1px solid black", width: "100%", borderRadius: 5 }} type="text" />
                            </div>
                            <div>
                                <button id="button_get_found" >Obtener fondos</button>
                            </div>
                        </div>
                    </div>
                    <h2>Dia programado para la operacion: {dataFromApi.secure_payment.day} {dataFromApi.secure_payment.hour} </h2>
                    <h2>Estado : pendiente de aprobacion por el cliente </h2>
                    <div style={{ marginTop: "10vh", marginBottom:"10vh" }} >
                        <VerticalLinearStepper data_from_api={dataFromApi}  uid_secure_buy={uid_secure_buy} uid_bussine={name} />
                    </div>
                </div>
            )
            }
        </div>


    )
}