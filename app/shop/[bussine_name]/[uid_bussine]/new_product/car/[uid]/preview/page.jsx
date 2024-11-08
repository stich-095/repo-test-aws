"use client";


import OneImgWithCarrouselImgs from "@/components/multiple_place/one_img_with_carrousel_imgs/js_one_img_with_carrousel_imgs.jsx";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import InfoProductCar from "@/components/multiple_place/info_product/js_info_product.jsx";
import axiosInstance from "@/utils/axios_instance";
import { useEffect } from "react";
import LoaderWithImg from "@/components/multiple_place/loader_with_img/LoaderWithImg.jsx";
import Link from "next/link";
import Icon from '@mdi/react';
import { mdiCheckCircleOutline } from '@mdi/js';


export default function PreviewPage({ params }) {
    const { uid, bussine_name, uid_bussine } = params;
    let router = useRouter()


    const [images, setImages] = useState([]);
    const [dataFromApi, setDataFromApi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);









    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`products/cars/${uid}`); // Agrega await aquí
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

                <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center" }} >
                    <div style={{ width: "60%", paddingTop: "5vh", marginBottom: "15vh" }} >
                        <OneImgWithCarrouselImgs imgs={images} />
                        <InfoProductCar data_from_api={dataFromApi} />
                        <div style={{ display: openModal == false ? "flex" : "none", justifyContent: "center", position: "fixed", bottom: "5vh", width: "60%" }}   >
                            <button onClick={() => setOpenModal(true)} style={{ padding: "1vh 5vw", backgroundColor: "#2b61e5", borderRadius: 5, color: "white" }}   >Enviar solicitud de cotizacion</button>
                        </div>
                        <div style={{ display: openModal == true ? "flex" : "none", position: "fixed", height: "100%", width: "100%", backgroundColor: "#000000b0", top: 0, left: 0, justifyContent: "center", alignItems: "center" }} >
                            <div style={{ width: "50%", height: "60%", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", padding:"0vh 2vw" }}>
                                <Icon style={{ color: "green", marginTop: "5vh" }} path={mdiCheckCircleOutline} size={5} />
                                <div style={{ display: "flex", flexDirection: "row" }} >
                                    <h2>Exito:</h2>
                                    <p style={{ marginLeft: "0.5vw" }} >solicitud de cotizacion enviada</p>
                                </div>

                                <Link style={{ marginTop: "5vh", padding: "1vh 5vw", backgroundColor: "black", borderRadius: 5, color: "white" }} href={`/shop/${bussine_name}/${uid_bussine}`} >ir al inicio a ver más autos</Link>
                                <div style={{ border: "1px solid black", borderRadius: 5, padding: "1vh 2vw", marginTop: "3vh" }} >
                                    <h2>Preguntale a los bancos si es posible que te den credito. Solo necesitamso saber a que te dedicas, cuanto es tu ingreso neto y tu cuit o cuil. <Link href={`/shop/${bussine_name}/${uid_bussine}/request_credit_info`} style={{ fontWeight: 600, borderBottom: "1px solid black" }} >click aqui para comenzar consulta </Link> </h2>
                                </div>
                            </div>

                        </div>


                    </div>



                </div>



            )}


        </div>

    );
}
