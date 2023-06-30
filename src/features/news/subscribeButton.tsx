import React from "react";
import {BotonSuscribir} from "./styled"
import {INoticiasNormalizadas} from "./Noticias"

export interface Suscription{

  setModal:React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>
}


const subscribeButton:React.FC<Suscription> = ({setModal}) => {
  
  return (
    <>
    <BotonSuscribir
    onClick={() =>
      setTimeout(() => {
        alert("Ahora estás suscripto a nuestro newsletter!");
        setModal(null);
      }, 1000)
    }
    >
    Suscríbete
   </BotonSuscribir>
  </>
  );
}
export default subscribeButton;
