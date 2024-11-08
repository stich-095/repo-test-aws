"use client";

import "./preview_page.css";
import OneImgWithCarrouselImgs from "@/components/multiple_place/one_img_with_carrousel_imgs/js_one_img_with_carrousel_imgs.jsx";
import Image from "next/image";
import { useState } from 'react';

import { useRouter } from "next/navigation";
import InfoProductCar from "@/components/multiple_place/info_product/js_info_product.jsx";
import FinancingDemo from "@/components/multiple_place/financing_demo/js_financing_demo.jsx";


export default function PreviewPage({ params }) {

    let { name } = params
    let router = useRouter()
    

    let handleEndPost = () => {
        router.push(`/dashboard/seller/${name}/new_product/car/end_post`)
    }

    
    const images = [
        { src: '/images/auto3.png', alt: 'Imagen 1' },
        { src: '/images/auto4.png', alt: 'Imagen 2' },
        { src: '/images/auto5.png', alt: 'Imagen 3' },
        { src: '/images/auto6.png', alt: 'Imagen 4' },
        { src: '/images/cam1_ai.png', alt: 'Imagen 5' },
        { src: '/images/auto3.png', alt: 'Imagen 1' },
        { src: '/images/auto4.png', alt: 'Imagen 2' },
        { src: '/images/auto5.png', alt: 'Imagen 3' },
        { src: '/images/auto6.png', alt: 'Imagen 4' },
        { src: '/images/cam1_ai.png', alt: 'Imagen 5' }
    ];
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "60%", backgroundColor: "red", paddingTop: "5vh", marginBottom:"15vh" }} >
                <OneImgWithCarrouselImgs imgs={images} />
                <InfoProductCar  />
                <FinancingDemo />
            </div>
            {/* esto podria ser un componente tambien     */ }
            <div style={{ width: "40%", backgroundColor: "yellow", minHeight: "100vh", padding: "5vh 2vw" }} >
                <div style={{ width: "100%", height: "fit-content", backgroundColor: "white" }} >
                    <div>
                        <h1>FORD Transit Courier</h1>
                        <h1>Kombi 1.0 EcoBoost 75kW Trend</h1>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }} >
                        <h2>2021</h2>
                        <h2>125.000 km</h2>
                        <h2>Nafta</h2>
                    </div>
                    <div>
                        <h2>$ 20.000.000</h2>
                        <h1>opciones de financiamiento</h1>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", padding: "1vh 0.5vw", border: "1px solid black", borderRadius: 10, backgroundColor: "aliceblue" }} >
                        <div style={{ display: "flex", flexDirection: "row", }} >
                            <div style={{ width: "150px" }}  >
                                <Image src="/images/open_car_2.png" alt="Mercado Pago" width={500} height={500} />
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <h1>Open Car</h1>
                                    </div>
                                    <div>
                                        <h2>Conocelo desde la comodidad de tu hogar con una video llamada, sin moverte.</h2>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }} >
                            <button style={{ backgroundColor: "blue", padding: "0.5vh 1vw", borderRadius: "5px" }} >Elegir cuando verlo</button>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "4vh" }} >
                        <div style={{ width: "47%" }} >
                            <button style={{ backgroundColor: "blue", padding: "0.5vh 1vw", borderRadius: "5px", width: "100%" }} >Contactar</button>
                        </div>
                        <div style={{ width: "47%" }} >
                            <button style={{ backgroundColor: "blue", padding: "0.5vh 1vw", borderRadius: "5px", width: "100%" }} >Agendar cita</button>
                        </div>
                    </div>


                </div>
            </div>
            <div style={{ position: "fixed", bottom: 0, height: "10vh", width: "100%", backgroundColor: "white", left: 0, display:"flex", justifyContent:"center", alignItems:"center"}} >
                <div style={{maxWidth:1200, display:"flex", flexDirection:"row"}} >
                    <div>
                        <button>Hacer cambios</button>
                    </div>
                    <div>
                        <button onClick={handleEndPost}  >Publicar</button>
                    </div>
                </div>

            </div>
        </div>

    );
}
