"use client";

import "./css_uid_open_car_page.css";
import OneImgWithCarrouselImgs from "@/components/multiple_place/one_img_with_carrousel_imgs/js_one_img_with_carrousel_imgs.jsx";
import InfoProductCar from "@/components/multiple_place/info_product/js_info_product.jsx";
import Image from 'next/image';
import LoaderWithImg from "@/components/multiple_place/loader_with_img/LoaderWithImg.jsx";
import { useState, useEffect } from 'react';
import axiosInstance from "@/utils/axios_instance";
import FinancingDemo from "@/components/multiple_place/financing_demo/js_financing_demo.jsx";
import Link from "next/link";

export default function OpenCarPage({ params }) {
    const { uid_open_car, name } = params;
    const [dataFromApi, setDataFromApi] = useState();
    const [dataClientContact, setDataClientContact] = useState();
    const [loading, setLoading] = useState(true);
    const [carsData, setCarsData] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            let token = localStorage.getItem('authTokens')
            let acces = JSON.parse(token).access
            console.log(acces)
            try {
                const response = await axiosInstance.get(`open_product/open_cars/${uid_open_car}`);
                const data = response.data;
                setDataFromApi(data);
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

                console.log(data)

                const response_data_cliet_contact = await axiosInstance.get(
                    `users/data_client_for_seller`, {
                    headers: {
                        'Authorization': `Bearer ${acces}`
                    },
                    params: {
                        client: data.client
                    }
                }
                );
                const data_cliet_contact = response_data_cliet_contact.data;
                setDataClientContact(data_cliet_contact);




                setCarsData(carDataWithImages);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching car data:", error);
            }
        };

        fetchInitialData();
    }, [uid_open_car]);

    return (
        <div>
            {loading ? (
                <LoaderWithImg />
            ) : (
                <div>
                    <h1 style={{ marginTop: "5vh" }} >Informacion open car</h1>
                    <div id="cont_all_info_open_car"  >

                        <div className="item_open_car_info" >
                            <div>
                                <h1>Modalidad</h1>
                            </div>
                            <div>
                                <h1>{dataFromApi.modalidad}</h1>
                            </div>
                        </div>
                        <div className="item_open_car_info">
                            <div>
                                <h1>Dia</h1>
                            </div>
                            <div>
                                <h1>{dataFromApi.dia}</h1>
                            </div>
                        </div>
                        <div className="item_open_car_info">
                            <div>
                                <h1>Hora</h1>
                            </div>
                            <div>
                                <h1>{dataFromApi.hora}</h1>
                            </div>
                        </div>


                        <div>
                            <div>
                                <h1>Solicita entrega + financiamiento</h1>
                            </div>
                            <div>

                                <h1>{dataFromApi.request_price_client ? <Link href={`/dashboard/seller/${name}/tool/request_price_for_client/${dataFromApi.request_price_client.car}`} >Si, ir a la solicitud</Link> : "no"}</h1>
                            </div>
                        </div>
                    </div>
                    <h1 style={{ marginTop: "3vh" }} >Datos de contacto</h1>
                    <div id="cont_info_contact_open_car"   >

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
                    {carsData.map((singleCar, index) => (
                        <div key={singleCar.uid || index}>
                            <h1>Auto a mostrar</h1>
                            <div style={{ width: "100%", backgroundColor: "white", paddingTop: "5vh", marginBottom: "15vh", padding: "1vh 5vw", border: "1px solid black", borderRadius: 5 }}>
                                <OneImgWithCarrouselImgs imgs={singleCar.images} />
                                <InfoProductCar data_from_api={singleCar} />
                                <FinancingDemo />

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}



