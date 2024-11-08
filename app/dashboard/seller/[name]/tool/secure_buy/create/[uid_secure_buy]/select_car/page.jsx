"use client";

import { useEffect, useState } from "react";
import SelectCarForSecurePayment from "@/components/only_place/select_car_for_secure_payment/js_select_car_for_secure_payment.jsx";
import LoaderWithImg from "@/components/multiple_place/loader_with_img/LoaderWithImg.jsx";
import axiosInstance from "@/utils/axios_instance";

export default function SelectCar({ params }) {
    const [loading, setLoading] = useState(true); 
    const [dataFromApi, setDataFromApi] = useState([]); 
    const { name, uid_secure_buy } = params;

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
    }, []); 

    return (
        <div style={{ height: "2500px",  width: "100%" }}>
            {loading ? (
                <LoaderWithImg />
            ) : (
                <SelectCarForSecurePayment data_from_api={dataFromApi} seler_uid={name} uid_secure_buy={uid_secure_buy} />
            )}
        </div>
    );
}
