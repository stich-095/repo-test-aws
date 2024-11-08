"use client";
import "./css_product_page.css";
import OneImgWithCarrouselImgs from "@/components/multiple_place/one_img_with_carrousel_imgs/js_one_img_with_carrousel_imgs.jsx";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import InfoProductCar from "@/components/multiple_place/info_product/js_info_product.jsx";
import FinancingDemoShop from "@/components/multiple_place/financing_demo_shop/js_financing_demo_shop.jsx";
import axiosInstance from "@/utils/axios_instance";
import { useEffect } from "react";
import LoaderWithImg from "@/components/multiple_place/loader_with_img/LoaderWithImg.jsx";
import "react-datepicker/dist/react-datepicker.css";
import CalendarForAppointment from "@/components/multiple_place/calendar_for_appointment/js_calendar_for_appointment.jsx";
import FaqSecureBuy from "@/components/only_place/faq_secure_buy/js_faq_secure_buy.jsx";
import StickyContact from "@/components/only_place/sticky_contact/js_sticky_contact.jsx";
import Link from "next/link";
import { Toaster, toast } from 'sonner';



export default function PreviewPage({ params }) {

    const { uid_product, uid_bussine } = params;
    let router = useRouter()


    const [images, setImages] = useState([]);
    const [dataFromApi, setDataFromApi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openCarViewActivate, setOpenCarViewActivate] = useState(false);
    const [activeViewOpenCar, setActiveViewOpenCar] = useState("date_client");
    const [activeViewContact, setActiveViewContact] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [actionImg, setActionImg] = useState(false);
    const [Date, setDate] = useState("");
    const [Time, setTime] = useState("");
    const [addressBusines, setAddressBusines] = useState("");
    const [phoneBusines, setPhoneBusines] = useState("");



    const handleActionImg = () => {
        setActionImg(true);
        setOpenCarViewActivate(true)

    }

    const actionContact = () => {
        setActiveViewContact(true);
        scrollTo(0, 0);
    }

    const actionVideoCall = () => {
        setOpenCarViewActivate(true);
        scrollTo(0, 0);
    }

    const handele_redirect_for_request_price = () => {
        localStorage.setItem("redirect_from", "selected_request_price");
        router.push(`/shop/bussine_name/${uid_bussine}/new_product/car`)
    }



    const handleCloseViewOpenCar = () => {
        setOpenCarViewActivate(false);
        setActiveViewOpenCar("date_client");
        setActionImg(false);
    };

    const action_for_father = (date, time) => {
        setActiveViewOpenCar("contact_client")
        setDate(date);
        setTime(time);
    }

    const fetchSendDataClient = async () => {
        const uid_open_car = localStorage.getItem("uid_open_car");
        if (name === "") {
            toast.error("Por favor ingrese su nombre")
            return;
        } else if (email === "") {
            toast.error("Por favor ingrese su correo")
            return;
        } else if (phone === "") {
            toast.error("Por favor ingrese su telefono")
            return;
        }

        try {
            const response = await axiosInstance.post(`appointment/create_client_and_add_uid_open_car/`, {
                name: name,
                email: email,
                phone: phone,
                uid_open_car: uid_open_car,
                bussine: uid_bussine

            });
            const data = response.data;
            localStorage.setItem("uid_client", data.uid_client);
            setActiveViewOpenCar("enviado")

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`products/cars/${uid_product}`);
                const data = response.data;
                setDataFromApi(data);
                const images = data.images.map(img => ({
                    src: img.image,
                    alt: `Imagen ${img.uid}`
                }));
                setImages(images);

                const response_bussine = await axiosInstance.get("users/data_bussine_for_client", {
                    params: {
                        bussine: uid_bussine
                    }
                }
                );
                const data_bussine = response_bussine.data;
                console.log(data_bussine);
                setAddressBusines(data_bussine.address);
                setPhoneBusines(data_bussine.phone);




            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);
        }
        fetchData();
        const mobileCheck = window.matchMedia("(max-width: 767px)");
        setIsMobile(mobileCheck.matches);
    }, []);


    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {loading ? (
                <LoaderWithImg />
            ) : (
                <div  >
                    <div style={{

                        width: "100%",
                        height: "100vh",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        backgroundColor: "#000000ba",
                        alignItems: "center",
                        justifyContent: "center",
                        display: activeViewContact ? "flex" : "none",
                        flexDirection: "column",
                        zIndex: 1
                    }}>

                        <div style={{ width: "60vw", height: "50vh", backgroundColor: "white", padding: "2vh 10vw" }} >
                            <div style={{ width: "100%", display: "flex", justifyContent: "end" }} >
                                <h2 onClick={() => setActiveViewContact(false)} >x</h2>
                            </div>
                            <div style={{ marginTop: "3vh" }} >
                                <h1>Numero de telefono: {phoneBusines} </h1>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column" }} >
                                <a style={{ width: "100%", border: "1px solid black", marginTop: "3vh", padding: "1vh 2vw", borderRadius: 5 }} href={`tel:${phoneBusines}`}>
                                    <button>Comenzar llamada</button>
                                </a>


                                <a style={{ width: "100%", border: "1px solid black", marginTop: "3vh", padding: "1vh 2vw", borderRadius: 5 }} href={`https://wa.me/${phoneBusines}?text=Hola,%20estoy%20viendo%20el%20${dataFromApi.marca}%20${dataFromApi.modelo}%20año%20${dataFromApi.year}`} target="_blank">
                                    Ir a WhattApp
                                </a>

                            </div>

                        </div>

                    </div>
                    <div style={{ display: "flex", flexDirection: "row", width: "100%" }} >
                        <div id="cont_product_info"   >
                            <OneImgWithCarrouselImgs imgs={images} />
                            <InfoProductCar data_from_api={dataFromApi} />

                        </div>

                        <div id="cont_view_open_car"   >
                            <div style={{ width: "100%", height: "fit-content", backgroundColor: "white", padding: "2vh 2vw", borderRadius: 5, position: "sticky", top: 10, }} >
                                <div style={{ textTransform: "uppercase", fontWeight: 600, display: "flex", flexDirection: "row" }} >
                                    <h2>{dataFromApi.marca} </h2>
                                    <h2 style={{ marginLeft: "1vw" }} >{dataFromApi.modelo}</h2>
                                    <h2 style={{ marginLeft: "1vw" }} >{dataFromApi.year}</h2>

                                </div>
                                <h1>Kombi 1.0 EcoBoost 75kW Trend</h1>
                                <h2>{dataFromApi.precio.toLocaleString('es-AR', {
                                    style: 'currency',
                                    currency: 'ARS',
                                    maximumFractionDigits: 0,
                                })}</h2>


                                <div style={{ display: "flex", flexDirection: "column", padding: "1vh 0.5vw", border: "1px solid black", borderRadius: 10, backgroundColor: "aliceblue" }} >
                                    <div style={{ display: "flex", flexDirection: "row", }} >
                                        <div style={{ width: "150px" }}  >
                                            <Image src="/images/open_car_2.png" alt="Mercado Pago" width={500} height={500} />
                                        </div>
                                        <div>
                                            <div>
                                                <div>
                                                    <h1>Open Car</h1>
                                                </div>
                                                <div>
                                                    <h2>Conocelo desde la comodidad de tu hogar con una video llamada, sin moverte.</h2>
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }} >
                                        <button onClick={() => setOpenCarViewActivate(true)} style={{ color: "white", fontWeight: 500, backgroundColor: "black", padding: "0.5vh 1vw", borderRadius: "5px" }} >Solicitar video llamada</button>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "4vh" }} >

                                    <div style={{ width: "47%" }} >
                                        <button onClick={() => setActiveViewContact(true)} style={{ color: "white", fontWeight: 500, backgroundColor: "black", padding: "0.5vh 1vw", borderRadius: "5px", width: "100%" }} >Contactar</button>
                                    </div>
                                    <div style={{ width: "47%" }}>
                                        {/*
                                        <a href="https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=-32.9553237,-68.8322313" target="_blank" rel="noopener noreferrer"
                                            style={{
                                                color: "white",
                                                fontWeight: 500,
                                                backgroundColor: "black",
                                                padding: "0.5vh 1vw",
                                                borderRadius: "5px",
                                                width: "100%",
                                                display: "inline-block",
                                                textAlign: "center",
                                                textDecoration: "none"
                                            }}
                                        >
                                            ¿Donde lo veo?
                                        </a>
                                        */}
                                        <a href={`https://wa.me/${phoneBusines}?text=Hola,%20estoy%20viendo%20el%20${dataFromApi.marca}%20${dataFromApi.modelo}%20año%20${dataFromApi.year}`} target="_blank" rel="noopener noreferrer"
                                            style={{
                                                color: "white",
                                                fontWeight: 500,
                                                backgroundColor: "black",
                                                padding: "0.5vh 1vw",
                                                borderRadius: "5px",
                                                width: "100%",
                                                display: "inline-block",
                                                textAlign: "center",
                                                textDecoration: "none"
                                            }}
                                        >
                                            Ir a WhattApp
                                        </a>

                                    </div>
                                </div>


                            </div>

                        </div>


                    </div>



                    <FinancingDemoShop action={handleActionImg} />

                    <StickyContact actionContact={actionContact} actionVideoCall={actionVideoCall} />


                    <div  >
                        <div style={{ backgroundColor: "aliceblue", padding: "2vh 5vw", borderRadius: 30, marginTop:"8vh" }} >
                            <div id='cont_secure_buy_product' >
                                <div id='cont_img_secure_buy_product'  >
                                    <Image style={{ borderRadius: 30 }} src="/images/secure_payment2.png" alt="secure_payment" width={500} height={500} />
                                </div>
                                <div id='cont_titles_secure_buy'  >
                                    <h2 id='title_secure_buy_product' >Julio Quiroga ofrece la posibilidad de usar la tecnologia de aceleron para realizar una compra 100% segura.</h2>
                                    <h2 id='only_when_buyer_want' >*esta opcion de compra segura se lleva a cabo solo si el comprador lo desea.</h2>
                                </div>
                            </div>

                            <div id='resume_info_secure_buy'  >
                                <h2 style={{ fontSize: 17, textAlign: "center" }}>La concecinaria <span style={{ borderRadius: 30, border: "1px solid black", padding: "0.5vh 1vw", backgroundColor: "white" }} >optiene el pago solo cuando</span> confirmas a aceleron que ya tenes la llave de tu nuevo auto en la mano y que todo salio bien.</h2>
                            </div>




                        </div>
                        <div style={{ padding: "0vh 10vw", marginBottom: "20vh" }}>
                            <FaqSecureBuy />
                        </div>



                    </div>




                    <div
                        style={{
                            width: "100%",
                            height: "100vh",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            backgroundColor: "#000000ba",
                            alignItems: "center",
                            justifyContent: "center",
                            display: openCarViewActivate ? "flex" : "none",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            className="navigator_open_car"

                        >
                            <button
                                style={{ borderRadius: 10, padding: "0.2vh 0.5vw" }}
                                onClick={() => handleCloseViewOpenCar()}
                            >
                                x
                            </button>
                        </div>


                        {activeViewOpenCar === "date_client" && (
                            <div
                                className="first_step_open_car"

                            >
                                <h1>{actionImg ? `Elegi un dia para ver este ${dataFromApi.marca} ${dataFromApi.modelo} ${dataFromApi.year} por video llamada de Whatsapp, tambien tendremos lista una cotizacion para tu auto. ` : "Es simple, no necesita instalar nada.  Le enviaremos un link para que pueda conectarse y conocer este auto desde la comodidad de su hogar."}</h1>



                                <div style={{ border: "1px solid black", borderRadius: "5px", padding: "2vh 2vw", marginTop: "3vh" }} >
                                    <CalendarForAppointment action={action_for_father} bussine={uid_bussine} uid_product={uid_product} />

                                </div>


                            </div>
                        )}

                        {activeViewOpenCar === "contact_client" && (
                            <div
                                className="second_step_open_car"

                            >
                                <h1>
                                    Por favor, compartinos los siguientes datos de contacto.
                                </h1>
                                <h1>Nombre completo</h1>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                                <h1>Correo electrónico</h1>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                                <h1>Teléfono</h1>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="phone" />
                                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    <button onClick={fetchSendDataClient} style={{ color: "white", fontWeight: 500, backgroundColor: "black", padding: "0.5vh 1vw", borderRadius: "5px" }}    >Confirmar</button>
                                </div>
                            </div>
                        )}

                        {activeViewOpenCar === "enviado" && (
                            <div
                                className="third_step_open_car"

                            >
                                <h1>Listo !! el dia {Date} nos comunicaremos al numero {phone} para hacer una video llamada por WhatsApp y mostrarte este auto.</h1>

                                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: "100%", alignItems: "center", border: "1px solid black", borderRadius: 5, marginTop: "2vh", padding: "1vh 2vw" }} >
                                    <h1> ¿ Queres entregar tu auto como forma de pago ?</h1>

                                    <div>
                                        <Image src="/images/request_price_for_client.png" alt="request_price_for_client" width={500} height={500} />
                                    </div>
                                    <div style={{ marginTop: "2vh" }} >
                                        <button onClick={handele_redirect_for_request_price} href={`/shop/bussine_name/${uid_bussine}/new_product/car`} style={{ color: "white", fontWeight: 500, backgroundColor: "black", padding: "0.5vh 5vw", borderRadius: "5px", marginTop: "5vh" }} >Comenzar cotización</button>
                                    </div>

                                </div>
                                <div style={{ display: actionImg ? "none" : "flex", border: "1px solid black", borderRadius: 5, marginTop: "2vh", padding: "1vh 2vw", backgroundColor: "aliceblue" }} >
                                    <h2>Preguntale a los bancos si es posible que te den credito. Solo necesitamso saber a que te dedicas, cuanto es tu ingreso neto y tu cuit o cuil. <Link href={`/shop/bussine_name/${uid_bussine}/request_credit_info?redirectrd_from=select_when_see`} style={{ fontWeight: 600, borderBottom: "1px solid black" }} >click aqui para comenzar consulta </Link> </h2>
                                </div>
                            </div>
                        )}
                    </div>
                    {isMobile && (
                        <div
                            id="back_open_car"
                            style={{ display: openCarViewActivate ? "none" : "flex" }}
                        >
                            <div
                                onClick={() => setActiveViewContact(true)}
                                style={{
                                    border: "2px solid #2b61e5",
                                    borderRadius: 5,
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#2b61e5",
                                    padding: "1vh 4vw",
                                }}
                            >
                                <h1>Contactar</h1>
                            </div>
                            <div
                                onClick={() => setOpenCarViewActivate(true)}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#2b61e5",
                                    color: "white",
                                    borderRadius: 5,
                                    padding: "1vh 4vw",
                                }}
                            >
                                <h1>Solicitar video llamada</h1>

                            </div>

                        </div>

                    )}




                </div>



            )}



            <Toaster style={{ marginTop: "2vh" }} position="top-right" />

        </div>

    );
}
