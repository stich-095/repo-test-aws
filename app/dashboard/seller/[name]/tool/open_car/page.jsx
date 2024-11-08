


"use client"


import AllOpenCar from "@/components/multiple_place/all_open_car/js_all_open_car.jsx";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios_instance";
import LoaderWithImg from "@/components/multiple_place/loader_with_img/LoaderWithImg.jsx";







export default function AllOpenCarPage({params}) {

    const [loading, setLoading] = useState(true);
    const [dataFromApi, setDataFromApi] = useState([]);
    const { name } = params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    `open_product/open_cars/?bussine=${name}`,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                const data = response.data;
                setDataFromApi(data); // Guardar todos los datos que provienen de la API
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return ( 
        <div>

            
            {loading ? (
                <LoaderWithImg />
            ) : (
                <AllOpenCar  data_from_api={dataFromApi} seler_uid={name} />
            )}
        

        </div>
    )

}