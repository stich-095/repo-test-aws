
"use client"
import "./yeard_page.css"
import { useRouter } from "next/navigation"

export default function YeardPage({ params }) {
    let [year, setYear] = useState()
    let { name } = params
    let { uid } = params
    let router = useRouter()


    let handleChangeNumber = async (e) => {

        setYear(e.target.value)
        if (e.target.value.length == 4) {
            let token = localStorage.getItem('authTokens')
            let acces = JSON.parse(token).access
            
            try {

                const response = await axiosInstance.patch(
                    `products/cars/${uid}/`,
                    {
                        "year": year,

                    },
                    {
                        headers: {
                            "Content-Type": "application/json" 
                        }
                    }
                );
                const data = response.data;
                //router.push(`/dashboard/seller/${name}/new_product/car/${data.uid}/upload_imgs`);



            } catch (error) {
                // Handle login errors here
                console.error("Error during login:", error);
            }
        }


    }

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingBottom: "15vh", justifyContent: "center" }}  >
            <div>
                <h1 style={{ fontSize: "3vw" }}   >Año</h1>
            </div>
            <div style={{ display: "flex", marginTop: "2vh", alignItems: "center" }} >
                <div>
                    <input id="input_type_num_yeard" type="number" onChange={handleChangeNumber} placeholder="Escribi el modelo" />
                </div>


            </div>
        </div>
    )
}
