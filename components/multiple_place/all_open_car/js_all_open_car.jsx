


"use client"

import "./css_all_open_car.css";

import { useState } from 'react';
import Link from "next/link";



export default function AllOpenCar({ data_from_api, seler_uid }) {


    const selerUid = seler_uid;
    console.log("sler-imgs", selerUid);
    console.log("data_from_api", data_from_api);
    const [selectedIndexes, setSelectedIndexes] = useState(Array(data_from_api.length).fill(0));

    const handleImageClick = (index, direction) => {
        setSelectedIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            const images = data_from_api[index].images;
            if (direction === 'next') {
                newIndexes[index] = (newIndexes[index] + 1) % images.length;
            } else {
                newIndexes[index] = (newIndexes[index] - 1 + images.length) % images.length;
            }
            return newIndexes;
        });
    };



    return (
        <div>

            {data_from_api.map((item, index) => {

                if (item.client) {
                    return (


                        <div className="all_content_all_product"  >
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }} >


                                <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "row" }} >

                                    <div id="cont_all_generic_items_all_product"   >
                                        <div className="_all_product" >
                                            <h1>{item.cars_for_view.length > 1 ? "Autos a mostrar" : "Auto a mostrar"}</h1>
                                            <div id="cars_for_see"  >
                                                {item.cars_for_view.map((car, index) => {
                                                    return (
                                                        <div>

                                                            <Link href={`/dashboard/seller/${selerUid}/product/car/${car}`}>Ir al auto</Link>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                        </div>

                                        <div className="cont_genric_items_all_product data_for_appointment " >
                                            <div>
                                                <h1>Modalidad</h1>
                                            </div>
                                            <div>
                                                <h1>{item.modalidad}</h1>
                                            </div>
                                        </div>
                                        <div className="cont_genric_items_all_product data_for_appointment " >
                                            <div>
                                                <h1>Dia</h1>
                                            </div>
                                            <div>
                                                <h1>{item.dia}</h1>
                                            </div>
                                        </div>
                                        <div className="cont_genric_items_all_product data_for_appointment " >
                                            <div>
                                                <h1>Hora</h1>
                                            </div>
                                            <div>
                                                <h1>{item.hora}</h1>
                                            </div>
                                        </div>
                                        <div className="cont_genric_items_all_product" >
                                            <div>
                                                <h1>Solicita permuta + financiamiento</h1>
                                            </div>
                                            <div >
                                                {item.request_price_client ? (
                                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                                        <h1>Si,</h1>

                                                        <Link href={`/dashboard/seller/${selerUid}/tool/request_price_for_client/${item.request_price_client.car}`}>
                                                            ir a a solicitud
                                                        </Link>
                                                        <h1 style={{backgroundColor:item.request_price_client.status =="enviada" ? "#daf1da" : item.request_price_client.status =="pendiente" ? "#fff3cd" : "unset", color:item.request_price_client.status =="enviada"  ? "#008000": item.request_price_client.status =="pendiente" ? "#7a4d05": "unset", borderRadius:10, padding:item.request_price_client.status =="enviada" || item.request_price_client.status =="pendiente" ? "0.1vh 1vw": "unset"}} >{item.request_price_client.status}</h1>

                                                    </div>
                                                ) : (
                                                    <h1>No</h1>
                                                )}

                                            </div>
                                        </div>


                                    </div>


                                </div>
                                <div style={{ display: "flex", justifyContent: "center" }} >
                                    <Link href={`/dashboard/seller/${seler_uid}/tool/open_car/${item.uid}`} >Ir al detalle</Link>
                                </div>
                            </div>


                        </div>)
                }


            })}
        </div>

    );
}


