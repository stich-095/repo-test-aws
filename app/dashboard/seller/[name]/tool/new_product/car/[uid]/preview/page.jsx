"use client";


import OneImgWithCarrouselImgs from "@/components/multiple_place/one_img_with_carrousel_imgs/js_one_img_with_carrousel_imgs.jsx";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import InfoProductCar from "@/components/multiple_place/info_product/js_info_product.jsx";
import axiosInstance from "@/utils/axios_instance";
import { useEffect } from "react";
import LoaderWithImg from "@/components/multiple_place/loader_with_img/LoaderWithImg.jsx";
import { Toaster, toast } from 'sonner';



export default function PreviewPage({ params }) {
    const { uid, name } = params;
    let router = useRouter()


    const [images, setImages] = useState([]);
    const [dataFromApi, setDataFromApi] = useState([]);
    const [loading, setLoading] = useState(true);


    

    const handlePost = async () => {
        // Asegúrate de que este toast aparezca antes de continuar con la operación
        toast('Iniciando la solicitud...');
    
        const loadingToastId = toast.loading('Cargando...');
    
        try {
            const response = await axiosInstance.patch(
                `products/cars/${uid}/`,
                {
                    "bussine": name,
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            
            toast.dismiss(loadingToastId);
            toast.success('Éxito!! Ya está en el inventario');
            
        } catch (error) {
            console.error("Error durante la solicitud:", error);
            toast.dismiss(loadingToastId);
            toast.error('Ocurrió un error, intenta de nuevo');
        }
    };


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
                    <div style={{ width: "90%", paddingTop: "5vh", marginBottom: "15vh" }} >
                        <OneImgWithCarrouselImgs imgs={images} />
                        <InfoProductCar data_from_api={dataFromApi} />
                        <div style={{ display: "flex", justifyContent: "center", position: "fixed", bottom: "5vh", width: "60%" }}   >
                            <button onClick={handlePost} style={{ padding: "1vh 5vw", backgroundColor: "#2b61e5", borderRadius: 5, color: "white" }}>Agregar al inventario</button>
                        </div>



                    </div>



                </div>




            )}

            <Toaster style={{ marginTop: "2vh" }} position="top-right" />
        </div>

    );
}
