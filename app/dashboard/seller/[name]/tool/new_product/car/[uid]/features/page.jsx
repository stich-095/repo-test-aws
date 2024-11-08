"use client"

import "./features_page.css"
import { Toaster, toast } from 'sonner'




import { useState } from 'react';
import axiosInstance from "@/utils/axios_instance"
import { useRouter } from "next/navigation"


export default function FeaturesPage({ params }) {

    let { name } = params;
    let { uid } = params;
    let router = useRouter();

    const [precio, setPrecio] = useState('');
    const [kilometraje, setKilometraje] = useState('');
    const [combustible, setCombustible] = useState('nafta');
    const [color, setColor] = useState('');
    const [patente, setPatente] = useState('');
    const [propiedad, setPropiedad] = useState('concesionaria');
    const [caja, setCaja] = useState('manual');
    const [cilindrada, setCilindrada] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [airbag, setAirbag] = useState(4);
    const [abs, setAbs] = useState('true');
    const [programaEstabilidad, setProgramaEstabilidad] = useState('false');
    const [controlTraccion, setControlTraccion] = useState('false');
    const [aireAcondicionado, setAireAcondicionado] = useState('true');
    const [butacas, setButacas] = useState('textil');
    const [levantaCristales, setLevantaCristales] = useState('delantero_trasero');
    const [direccion, setDireccion] = useState('electrica');
    const [butacaElectrica, setButacaElectrica] = useState('false');
    const [velocidadCrucero, setVelocidadCrucero] = useState('false');
    const [camaraRetroceso, setCamaraRetroceso] = useState('true');
    const [sensorEstacionamiento, setSensorEstacionamiento] = useState('true');
    const [comandoControl, setComandoControl] = useState('false');
    const [radio, setRadio] = useState('true');
    const [bluetooth, setBluetooth] = useState('true');
    const [usb, setUsb] = useState('false');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío de datos
        if (precio === "") {
            toast.error("Por favor ingrese un precio");
            return;
        } else if (patente === "" || patente.length < 6) {
            toast.error("Por favor ingrese una patente correcta");
            return;
        } else if (kilometraje === "") {
            toast.error("Por favor ingrese un kilometraje");
            return;
        } else if (color === "") {
            toast.error("Por favor ingrese un color");
            return;
        } else if (cilindrada === "") {
            toast.error("Por favor ingrese una cilindrada");
            return;
        } else if (descripcion === "") {
            toast.error("Por favor ingrese una descripción");
            return;
        } else if (color === "") {
            toast.error("Por favor ingrese un color");
            return;
        }

        let token = localStorage.getItem('authTokens')
        let acces = JSON.parse(token).access

        try {



            const response = await axiosInstance.patch(
                `products/cars/${uid}/`,

                {   
                    "precio": precio,
                    "descripcion": descripcion,
                    "kilometraje": kilometraje,
                    "combustible": combustible,
                    "caja": caja,
                    "cilindrada": cilindrada,
                    "airbag": airbag,
                    "patente": patente,
                    "propiedad": propiedad,

                    "abs": abs,
                    "programa_estabilidad_electronica": programaEstabilidad,

                    "control_traccion": controlTraccion,
                    "aire_acondicionado": aireAcondicionado,
                    "butacas": butacas,
                    "color": color,

                    //"levanta_cristales": levantaCristales,
                    "direccion": direccion,
                    "butaca_electrica": butacaElectrica,

                    "velocidad_crucero": velocidadCrucero,
                    "camara_retroceso": camaraRetroceso,
                    "sensor_estacionamiento": sensorEstacionamiento,
                    "control_voz": comandoControl,
                    "radio": radio,
                    "bluetooth": bluetooth,
                    "usb": usb


                }
                ,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            const data = response.data;
            router.push(`/dashboard/seller/${name}/tool/new_product/car/${data.uid}/upload_imgs`);



        } catch (error) {
            // Handle login errors here
            console.error("Error during login:", error);
        }
    }


    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", minHeight: "100vh", alignItems: "center" }}>
            <div style={{ width: "60vw" }}>
                <h1>General</h1>
                <form onSubmit={handleSubmit}>
                    <div className="cont_all_feature_car">
                        <div className="cont_feature_car">
                            <h1>Precio</h1>
                            <input
                                type="number"
                                id="precio"
                                placeholder="10.000.000"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                className="check_feature_car"
                            />
                        </div>
                        <div className="cont_feature_car">
                            <h1>Patente</h1>
                            <input
                                type="text"
                                id="patente"
                                placeholder="ABC 987"
                                value={patente}
                                onChange={(e) => setPatente(e.target.value)}
                                className="check_feature_car"
                            />
                        </div>
                        <div className="cont_feature_car">
                            <h1>Propiedad</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="concesionaria" checked={propiedad === 'concesionaria'} onChange={() => setPropiedad('concesionaria')} />
                                Concesionaria
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="tercero" checked={propiedad === 'tercero'} onChange={() => setPropiedad('tercero')} />
                                Tercero
                            </label>
                        </div>
                        <div className="cont_feature_car">
                            <h1>Kilometraje</h1>
                            <input
                                type="number"
                                id="kilometraje"
                                placeholder="Kilometraje"
                                value={kilometraje}
                                onChange={(e) => setKilometraje(e.target.value)}
                                className="check_feature_car"
                            />
                        </div>

                        <div className="cont_feature_car">
                            <h1>Combustible</h1>
                            <label>
                                <input type="radio" value="nafta" checked={combustible === 'nafta'} onChange={() => setCombustible('nafta')} />
                                Nafta
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="gasoil" checked={combustible === 'gasoil'} onChange={() => setCombustible('gasoil')} />
                                Gasoil
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="gnc" checked={combustible === 'gnc'} onChange={() => setCombustible('gnc')} />
                                Gnc
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="electricidad" checked={combustible === 'electricidad'} onChange={() => setCombustible('electricidad')} />
                                Electricidad
                            </label>
                        </div>
                        <div className="cont_feature_car">
                            <h1>Color</h1>
                            <input
                                type="text"
                                id="color"
                                placeholder="Azul"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="check_feature_car"
                            />
                        </div>


                        <div className="cont_feature_car">
                            <h1>Caja</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="manual" checked={caja === 'manual'} onChange={() => setCaja('manual')} />
                                Manual
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="automatica" checked={caja === 'automatica'} onChange={() => setCaja('automatica')} />
                                Automática
                            </label>
                        </div>

                        <div className="cont_feature_car">
                            <h1>Cilindrada</h1>
                            <input className="check_feature_car"
                                type="number"
                                id="cilindrada"
                                placeholder="Cilindrada"
                                value={cilindrada}
                                onChange={(e) => setCilindrada(e.target.value)}
                            />
                        </div>

                        <div className="cont_feature_car">
                            <h1>Descripción:</h1>
                            <textarea
                                id="descripcion"
                                placeholder="Ingresa la descripción aquí"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                style={{ width: "90%", height: "25vh", borderRadius: 10, padding: "1vh 1vw" }}
                            ></textarea>
                        </div>
                    </div>

                    <h1>Seguridad</h1>
                    <div className="cont_all_feature_car">
                        <div className="cont_feature_car">
                            <h1>Airbag</h1>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <input className="check_feature_car" type="range" max={6} value={airbag} onChange={(e) => setAirbag(e.target.value)} />
                                <p>{airbag}</p>
                            </div>

                        </div>

                        <div className="cont_feature_car">
                            <h1>ABS</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="false" checked={abs === "false"} onChange={() => setAbs('false')} />
                                No
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="true" checked={abs === 'true'} onChange={() => setAbs('true')} />
                                Si
                            </label>
                        </div>

                        <div className="cont_feature_car">
                            <h1>Programa Estabilidad Electrónica</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="false" checked={programaEstabilidad === 'false'} onChange={() => setProgramaEstabilidad('false')} />
                                No
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="true" checked={programaEstabilidad === 'true'} onChange={() => setProgramaEstabilidad('true')} />
                                Si
                            </label>
                        </div>

                        <div className="cont_feature_car">
                            <h1>Control de Tracción</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="false" checked={controlTraccion === 'false'} onChange={() => setControlTraccion('false')} />
                                No
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="true" checked={controlTraccion === 'true'} onChange={() => setControlTraccion('true')} />
                                Si
                            </label>
                        </div>
                    </div>

                    <h1>Confort</h1>
                    <div className="cont_all_feature_car">
                        <div className="cont_feature_car">
                            <h1>Aire Acondicionado</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="false" checked={aireAcondicionado === 'false'} onChange={() => setAireAcondicionado('false')} />
                                No
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="true" checked={aireAcondicionado === 'true'} onChange={() => setAireAcondicionado('true')} />
                                Si
                            </label>
                        </div>

                        <div className="cont_feature_car">
                            <h1>Butacas</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="cuero" checked={butacas === 'cuero'} onChange={() => setButacas('cuero')} />
                                Cuero
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="textil" checked={butacas === 'textil'} onChange={() => setButacas('textil')} />
                                Textil
                            </label>
                        </div>

                        <div className="cont_feature_car">
                            <h1>Levanta cristales</h1>
                            <label>
                                <input
                                    className="check_feature_car"
                                    type="radio"
                                    value="no"
                                    checked={levantaCristales === 'no'}
                                    onChange={() => setLevantaCristales('no')}
                                />
                                No
                            </label>
                            <label>
                                <input
                                    className="check_feature_car"
                                    type="radio"
                                    value="delantero-ambas"
                                    checked={levantaCristales === 'delantero_ambas'}
                                    onChange={() => setLevantaCristales('delantero_ambas')}
                                />
                                Delantero ambas puertas
                            </label>
                            <label>
                                <input
                                    className="check_feature_car"
                                    type="radio"
                                    value="delantero-solo-conductor"
                                    checked={levantaCristales === 'delantero_solo_conductor'}
                                    onChange={() => setLevantaCristales('delantero_solo_conductor')}
                                />
                                Delantero solo conductor
                            </label>
                            <label>
                                <input
                                    className="check_feature_car"
                                    type="radio"
                                    value="delantero-trasero"
                                    checked={levantaCristales === 'delantero_trasero'}
                                    onChange={() => setLevantaCristales('delantero_trasero')}
                                />
                                Delantero y trasero
                            </label>
                            <label>
                                <input
                                    className="check_feature_car"
                                    type="radio"
                                    value="trasero-ambas"
                                    checked={levantaCristales === 'trasero_ambas'}
                                    onChange={() => setLevantaCristales('trasero_ambas')}
                                />
                                Trasero ambas puertas
                            </label>
                        </div>

                    </div>

                    <h1>Otros</h1>
                    <div className="cont_all_feature_car">
                        <div className="cont_feature_car">
                            <h1>Dirección</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="hidraulica" checked={direccion === 'hidraulica'} onChange={() => setDireccion('hidraulica')} />
                                Hidráulica
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="electrica" checked={direccion === 'electrica'} onChange={() => setDireccion('electrica')} />
                                Eléctrica
                            </label>
                        </div>

                        <div className="cont_feature_car">
                            <h1>Butaca Eléctrica</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="false" checked={butacaElectrica === 'false'} onChange={() => setButacaElectrica('false')} />
                                No
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="true" checked={butacaElectrica === 'true'} onChange={() => setButacaElectrica('true')} />
                                Si
                            </label>
                        </div>

                        <div className="cont_feature_car">
                            <h1>Velocidad Crucero</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="false" checked={velocidadCrucero === 'false'} onChange={() => setVelocidadCrucero('false')} />
                                No
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="true" checked={velocidadCrucero === 'true'} onChange={() => setVelocidadCrucero('true')} />
                                Si
                            </label>
                        </div>

                        <div className="cont_feature_car">
                            <h1>Cámara de Retroceso</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="false" checked={camaraRetroceso === 'false'} onChange={() => setCamaraRetroceso('false')} />
                                No
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="true" checked={camaraRetroceso === 'true'} onChange={() => setCamaraRetroceso('true')} />
                                Si
                            </label>
                        </div>

                        <div className="cont_feature_car">
                            <h1>Sensor Estacionamiento</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="false" checked={sensorEstacionamiento === 'false'} onChange={() => setSensorEstacionamiento('false')} />
                                No
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="true" checked={sensorEstacionamiento === 'true'} onChange={() => setSensorEstacionamiento('true')} />
                                Si
                            </label>
                        </div>
                    </div>

                    <h1>Multimedia</h1>
                    <div className="cont_all_feature_car">
                        <div className="cont_feature_car">
                            <h1>Control por Voz</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="false" checked={comandoControl === 'false'} onChange={() => setComandoControl('false')} />
                                No
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="true" checked={comandoControl === 'true'} onChange={() => setComandoControl('true')} />
                                Si
                            </label>
                        </div>

                        <div className="cont_feature_car">
                            <h1>Radio</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="false" checked={radio === 'false'} onChange={() => setRadio('false')} />
                                No
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="true" checked={radio === 'true'} onChange={() => setRadio('true')} />
                                Si
                            </label>
                        </div>

                        <div className="cont_feature_car">
                            <h1>Bluetooth</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="false" checked={bluetooth === 'false'} onChange={() => setBluetooth('false')} />
                                No
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="true" checked={bluetooth === 'true'} onChange={() => setBluetooth('true')} />
                                Si
                            </label>
                        </div>

                        <div className="cont_feature_car">
                            <h1>USB</h1>
                            <label>
                                <input className="check_feature_car" type="radio" value="false" checked={usb === 'false'} onChange={() => setUsb('false')} />
                                No
                            </label>
                            <label>
                                <input className="check_feature_car" type="radio" value="true" checked={usb === 'true'} onChange={() => setUsb('true')} />
                                Si
                            </label>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }} >
                        <button onClick={handleSubmit} style={{ position: "fixed", bottom: "2vh", marginTop: '20px', padding: '1vh 7vw', borderRadius: '5px', backgroundColor: "#2b61e5", color: 'white', border: 'none' }}>
                            continuar
                        </button>
                    </div>
                </form>
                <Toaster style={{ marginTop: "2vh" }} position="top-right" />
            </div>
        </div>
    );
}
