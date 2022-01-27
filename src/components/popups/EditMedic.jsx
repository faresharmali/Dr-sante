import React, {  useState } from "react";
import { TextInput, Button } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
faUser
  } from "@fortawesome/free-solid-svg-icons";
const EditMedic = (props) => {
  const { ipcRenderer } = require("electron");
  let [Medic, SetMedic] = useState(props.Medic);

  const setData = (e) => {
switch(e.target.name){
    case "Nom":SetMedic({...Medic,Nom:e.target.value}) 
    break
    case "Forme":SetMedic({...Medic,FORME:e.target.value}) 
    break

}
  };
const Modifier=()=>{
    if (
        Medic.Nom.trim() != "" &&
        Medic.FORME.trim() != ""
        
      ) {
          ipcRenderer.send("UpdateMedic",{...Medic})
          ipcRenderer.on("MedicUpdated",()=>{
              props.showpopup(false)
              props.refresh()
          })
      }
}
  return (
    <div className="popup flex_center">
      <div style={{minHeight:"20%"}} className="popupElement">
        <div className="popupheading flex_center">
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faPlusCircle} />{" "}
          Modifier Les Informations
        </div>
        <div className="popupContent">
       
        <TextInput
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faUser} />
            }
            id="TextInput-sssxs"
            placeholder="Nom de Medicament"
            name="Nom"
            onChange={setData}
            value={Medic.Nom}
          />
        <TextInput
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faUser} />
            }
            id="TextInput-sssxs"
            placeholder="Forme"
            name="Forme"
            onChange={setData}
            value={Medic.FORME}

          />

        </div>
        <div className="btn_container2">
          <Button
            style={{ marginRight: "10px", backgroundColor: "rgb(146, 9, 9)" }}
            onClick={() => props.showpopup(false)}
          >
            <FontAwesomeIcon icon={faTimesCircle} /> Annuler
          </Button>
          <Button onClick={Modifier} >
            <FontAwesomeIcon icon={faPlusCircle} /> Modifier
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditMedic;
