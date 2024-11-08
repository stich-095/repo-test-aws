

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EndPostPage({ params }) {

    let { name } = params;
    let router = useRouter();

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", justifyContent: "center" }} >

            <div style={{ backgroundColor: "yellow", width: "60vw", height: "auto", border: "1px solid black" }} >
                <div style={{ width: "5vw" }}>

                    <Image responsive src="/images/aceleron_logo.png" width="500" height="500" />

                </div>
                <div style={{ width: "5vw" }}  >
                    <Image responsive src="/images/meli_logo.png" width="500" height="500" />

                </div>
                <div  style={{ width: "5vw" }}>
                    <Image responsive src="/images/logo_ig.png" width="500" height="500" />
                </div>
            </div>


        </div>

    )

}