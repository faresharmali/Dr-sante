import React, { useEffect, useState } from "react";
import {  Button ,TextInput} from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const addBillan = (props) => {
  const { ipcRenderer } = require("electron");

  const add = () => {
      if(nom.trim()!="" ){

          ipcRenderer.send("addBillan", {Nom:nom});
          ipcRenderer.on("addBillanRep",()=>{
              props.ShowPopup(false)
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
      
      }
  };
 const [nom,setNom]=useState("")

  return (
    <div className="popup flex_center">
      <div style={{minHeight:"20%"}} className="popupElement">
        <div className="popupheading flex_center">
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faPlusCircle} />{" "}
          Ajouter Un Bilan
        </div>
        <div  className="popupContent">
        <TextInput
            onChange={setInputData}
            id="TextInput-4"
            label="Nom De Bilan"
            name="Nom"
          />
    
      
        
        </div>
        <div className="btn_container2">
         
          <Button onClick={add}>
            <FontAwesomeIcon icon={faPlusCircle} /> Fermer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default addBillan;
