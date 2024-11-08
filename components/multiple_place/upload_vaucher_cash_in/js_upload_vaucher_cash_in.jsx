"use client"; // Para que funcione en entornos de Next.js con componentes que requieren renderización en el cliente
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Icon from '@mdi/react';
import { mdiTrayArrowUp } from '@mdi/js';
import axiosInstance from '@/utils/axios_instance';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner'

export default function UploadVaucherCashIn({ uid_cash_in }) {


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
        if (selectedFiles.length === 0) {
            toast.error("Aun no has seleccionado un archivo.");
            return;
        } else if (selectedFiles.length > 1) {
            toast.error("Solo puedes subir un archivo.");
            return;
        }
    
        const formData = new FormData();
        formData.append('vaucher_cash_in', selectedFiles[0]);
    
        try {
            const response = await axiosInstance.patch(`/secure_payment/cash_in/${uid_cash_in}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Archivo subido exitosamente");
        } catch (error) {
            toast.error("Error al subir el archivo");
            console.error("Upload error:", error);
        }
    };


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "auto", position: "relative" }}>
            <div style={{ marginTop: 25, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", maxWidth: "100%" }}>
                {previewUrls.length > 0 && previewUrls.map((url, index) => (
                    <div style={{ width: 350, height: 350 }}  >
                        <Image key={index} src={url} alt={`Vista previa ${index + 1}`} width={500} height={500} />
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
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
                        <span style={{ marginLeft: 10 }}>Subir anulacion</span>
                    </div>

                </div>
                <div style={{ border: "1px solid black", padding: "10px 20px", cursor: "pointer", color: "black", borderRadius: "10px", marginBottom: "20px", display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "white", marginLeft: "3vh" }} onClick={handleUpload} >
                    <button>Enviar</button>
                </div>
            </div>






            <Toaster style={{ marginTop: "2vh" }} position="top-right" />


        </div>
    );
}
