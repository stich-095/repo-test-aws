"use client";

import "./request_price_for_client.css";
import OneImgWithCarrouselImgs from "@/components/multiple_place/one_img_with_carrousel_imgs/js_one_img_with_carrousel_imgs.jsx";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import InfoProductCar from "@/components/multiple_place/info_product/js_info_product.jsx";
import FinancingDemo from "@/components/multiple_place/financing_demo/js_financing_demo.jsx";
import axiosInstance from "@/utils/axios_instance";
import { useEffect } from "react";
import LoaderWithImg from "@/components/multiple_place/loader_with_img/LoaderWithImg.jsx";
import Link from "next/link";





export default function PreviewPage({ params }) {
    const [images, setImages] = useState([]);
    const [dataFromApi, setDataFromApi] = useState([]);
    const [dataClient, setDataClient] = useState();
    const [dataClientContact, setDataClientContact] = useState();
    const [dataOpenCar, setDataOpenCar] = useState();
    let [viewActivate, setViewActivate] = useState(false);
    let [selectViewActivate, setSelectViewActivate] = useState("proposal");
    const [carsData, setCarsData] = useState([]);
    const [valueProposal, setValueProposal] = useState();
    const [statusProposal, setStatusProposal] = useState();
    const [realUidRequestPrice, setRealUidRequestPrice] = useState();
    const [dataCreditInfo, setDataCreditInfo] = useState();
    const [loading, setLoading] = useState(true);
    const [fecha, setFecha] = useState();
    const [dataBussine, setDataBussine] = useState([]);

    let router = useRouter()
    const { id_request_price, name } = params;



    const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(":");
        const hours24 = parseInt(hours, 10); // Convierte horas a un número
        const ampm = hours24 < 12 ? "AM" : "PM"; // Determina si es AM o PM
        const displayHours = hours24 === 0 ? 12 : hours24; // Si la hora es 0, se muestra como 12, de lo contrario se mantiene como está
        return `${displayHours}:${minutes} ${ampm}`; // Devuelve la hora en formato 24 horas con minutos y AM/PM
    };

    let handleCloseProposal = () => {
        setViewActivate(false);
        setSelectViewActivate("proposal");


    }

    const handleClick = () => {

        // Abrir una nueva ventana de WhatsApp
        window.open('https://api.whatsapp.com/send?phone=56944125534&text=Hola', '_blank');
    };

    let handleCreateNewProposal = async () => {
        try {
            const response = await axiosInstance.patch(
                `request_price_client/request_price/${realUidRequestPrice}/`,
                {
                    price_offered: valueProposal,
                    status: "enviada",

                },

            );
            const data = response.data;
            setStatusProposal("enviada");
            setSelectViewActivate("proposal-send");
        } catch (error) {
            console.error("Error during login:", error);
        }
    }





    useEffect(() => {
        const fetchData = async () => {
            let uid_open_car = null;
            let token = localStorage.getItem('authTokens');
            let acces = JSON.parse(token).access;

            console.log(acces);
            try {
                const response = await axiosInstance.get(`products/cars/${id_request_price}`); // Agrega await aquí
                const data = response.data;
                setDataFromApi(data);
                console.log("auto", data);

                const images = data.images.map(img => ({
                    src: img.image,
                    alt: `Imagen ${img.uid}`
                }));
                setImages(images);

                const response_data_client = await axiosInstance.get(`/request_price_client/request_price/?car=${id_request_price}`);
                const data_client = response_data_client.data;
                setRealUidRequestPrice(data_client[0].uid);
                setStatusProposal(data_client[0].status);
                setDataClient(data_client);

                console.log("lopez", data_client);
                uid_open_car = data_client[0].open_car;

                console.log("params", data_client.client);
                const response_data_cliet_contact = await axiosInstance.get(
                    `users/data_client_for_seller`, {
                    headers: {
                        'Authorization': `Bearer ${acces}`
                    },
                    params: {
                        client: data_client[0].client
                    }
                });

                const data_cliet_contact = response_data_cliet_contact.data;
                setDataClientContact(data_cliet_contact);
                console.log("lopezzzz", data_cliet_contact);

                // Ahora llamamos a fetchInitialData, asegurándonos de que uid_open_car está listo
                await fetchInitialData(uid_open_car);
                await fetchDataCreditInfo();
                await fetchDataBussine();





            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchInitialData = async (uid_open_car) => {
            let token = localStorage.getItem('authTokens');
            let acces = JSON.parse(token).access;

            console.log(acces);
            try {
                const response = await axiosInstance.get(`open_product/open_cars/${uid_open_car}`);
                const data = response.data;
                setDataOpenCar(data);
                setFecha(data.dia);
                const carsForView = data.cars_for_view;

                const carResponses = await Promise.all(
                    carsForView.map((carId) =>
                        axiosInstance.get(`products/cars/${carId}`)
                    )
                );

                const carDataWithImages = carResponses.map(res => {
                    const carData = res.data;
                    const carImages = carData.images.map(img => ({
                        src: img.image,
                        alt: `Imagen ${img.uid}`,
                    }));
                    return {
                        ...carData,
                        images: carImages
                    };
                });

                console.log("data open car", data);

                const response_data_cliet_contact = await axiosInstance.get(
                    `users/data_client_for_seller`, {
                    headers: {
                        'Authorization': `Bearer ${acces}`
                    },
                    params: {
                        client: data.client
                    }
                });

                const data_cliet_contact = response_data_cliet_contact.data;
                setDataClientContact(data_cliet_contact);

                setCarsData(carDataWithImages);

            } catch (error) {
                console.error("Error fetching car data:", error);
            }
        };

        const fetchDataCreditInfo = async () => {

            try {
                const response = await axiosInstance.get(`request_credit_info/get_data_for_credit_info/`, {
                    params: {
                        client: dataClient[0].client,
                        bussine: dataClient[0].bussine
                    },

                });
                const data = response.data;
                console.log("data credit", data);
                setDataCreditInfo(data);
                setLoading(false);


            } catch (error) {
                console.error("Error fetching data:", error);
                if (error.response.status === 500) {
                    setLoading(false);
                }
            }


        };

        const fetchDataBussine = async () => {
            console.log("entre a bussine")
            try {
                const response_bussine = await axiosInstance.get("users/data_bussine_for_client", {
                    params: {
                        bussine: name
                    }
                }
                );
                const data_bussine = response_bussine.data;
                setDataBussine(data_bussine);
                console.log("data bussine", data_bussine);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };


        



        // Ejecutar fetchData primero
        fetchData();
    }, [statusProposal]);


    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {loading ? (
                <LoaderWithImg />
            ) : (
                <>
                    
                    <div style={{ display: viewActivate == true ? "none" : "flex", flexDirection: "column", width: "100%" }} >
                        <h1 style={{ marginTop: "5vh" }} >Informacion de la cotizacion</h1>
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", gap: "3vw", padding: "5vh 2vw", border: "1px solid black", borderRadius: 5, backgroundColor: "white", marginBottom: "5vh", justifyContent: "space-around" }} >

                            <div>
                                <div>
                                    <h1>Estado</h1>
                                </div>
                                <div>
                                    <h1>{dataClient[0].status}</h1>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1>Cotizacion</h1>
                                </div>
                                <div>
                                    <h1>{dataClient[0].price_offered ? dataClient[0].price_offered : "$ ---" }</h1>
                                </div>
                                
                            </div>

                            <div>
                                <div>
                                    <h1>Propuesta</h1>
                                </div>
                                <div>        
                                    <h1>{ dataClient[0].status == "pendiente" ? "---" : <Link target="_blank" href={`/shop/${dataBussine.name}/${name}/proposal/${id_request_price}`} >ir a la propuesta</Link> }</h1>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <h1>Open car</h1>
                                </div>
                                <div>
                                    <h1>{dataClient[0].open_car ? <Link href={`/dashboard/seller/${name}/tool/open_car/${dataClient[0].open_car}`} >ir al open car</Link> : "no"}</h1>
                                </div>
                            </div>
                            
                           
                        </div>
                        <h1  >Datos de contacto</h1>
                        <div id="contac_client_request_price"   >

                            <div>
                                <div>
                                    <h1>Nombre</h1>
                                </div>
                                <div>
                                    <h1>{dataClientContact.name}</h1>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1>Telefono - Whatsapp</h1>
                                </div>
                                <div>
                                    <h1>{dataClientContact.phone}</h1>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1>Correo electronico</h1>
                                </div>
                                <div>
                                    <h1>{dataClientContact.email}</h1>
                                </div>
                            </div>

                        </div>
                        <div>
                            <h1>Auto a cotizar</h1>
                            <div style={{ width: "100%", backgroundColor: "white", paddingTop: "5vh", marginBottom: "15vh", padding: "2vh 5vw", border: "1px solid black", borderRadius: 5, marginTop: "5vh" }} >
                                <OneImgWithCarrouselImgs imgs={images} />
                                <InfoProductCar data_from_api={dataFromApi} />
                            </div>
                        </div>


                        <div id="cont_button_post_proposal" style={{ display: viewActivate == true || statusProposal == "enviada" ? "none" : "flex" }} >
                            <div style={{ maxWidth: 1200, display: "flex", flexDirection: "row" }} >
                                <div id="button_post_proposal" onClick={() => setViewActivate(true)}   >
                                    <button>Hacer propuesta</button>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div>

                        <div className="cont_view_proposal_request_price" style={{ display: viewActivate == true ? "flex" : "none" }}  >
                            <div className="cont_nav_view_proposal_request_price"  >
                                <button onClick={handleCloseProposal} style={{ color: "black", borderRadius: 5 }}  >x</button>
                            </div>
                            <div id="cont_amount_proposal_view" style={{ display: selectViewActivate == "proposal" ? "flex" : "none" }}   >
                                <h1 style={{ fontSize: 25 }}   >Monto de la propuesta</h1>


                                <input type="text" placeholder="$15.000.000" value={valueProposal} onChange={(e) => setValueProposal(e.target.value)} style={{ border: "1px solid black" }} />

                                <button onClick={() => setSelectViewActivate("preview")} style={{ backgroundColor: "#2b61e5", color: "white", padding: "1vh 2vw", borderRadius: 5 }}  >Pre visualizar propuesta</button>
                            </div>

                        </div>


                        <div className="cont_view_proposal_request_price" style={{ display: viewActivate == true && selectViewActivate == "preview" ? "flex" : "none" }} >
                            <div className="cont_nav_view_proposal_request_price preview_nav  "  >
                                <button onClick={() => setSelectViewActivate("proposal")}   >volver</button>
                                <button onClick={handleCloseProposal} style={{ color: "black", borderRadius: 5 }}  >x</button>

                            </div>
                            <div id="cont_preview_proposal_view" >
                                <h1 >Propuesta </h1>
                                <h1>Decidimos ofrececer {valueProposal} por tu {dataFromApi.marca} {dataFromApi.modelo} año {dataFromApi.year}, a continuacion podes ver el financiamiento para cada uno de los autos de tu interes teniendo en cuenta el valor de tu auto. *Recorda* que el dia {fechaFormateada} a las  {formatTime(dataOpenCar.hora)}  nos comunicaremos para mostrarte los autos de tu interes por una video llamada de WhattsApp al numero {dataClientContact.phone} </h1>
                                <div style={{ width: "100%", backgroundColor: "white", paddingTop: "5vh", marginBottom: "15vh", padding: "2vh 5vw", border: "1px solid black", borderRadius: 5, marginTop: "5vh" }} >
                                    <OneImgWithCarrouselImgs imgs={images} />
                                    <InfoProductCar data_from_api={dataFromApi} />

                                </div>

                                <div style={{ marginBottom: "15vh", display: dataCreditInfo ? "flex" : "none" , flexDirection:"column"  }} >
                                    <h1>Sobre tu historial crediticio</h1>
                                    <div style={{ border: "1px solid black", borderRadius: 5, width: "64vw", padding: "2vh 5vw", display: "flex", flexDirection: "column" }} >
                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }} >
                                            <h2 style={{ fontSize: 28, fontWeight: 600 }} >Sos { dataCreditInfo ? dataCreditInfo.credit_score_aceleron: ""}% confiable</h2>
                                            <h2 style={{ width: "max-content" }}>para obtener un auto con credito.</h2>
                                        </div>


                                        <div>
                                            <h2>Este numero refleja tu comportamiento fianciero de los ultimos 24 meses, mientras mejor te hayas comportado mas confiable sos para obtenes un credito. Obtuvimos informacion para conocer tu comportamiento de las siguientes entidades, con las cuales tuviste al menos una relacion crediticia en los ultimos 24 meses. { dataCreditInfo ?  dataCreditInfo.entities_with_activity.map((entitie) => (<span style={{ marginLeft: "0.5vw" }} >{entitie},</span>)) :""}  </h2>
                                        </div>


                                    </div>
                                </div>
                                <div>


                                    {carsData.map((singleCar, index) => (
                                        <div id="cont_product_for_view_proposal_price" key={singleCar.uid || index}>
                                            <h1>Este puede ser tu proximo auto</h1>
                                            <div style={{ width: "100%", backgroundColor: "white", paddingTop: "5vh", marginBottom: "15vh", padding: "1vh 5vw", border: "1px solid black", borderRadius: 5 }}>
                                                <OneImgWithCarrouselImgs imgs={singleCar.images} />
                                                <InfoProductCar data_from_api={singleCar} />
                                                <FinancingDemo />

                                            </div>
                                        </div>
                                    ))}
                                </div>



                                <button onClick={handleCreateNewProposal} id="button_send_proposal_request_price">Crear propuesta</button>
                            </div>

                        </div>

                        <div className="cont_view_proposal_request_price" style={{ display: viewActivate == true && selectViewActivate == "proposal-send" ? "flex" : "none" }}  >
                            <div className="cont_nav_view_proposal_request_price   "  >

                                <button onClick={handleCloseProposal} style={{ color: "black", borderRadius: 5 }}  >x</button>

                            </div>
                            <div id="cont_send_proposal"    >
                                <h1 style={{ fontSize: 25 }}   >Exito</h1>
                                <div style={{ padding: "1vh 5vw" }} >
                                    <h1>Ya enviado la propuesta por correo electrónico. Sin embargo, es importante que *también la envíes* personalmente al cliente a través de la ventana de WhatsApp que abrimos, con un mensaje personalizado y el <span style={{ borderBottom: "1px solid black" }} > enlace donde podrá ver toda la propuesta.</span></h1>
                                    <div>
                                        <button onClick={handleClick}>Cambiar estado y abrir WhatsApp</button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>








                </>)}

        </div>

    );
}
