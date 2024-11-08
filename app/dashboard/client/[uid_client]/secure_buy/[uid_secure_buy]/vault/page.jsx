"use client"
import "./css_vault.css"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import VerticalLinearStepper from '@/components/only_place/step_secure_payment_client/page'
import axiosInstance from "@/utils/axios_instance"
import LoaderWithImg from '@/components/multiple_place/loader_with_img/LoaderWithImg'
import Icon from '@mdi/react';
import { mdiShieldCheckOutline, mdiCalendarCheckOutline, mdiAccountArrowLeftOutline, mdiContentCopy } from '@mdi/js';




export default function SecureBuy({ params }) {

    const { uid_secure_buy, name } = params
    const [dataFromApi, setDataFromApi] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            console.log(uid_secure_buy)
            try {
                const response = await axiosInstance.get(`secure_payment/secure_payment_dashboard`,
                    {
                        params: {
                            uid_secure_buy: uid_secure_buy
                        }
                    }
                );

                setDataFromApi(response.data)
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
                <div style={{ marginTop: "5vh", padding: "5vh 0vw" }} >
                    <div id="all_code_section"   >
                        <div  id="cont_img_code_section"  >
                            <Image style={{ borderRadius: 10 }} src="/images/secure_payment3.png" alt="secure_buy" width={250} height={150} />

                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", alignItems: "center", justifyContent: "space-around", }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                                <h2 style={{ fontSize: 35 }} >Codigo de seguridad</h2>

                                <input placeholder='xxx-xxxx-xxxxx-xx-xxxx' style={{ border: "1px solid black", width: "100%", borderRadius: 5 }} type="text" />

                            </div>
                            <div>
                                
                                <button id="button_get_found"  >
                                    <h2>Copiar</h2>
                                    <Icon style={{ marginLeft:"1vw"}} path={mdiContentCopy} size={0.9} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "2vh", backgroundColor: "white", borderRadius: 5, width: "fit-content", padding: "1vh 2vw", display: "flex", flexDirection: "row" }}>
                        <Icon path={mdiCalendarCheckOutline} size={1} style={{ color: "#00c28f" }} />
                        <h2 style={{ marginLeft: "1vw" }} > Dia programado para la compra: {dataFromApi.secure_payment.day} {dataFromApi.secure_payment.hour}</h2>

                    </div>
                    <div style={{ marginTop: "2vh", backgroundColor: "white", borderRadius: 5, width: "fit-content", padding: "1vh 2vw", display: "flex", flexDirection: "row" }}>
                        <Icon path={mdiShieldCheckOutline} size={1} style={{ color: "#00c28f" }} />
                        <h2 style={{ marginLeft: "1vw" }} > Garantia elegida: {dataFromApi.collateral.type_of_collateral} </h2>

                    </div>

                    <div style={{ marginTop: "2vh", backgroundColor: "white", borderRadius: 5, width: "fit-content", padding: "1vh 2vw", display: "flex", flexDirection: "row" }}>
                        <Icon path={mdiAccountArrowLeftOutline} size={1} style={{ color: "#00c28f" }} />
                        <h2 style={{ marginLeft: "1vw" }} >¿ Algo no salio bien ? los fondos vuelven a vos el: {dataFromApi.secure_payment.day} </h2>

                    </div>




                    <div style={{ marginTop: "10vh", marginBottom: "10vh" }} >
                        <VerticalLinearStepper data_from_api={dataFromApi} uid_bussine={name} />
                    </div>
                </div>
            )}

        </div>


    )
}