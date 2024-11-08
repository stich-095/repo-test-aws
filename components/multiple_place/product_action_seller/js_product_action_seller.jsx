import "./css_product_action_seller.css";
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { mdiChevronLeft } from '@mdi/js';

export default function OneImgWithCarrouselImgs({ data_from_api, seler_uid }) {

    const selerUid = seler_uid;
    console.log("sler-imgs", selerUid);
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
                if (item.propiedad == "concesionaria" || item.propiedad == "tercero") {
                    const selectedIndex = selectedIndexes[index];
                    const images = item.images;

                    return (
                        <div key={item.uid} className="cont_all_product">
                            <div className="image-gallery-all-product">
                                <div className="main-image-all-product">
                                    <Image
                                        className="image-all-product-seller"
                                        src={images[selectedIndex].image}
                                        alt={`Imagen de ${item.marca} ${item.modelo}`}
                                        width={500}
                                        height={500}
                                    />
                                </div>

                                <div className="buttons_all_product_inventory">
                                    <button onClick={() => handleImageClick(index, 'prev')}>
                                        <Icon style={{ backgroundColor: "white", borderRadius: "10vw" }} path={mdiChevronLeft} size={1} />
                                    </button>
                                    <button onClick={() => handleImageClick(index, 'next')}>
                                        <Icon style={{ backgroundColor: "white", borderRadius: "10vw" }} path={mdiChevronRight} size={1} />
                                    </button>
                                </div>
                            </div>

                            <div className="cont_all_items">
                                <div className="cont_items">
                                    <div className="cont_genric_items">
                                        <div><h1>Marca</h1></div>
                                        <div><h1>{item.marca}</h1></div>
                                    </div>
                                    <div className="cont_genric_items"  >
                                        <div><h1>Modelo</h1></div>
                                        <div><h1>{item.modelo}</h1></div>
                                    </div>
                                    <div className="cont_genric_items color_item" >
                                        <div><h1>Color</h1></div>
                                        <div><h1>{item.color}</h1></div>
                                    </div>
                                    <div className="cont_genric_items">
                                        <div><h1>Patente</h1></div>
                                        <div><h1>{item.patente}</h1></div>
                                    </div>
                                    <div className="cont_genric_items">
                                        <div><h1>Propiedad</h1></div>
                                        <div><h1>{item.propiedad}</h1></div>
                                    </div>
                                </div>

                                <div style={{ display: "flex", justifyContent: "center" }}>
                                
                                    <Link href={`/dashboard/seller/${selerUid}/tool/all_products/car/${item.uid}`}>Ir al detalle</Link>
                                </div>
                            </div>
                        </div>
                    );
                }

            })}
        </div>
    );
}
