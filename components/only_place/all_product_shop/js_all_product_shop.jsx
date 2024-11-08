import "./css_all_product_shop.css";
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { mdiChevronLeft } from '@mdi/js';


export default function AllProductShop({ data_from_api, seler_uid, bussine_name }) {

    const selerUid = seler_uid;
    const bussineName = bussine_name;
    console.log("sler-imgs", selerUid);
    console.log("data---->", data_from_api);
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
        <div className="cont_all_product_shop"  >
            {data_from_api.map((item, index) => {
                if (item.propiedad == "concesionaria" || item.propiedad == "tercero") {

                    const selectedIndex = selectedIndexes[index];
                    const images = item.images;

                    return (

                        <Link href={`/shop/${bussineName}/${selerUid}/product/${item.uid}`} key={item.uid} className="cont_product_shop" onClick={(e) => {
                            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                                e.preventDefault();
                            }
                        }}   >
                            <div className="image-gallery-all-product">
                                <div className="main-image-all-product">
                                    <Image
                                        src={images[selectedIndex].image}
                                        alt={`Imagen de ${item.marca} ${item.modelo}`}
                                        width={500}
                                        height={500}
                                        style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
                                    />
                                </div>

                                <div className="buttons_navigation_img_shop">
                                    <button onClick={() => handleImageClick(index, 'prev')}>
                                        <Icon style={{ backgroundColor: "white", borderRadius: "10vw" }} path={mdiChevronLeft} size={1.2} />
                                    </button>
                                    <button onClick={() => handleImageClick(index, 'next')}>
                                        <Icon style={{ backgroundColor: "white", borderRadius: "10vw" }} path={mdiChevronRight} size={1.2} />
                                    </button>
                                </div>
                            </div>
                            <div style={{ padding: "1vh 1vw" }} >
                                <div style={{ display: "flex", flexDirection: "row", textTransform: "uppercase", fontWeight: 600 }} >
                                    <h2>{item.marca}</h2>
                                    <h2 style={{ marginLeft: "1vw" }} >{item.modelo} </h2>

                                </div  >

                                <h2>{item.version}</h2>
                                <div style={{ display: "flex", flexDirection: "row" }} >
                                    <h2  >{item.year}</h2>
                                    <h2 style={{ marginLeft: "2vw" }} >{item.kilometraje.toLocaleString('es-AR', {
                                        style: 'unit',
                                        unit: 'kilometer', // Aquí puedes cambiar la unidad (ej. meter, kilogram)
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    })}</h2>
                                    <h2 style={{ marginLeft: "2vw" }} >{item.combustible}</h2>
                                </div>
                                <h2 style={{ fontWeight: 500, fontSize: "1.2rem" }} >{item.precio.toLocaleString('es-AR', {
                                    style: 'currency',
                                    currency: 'ARS',
                                    maximumFractionDigits: 0,
                                })}</h2>
                            </div>






                        </Link>




                    );
                    

                }

                

            })}


        </div>
    );
}
