"use client";

import { useEffect, useState } from "react";
import AllProductShop from "@/components/only_place/all_product_shop/js_all_product_shop";
import LoaderWithImg from "@/components/multiple_place/loader_with_img/LoaderWithImg.jsx";
import axiosInstance from "@/utils/axios_instance";


export default function AllProductPage({ params }) {
    const [loading, setLoading] = useState(true);
    const [dataFromApi, setDataFromApi] = useState([]);
    const { uid_bussine, bussine_name } = params;

    console.log("name", name);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    `products/cars/?bussine=${uid_bussine}`,
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
    }, []); //name lo borre y sigue funcionando pero cuidado

    return (
        <div style={{ height: "2500px", width: "100%" }}>
            {loading ? (
                <LoaderWithImg />
            ) : (
                <div style={{marginTop:"5vh"}} >
                    <AllProductShop data_from_api={dataFromApi} seler_uid={uid_bussine} bussine_name= {bussine_name}  />
                </div>
            )}
        </div>
    );
}
