"use client"
import React, { useEffect, useState } from 'react';
import "./css_deb_table.css"

const DebtTable = ({data_from_api}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/Historicas/${data_from_api.cuit_or_cuil}`);
        const result = await response.json();
        setData(result.results.periodos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
        
      
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  // Obtener todas las entidades únicas
  const entities = [...new Set(data.flatMap(periodo => periodo.entidades.map(entidad => entidad.entidad)))];

  return (
    <div id='cont_table_history_for_entity' >
      <h1>Tabla de Deudas Históricas</h1>
      <table  >
        <thead>
          <tr>
            <th>Periodo</th>
            {entities.map((entity) => (
              <th key={entity}>{entity}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((periodo) => (
            <tr key={periodo.periodo}>
              <td>{periodo.periodo}</td>
              {entities.map((entity) => {
                const entidadData = periodo.entidades.find(entidad => entidad.entidad === entity);
                return (
                  <td key={entity}>
                    {entidadData ? entidadData.situacion : 'N/A'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
          
        }
        th, td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
        }
      `}</style>
    </div>
  );
};

export default DebtTable;
