"use client";

import "./car_page.css"
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


    const [loading, setLoading] = useState(true);
    const { uid_car, name } = params;

    const [status, setStatus] = useState();

    const handleChange = (event) => {
        setStatus(event.target.value);
    };




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
                setStatus(data.status);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const updateStatus = async () => {
            try {
                await axiosInstance.patch(`products/cars/${uid_car}/`, { status });
            } catch (error) {
                console.error("Error updating status:", error);
            }
        };
        if (status) {
            updateStatus();
        }
    }, [status]);


    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {loading ? (
                <LoaderWithImg />
            ) : (
                <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center" }} >
                    <div style={{ width: "90%", paddingTop: "5vh", marginBottom: "15vh" }} >
                        <div>
                            <label htmlFor="status">Estado:</label>
                            <select id="status" value={status} onChange={handleChange}>
                                <option value="disponible">Disponible</option>
                                <option value="vendido">Vendido</option>
                                <option value="reservado">Reservado</option>
                            </select>
                            
                        </div>

                        <h2>Creado el: {new Date(dataFromApi.created).toLocaleDateString('es-AR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}</h2>
                        <div style={{ display: "flex", flexDirection: "row" }} >
                            <h2>{dataFromApi.marca}</h2>
                            <h2 style={{ marginLeft: "3vw" }} >{dataFromApi.modelo}</h2>
                        </div>
                        <h2>{dataFromApi.precio.toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                            maximumFractionDigits: 0,
                        })}</h2>
                        <OneImgWithCarrouselImgs imgs={images} />
                        <InfoProductCar data_from_api={dataFromApi} />

                    </div>


                    <div id="button_change_post"  >
                        <div style={{ maxWidth: 1200, display: "flex", flexDirection: "row" }} >
                            <div style={{ background: "#2b61e5", color: "white", padding: "1vh 5vw", borderRadius: 5 }}>
                                <Link href={`/dashboard/seller/${name}/tool/new_product/car/${uid_car}/features`}  >Hacer cambios</Link>
                            </div>

                        </div>

                    </div>
                </div>
            )}

        </div>

    );
}
