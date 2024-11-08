'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import "./css_intermittent_image.css";

export default function IntermittentImage() {
  // Lista de imágenes
  const images = [
    '/images/relax_open_car1.jpg',
    '/images/relax_open_car2.jpg',
    '/images/relax_open_car3.jpg',
    '/images/relax_open_car4.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500); // Cambia cada 3.5 segundos

    return () => clearInterval(interval); // Limpiar intervalo cuando el componente se desmonta
  }, [images.length]);

  return (
    <div style={{position:"relative" , backgroundColor: "white", width: "30%",height:"fit-content" , borderRadius: 10, boxShadow: "0px 5px 7px rgba(0, 0, 0, 0.16)" }}  >
      <div    >
        {images.map((image, index) => (
          <div
            key={index}
            
            style={{
              zIndex: index === currentIndex ? 1 : 0,
              opacity: index === currentIndex ? 1 : 0,
              position: 'absolute',
              transition: 'opacity 1s ease-in-out',
              width: '100%',
            }}
          >
            <Image
              className="main-image-all-product"
              src={image}
              alt={`Image ${index + 1}`}
              width={500} // Ajusta según el tamaño deseado
              height={500} // Ajusta según el tamaño deseado
              layout="responsive"
              style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
            />
          </div>
        ))}
      </div>

    </div>
  );
}
/*
<div key={item.uid}  style={{ backgroundColor:"white", width: "30%", borderRadius:10, boxShadow:"0px 5px 7px rgba(0, 0, 0, 0.16)"}} >
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

                            <div className="buttons">
                                <button onClick={() => handleImageClick(index, 'prev')}>
                                    Anterior
                                </button>
                                <button onClick={() => handleImageClick(index, 'next')}>
                                    Siguiente
                                </button>
                            </div>
                        </div>
                        <div>
                            <h1>Toyota corrolla</h1>
                            <h1>1.8 GL CVT Sedan </h1>
                            <div  style={{ display:"flex", flexDirection:"row" }} >
                                <h1>2020</h1>
                                <h1>120.000 km</h1>
                            </div>
                        </div>
                        <div>$15.000.000</div>


                    </div>

*/