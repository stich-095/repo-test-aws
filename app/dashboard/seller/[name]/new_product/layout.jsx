
import "./layout_style.css";

export default function RootLayout({ children }) {
  return (

    <div style={{  width: "100%", display:"flex" ,justifyContent:"center", minHeight:"100vh" , backgroundColor:"aliceblue"}} >
      
      <div id="cont_new_product" >
        {children}
      </div>

    </div>

  );
}