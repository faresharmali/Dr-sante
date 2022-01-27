import React, {  useState } from "react";
import { TextInput, Button } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
faUser
  } from "@fortawesome/free-solid-svg-icons";
const EditBilan = (props) => {
  const { ipcRenderer } = require("electron");
  let [Medic, SetMedic] = useState(props.Medic);
console.log(Medic)
  const setData = (e) => {
      SetMedic({...Medic,Nom:e.target.value}) 
  };
const Modifier=()=>{
    console.log(Medic.Nom)
    if (
        Medic.Nom.trim() != "" 
        
      ) {
        console.log(Medic)

          ipcRenderer.send("UpdateBilan",{...Medic})
          ipcRenderer.on("BilanUpdated",()=>{
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

export default EditBilan;
