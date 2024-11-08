"use client";

import { useEffect, useState } from "react";
import ProductActionSeller from "@/components/multiple_place/product_action_seller/js_product_action_seller.jsx";
import LoaderWithImg from "@/components/multiple_place/loader_with_img/LoaderWithImg.jsx";
import axiosInstance from "@/utils/axios_instance";

export default function AllProductPage({ params }) {
    const [loading, setLoading] = useState(true); 
    const [dataFromApi, setDataFromApi] = useState([]); 
    const { name } = params;

    console.log("name", name);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    `products/cars/?bussine=${name}`,
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
        <div style={{ height: "2500px",  width: "100%" }}>
            {loading ? (
                <LoaderWithImg />
            ) : (
                <ProductActionSeller data_from_api={dataFromApi} seler_uid={name} />
            )}
        </div>
    );
}
