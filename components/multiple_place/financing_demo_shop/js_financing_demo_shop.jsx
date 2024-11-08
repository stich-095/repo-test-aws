import { useState } from 'react';


import "./css_financing_demo_shop.css"
import Image from 'next/image';

export default function FinancingDemoShop({ action }) {
    const [cuotas, setCuotas] = useState(12); // Número de cuotas seleccionado
    const [pie, setPie] = useState(50); // Valor del pie en porcentaje
    const [selectFormFinancing, setSelectFormFinancing] = useState('monto'); // Valor del pie en porcentaje

    // Simular datos de las cuotas
    const escenarios = [
        { valorCuota: 643423, nCuotas: 12, cae: 49.6, costoTotal: 7721076, href: "/images/santander.svg" },
       { valorCuota: 367165, nCuotas: 24, cae: 40.2, costoTotal: 8811960 , href: "/images/hsbc_logo.svg" },
        { valorCuota: 643423, nCuotas: 12, cae: 49.6, costoTotal: 7721076, href: "/images/svg_bbva.svg" },
       { valorCuota: 367165, nCuotas: 24, cae: 40.2, costoTotal: 8811960, href: "/images/svg_supervielle.svg" },
    ];

    // Función para manejar cambios en el pie
    const handlePieChange = (e) => {
        setPie(e.target.value);
    };

    // Función para manejar cambios en el número de cuotas
    const handleCuotasChange = (e) => {
        setCuotas(Number(e.target.value));
    };

    return (
        <div className="financiamiento-container">
            <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }} >
                <div className="pie-selection">
                    <p>¿Cuál es el pie que quieres dar?</p>
                    <div>
                        <div className="cont_feature_car">

                            <label>
                                <input className="check_amount_or_value_car" type="radio" value="monto" checked={selectFormFinancing === 'monto'} onChange={() => setSelectFormFinancing('monto')} />
                                Monto
                            </label>
                            <label>
                                <input className="check_amount_or_value_car" type="radio" value="value_car" checked={selectFormFinancing === 'value_car'} onChange={() => setSelectFormFinancing('value_car')} />
                                Valor de mi auto
                            </label>
                        </div>
                    </div>
                    <div style={{ width: "100%", justifyContent: "start", display: selectFormFinancing == "monto" ? "flex" : "none", alignItems: "flex-start", flexDirection: "column" }} >
                        <h2>${(5995000 * pie / 100).toLocaleString()} | {pie}%</h2>
                        <input
                            type="range"
                            min="10"
                            max="90"
                            value={pie}
                            onChange={handlePieChange}
                            className="slider"
                        />
                    </div>

                </div>

                <div style={{ display: selectFormFinancing == "monto" ? "flex" : "none" }} className="cuotas-selection">
                    <label>Nº de Cuotas</label>
                    <select value={cuotas} onChange={handleCuotasChange}>
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={36}>36</option>
                        <option value={48}>48</option>
                        <option value={72}>72</option>
                    </select>
                </div>
            </div>

            {
                selectFormFinancing == 'monto' ? (
                    <div className="escenarios">
                        {escenarios.map((escenario, index) => (
                            <div key={index} className="escenario-card">
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >


                                    <div  >
                                        <Image src={escenario.href} alt="Financing Demo"  width={200} height={200} />
                                    </div>
                                    <div>
                                        <p >Cuota ${escenario.valorCuota.toLocaleString()}</p>

                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", width: "max-content" }} >
                                    <div>
                                        <div>
                                            <h1>Pie</h1>
                                        </div>
                                        <div>
                                            <h1>${(5995000 * pie / 100).toLocaleString()}</h1>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <h1>Monto a Financiar</h1>
                                        </div>
                                        <div>
                                            <h1> ${(5995000 * (1 - pie / 100)).toLocaleString()}</h1>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <h1>Cft</h1>
                                        </div>
                                        <div>
                                            <h1> {escenario.cae}%</h1>
                                        </div>
                                    </div>




                                </div>



                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }} >
                        <button id="cont_button_request_price_client" onClick={action}  >
                            <Image style={{ borderRadius: 5 }} src="/images/image_request_price_client.png" alt="image_request_price_client" width={1364} height={472} />
                        </button>
                    </div>
                )

            }


        </div>
    );
}