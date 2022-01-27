import React, { useEffect, useState } from "react";
import { TextInput, Button } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faMapMarked, faPhone, faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
faUser
  } from "@fortawesome/free-solid-svg-icons";
const AjouterRendezVous = (props) => {
  const { ipcRenderer } = require("electron");
  let [Patients, setPatients] = useState(props.patient);



  const setData = (e) => {
switch(e.target.name){
    case "Nom":setPatients({...Patients,Nom:e.target.value}) 
    break
    case "Prenom":setPatients({...Patients,Prenom:e.target.value}) 
    break
    case "Age":setPatients({...Patients,Age:e.target.value}) 
    break
    case "TA":setPatients({...Patients,TA:e.target.value}) 
    break
    case "Poids":setPatients({...Patients,Poids:e.target.value}) 
    break
    case "Numero":setPatients({...Patients,numero:e.target.value}) 
    break
    case "Pathologies":setPatients({...Patients,Pathologies:e.target.value}) 
    break
}
  };
const Modifier=()=>{
    if (
        Patients.Nom.trim() != "" &&
        Patients.Prenom.trim() != "" 
      
      ) {
          ipcRenderer.send("updatePatient",Patients)
          ipcRenderer.on("patientUpdated",()=>{
              props.showpopup(false)
              props.refresh()
          })
      }
}
  return (
    <div className="popup flex_center">
      <div className="popupElement">
        <div className="popupheading flex_center">
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faPlusCircle} />{" "}
          Modifier Les Informations
        </div>
        <div className="popupContent">
        <TextInput
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faUser} />
            }
            id="TextInput-4"
            name="Nom"
            placeholder="Nom"
            value={Patients.Nom}
            onChange={setData}
            label="Nom"
          />
        <TextInput
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faUser} />
            }
            id="TextInput-43"
            name="Prenom"
            placeholder="Prenom"
            value={Patients.Prenom}
            onChange={setData}
            label="Prenom"


          />
        <TextInput
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faUser} />
            }
            type="date"
            id="TextInput-33"
            name="Age"
            placeholder="Age"
            value={Patients.Age.toString()}
            onChange={setData}
            label="Date De Naissance"


          />
        <TextInput
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faLocationArrow} />
            }
            id="TextInput-é"
            placeholder="Poids"
            name="Poids"
            value={Patients.Poids}
            onChange={setData}
            label="Poids"


          />
        <TextInput
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faUser} />
            }
            id="TextInput-d"
            placeholder="TA"
            name="TA"
            value={Patients.TA}
            onChange={setData}
            label="TA"

          />
        <TextInput
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faPhone} />
            }
            id="TextInput-sss"
            placeholder="Numero"
            name="Numero"
            value={Patients.numero}
            onChange={setData}
            label="Numero De Telephone"

          />
        <TextInput
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faUser} />
            }
            id="TextInput-sssxs"
            placeholder="Pathologies"
            name="Pathologies"
            value={Patients.Pathologies}
            onChange={setData}
            label="Pathologies"

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

export default AjouterRendezVous;
