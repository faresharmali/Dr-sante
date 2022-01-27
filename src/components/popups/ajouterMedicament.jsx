import React, { Component } from "react";
import { Pagination, TextInput, Button } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
    faBuilding,
    faCapsules,
    faPlusCircle,
    faPrescription,
    faPrescriptionBottle,
  faSearch,
  faThermometer
} from "@fortawesome/free-solid-svg-icons";
const AjouterMedicament = () => {
    const setData=()=>{

    }
  return (
    <div className="popup flex_center">
      <div className="popupElement">
        <div className="popupheading flex_center"><FontAwesomeIcon style={{ color: "#048175" }} icon={faPlusCircle} /> Ajouter Un Medicament</div>
        <div className="popupContent">
          <TextInput
            icon={
              <FontAwesomeIcon style={{ color: "#048175" }} icon={faPrescriptionBottle} />
            }
            onChange={setData}
            id="TextInput-4"
            label="Nom"
          />
          <TextInput
            icon={
              <FontAwesomeIcon style={{ color: "#048175" }} icon={faBuilding} />
            }
            onChange={setData}
            id="TextInput-4"
            label="Marque"
          />
          <TextInput
            icon={
              <FontAwesomeIcon style={{ color: "#048175" }} icon={faThermometer} />
            }
            onChange={setData}
            id="TextInput-4"
            label="Dosage"
          />
          <TextInput
            icon={
              <FontAwesomeIcon style={{ color: "#048175" }} icon={faCapsules} />
            }
            onChange={setData}
            id="TextInput-4"
            label="Forme"
          />
        </div>
        <div className="btn_container2">
            <Button><FontAwesomeIcon icon={faPlusCircle} /> Ajouter</Button>
        </div>
      </div>
    </div>
  );
};

export default AjouterMedicament;
