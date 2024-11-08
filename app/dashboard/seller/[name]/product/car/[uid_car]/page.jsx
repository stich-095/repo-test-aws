"use client";


import OneImgWithCarrouselImgs from "@/components/multiple_place/one_img_with_carrousel_imgs/js_one_img_with_carrousel_imgs.jsx";
import Image from "next/image";
import { useState } from 'react';

import { useRouter } from "next/navigation";
import InfoProductCar from "@/components/multiple_place/info_product/js_info_product.jsx";
import FinancingDemo from "@/components/multiple_place/financing_demo/js_financing_demo.jsx";
import axiosInstance from "@/utils/axios_instance";
import { useEffect } from "react";
import LoaderWithImg from "@/components/multiple_place/loader_with_img/LoaderWithImg.jsx";



export default function PreviewPage({ params }) {
    const [images, setImages] = useState([]);
    const [dataFromApi, setDataFromApi] = useState([]);


    const [loading, setLoading] = useState(true);
    let router = useRouter()
    const { uid_car, name } = params;



    let handleEndPost = () => {
        //router.push(`/dashboard/seller/${name}/new_product/car/end_post`)
        console.log("Publicar");
    }
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`products/cars/${uid_car}`); // Agrega await aquí
                const data = response.data;
                setDataFromApi(data);
                const images = data.images.map(img => ({
                    src: img.image,
                    alt: `Imagen ${img.uid}`
                }));
                setImages(images);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {loading ? (
                <LoaderWithImg />
            ) : (
                <div  style={{ display: "flex", flexDirection: "row", width: "100%" }} >
                    <div   style={{ width: "60%", backgroundColor: "red", paddingTop: "5vh", marginBottom: "15vh" }} >
                        <OneImgWithCarrouselImgs imgs={images} />
                        <InfoProductCar data_from_api={dataFromApi} />
                        <FinancingDemo />
                    </div>

                    <div style={{ width: "40%", backgroundColor: "yellow", minHeight: "100vh", padding: "5vh 2vw" }} >
                        <div style={{ width: "100%", height: "fit-content", backgroundColor: "white" }} >
                            <div>
                                <h1>{dataFromApi.marca} {dataFromApi.modelo}</h1>
                                <h1>Kombi 1.0 EcoBoost 75kW Trend</h1>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row" }} >
                                <h2>{dataFromApi.year}</h2>
                                <h2>{dataFromApi.kilometraje.toLocaleString('es-AR', {
                                    style: 'unit',
                                    unit: 'kilometer', // Aquí puedes cambiar la unidad (ej. meter, kilogram)
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                })}</h2>
                                <h2>{dataFromApi.combustible}</h2>
                            </div>
                            <div>
                                <h2>{dataFromApi.precio.toLocaleString('es-AR', {
                                    style: 'currency',
                                    currency: 'ARS',
                                    maximumFractionDigits: 0,
                                })}</h2>
                                <h2>Creado el: { new Date(dataFromApi.created).toLocaleDateString('es-AR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}</h2>
                                <h1>opciones de financiamiento</h1>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", padding: "1vh 0.5vw", border: "1px solid black", borderRadius: 10, backgroundColor: "aliceblue" }} >
                                <div style={{ display: "flex", flexDirection: "row", }} >
                                    <div style={{ width: "150px" }}  >
                                        <Image src="/images/open_car_2.png" alt="Mercado Pago" width={500} height={500} />
                                    </div>
                                    <div>
                                        <div>
                                            <div>
                                                <h1>Open Car</h1>
                                            </div>
                                            <div>
                                                <h2>Conocelo desde la comodidad de tu hogar con una video llamada, sin moverte.</h2>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                                <div style={{ display: "flex", justifyContent: "center" }} >
                                    <button style={{ backgroundColor: "blue", padding: "0.5vh 1vw", borderRadius: "5px" }} >Elegir cuando verlo</button>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "4vh" }} >
                                <div style={{ width: "47%" }} >
                                    <button style={{ backgroundColor: "blue", padding: "0.5vh 1vw", borderRadius: "5px", width: "100%" }} >Contactar</button>
                                </div>
                                <div style={{ width: "47%" }} >
                                    <button style={{ backgroundColor: "blue", padding: "0.5vh 1vw", borderRadius: "5px", width: "100%" }} >Agendar cita</button>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div style={{ position: "fixed", bottom: 0, height: "10vh", width: "100%", backgroundColor: "white", left: 0, display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <div style={{ maxWidth: 1200, display: "flex", flexDirection: "row" }} >
                            <div>
                                <button>Hacer cambios</button>
                            </div>
                            <div>
                                <button onClick={handleEndPost}  >Publicar</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>

    );
}
