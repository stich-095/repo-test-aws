"use client";


import UploadImg from "@/components/multiple_place/upload_imgs/upload_img"
import { useRouter } from "next/navigation";

export default function UploadImgPage({ params }) {
    let { name } = params
    let router = useRouter()

    let onClick = () => {
        
        router.push(`/dashboard/seller/${name}/new_product/car/features`)
    }
    return (


        <UploadImg onClick={onClick} />

    );
}