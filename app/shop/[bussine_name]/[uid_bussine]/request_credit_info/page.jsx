"use client"


import { useState } from 'react';
import Link from 'next/link';
import Icon from '@mdi/react';
import { mdiCheckCircleOutline } from '@mdi/js';
import axiosInstance from '@/utils/axios_instance';
import { Toaster, toast } from 'sonner';


export default function RequestCreditInfoPage({ params }) {

    const { bussine_name, uid_bussine } = params;
    const [tipoTrabajo, setTipoTrabajo] = useState("dependencia-empleado");
    const [income, setIncome] = useState("");
    const [cuitCuil, setCuitCuil] = useState("");

    const [activeView, setActiveView] = useState(false);

    const handleSendRequestInfo = async () => {
        if (tipoTrabajo == '') {
            toast.error("Debe seleccionar un tipo de trabajo");
            return;
        } else if (income == '') {
            toast.error("Debe ingresar un ingreso neto");
            return;
        } else if (cuitCuil.length < 9) {
            toast.error("Debe ingresar un cuit o cuil");
            return;
        }

        try {
            const response = await axiosInstance.post('request_credit_info/create_credit_info/', {
                employment: tipoTrabajo,
                client_id: localStorage.getItem("uid_client"),
                income: income,
                cuit_or_cuil: cuitCuil,
                bussine: uid_bussine
            });

            console.log(response);
            setActiveView(true);
        } catch (e) {
            toast.error("Error, intente nuevamente");
            console.log(e);
        }


    }



    const handleChange = (event) => {
        setTipoTrabajo(event.target.value);
    };

    return (
        <div style={{ height: "87vh", display: "flex", justifyContent: "center" }} >
            <div style={{ backgroundColor: "white", width: "40vw", height: "60vh", marginTop: "7vh", padding: "2vh 3vw" }} >
                <div  >
                    <div>
                        <p>Compartinos la siguiente informacion para consultar tu credito disponible.</p>
                    </div>
                    <div style={{ marginTop: "3vh" }}>
                        <h2>¿ Cual es tu ocupacion ?</h2>
                        <select style={{ width: "100%", border: "1px solid gray", borderRadius: 5 }} id="tipoTrabajo" value={tipoTrabajo} onChange={handleChange}>

                            <optgroup label="Relación de dependencia">
                                <option value="dependencia-empleado">Empleado</option>
                                <option value="dependencia-obrero">Obrero</option>
                                <option value="dependencia-ejecutivo-medio-alto">Ejecutivo medio-alto</option>
                            </optgroup>
                            <optgroup label="Independiente">
                                <option value="independiente-comerciante">Comerciante</option>
                                <option value="independiente-empresario">Empresario</option>
                                <option value="independiente-profesional">Profesional</option>
                                <option value="independiente-autonomo">Autónomo</option>
                            </optgroup>
                            <optgroup label="No trabajo">
                                <option value="independiente-estudiante">Estudiante</option>
                                <option value="independiente-rentista">Rentista</option>
                                <option value="independiente-jubilado">Jubilado</option>

                            </optgroup>
                        </select>
                    </div>

                    <div style={{ marginTop: "3vh" }}>
                        <h2>¿ Cual es tu ingreso neto ?</h2>
                        <input onChange={(e) => setIncome(e.target.value)} value={income} style={{ width: "100%", border: "1px solid gray", borderRadius: 5 }} type="num" />
                    </div>
                    <div style={{ marginTop: "3vh" }}>
                        <h2>¿ Cual es tu cuit o cuil ? (sin guines)</h2>
                        <input onChange={(e) => setCuitCuil(e.target.value)} value={cuitCuil} style={{ width: "100%", border: "1px solid gray", borderRadius: 5 }} type="num" />
                        <a style={{ fontSize: 12 }} href="https://www.argentina.gob.ar/descarga-constancia-cuil" target="_black" >si no lo recordas click aqui</a>

                    </div>
                    <div style={{ display: "flex", width: "100%", justifyContent: "center", marginTop: "5vh" }} >
                        <button onClick={handleSendRequestInfo} style={{ backgroundColor: "black", color: "white", padding: "1vh 5vw", borderRadius: 5 }} >Consultar</button>
                    </div>

                </div>
                <div style={{ display: activeView == true ? "flex" : "none", position: "fixed", height: "100%", width: "100%", backgroundColor: "#000000b0", top: 0, left: 0, justifyContent: "center", alignItems: "center" }} >
                    <div style={{ width: "50%", height: "60%", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", padding: "0vh 2vw" }}>
                        <Icon style={{ color: "green", marginTop: "5vh" }} path={mdiCheckCircleOutline} size={5} />
                        <div style={{ display: "flex", flexDirection: "row" }} >
                            <h2>Exito:</h2>
                            <p style={{ marginLeft: "0.5vw" }} >solicitud de cotizacion enviada</p>
                        </div>

                        <Link style={{ marginTop: "3vh", padding: "1vh 5vw", backgroundColor: "black", borderRadius: 5, color: "white" }} href={`/shop/${bussine_name}/${uid_bussine}`} >ir al inicio a ver más autos</Link>
                        <div style={{ display: localStorage.getItem("redirect_from") == "selected_request_price" ? "none" : "flex", border: "1px solid black", borderRadius: 5, padding: "1vh 2vw", marginTop: "3vh" }} >
                            <p>¿ Todavia no vendiste tu auto ? Podemos preparar una cotiazacion e informarte si es posible que compremos tu auto, el monto o si podemos ayudarte a venderlo.</p>
                        </div>
                    </div>

                </div>
                <Toaster style={{ marginTop: "2vh" }} position="top-right" />


            </div>
        </div>
    );
}