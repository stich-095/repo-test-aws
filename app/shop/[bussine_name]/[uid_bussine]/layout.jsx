"use client"
import "./css_layout.css";
import axiosInstance from "@/utils/axios_instance";
import LoaderWithImg from "@/components/multiple_place/loader_with_img/LoaderWithImg";
import { useEffect, useState } from "react";


export default function RootLayout({ children, params }) {
    const { bussine_name, uid_bussine } = params;
    const [dataBussine, setDataBussine] = useState([]);
    const [loading, setLoading] = useState(true);





    useEffect(() => {
        const fetchDataBussine = async () => {
            console.log("entre a bussine", uid_bussine);
            try {
                const response_bussine = await axiosInstance.get("users/data_bussine_for_client", {
                    params: {
                        bussine: uid_bussine
                    }
                }
                );
                const data_bussine = response_bussine.data;
                setDataBussine(data_bussine);
                console.log("data bussine", data_bussine);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataBussine();
    }, [uid_bussine]);




    return (
        <div>

            {loading ? (
                <LoaderWithImg />
            ) : (
                <>

                    <div className="cont_all_shop"   >
                        <div className="header_shop"  >
                            <div className="header_content_shop"  >
                                <h1 style={{ fontWeight:"550" }} >{dataBussine.name}</h1>
                                <h2 style={{fontSize:11, color:"#0000008a"}} >powered by aceleron</h2>
                            </div>
                        </div>
                        <div className="cont_shop"    >
                            {children}
                        </div>

                    </div>
                </>
            )}

        </div>





    );
}