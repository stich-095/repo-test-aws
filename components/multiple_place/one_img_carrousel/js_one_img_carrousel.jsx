


"use client"

import "./css_product_action_seller.css";

import { useState} from 'react';
import Image from "next/image";




export default function OneImgCarrousel({ imgs }) {


    let images = imgs


    const [selectedIndex, setSelectedIndex] = useState(0);


    const handleImageClick = (index) => {
        setSelectedIndex(index);
    };


    return (
        <div>
            <div className="image-gallery">
                <div className="main-image">
                    <Image src={images[selectedIndex].src} alt={images[selectedIndex].alt} />
                </div>



                <div className="buttons">
                    <button onClick={() => handleImageClick((selectedIndex - 1 + images.length) % images.length)}>
                        Anterior
                    </button>
                    <button onClick={() => handleImageClick((selectedIndex + 1) % images.length)}>
                        Siguiente
                    </button>
                </div>


            </div>
        </div>

    );
}

