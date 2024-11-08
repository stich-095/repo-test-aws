"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import axiosInstance from "@/utils/axios_instance"
import LoaderWithImg from '@/components/multiple_place/loader_with_img/LoaderWithImg'


export default function SecureBuyes({ params }) {



    const { uid_secure_buy, name } = params
    const [dataFromApi, setDataFromApi] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`secure_payment/handle/${uid_secure_buy}/`);
                setDataFromApi(response.data);
                console.log(response.data)
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
                    <div style={{ display: "flex", flexDirection: "row", backgroundColor: "white", padding: "5vh 5vw", borderRadius: 10 }} >
                        <div style={{ width: "55%" }} >
                            <Image style={{ borderRadius: 10 }} src="/images/secure_payment3.png" alt="secure_buy" width={250} height={150} />

                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", alignItems: "center", justifyContent: "space-around" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                                <h2 style={{ fontSize: 35 }} >Codigo de verificación </h2>
                                <input style={{ border: "1px solid black", width: "100%", borderRadius: 5 }} type="text" />
                            </div>
                            <div>
                                <button style={{ backgroundColor: "black", color: "white", padding: "1vh 5vw", borderRadius: 5 }} >Obtener fondos</button>
                            </div>
                        </div>
                    </div>
                    <h2>Dia programado para la operacion: {dataFromApi.day} {dataFromApi.hour} </h2>
                    <h2>Estado : pendiente de aprobacion por el cliente </h2>
                    
                </div>
            )
            }
        </div>

        


    )


}

