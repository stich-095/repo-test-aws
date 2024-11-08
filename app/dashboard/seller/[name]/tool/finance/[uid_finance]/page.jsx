"use client"
import { useEffect, useState } from "react"
import GraficoLineas from "@/components/only_place/graphical_line/js_graphical_line"
import DebtChart from "@/components/only_place/graphical_pie/js_graphical_pie"
import DebtTable from "@/components/only_place/deb_table/js_deb_table"
import axiosInstance from "@/utils/axios_instance"
import LoaderWithImg from "@/components/multiple_place/loader_with_img/LoaderWithImg"
import { set } from "date-fns"


export default function FinanceForClient({ params }) {

  const { uid_finance } = params;
  const [loading, setLoading] = useState(true);
  const [dataFromApi, setDataFromApi] = useState([]);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `request_credit_info/credit_info/${uid_finance}`,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        const data = response.data;
        setDataFromApi(data); // Guardar todos los datos que provienen de la API
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    };

    fetchData();
  }, []);
  
  







  return (
    <div style={{ height: "2500px",  width: "100%" }}>
      {loading ? (
        <LoaderWithImg />
      ) : (
        <div>
          <GraficoLineas data_from_api={dataFromApi} />
          <DebtChart data_from_api={dataFromApi} />
          <DebtTable data_from_api={dataFromApi} />
        </div>
      )}
    </div>
  );
};