"use client"

import "./css_faq_secure_buy.css";
import React from "react";
import { Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react";
import Image from "next/image";
function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

export default function FaqSecureBuy() {
    const [open, setOpen] = React.useState(1);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <>
            <div>
                <h3 id="title_faq" >Preguntas frecuentes</h3>
            </div>
            <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(1)}>como funciona una compra 100% segura ?</AccordionHeader>
                <AccordionBody>
                    El comprador realiza el pago del automotor a Aceleron, no a la concecionaria; De esta forma te aseguras que la concecionara solo obtenga tu dinero cuando tenes la llave de tu nuevo auto en la mano y todo este en regla. Si hay algun problema ejecutas la garantia de pago que te da aceleron y el dinero vuelve a tu bolsillo sin necesidad de mediar con la concecionaria.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(2)}>
                cuales son las garantias de pago que obtengo?
                </AccordionHeader>
                <AccordionBody>
                    <h2>Como instrumento de garantia de pago podes obtener:</h2>
                    <h2>1) Un cheque de pago diferido (chequera) con fecha de acreditacion 3 dias posteriores a la operacion con la concecionaria. (para cuidades capitales)</h2>
                    <h2>2) Un e-cheq de pago diferido con fecha de acreditacion 3 dias posteriores a la operacion con la concecionaria. (para toda argentina)</h2>
                    <h2>3) Una orden de pago con fecha de acreditacion 3 dias posteriores a la operacion con la concecionaria. (para toda argentina)</h2>

                    
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(3)}>
                    cuando se ejecuta una garantia de pago?
                </AccordionHeader>
                <AccordionBody>
                    Una garantia de pago se ejucuta cuando algo no esta en regla con la operacion de compra de tu auto, por ejemplo si el auto no esta en las condiciones que se pactaron, si la documentacion no esta en regla, si el auto no es el que se pacto, etc. En ese caso se ejecuta la garantia de pago y el dinero vuelve a tu bolsillo.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(4)}>
                    como se ejecuta una garantia de pago ?
                </AccordionHeader>
                <AccordionBody>
                    En el caso de los cheques podras presentarte en el vencimiento (3 dias despues de la operacion) en la sucursal del banco emisor y solicitar la devolucion del dinero. En el caso de las ordenes de pago y e-cheques, deberas presentarte en la sucursal del banco emisor y solicitar la devolucion del dinero.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(5)}>
                    y si todo sale bien 🚗😁 ?
                </AccordionHeader>
                <AccordionBody>
                    Si todo sale bien, las garantias de pago son anuladas y el dinero se acredita en la cuenta de la concecionaria. Vos te vas feliz andando en tu nuevo auto .
                </AccordionBody>
            </Accordion>
            
            
            
            
        </>
    );
}