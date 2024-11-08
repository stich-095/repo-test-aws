import "./css_all_finance.css";
import Image from "next/image";
import Link from "next/link";

export default function AllFinanceComponent({ data_from_api, bussine_uid}) {

    
    const getCreditLevel = (score) => {
        if (score >= 75) {
            return "alta";
        } else if (score >= 50) {
            return "media-alta";
        } else if (score >= 25) {
            return "baja";
        } else {
            return "muy baja";
        }
    }
    

    return (
        <div>
            {data_from_api.map((credit_info, index) => {
                

                    return (
                        <div key={index} className="cont_all_product">
                            <div className="image-gallery-all-product">
                                <div className="main-image-all-product">
                                    <Image
                                        className="image-all-product-seller"
                                        src="/images/user_profile.png"
                                        alt="user_profile"
                                        width={500}
                                        height={500}
                                    />
                                </div>

                                
                            </div>

                            <div className="cont_all_items">
                                <div className="cont_items">
                                    <div className="cont_genric_items">
                                        <div><h1>Cuit/Cuil</h1></div>
                                        <div><h1>{credit_info.cuit_or_cuil}</h1></div>
                                    </div>
                                    <div className="cont_genric_items"  >
                                        <div><h1>Score aceleron</h1></div>
                                        <div><h1>{credit_info.credit_score_aceleron}/100</h1></div>
                                    </div>
                                    <div className="cont_genric_items color_item" >
                                        <div><h1>Deuda / ingreso</h1></div>
                                        <div><h1>{credit_info.ratio_debt_income}</h1></div>
                                    </div>
                                    <div className="cont_genric_items">
                                        <div><h1>Aceptacion</h1></div>
                                        <div><h1>{ getCreditLevel(credit_info.credit_score_aceleron)   }</h1></div>
                                    </div>
                                    
                                </div>

                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Link href={`/dashboard/seller/${bussine_uid}/tool/finance/${credit_info.uid}`}>Ir al detalle</Link>
                                </div>
                            </div>
                        </div>
                    );
                }

            )}
        </div>
    );
}
