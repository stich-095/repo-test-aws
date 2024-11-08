import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axios_instance";
import { Toaster, toast } from 'sonner'


export default function CalendarForAppointment({ action, bussine, uid_product }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Asegúrate de que la hora sea 00:00:00
    const todayISOString = today.toISOString().split("T")[0]; // Formato ISO de la fecha de hoy sin hora

    const [selectedDate, setSelectedDate] = useState(todayISOString); // Estado inicial con la fecha de hoy
    const [availableTimes, setAvailableTimes] = useState([]); // Estado para almacenar las horas disponibles
    const [selectedTime, setSelectedTime] = useState(""); // Estado para almacenar la hora seleccionada
    const [loading, setLoading] = useState(false); // Estado para manejar el loading

    // Función para obtener los próximos 7 días, incluyendo hoy y excluyendo domingos
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

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(":");
        const hours24 = parseInt(hours, 10); // Convierte horas a un número
        const ampm = hours24 < 12 ? "AM" : "PM"; // Determina si es AM o PM
        const displayHours = hours24 === 0 ? 12 : hours24; // Si la hora es 0, se muestra como 12, de lo contrario se mantiene como está
        return `${displayHours}:${minutes} ${ampm}`; // Devuelve la hora en formato 24 horas con minutos y AM/PM
    };

    // Manejador de cambio para capturar la fecha seleccionada
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value); // Actualiza el estado con la fecha seleccionada
        setSelectedTime(""); // Resetea la hora seleccionada al cambiar la fecha
    };


    const fetchAvailableTimes = async (date) => {
        setLoading(true); // Inicia el loading
        try {
            const response = await axiosInstance.get(
                `appointment/appointments_free/?bussine=${bussine}&date=${date}`
            );
            if (response.status === 200) {
                const data = response.data;
                setAvailableTimes(data.available_times || []);
            } else {
                console.error("Error: Unexpected response status", response.status);
                setAvailableTimes([]); // Manejar el caso donde la respuesta no es la esperada
            }
        } catch (error) {
            if (error.response) {
                // Respuesta recibida pero con código de error
                console.error("Error response data:", error.response.data);
                console.error("Error status:", error.response.status);
                console.error("Error headers:", error.response.headers);
            } else if (error.request) {
                // La petición fue hecha pero no hubo respuesta
                console.error("No response received:", error.request);
            } else {
                // Algo sucedió al preparar la petición
                console.error("Error in setup:", error.message);
            }
            setAvailableTimes([]); // En caso de error, vaciar el array de horarios disponibles
        } finally {
            setLoading(false);
        }
    };

    const createOpenCar = async () => {
        if (selectedTime === "") {
            toast.error("Por favor selecciona una hora")
            return;
        }
        setLoading(true);
        try {
            const response = await axiosInstance.post(`open_product/open_cars/`, {
                dia: selectedDate,
                hora: selectedTime,
                bussine: bussine,
                cars_for_view: [uid_product],
            });
            const data = response.data;
            localStorage.setItem("uid_open_car", data.uid);
            action(selectedDate, selectedTime);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.status)
            setLoading(false);
        }
    };

    // useEffect para obtener las horas cuando se selecciona una fecha
    useEffect(() => {
        if (selectedDate) {
            fetchAvailableTimes(selectedDate);
        }
    }, [selectedDate]);

    return (
        <div>
            <h2>Selecciona un día</h2>
            <select value={selectedDate} onChange={handleDateChange}>
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

            {loading ? (
                <div>Cargando horas disponibles...</div>
            ) : (
                <>
                    <h2 style={{ marginTop: "2vh" }}>Selecciona una hora</h2>
                    <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        disabled={!availableTimes.length}
                    >
                        <option value="">-- elige una hora --</option>
                        {availableTimes.map((time, index) => (
                            <option key={index} value={time}>
                                {formatTime(time)} {/* Asegúrate de que 'time' sea un string representativo */}
                            </option>
                        ))}
                    </select>
                </>
            )}

            <div
                onClick={createOpenCar}
                style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "8vh" }}
            >
                <button
                    style={{
                        color: "white",
                        fontWeight: 500,
                        backgroundColor: "black",
                        padding: "0.5vh 1vw",
                        borderRadius: "5px",
                    }}
                >
                    Continuar
                </button>
            </div>
            <Toaster style={{ marginTop: "2vh" }} position="top-right" />

        </div>
    );
}
