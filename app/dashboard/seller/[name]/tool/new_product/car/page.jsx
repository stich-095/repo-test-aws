"use client";

import { useState } from "react";
import SelectInput from "@/components/multiple_place/select_input/js_select_input.jsx";
import "./car_page.css";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axios_instance";
import { Toaster, toast } from 'sonner'




export default function BrandPage({ params }) {

  let { name } = params;
  let router = useRouter();

  const carBrands = ["Renault", "Toyota", "Volkswagen", "Ford", "Bmw", "Peugeot", "Audi", "Suzuki", "Nissan", "Mazda", "Mg", "Chery", "Mitsubishi", "Jeep", "Otro"];

  let [otherModel, setOtherModel] = useState(false);
 

 
  let handleSender = async (marca) => {
    let token = localStorage.getItem('authTokens')
    let acces = JSON.parse(token).access
    if (marca.length === 0) {
      toast.error("Por favor ingrese una marca");
      return;
  }
    
    try {
      
      const response = await axiosInstance.post(
        "products/cars/",
        {
          "marca": marca,
          
      },
        {
          headers: {
            "Content-Type": "application/json"  
          }
        }
      );
      const data =response.data;
      toast.success("Marca registrada exitosamente");

      
      router.push(`/dashboard/seller/${name}/tool/new_product/car/${data.uid}/model`);
      


    } catch (error) {
      // Handle login errors here
      console.error("Error during login:", error);
    }
  }


  let onChange = async (e) => {
    if (e.target.value === "Otro") {
      setOtherModel(true);
    }
    else {

      handleSender(e.target.value);
      
      


      //router.push(`/dashboard/seller/${name}/new_product/car/model`);
    }

  }

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingBottom: "15vh", justifyContent: "center" }} >
      <div>
        <h1 style={{ fontSize: "3vw" }} >Marca del auto</h1>
      </div>
      <div style={{ display: otherModel === false ? "flex" : "none" }} >
        < SelectInput options={carBrands} onChange={onChange} />
      </div>


      <div style={{ display: otherModel === true ? "flex" : "none", marginTop: "2vh", alignItems:"center" }} >
        <div>
          <input id="input_type_text_brand" type="text" placeholder="Escribi la marca que no encontraste" />
        </div>
        <div>
          <button style={{fontSize:"1.5vw" }} id="button_brand" onClick={onChange}  >agregar</button>
        </div>

      </div>



    </div>
  );
}