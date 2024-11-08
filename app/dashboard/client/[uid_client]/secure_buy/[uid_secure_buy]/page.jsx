"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import axiosInstance from "@/utils/axios_instance"
import LoaderWithImg from '@/components/multiple_place/loader_with_img/LoaderWithImg'
import OneImgWithCarrouselImgs from "@/components/multiple_place/one_img_with_carrousel_imgs/js_one_img_with_carrousel_imgs.jsx";
import InfoProductCar from "@/components/multiple_place/info_product/js_info_product.jsx";
import { useRouter } from 'next/navigation'



export default function SecureBuyes({ params }) {

    const router = useRouter()
    const { uid_secure_buy, uid_client} = params
    const [dataFromApi, setDataFromApi] = useState([])
    const [dataFromApiProduct, setDataFromApiProduct] = useState([])
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [type_of_collateral, setTypeOfCollateral] = useState("orden de pago")
    const [correct_amount, setCorrectAmount] = useState(true)
    const [correct_car, setCorrectCar] = useState(true)

    const handleAcceptRequest = async () => {
        try {
            const response = await axiosInstance.post(`secure_payment/accept_request`,
                {
                    secure_payment_uid: uid_secure_buy,
                    type_of_collateral: type_of_collateral,
                }
            );
            router.push(`/dashboard/client/${uid_client}/secure_buy/${uid_secure_buy}/vault`)
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`secure_payment/handle/${uid_secure_buy}/`);
                setDataFromApi(response.data);
                const responseDataProduct = await axiosInstance.get(`products/cars/${response.data.car}`); // Agrega await aquí
                setDataFromApiProduct(responseDataProduct.data);
                const images = responseDataProduct.data.images.map(img => ({
                    src: img.image,
                    alt: `Imagen ${img.uid}`
                }));
                setImages(images);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading ? <LoaderWithImg /> : (
                <div style={{ marginTop: "5vh" }} >


                    <div style={{ padding: "1vh 5vw" }}>
                        <p  >Hola 👋 !! nuestra mision en esta ocacion sera protegerte ante cualquier eventualidad en la compra de tu fiat palio 2016, aceleron te permite mantener el contro de la transaccion en todo momento al empoderte con un codigo el cual debes entregar al vendedor solo cuando estes de acuerdo en que la operacion fue exitosa y queres que el vendedor reciba los fondos custodiados por aceleron. Además al custodiar tus fondos optenes una garantia real. </p>
                        <div style={{ marginTop: "5vh " }}>
                            <div>
                                <h2>En el transcurso del dia nos pondremos en contacto para que entiendas todo a la perfeccion</h2>

                            </div>

                        </div>
                        <h2 style={{ marginTop: "5vh" }} >¿ Cual de estas garantias reales preferis ? </h2>
                        <div style={{ display: "flex", flexDirection: "row" }} >
                            <button onClick={() => setTypeOfCollateral("orden de pago")} style={{ backgroundColor: type_of_collateral == "orden de pago" ? "#1565c0" : "unset", color: type_of_collateral == "orden de pago" ? "white" : "black", border: "1px solid black", borderRadius: 30, padding: "1vh 2vw", marginRight: "2vh" }} >Orden de pago ( documento comercial legal ) </button>
                            <button onClick={() => setTypeOfCollateral("echeq")} style={{ backgroundColor: type_of_collateral == "echeq" ? "#1565c0" : "unset", color: type_of_collateral == "echeq" ? "white" : "black", border: "1px solid black", borderRadius: 30, padding: "1vh 2vw" }} >E-cheq ( cheque digital en tu home banking ) </button>

                        </div>
                        <div style={{ marginTop: "2vh" }} >
                            <h2>*Es un documento en el que Aceleron se compromete legalmete a pagar una determinada suma de dinero en un plazo de tiempo determinado. Ver modelo</h2>
                            <h2>*En el caso de una eventualidad en la compra , el compromiso de pago se activa y el dinero se acredita en tu cuenta sin nececidad de mediar con el vendedor .</h2>
                        </div>
                        <div>
                            <h2>¿ Es este el monto que deseas custodiar ?</h2>
                            <h2>$25.0000.0000</h2>
                            <h2>Detalle</h2>
                            <h2>El monto a custodiar incluye el valor del automotor y los gastos de transferencia</h2>
                            <div>
                                <div style={{ display: "flex", flexDirection: "row", marginTop: "2vh" }} >
                                    <button onClick={() => setCorrectAmount(true)} style={{ backgroundColor: correct_amount == true ? "#1565c0" : "unset", color: correct_amount == true ? "white" : "unset", border: "1px solid black", borderRadius: 30, padding: "1vh 2vw", marginRight: "2vh" }} >Si</button>
                                    <button onClick={() => setCorrectAmount(false)} style={{ backgroundColor: correct_amount == false ? "#1565c0" : "unset", color: correct_amount == false ? "white" : "unset", border: "1px solid black", borderRadius: 30, padding: "1vh 2vw" }} >No</button>
                                </div>
                            </div>

                        </div>
                        <div>
                            <div style={{ marginTop: "5vh" }} >
                                <h2>¿ Es este el automotor de la compra protegida y tiene estas caracteristicas ?</h2>
                            </div>
                            <div>
                                <div style={{ display: "flex", flexDirection: "row", marginTop: "2vh" }} >
                                    <button onClick={() => setCorrectCar(true)} style={{ backgroundColor: correct_car == true ? "#1565c0" : "unset", color: correct_car == true ? "white" : "unset", border: "1px solid black", borderRadius: 30, padding: "1vh 2vw", marginRight: "2vh" }} >Si</button>
                                    <button onClick={() => setCorrectCar(false)} style={{ backgroundColor: correct_car == false ? "#1565c0" : "unset", color: correct_car == false ? "white" : "unset", border: "1px solid black", borderRadius: 30, padding: "1vh 2vw" }} >No</button>
                                </div>
                            </div>

                            <div style={{ marginTop: "5vh" }} >
                                <div style={{ display: "flex", justifyContent: "start", width: "100%" }} >
                                    <div style={{ width: "65vw", backgroundColor: "aliceblue", padding: "5vh 5vw", border: "1px solid black", borderRadius: 30, display: "flex", flexDirection: "center", flexDirection: "column" }} >
                                        <OneImgWithCarrouselImgs imgs={images} />
                                        <InfoProductCar data_from_api={dataFromApiProduct} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "5vh", marginBottom: "5vh" }} >
                                <button onClick={handleAcceptRequest} style={{ backgroundColor: "black", color: "white", padding: "2vh 10vw", borderRadius: 10 }}  >Siguiente</button>
                            </div>

                        </div>


                    </div>



                </div>
            )
            }
        </div>




    )


}


