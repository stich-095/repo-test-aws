"use client";


import UploadImgsClient from "@/components/multiple_place/upload_imgs_client/js_upload_imgs_client"
import { useRouter } from "next/navigation";

export default function UploadImgPage({ params }) {
    let { bussine_name, uid_bussine , uid } = params
    let router = useRouter()

    

    let select_redirect = `/shop/bussine_name/${uid_bussine}/new_product/car/${uid}/features`

    
    return (


        <UploadImgsClient bussine_name={bussine_name} uid_bussine={uid_bussine}   uid_car={uid} />

    );
}