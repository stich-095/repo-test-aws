"use client"


import "./css_step_secure_payment_client.css"
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import axiosInstance from "@/utils/axios_instance"
import Icon from '@mdi/react';
import { mdiArrowDown, mdiArrowUp, mdiDownloadCircleOutline } from '@mdi/js';
import UploadVaucherCashIn from '@/components/multiple_place/upload_vaucher_cash_in/js_upload_vaucher_cash_in';




export default function VerticalLinearStepper({ data_from_api, uid_bussine }) {



    const [dataContactClient, setDataContactClient] = useState([])
    const [banckName, setBanckName] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const [alias, setAlias] = useState("")
    const [loading, setLoading] = useState(true)
    const [availableDays, setAvailableDays] = useState([]);
    const [availableHours, setAvailableHours] = useState([]);
    const [dayCashIn, setDayCashIn] = useState("");
    const [hourCashIn, setHourCashIn] = useState("");


    const handleSaveHourCashIn = async () => {
        console.log("secure", data_from_api.secure_payment.uid)
        console.log("collateral", data_from_api.collateral.uid)
        console.log("cash in", data_from_api.cash_in.uid)
        try {
            const response = await axiosInstance.post(`appointment/for_cash_in/`,
                {
                    secure_payment: data_from_api.secure_payment.uid,
                    collateral: data_from_api.collateral.uid,
                    cash_in: data_from_api.cash_in.uid,
                    day: dayCashIn,
                    hour: hourCashIn

                }
            );
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }



    const handleAddDataBank = () => {

        console.log(data_from_api.cash_in.uid)

        try {

            const response = axiosInstance.patch(`secure_payment/cash_in/${data_from_api.cash_in.uid}/`,
                {

                    bank: banckName,
                    account_number: "225548546242154782",
                    alias: "aceleron.cartech"

                }

            );
            console.log(response.data)

        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }



    useEffect(() => {

        setAccountNumber(data_from_api.cash_in.account_number)
        setAlias(data_from_api.cash_in.alias)
        setBanckName(data_from_api.cash_in.bank)

        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`users/data_client_for_seller`,
                    {
                        params: {
                            client: data_from_api.secure_payment.client
                        }
                    }
                );

                setDataContactClient(response.data);
                setLoading(false)

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [])

    useEffect(() => {
        const getAvailableDays = () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Aseguramos que sea el inicio del día

            const lastDay = new Date(data_from_api.secure_payment.day);
            lastDay.setDate(lastDay.getDate() - 1);

            const daysArray = [];
            let currentDate = today;

            while (currentDate <= lastDay) {
                daysArray.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return daysArray;
        };

        const getAvailableHours = () => {
            const hoursArray = [];
            for (let hour = 9; hour <= 19; hour++) {
                const formattedHour = `${hour.toString().padStart(2, '0')}:00`;
                hoursArray.push(formattedHour);
            }
            return hoursArray;
        };

        const availableDays = getAvailableDays();
        setAvailableDays(availableDays);
        setAvailableHours(getAvailableHours());

        if (availableDays.length > 0) {
            setDayCashIn(availableDays[0].toISOString().split("T")[0]);
        }
        setHourCashIn(getAvailableHours()[0]);
    }, []);



    const steps = [
        {
            label: 'Informacion de la compra',
            description: `Por favor verifica que todos los datos sean correctos`,
            page:
                <div style={{ backgroundColor: "white" }} >
                    <h2>Creado por el vendedor el:</h2>
                    {data_from_api.secure_payment.created_at}
                    <h2>Monto total:</h2>
                    {data_from_api.secure_payment.amount}
                    <h2>Detalle</h2>
                    {data_from_api.secure_payment.description}
                    <h2>Auto:</h2>
                    <Link target='_blank' href={`/dashboard/seller/${uid_bussine}/tool/all_products/car/${data_from_api.secure_payment.car}`}>ir al auto</Link>

                    <h2>Datos del vendedor:</h2>
                    {
                        !loading ?
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "2vw", justifyContent: "space-evenly" }} >
                                <div>
                                    <h2>Nombre:</h2>
                                    {dataContactClient.name}
                                </div>
                                <div>
                                    <h2>Telefono:</h2>
                                    {dataContactClient.phone}
                                </div>
                                <div>
                                    <h2>Email:</h2>
                                    {dataContactClient.email}
                                </div>
                            </div>
                            : "cargando..."
                    }

                </div>
        },
        {
            label: 'Creacion de custodia',
            description: `Completa los datos de la cuenta de donde enviaras los fondos que deseas custodiar para realizar una compra segura`,
            page:
                <div style={{ width: "100%", alignItems: "center", justifyContent: "center" }} >
                    <div className="box_account"  >
                        <div style={{ display: "flex", flexDirection: "column" }} >
                            <h2>Banco</h2>
                            <input value={banckName} onChange={(e) => setBanckName(e.target.value)} type="text" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginTop: "2vh" }} >
                            <h2>Numero de cuenta</h2>
                            <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} type="text" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginTop: "2vh" }} >
                            <h2>Alias</h2>
                            <input value={alias} onChange={(e) => setAlias(e.target.value)} type="text" />
                        </div>

                    </div>

                    <div style={{ display: "flex", flexDirection: "row", display: "flex", justifyContent: "center" }} >
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                            <h2>Fondos</h2>
                            <Icon path={mdiArrowDown} size={4} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                            <Icon id="icon_arrow_account_bank" path={mdiArrowUp} size={4} color={"#0062e1"} />
                            <h2>Garantia</h2>
                        </div>
                    </div>
                    <div className="box_account" style={{ border: "1px solid #0062e1" }} >

                        <div style={{ display: "flex", flexDirection: "column" }} >
                            <h2>Banco:</h2>
                            <h2>Banco insdustrial</h2>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginTop: "2vh" }} >
                            <h2>Numero de cuenta:</h2>
                            <h2>225548546242154782</h2>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginTop: "2vh" }} >
                            <h2>Alias:</h2>
                            <h2>aceleron.cartech</h2>
                        </div>

                    </div>
                    <div>
                        <button onClick={handleAddDataBank}    >Crear</button>
                    </div>

                </div>
        },
        {
            label: 'Envio de fondos',
            description: `Estaremos en contacto con vos en todo momento para que el envio de fondos sea simple y sin estres`,
            page: (
                data_from_api.appointment_cash_in && data_from_api.appointment_cash_in.day ? (
                    <div>
                        <div>
                            El dia {data_from_api.appointment_cash_in.day} unos minutos antes de las {data_from_api.appointment_cash_in.hour} nos comunicaremos para hacerte saber que nuestra atencion es 100% tuya y estamos monitoreando la operacion para que todo salga bien.
                        </div>

                        <div>
                            <UploadVaucherCashIn uid_cash_in={data_from_api.cash_in.uid} />
                        </div>

                    </div>

                ) : (
                    <div>
                        <h2>Elegi el dia y hora aproximada del envio de fondos.</h2>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <h2>Día</h2>
                            <select onChange={(e) => setDayCashIn(e.target.value)}>
                                {availableDays.map((day, index) => (
                                    <option key={index} value={day.toISOString().split("T")[0]}>
                                        {day.toLocaleDateString()}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", marginTop: "2vh" }}>
                            <h2>Hora</h2>
                            <select onChange={(e) => setHourCashIn(e.target.value)}>
                                {availableHours.map((hour, index) => (
                                    <option key={index} value={hour}>
                                        {hour}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handleSaveHourCashIn}>Reservar horario</button>
                    </div>

                )
            ),
        },
        {
            label: 'Entrega de garantia y codigo de seguridad',
            description: `Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.`,
            page:
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <button style={{ backgroundColor: "black", color: "white", borderRadius: 10, padding: "1vh 2vw", display: "flex", flexDirection: "row", justifyContent: "space-around" }} >
                        <h2>Descargar garantia</h2>
                        <Icon path={mdiDownloadCircleOutline} size={1} color={"white"} />

                    </button >
                    <button style={{ backgroundColor: "black", color: "white", borderRadius: 10, padding: "1vh 2vw", display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "2vh" }} >
                        <h2>Descargar estatuto de aceleron </h2>
                        <Icon path={mdiDownloadCircleOutline} size={1} color={"white"} />

                    </button >

                </div>
        },
    ];

    const [activeStep, setActiveStep] = useState(1);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div style={{ display: "flex", flexDirection: "row" }} >
            <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={
                                    index === steps.length - 1 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <Box sx={{ mb: 2 }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                        style={{ display: index === steps.length - 1 ? "none" : "inline" }}
                                    >
                                        {'Siguiente'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                        style={{ display: index === 0 ? "none" : "inline" }}
                                    >
                                        Atras
                                    </Button>
                                </Box>
                                <div id="step_secure_buy_phone_client" >
                                    {steps[activeStep].page}
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Box>
            <div id="step_secure_buy_pc_client" >
                {steps[activeStep].page}
            </div>
        </div>

    );
}