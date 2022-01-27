import React, { useEffect, useState } from "react";
import {  Button } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const AjouterPatient = (props) => {
  const { ipcRenderer } = require("electron");
  let [Patients, setPatients] = useState([]);
  let [selectedPatient, setselectedPatient] = useState([]);
  useEffect(() => {
    ipcRenderer.send("patientsList");
    ipcRenderer.on("PatientListRequest", (e, result) => {
      setPatients(result);
    });
    ipcRenderer.on("attenteAjoute", (e, result) => {
        props.showpopup(false)
        props.refresh()
    })
  }, []);

  const addRdv = () => {
    ipcRenderer.send("AjouterAttente", selectedPatient);

  };
  const setData = (e) => {
    setselectedPatient(e.value);
  };

  const options = [];
  Patients.forEach((p) => {
    options.push({ value: p, label: p.Nom + " " + p.Prenom });
  });
 
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '45px',
      height: '45px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '45px',
      padding: '0 6px'
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '45px',
    }),
  };
  return (
    <div className="popup flex_center">
      <div style={{minHeight:"20%"}} className="popupElement">
        <div className="popupheading flex_center">
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faPlusCircle} />{" "}
          Ajouter Un Patien a la liste d'attente
        </div>
        <div className="popupContent">
        <Select styles={customStyles}  onChange={setData} options={options} />
     
        </div>
        <div className="btn_container2">
          <Button
            style={{ marginRight: "10px", backgroundColor: "rgb(146, 9, 9)" }}
            onClick={() => props.showpopup(false)}
          >
            <FontAwesomeIcon icon={faPlusCircle} /> Annuler
          </Button>
          <Button onClick={addRdv}>
            <FontAwesomeIcon icon={faPlusCircle} /> Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AjouterPatient;
