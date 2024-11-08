"use client";


import "./css_one_img_with_carrousel_imgs.css";
import { useState, useEffect, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { mdiChevronLeft } from '@mdi/js';



export default function OneImgWithCarrouselImgs({ imgs }) {


    let images = imgs



    const [selectedIndex, setSelectedIndex] = useState(0);
    const carouselRef = useRef(null);

    const handleImageClick = (index) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            const thumbnail = carousel.children[selectedIndex];
            if (thumbnail) {
                const thumbnailRect = thumbnail.getBoundingClientRect();
                const carouselRect = carousel.getBoundingClientRect();
                const offset = thumbnailRect.left - carouselRect.left - (carouselRect.width / 2) + (thumbnailRect.width / 2);
                carousel.scrollLeft += offset;
            }
        }
    }, [selectedIndex]);

    return (
        <div className="image_gallery_for_product">
            <div className="main_image_for_product">
                <img src={images[selectedIndex].src} alt={images[selectedIndex].alt} />
                <div className="buttons_for_product">
                    <button onClick={() => handleImageClick((selectedIndex - 1 + images.length) % images.length)}>

                        <Icon style={{backgroundColor:"white", borderRadius:"10vw"}} path={mdiChevronLeft} size={1} />
                    </button>
                    <button onClick={() => handleImageClick((selectedIndex + 1) % images.length)}>
                        <Icon style={{backgroundColor:"white", borderRadius:"10vw"}} path={mdiChevronRight} size={1} />
                    </button>
                </div>
            </div>

            <div className="carousel_for_product" ref={carouselRef}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        className={`thumbnail ${index === selectedIndex ? 'active' : ''}`}
                        onClick={() => handleImageClick(index)}
                    />
                ))}
            </div>




        </div>
    );
}


