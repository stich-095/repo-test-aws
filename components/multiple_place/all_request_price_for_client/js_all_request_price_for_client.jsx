"use client";

import "./css_all_request_price_for_client.css";
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { mdiChevronLeft } from '@mdi/js';


export default function AllRequestPriceForClient({ data_from_api, bussine_uid }) {



    const [selectedIndices, setSelectedIndices] = useState(
        Array(data_from_api.length).fill(0)
    );


    const handleImageClick = (carIndex, newIndex) => {

        setSelectedIndices(prevSelectedIndices => {
            const updatedIndices = [...prevSelectedIndices];
            updatedIndices[carIndex] = newIndex;
            return updatedIndices;
        });
    };

    return (
        <div>
            {data_from_api.map((carData, carIndex) => {

                const images = carData.carImages;

                return (
                    <div key={carIndex} className="cont_all_request_price" >
                        <div className="image_gallery_all_request_price">
                            <div className="main_image_all_request_price">

                                <Image className="image_all_request_price" src={images[selectedIndices[carIndex]].src} alt={images[selectedIndices[carIndex]].alt} width={500} height={500} />
                            </div>

                            <div className="buttons_all_request_price">
                                <button onClick={() => handleImageClick(carIndex, (selectedIndices[carIndex] - 1 + images.length) % images.length)}>
                                    <Icon style={{ backgroundColor: "white", borderRadius: "10vw" }} path={mdiChevronLeft} size={1} />
                                </button>
                                <button onClick={() => handleImageClick(carIndex, (selectedIndices[carIndex] + 1) % images.length)}>
                                    <Icon style={{ backgroundColor: "white", borderRadius: "10vw" }} path={mdiChevronRight} size={1} />
                                </button>
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", gap: "3vw" }}>
                                <div className="cont_genric_items_all_request_price">
                                    <div><h1>Estado</h1></div>
                                
                                    <div style={{ backgroundColor:carData.status =="enviada" ? "#daf1da" : carData.status =="pendiente" ? "#fff3cd" :"unst", color:carData.status =="enviada"  ? "#008000": carData.status =="pendiente" ? "#7a4d05": "unset",  borderRadius:10, padding:carData.status =="enviada" || carData.status =="pendiente" ? "0.1vh 1vw": "unset" }} >{carData.status}</div>
                                </div>
                                <div className="cont_genric_items_all_request_price open_car_for_request_price">
                                    <div><h1>Open car</h1></div>
                                    <div><h1><Link href={`/dashboard/seller/${bussine_uid}/tool/open_car/${carData.open_car}`}   >Ir a open car</Link></h1></div>
                                </div>
                                <div className="cont_genric_items_all_request_price">
                                    <div><h1>Cotización</h1></div>
                                    <div><h1>{carData.price_offered  ? carData.price_offered :"$ ---" }</h1></div>
                                </div>
                                <div className="cont_genric_items_all_request_price">
                                    <div><h1>Marca</h1></div>
                                    <div><h1>{carData.car_brand}</h1></div>
                                </div>
                                <div className="cont_genric_items_all_request_price">
                                    <div><h1>Modelo</h1></div>
                                    <div><h1>{carData.car_model}</h1></div>
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Link href={`/dashboard/seller/${bussine_uid}/tool/request_price_for_client/${carData.car}`}>
                                    Ir al detalle
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
