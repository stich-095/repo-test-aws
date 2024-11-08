"use client"

import "./features_page.css"




import { useState } from 'react';
import axiosInstance from "@/utils/axios_instance"
import { useRouter } from "next/navigation"
import Link from 'next/link';


export default function FeaturesPage({ params }) {

    let { uid_bussine, uid } = params;
    
    let router = useRouter();

    const [kilometraje, setKilometraje] = useState('');
    const [combustible, setCombustible] = useState('');
    const [color, setColor] = useState('');
    const [patente, setPatente] = useState('');
    const [propiedad, setPropiedad] = useState('');
    const [caja, setCaja] = useState('');
    const [cilindrada, setCilindrada] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [airbag, setAirbag] = useState(0);
    const [abs, setAbs] = useState('');
    const [programaEstabilidad, setProgramaEstabilidad] = useState('');
    const [controlTraccion, setControlTraccion] = useState('');
    const [aireAcondicionado, setAireAcondicionado] = useState('');
    const [butacas, setButacas] = useState('');
    const [levantaCristales, setLevantaCristales] = useState('');
    const [direccion, setDireccion] = useState('');
    const [butacaElectrica, setButacaElectrica] = useState('');
    const [velocidadCrucero, setVelocidadCrucero] = useState('');
    const [camaraRetroceso, setCamaraRetroceso] = useState('');
    const [sensorEstacionamiento, setSensorEstacionamiento] = useState('');
    const [comandoControl, setComandoControl] = useState('');
    const [radio, setRadio] = useState('');
    const [bluetooth, setBluetooth] = useState('');
    const [usb, setUsb] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío de datos
        console.log(
            "abs", abs,
            "airbag", airbag,
            "programa_estabilidad_electronica", programaEstabilidad,
            "control_traccion", controlTraccion,
            "aire_acondicionado", aireAcondicionado,
            "butacas", butacas,
            "levanta_cristales", levantaCristales,
            "direccion", direccion,
            "butaca_electrica", butacaElectrica,
            "velocidad_crucero", velocidadCrucero,
            "camara_retroceso", camaraRetroceso,
            "sensor_estacionamiento", sensorEstacionamiento,
            "control_voz", comandoControl,
            "radio", radio,
            "bluetooth", bluetooth,
            "usb", usb
        );
        let token = localStorage.getItem('authTokens')
        let acces = JSON.parse(token).access

        try {

            const response = await axiosInstance.patch(
                `products/cars/${uid}/`,

                {
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

                    "levanta_cristales": levantaCristales,
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
            router.push(`/shop/bussine_name/${uid_bussine}/new_product/car/${data.uid}/preview`);
            


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
                            <input className="check_feature_car" type="range" value={airbag} onChange={(e) => setAirbag(e.target.value)} />
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
                                Delantero solo trasero
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

                    <button onClick={handleSubmit}  style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}
