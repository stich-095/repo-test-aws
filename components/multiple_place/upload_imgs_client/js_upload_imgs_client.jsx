"use client"; // Para que funcione en entornos de Next.js con componentes que requieren renderización en el cliente
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Icon from '@mdi/react';
import { mdiTrayArrowUp } from '@mdi/js';
import axiosInstance from '@/utils/axios_instance';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner'

export default function UploadImgsClient({ uid_car, bussine_name, uid_bussine }) {

    
    const [selectedFiles, setSelectedFiles] = useState([]); // Para almacenar múltiples archivos
    const [previewUrls, setPreviewUrls] = useState([]); // Para almacenar las URLs de vista previa
    const fileInputRef = useRef(null); // Ref para referenciar el input file

    const router = useRouter();

   

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files); // Convierte los nuevos archivos en un arreglo
        const newPreviews = newFiles.map((file) => URL.createObjectURL(file)); // Genera URLs de vista previa para los nuevos archivos

        // Concatena las nuevas imágenes y sus vistas previas con las existentes
        setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
        setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviews]);

        // Resetear el input para que permita volver a seleccionar el mismo archivo
        event.target.value = null;
    };

    const handleDivClick = () => {
        // Dispara el evento de click en el input file
        fileInputRef.current.click();
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0 || selectedFiles.length < 3 || selectedFiles.length > 10) {
            toast.error("El minimo de imagenes es 3 y el maximo 10");
            return;
        }
        

        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('files', file); // 'files' debe coincidir con el campo en el backend
        });
        formData.append('car', uid_car);; // Asegúrate de enviar el ID del coche relacionado

        try {
            const response = await axiosInstance.post('products/upload_files/images/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            router.push(`/shop/${bussine_name}/${uid_bussine}/new_product/car/${uid_car}/preview`);
        } catch (error) {
            console.error('Error al subir los archivos:', error);
        }
    };


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "auto", position: "relative" }}>

            <div style={{ position: "fixed", bottom: 0, display: "flex", flexDirection: "row", alignItems: "center" }} >
                <div>
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />


                    <div style={{ border: "1px solid black", padding: "10px 20px", cursor: "pointer", color: "black", borderRadius: "10px", marginBottom: "20px", display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "white" }}
                        onClick={handleDivClick}
                    >
                        <Icon path={mdiTrayArrowUp} size={1} />
                        <span style={{ marginLeft: 10 }}>Subir fotos del coche</span>
                    </div>

                </div>
                <div style={{ border: "1px solid black", padding: "10px 20px", cursor: "pointer", color: "black", borderRadius: "10px", marginBottom: "20px", display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "white", marginLeft: "3vh" }} onClick={handleUpload} >
                    <button>siguiente</button>
                </div>
            </div>


            <div style={{ marginTop: 25, display: "flex", flexDirection: "row", flexWrap: "wrap", width: "70vw", justifyContent: "center", maxWidth: "100%" }}>
                {previewUrls.length > 0 && previewUrls.map((url, index) => (
                    <div style={{ width: 350, height: 350 }}  >
                        <Image key={index} src={url} alt={`Vista previa ${index + 1}`} width={500} height={500} />
                    </div>
                ))}
            </div>

            {previewUrls.length == 0 && (
                <div style={{ marginTop: 25, display: "flex", flexDirection: "row", flexWrap: "wrap", width: "70vw", justifyContent: "center", maxWidth: "100%" }} >

                    <div style={{ width: 300, height: "fit-content", }} >
                        <Image src="/images/auto3.png" width={500} height={500} />
                    </div>
                    <div style={{ width: 300, height: "fit-content", }} >
                        <Image src="/images/auto4.png" width={500} height={500} />
                    </div>



                    <div style={{ width: 300, height: "fit-content", }} >
                        <Image src="/images/auto5.png" width={500} height={500} />
                    </div>
                    <div style={{ width: 300, height: "fit-content", }} >
                        <Image src="/images/auto6.png" width={500} height={500} />
                    </div>

                </div>
            )

            }

            <Toaster style={{ marginTop: "2vh" }} position="top-right" />


        </div>
    );
}
