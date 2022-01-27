import React, { useEffect, useState } from "react";
import { TextInput, Button } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const AjouterRendezVous = (props) => {
  const { ipcRenderer } = require("electron");
  let [Patients, setPatients] = useState([]);
  let [selectedPatient, setselectedPatient] = useState("");
  let [selectedtime, setselectedtime] = useState(null);
  let [selecteddate, setselecteddate] = useState(null);
  let [remarque, setremarque] = useState("");

  useEffect(() => {
    ipcRenderer.send("patientsList");
    ipcRenderer.on("PatientListRequest", (e, result) => {
      setPatients(result);
    });
  }, []);

  const addRdv = (e) => {
    if(selecteddate && selectedtime){
      ipcRenderer.send("AjouterRdv", {
        selectedPatient,
        selectedtime,
        selecteddate,
        remarque,
      });
      ipcRenderer.on("rdvajoute", (e, result) => {
        props.showpopup(false);
        props.refresh();
      });
    }else{
     ipcRenderer.send("openDialog","Les Champs Date Et Heure Sont Obligatoires")
    }
  
  };

  const setInputData = (e) => {
    if (e.target.name == "date") setselecteddate(e.target.value);
    else if (e.target.name == "time") setselectedtime(e.target.value);
    else if(e.target.name=="patient")setselectedPatient(e.target.value)
    else setremarque(e.target.value);
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
      <div className="popupElement">
        <div className="popupheading flex_center">
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faPlusCircle} />{" "}
          Ajouter Un Rendez-Vous
        </div>
        <div className="popupContent">
        <TextInput
            onChange={setInputData}
            id="TextInput-22"
            label="Nom De Patient"
            name="patient"
          />
          <input
            onChange={setInputData}
            type="date"
            name="date"
            id=""
          />
          <input onChange={setInputData} type="time" name="time" id="" />

          <TextInput
            onChange={setInputData}
            id="TextInput-4"
            label="Numero De Telephone"
            name="remarque"
          />
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

export default AjouterRendezVous;
