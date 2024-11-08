"use client"
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; // Cambiar Bar a Line
import Chart from 'chart.js/auto';
import axios from 'axios';

const GraficoLineas = ({ data_from_api }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(data_from_api);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Empieza el estado de carga
        const response = await axios.get(`https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/Historicas/${data_from_api.cuit_or_cuil}`);
        console.log(response.status);

        // Verificar que la respuesta tenga la estructura correcta
        if (response.status === 200 && response.data && response.data.results && response.data.results.periodos) {
          const periodos = response.data.results.periodos;
          const entidades = {};

          // Procesar los datos para cada entidad
          periodos.forEach(({ periodo, entidades: entidadData }) => {
            entidadData.forEach(({ entidad, monto }) => {
              if (!entidades[entidad]) {
                entidades[entidad] = { label: entidad, data: [], borderColor: getRandomColor(), fill: false };
              }
              entidades[entidad].data.push({ periodo, monto });
            });
          });

          const datasets = Object.values(entidades).map(({ label, data, borderColor }) => ({
            label,
            data: data.sort((a, b) => a.periodo.localeCompare(b.periodo)).map(d => d.monto),
            borderColor,
            tension: 0.1,
            fill: false,
          }));

          const labels = Array.from(new Set(periodos.map(p => p.periodo)));

          setData({
            labels,
            datasets,
          });
          setLoading(false);
        } else {
          console.error('La respuesta de la API no tiene la estructura esperada');
        }
      } catch (error) {
        // Manejar diferentes tipos de errores
        if (error.response) {
          console.error(`Error en la respuesta de la API: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          console.error('No se recibió respuesta del servidor');
        } else {
          console.error(`Error en la configuración de la solicitud: ${error.message}`);
        }
      } 
       
    };

    fetchData();
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div>
      <h2>Gráfico de Líneas</h2>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

export default GraficoLineas;
