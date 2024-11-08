import { useEffect, useRef, useState } from "react";

const StickyContact = ({actionContact, actionVideoCall}) => {
    const [isSticky, setIsSticky] = useState(false);
    const divRef = useRef(null);
    const originalPosition = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY; // Posición del scroll vertical
            const divPosition = divRef.current.getBoundingClientRect(); // Posición del div en relación a la ventana

            // Guardamos la posición original del div solo una vez
            if (originalPosition.current === 0) {
                originalPosition.current = 1300 + scrollY;
            }

            // Verificamos si hemos pasado la posición original al hacer scroll hacia abajo
            if (scrollY >= originalPosition.current) {
                setIsSticky(true); // Hacemos el div sticky
            } else if (scrollY < originalPosition.current) {
                setIsSticky(false); // Volvemos a estado estático si estamos por encima
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            {/* Otros contenidos del componente */}
            <div
                ref={divRef}
                style={{
                    position: isSticky ? "fixed" : "static",
                    bottom: isSticky ? "0px" : "initial",
                    width: "100%",
                    backgroundColor: "white",
                    height: "11.5vh",
                    transition: "bottom 0.2s ease",
                    display: isSticky  ? "flex" : "none",
                    left: 0,
                    zIndex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div>
                    <h2 onClick={() => actionContact()} style={{backgroundColor:"#2b61e5", color:"white", padding:"1vh 2vw", borderRadius:5, marginRight:"2vw"}}>Contactar</h2>
                </div>
                <div>
                    <h2 onClick={() => actionVideoCall()} style={{backgroundColor:"#2b61e5", color:"white", padding:"1vh 2vw", borderRadius:5, marginLeft:"2vw"}} >Solicitar video llamada</h2>
                </div>
            </div>
        </div>
    );
};

export default StickyContact;
