"use client"
import "./css_abount_transaction_page.css"
import { useState } from "react"
import axiosInstance from "@/utils/axios_instance"
import { useRouter } from "next/navigation"
import { set } from "date-fns"



export default function CreateSecureBuy({ params }) {

    const router = useRouter()
    const today = new Date();
    const { name, uid_secure_buy } = params
    const [amount, setAmount] = useState("")
    const [currency, setCurrency] = useState("peso")
    const [description, setDescription] = useState("")
    const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]);
    const [selectedTime, setSelectedTime] = useState('');



    const generateTimeOptions = () => {
        const options = [];
        let hour = 9;
        let minute = 30;

        while (hour < 20 || (hour === 20 && minute === 0)) {
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            options.push(`${formattedHour}:${formattedMinute}`);
            minute += 30;

            if (minute === 60) {
                minute = 0;
                hour++;
            }
        }
        return options;
    };



    const getNext7DaysIncludingTodayExcludingSunday = () => {
        const days = [];
        let currentDate = new Date(today.getTime()); // Clonamos la fecha actual

        while (days.length < 7) {
            if (currentDate.getDay() !== 0) { // Excluimos los domingos
                days.push(new Date(currentDate.getTime())); // Guardamos una copia exacta de la fecha actual
            }
            currentDate.setDate(currentDate.getDate() + 1); // Avanzamos al siguiente día
        }
        return days;
    };

    const next7Days = getNext7DaysIncludingTodayExcludingSunday();

    const handleSendSecureBuyAbountTransaction = async () => {

        
        
        try {
            const response = await axiosInstance.patch(`secure_payment/handle/${uid_secure_buy}/`,
                {
                    currency: currency,
                    amount: amount,
                    day: selectedDate,
                    hour: selectedTime,
                    description: description,
                })
            console.log(response)
            alert("Solicitud enviada")

        } catch (error) {
            console.log(error)
        }


    }



    return (
        <div id="cont_all_form_dataclient_create_secure_buy" >
            <div id="cont_form_dataclient_create_secure_buy" >
                <h2 style={{ textAlign: "center" }} >Sobre la operacion</h2>
                <h2>Monto total a recibir</h2>
                <input className="input_data_client_secure_buy" value={amount} onChange={(e) => setAmount(e.target.value)} type="number" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="currency">Selecciona una moneda:</label>
                    <select className="input_data_client_secure_buy" id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option value="peso">$ Peso </option>
                        <option value="dolar">U$D Dólar  </option>
                    </select>

                </div>
                <div style={{ display: "flex", flexDirection: "column" }} >
                    <label htmlFor="description">Detalle:</label>
                    <textarea
                        className="input_data_client_secure_buy"
                        id="description"
                        name="description"
                        rows="4"
                        cols="50"
                        placeholder="Por ejemplo: Renaul tracker 2021 $10.000.000, Tranferencia $250.000 , Seguro contra todo riesgo $350.000 || Total $10.600.000"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}

                    />

                </div>
                <h2>Selecciona un día</h2>
                <select className="input_data_client_secure_buy" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                    {next7Days.map((date, index) => (
                        <option key={index} value={date.toISOString().split("T")[0]}>
                            {date.toLocaleDateString("es-AR", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                            })}
                        </option>
                    ))}
                </select>
                <h2>Hora</h2>
                <select
                    className="input_data_client_secure_buy"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                >
                    <option value="">Selecciona una hora</option>
                    {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                    ))}
                </select>

                <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                    <button onClick={handleSendSecureBuyAbountTransaction} style={{ padding: "1vh 5vw", backgroundColor: "black", color: "white", borderRadius: 5 }} href={`hola`} >Solicitar confirmacion al comprador</button>
                </div>

            </div>
        </div>
    )
}