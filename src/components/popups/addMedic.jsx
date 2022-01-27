import React, { useEffect, useState } from "react";
import {  Button ,TextInput} from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AddMedic = (props) => {
  const { ipcRenderer } = require("electron");

  const addRdv = () => {
    console.log("added")
    if(
        nom.trim()!="" && 
        Forme.trim()!="" 
      ){
          ipcRenderer.send("AjouterMedicament", {Nom:nom,FORME:Forme,DSI:DSI});
          ipcRenderer.on("AjouterMedicamentRep",()=>{
            console.log("called here")

              props.showpopup(false)
              props.refresh()
          });

      }else{
        ipcRenderer.send("openDialog","Tous Les Champs Sont Obligatoires")

      }

  };
  const setInputData = (e) => {
      switch(e.target.name){
          case "Nom" :setNom(e.target.value)
          break
      
          case "Forme" :setForme(e.target.value)
          break
          case "DSI" :setDSI(e.target.value)
          break
      }
  };
 const [nom,setNom]=useState("")
 const [Forme,setForme]=useState("")
 const [DSI,setDSI]=useState("")

  return (
    <div className="popup flex_center">
      <div style={{minHeight:"20%"}} className="popupElement">
        <div className="popupheading flex_center">
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faPlusCircle} />{" "}
          Ajouter Un Medicament
        </div>
        <div style={{gridTemplateColumns:"1fr 1fr 1fr"}}  className="popupContent">
        <TextInput
            onChange={setInputData}
            id="TextInput-4"
            label="Nom De Medicamment"
            name="Nom"
          />
    
           <TextInput
            onChange={setInputData}
            id="TextInput-4"
            label="Forme"
            name="Forme"
          />
           <TextInput
            onChange={setInputData}
            id="TextInput-4"
            label="DCI"
            name="DSI"
          />
        
        </div>
        <div className="btn_container2">
          <Button
            style={{ marginRight: "10px", backgroundColor: "rgb(146, 9, 9)" }}
            onClick={() => props.showpopup(false)}
          >
            <FontAwesomeIcon icon={faPlusCircle} /> Annuler
          </Button>
          <Button onClick={()=>addRdv()}>
            <FontAwesomeIcon icon={faPlusCircle} /> Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMedic;
