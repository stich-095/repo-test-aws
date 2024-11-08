"use client"
import AllRequestPriceForClient from "@/components/multiple_place/all_request_price_for_client/js_all_request_price_for_client"
import { useEffect, useState } from "react";
import LoaderWithImg from "@/components/multiple_place/loader_with_img/LoaderWithImg.jsx";
import axiosInstance from "@/utils/axios_instance";


export default function RequestPriceForClientPage({ params }) {

    const [loading, setLoading] = useState(true);
    const [dataFromApi, setDataFromApi] = useState([]);


    const { name } = params;
    const [images, setImages] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/request_price_client/request_price/?bussine=${name}`,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                const data = response.data;
                await setDataFromApi(data);

                console.log("data", data);
                const images_response = await Promise.all(
                    data.map((carId) =>
                        axiosInstance.get(`products/cars/${carId.car}`)
                    )
                );

                let new_data = data.map((carId, index) => {
                   
                    let carData = images_response[index].data;
                    
                    console.log("test-prueba-fetch-data", data[index]);
                   
                    let carImages = carData.images.map(img => ({
                        src: img.image,
                        alt: `Imagen ${img.uid}`,
                    }));
                
                   
                    return {
                        car: carId.car,
                        car_model: carData.modelo,
                        car_brand: carData.marca,
                        carImages: carImages,
                        status: data[index].status,
                        price_offered: data[index].price_offered,
                        open_car: data[index].open_car,
                    };
                });
                

                console.log("new_data", new_data);
                setDataFromApi(new_data);
                setLoading(false);


            } catch (error) {
                console.error("Error fetching data:", error);
            }

        };

        fetchData();
    }, []); //name lo borre y sigue funcionando pero cuidado

    

    return (
        <div>
            {loading ? (
                <LoaderWithImg />
            ) : (
                <AllRequestPriceForClient data_from_api={dataFromApi} bussine_uid={name} />
            )}
        </div>
    )

}