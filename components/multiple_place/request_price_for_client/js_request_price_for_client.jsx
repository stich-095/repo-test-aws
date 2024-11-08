"use client"

import OneImgWithCarrouselImgs from "@/components/multiple_place/one_img_with_carrousel_imgs/js_one_img_with_carrousel_imgs.jsx";
import InfoProductCar from "@/components/multiple_place/info_product/js_info_product.jsx";
import Image from 'next/image';

export default function RequestPriceForClient() {

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
        <div>
            <div style={{ position: "relative", width: "fit-content" }} >

                <div style={{ position: "relative" }} >
                    <div style={{ width: "100%" }} >
                        <Image style={{ borderRadius: 30 }} relative src="/images/img_price_for_client.png" alt="auto" width={1364} height={472} />
                    </div>

                </div>
                <div style={{ position: "absolute", left: 20, top: 15 }} >
                    <div>
                        <h1 style={{ fontSize: "2vw" }}>Hacer una propuesta por</h1>
                        <h1 style={{ fontSize: "1.7vw" }}>$ escribir valor cotizado</h1>
                        <h1 style={{ fontSize: "1.5vw" }}>+ financiamiento a medida</h1>
                    </div>
                    <div>
                        <div><button>Ver propuesta</button></div>
                        <div><button>Enviar propuesta</button></div>
                    </div>
                </div>

            </div>
            <div>
                <h1 style={{ fontSize: "2vw" }} >Solicitud de cotizacion</h1>
            </div>
            <div>
                <div>
                    <h1>Datos del solicitante</h1>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}  >
                    <div>
                        <div>
                            <h1>Nombre</h1>
                        </div>
                        <div>
                            <h1>Almar Lopez</h1>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1>Correo electronico</h1>
                        </div>
                        <div>
                            <h1>almarlopez2520@gmail.com</h1>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1>Whatsapp</h1>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }} >
                            <div>
                                <h1>2664304258</h1>
                            </div>
                            <div>
                                <h1>contactar</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1>Open Car</h1>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }} >
                            <div>
                                <h1>Si,</h1>
                            </div>
                            <div>
                                <h1> ir al detalle</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <OneImgWithCarrouselImgs imgs={images} />
                <InfoProductCar />

            </div>

        </div>
    )
}