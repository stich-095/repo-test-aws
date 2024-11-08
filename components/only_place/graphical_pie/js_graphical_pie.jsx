"use client"
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DebtChart = ({data_from_api}) => {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [totalDebt, setTotalDebt] = useState(0); // Estado para la deuda total
    const [debtsByEntity, setDebtsByEntity] = useState([]); // Estado para las deudas por entidad
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/${data_from_api.cuit_or_cuil}`);
                const jsonData = await response.json();

                if (jsonData.status === 200) {
                    const periodos = jsonData.results.periodos;
                    const entidades = periodos[0].entidades;

                    // Obtener etiquetas y montos
                    const labels = entidades.map(entidad => entidad.entidad);
                    const montos = entidades.map(entidad => entidad.monto);
                    const total = montos.reduce((acc, monto) => acc + monto, 0); // Calcular la deuda total

                    setData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Monto por entidad',
                                data: montos,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(54, 162, 235, 0.6)',
                                    'rgba(255, 206, 86, 0.6)',
                                    'rgba(75, 192, 192, 0.6)',
                                    'rgba(153, 102, 255, 0.6)',
                                    'rgba(255, 159, 64, 0.6)',
                                ],
                            },
                        ],
                    });

                    setTotalDebt(total); // Actualizar deuda total
                    setDebtsByEntity(entidades); // Guardar deudas por entidad
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Cargando datos...</p>;

    return (
        <div>
            <h2>Monto por entidad</h2>
            <div style={{display:"flex", flexDirection:"row"}}>
                <div style={{ width: "35vw" }} >
                    <Pie data={data} />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <h3>Deuda Total: ${totalDebt.toFixed(2)}</h3> {/* Mostrar deuda total */}
                    <h4>Deuda por Entidad:</h4>
                    <ul>
                        {debtsByEntity.map((entidad, index) => (
                            <li key={index}>
                                {entidad.entidad}: ${entidad.monto.toFixed(2)} {/* Mostrar deuda por entidad */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default DebtChart;
