"use client"

import { useState } from 'react';
import Image from 'next/image';
import Icon from '@mdi/react';
import { mdiCheckboxMarkedOutline } from '@mdi/js';
import "./css_info_product.css";

export default function InfoProductCar({data_from_api}) {

    const dataFromApi = data_from_api;

    console.log("1",dataFromApi);
    console.log("2",data_from_api);

    const [openSection, setOpenSection] = useState("confort");

    const toggleSection = (section) => {
        if (openSection === section) {
            setOpenSection(null); 
        } else {
            setOpenSection(section); 
        }
    };

    return (
        
        <div>
            
            <div>
                <div>
                    <h1>General</h1>
                </div>
                <div className="car-info-container">
                    <div className="car-info-item">
                        <div className="car-info-icon">
                            <Image src="/images/yeard_car.svg" alt="Icon" width={20} height={20} />
                        </div>
                        <div className="car-info-title">Año</div>
                        <div className="car-info-value">{dataFromApi.year}</div>
                    </div>

                    <div className="car-info-item">
                        <div className="car-info-icon">
                            <Image src="/images/km_car.svg" alt="Icon" width={20} height={20} />
                        </div>
                        <div className="car-info-title">Kilómetros</div>
                        <div className="car-info-value">{dataFromApi.kilometraje}</div>
                    </div>

                    <div className="car-info-item">
                        <div className="car-info-icon">
                            <Image src="/images/energy_car_1.svg" alt="Icon" width={20} height={20} />
                        </div>
                        <div className="car-info-title">Combustible</div>
                        <div className="car-info-value">{dataFromApi.combustible}</div>
                    </div>

                    <div className="car-info-item">
                        <div className="car-info-icon">
                            <Image src="/images/change_car.svg" alt="Icon" width={20} height={20} />
                        </div>
                        <div className="car-info-title">Caja</div>
                        <div className="car-info-value">{dataFromApi.caja}</div>
                    </div>

                    <div className="car-info-item">
                        <div className="car-info-icon">
                            <Image src="/images/power_car.svg" alt="Icon" width={20} height={20} />
                        </div>
                        <div className="car-info-title">Potencia</div>
                        <div className="car-info-value">{dataFromApi.cilindrada}</div>
                    </div>

                    <div className="car-info-item">
                        <div className="car-info-icon">
                            <Image src="/images/address_car.svg" alt="Icon" width={20} height={20} />
                        </div>
                        <div className="car-info-title">Dirección</div>
                        <div className="car-info-value">{dataFromApi.direccion}</div>
                    </div>

                    <div className="car-info-item">
                        <div className="car-info-icon">
                            <Image src="/images/air_car.svg" alt="Icon" width={20} height={20} />
                        </div>
                        <div className="car-info-title">Aire</div>
                        <div className="car-info-value">{ dataFromApi.aire_acondicionado == true ? "Si" : "No"}</div>
                    </div>

                    <div className="car-info-item">
                        <div className="car-info-icon">
                            <Image src="/images/windows_car.svg" alt="Icon" width={20} height={20} />
                        </div>
                        <div className="car-info-title">Puertas(falta)</div>
                        <div className="car-info-value">3</div>
                    </div>
                </div>



            </div>
            <div style={{marginTop:"2vh" }}   >
                <div>
                    <h1>Caracteristicas</h1>
                </div>
                <div className="equipamiento">


                    <div >
                        <h2 onClick={() => toggleSection('confort')} className="cursor-pointer">
                            Confort
                        </h2>
                        {openSection === 'confort' && (
                            <div className="content">
                                <div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                                        <div style={{ display: dataFromApi.aire_acondicionado == true ? "flex" : "none", alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>Aire acondicionado</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>butaca - {dataFromApi.butacas}</span>
                                        </div>
                                        <div style={{ display: dataFromApi.levanta_cristales !== "no" ? "flex" : "none", alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>Lev. cristal :{dataFromApi.levanta_cristales == "delantero_solo_conductor" ? "conductor" : "nose" }</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>Direccion: {dataFromApi.direccion}</span>
                                        </div>
                                        <div style={{ display: dataFromApi.butaca_electrica == true ?  "flex" : "none", alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>Butaca electrica</span>
                                        </div>
                                        <div style={{ display: dataFromApi == true ? "flex" : "none", alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>Vel. crucero</span>
                                        </div>
                                        <div style={{ display: dataFromApi.camara_retroceso  == true ? "flex" : "none" , alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>Cam. retroceso</span>
                                        </div>
                                        <div style={{ display: dataFromApi.sensor_estacionamiento == true ? "flex" : "none" , alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>Sens. estacionamiento</span>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{marginTop: "2vh"}}  >
                        <h2 onClick={() => toggleSection('seguridad')} className="cursor-pointer">
                            Seguridad
                        </h2>
                        {openSection === 'seguridad' && (
                            <div className="content">
                                <div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                                        <div style={{ display: dataFromApi.airbag !== 0 ? "flex" : "none", alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>Airbag: {dataFromApi.airbag}</span>
                                        </div>
                                        <div style={{ display: dataFromApi.abs == true ?  "flex" :"none" , alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>Abs</span>
                                        </div>
                                        <div style={{ display: dataFromApi.programa_estabilidad_electronica == true ? "flex" : "none" , alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>Estab. electronica</span>
                                        </div>
                                        <div style={{ display: dataFromApi.control_traccion == true ? "flex" : "none", alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>Contr. de traccion</span>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{marginTop: "2vh"}} >
                        <h2 onClick={() => toggleSection('multimedia')} className="cursor-pointer">
                            Multimedia
                        </h2>
                        {openSection === 'multimedia' && (
                            <div className="content">
                                <div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                                        <div style={{ display: dataFromApi.control_voz == true ?  "flex" :"none" , alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>Control por voz</span>
                                        </div>
                                        <div style={{ display: dataFromApi.radio == true ? "flex" : "none", alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>Radio</span>
                                        </div>
                                        <div style={{ display: dataFromApi.bluetooth ==true ? "flex" : "none", alignItems: "center", width: "200px" }}>
                                            <Icon path={mdiCheckboxMarkedOutline} size={1} />
                                            <span style={{ marginLeft: "8px" }}>Bluetooth</span>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}