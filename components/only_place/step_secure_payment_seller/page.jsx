"use client"
import "./css_step_secure_payment_seller.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import { useEffect } from 'react';
import axiosInstance from "@/utils/axios_instance"
import Icon from '@mdi/react';
import { mdiCheckCircleOutline, mdiRadioboxBlank, mdiArrowUpBoldCircleOutline, mdiAlertCircleOutline } from '@mdi/js';
import UploadVaucherCollateralCancellation from '@/components/multiple_place/upload_vaucher_collateral_cancellation/js_upload_vaucher_collateral_cancellation';


export default function VerticalLinearStepper({ data_from_api, uid_secure_buy, uid_bussine  }) {



    const [dataContactClient, setDataContactClient] = React.useState([])
    const [loading, setLoading] = React.useState(true)


    useEffect(() => {
        const fetchData = async () => {
            console.log("desde component", data_from_api)
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



    const steps = [
        {
            label: 'Informacion de la compra',
            description: `Revisa que los detelles de la compra que encontras en esta pestaña sean correctos.`,
            page:
                <div style={{ backgroundColor: "white", padding: "2vh 2vw", borderRadius: 10 }} >
                    <div style={{ marginTop: "2vh" }} >
                        <h2>Creado el:</h2>
                        {data_from_api.secure_payment.created_at}
                    </div>
                    <div style={{ marginTop: "2vh" }} >
                        <h2>Monto total:</h2>
                        {data_from_api.secure_payment.amount}
                    </div>
                    <div style={{ marginTop: "2vh" }} >
                        <h2>Detalle</h2>
                        {data_from_api.secure_payment.description}
                    </div>
                    <div style={{ marginTop: "2vh" }} >
                        <h2>Auto:</h2>
                        <Link target='_blank' href={`/dashboard/seller/${uid_bussine}/tool/all_products/car/${data_from_api.secure_payment.car}`}>ir al auto</Link>
                    </div>

                    <div style={{ marginTop: "2vh" }} >
                        <h2>Datos del cliente:</h2>
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

                </div>
        },
        {
            label: 'Proceso Aceleron y el cliente',
            description: `En esta pestaña podes ver el avance entre Aceleron y el cliente. `,
            page:
                <div>
                    <div className='cont_proces_client' >
                        {data_from_api.secure_payment.status === "pending" ? <Icon path={mdiRadioboxBlank} size={1} /> : <Icon path={mdiCheckCircleOutline} size={1} />}
                        <h2 style={{ marginLeft: "2vw" }} >Solicitud aceptada</h2>
                    </div>
                    <div className='cont_proces_client' >
                        {data_from_api.appointment_cash_in && data_from_api.appointment_cash_in.day ? <Icon path={mdiCheckCircleOutline} size={1} /> : <Icon path={mdiRadioboxBlank} size={1} />}
                        <h2 style={{ marginLeft: "2vw" }} > Dia para transferencia o deposito a Aceleron</h2>

                    </div>
                    <div className='cont_proces_client' >
                        {data_from_api.cash_in && data_from_api.cash_in.amount ? <Icon path={mdiCheckCircleOutline} size={1} /> : <Icon path={mdiRadioboxBlank} size={1} />}
                        <h2 style={{ marginLeft: "2vw" }} >Fondos en custodia de Aceleron</h2>

                    </div>
                    <div className='cont_proces_client' >
                        {data_from_api.collateral && data_from_api.collateral.status !== "pending" ? <Icon path={mdiCheckCircleOutline} size={1} /> : <Icon path={mdiRadioboxBlank} size={1} />}
                        <h2 style={{ marginLeft: "2vw" }} >Entrega de garantia</h2>

                    </div>
                </div>
        },
        {
            label: 'Anulacion garantia',
            description: `Subi el comprobante de la anulacion de la garatia. click para descargar formulario`,
            page:
                <div >
                    <div style={{ marginLeft: "10vw", marginTop: "5vh", display: "flex", alignItems: "center", flexDirection: "column" }} >
                        <div style={{ display: "flex", flexDirection: "row" }} >
                            <Icon path={mdiAlertCircleOutline} size={1} />
                            <h2>Aun no subiste la anulacion </h2>
                        </div>

                    
                        <UploadVaucherCollateralCancellation uid_collateral={data_from_api.collateral.uid} />
                        
                    </div>

                </div>
        },
        {
            label: 'Entrega de fondos',
            description: `La entrega de fondos seran realizados en la siguiente cuenta.`,
            page:
                <div style={{ backgroundColor: "white", padding: "3vh 3vw", borderRadius: 10 }} >

                    <div style={{ marginTop: "2vh", border: "1px solid black", padding: "1vh 2vw ", marginBottom: "2vh", borderRadius: 10, display: "flex", flexDirection: "row" }}  >
                        <Icon path={mdiAlertCircleOutline} size={1} />
                        <h2>Aun no se realizo ninguna tranferencia </h2>

                    </div>
                    <div style={{ display: "none" }} >
                        <h2>Tranferencia realizada</h2>
                        <h2>Importe referencia comprobante</h2>
                    </div>

                    <div>
                        <h2>Nombre del titular</h2>
                        <h2>Jose Perez</h2>
                    </div>
                    <div style={{ marginTop: "2vh" }}  >
                        <h2>Numero de cuenta</h2>
                        <h2>65465445-54546546-8</h2>
                    </div>
                    <div style={{ marginTop: "2vh" }}  >
                        <h2>CBU</h2>
                        <h2>65465445-54546546-8</h2>
                    </div>
                    <div style={{ marginTop: "2vh" }}  >
                        <h2>CUIT</h2>
                        <h2>65465445-54546546-8</h2>
                    </div>
                    <div style={{ marginTop: "2vh" }} >
                        <h2>alias</h2>
                        <h2>julio.quiroga.automotores</h2>
                    </div>


                </div>
        },
    ];

    const [activeStep, setActiveStep] = React.useState(1);
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

                                <div id="all_content_step_phone" >
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
            <div id="all_content_step_pc" >
                {steps[activeStep].page}
            </div>
        </div>

    );
}