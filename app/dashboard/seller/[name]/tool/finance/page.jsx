"use client";

import { useEffect, useState } from "react";
import AllFinanceComponent from "@/components/multiple_place/all_finance/js_all_finance.jsx";
import LoaderWithImg from "@/components/multiple_place/loader_with_img/LoaderWithImg.jsx";
import axiosInstance from "@/utils/axios_instance";

export default function AllProductPage({ params }) {
    const [loading, setLoading] = useState(true); 
    const [dataFromApi, setDataFromApi] = useState([]); 
    const { name } = params;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    `request_credit_info/credit_info`,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                const data = response.data;
                setDataFromApi(data); // Guardar todos los datos que provienen de la API
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            
        };

        fetchData();
    }, []); //name lo borre y sigue funcionando pero cuidado

    return (
        <div style={{ height: "2500px",  width: "100%" }}>
            {loading ? (
                <LoaderWithImg />
            ) : (
                <AllFinanceComponent data_from_api={dataFromApi} bussine_uid={name}  />
            )}
        </div>
    );
}
