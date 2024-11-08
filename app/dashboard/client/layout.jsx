"use client";
import "./layout_style.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from '@mdi/react';
import { mdiMenu, mdiWindowClose } from '@mdi/js';



export default function RootLayout({ children, params }) {
    const pathname = usePathname();
    const { name } = params;

    const [activeLink, setActiveLink] = useState("");
    const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 768px)").matches);
    const [activeDashboardleftComponent, setActiveDashboardleftComponent] = useState(isMobile ? false : true);


    useEffect(() => {
        // Identifica si alguna palabra clave está en el pathname
        if (pathname.includes("all_products")) {
            setActiveLink("all_products");
        } else if (pathname.includes("open_car")) {
            setActiveLink("open_car");
        } else if (pathname.includes("request_price_for_client")) {
            setActiveLink("request_price_for_client");
        } else if (pathname.includes("finance")) {
            setActiveLink("finance");
        } else if (pathname.includes("secure_buy")) {
            setActiveLink("secure_buy");
        } else if (pathname.includes("config")) {
            setActiveLink("config");
        } else if (pathname.includes("new_product")) {
            setActiveLink("new_product");
        } else if (pathname.includes("insurance")) {
            setActiveLink("insurance");
        } else {
            setActiveLink(""); // Si no coincide ninguna, desactiva todo
        }


    }, [pathname]);



    return (
        <div id="all_content_dashboard" >
            <div id="header_phone_dashboard"   >

                <div onClick={() => setActiveDashboardleftComponent(true)} style={{ display: activeDashboardleftComponent == false ? "flex" : "none", position: "fixed", left: "5vw" }} >
                    <Icon path={mdiMenu} size={1} color="white" />
                </div>
                <div onClick={() => setActiveDashboardleftComponent(false)} style={{ display: activeDashboardleftComponent == true ? "flex" : "none", position: "fixed", left: "5vw" }} >
                    <Icon path={mdiWindowClose} size={1} color="white" />
                </div>


                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <div style={{ width: "15%" }} >
                        <Image src="/images/aceleron_logo.png" alt="logo" responsive width={500} height={500} />
                    </div>
                    <div>
                        <h2 style={{ color: "white" }}>aceleron</h2>
                    </div>
                </div>

            </div>
            <div id="dashboard_left_component" style={{ display: activeDashboardleftComponent == true ? "flex" : "none" }}>

                <div id="cont_link_for_dashboard"  >

                    

                   

                   

                    <div className="cont_link_dashboard">
                        <Link
                            onClick={isMobile ? () => setActiveDashboardleftComponent(false) : null}
                            href={`/dashboard/seller/${name}/tool/finance`}
                            className={`link_dashboard ${activeLink === "finance" ? "active" : ""}`}
                        >
                            Financiamiento
                        </Link>
                    </div>

                    <div className="cont_link_dashboard">
                        <Link
                            onClick={isMobile ? () => setActiveDashboardleftComponent(false) : null}
                            href={`/dashboard/seller/${name}/tool/secure_buy`}
                            className={`link_dashboard ${activeLink === "secure_buy" ? "active" : ""}`}
                        >
                            Compra segura
                        </Link>
                    </div>

                    

                    

                    
                </div>

                <div id="menu_phone_background" >

                </div>

            </div>



            <div id="cont_tool">
                <div id="cont_rigth_dashboard">
                    {children}
                </div>
            </div>
        </div>
    );
}
