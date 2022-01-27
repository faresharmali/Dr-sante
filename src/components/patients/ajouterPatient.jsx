import React, { Component, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faPhoneAlt,
  faUser,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { TextInput, Select, Button } from "react-materialize";
import { propTypes } from "react-bootstrap/esm/Image";

const AjouterPatient = (props) => {
  const { ipcRenderer } = require("electron");
  let [nom, setNom] = useState("");
  let [prenom, setprenom] = useState("");
  let [age, setAge] = useState("");
  let [adresse, setadresse] = useState("");
  let [poids, setpoids] = useState("");
  let [Sexe, setsexe] = useState("");
  let [TA, setTA] = useState("");
  let [Numero, setNum] = useState("");
  let [Pathologies, setPathologies] = useState("");
  let handleChange = (e) => {
    switch (e.target.name) {
      case "Nom":
        setNom(e.target.value);
        break;
      case "Prenom":
        setprenom(e.target.value);
        break;
      case "Age":
        setAge(e.target.value);
        break;
      case "Adresse":
        setadresse(e.target.value);
        break;
      case "Numero":
        setNum(e.target.value);
        break;
      case "TA":
        setTA(e.target.value);
        break;
      case "sexe":
        setsexe(e.target.value);
        break;
      case "Poids":
        setpoids(e.target.value);
        break;
      case "Pathologies":
        setPathologies(e.target.value);
        break;
    }
  };
  let func = () => {
    let called=false
    let obj = { nom, prenom, age, adresse, poids, Sexe, TA, Numero ,Pathologies};
    if (
      nom.trim() != "" &&
      prenom.trim() != "" &&
      age.trim() != "" 
     
    ) {
      ipcRenderer.send("AjouterPatient", obj);
      ipcRenderer.on("patientAjoute", () => {
        props.SetPage(2)
        if(!called){
          called=true
          ipcRenderer.send("openDialog", "Patient Ajouté Avec Succes !");
        }

       
      });
    } else {
      ipcRenderer.send("openDialog", "Tous Les Champs Sont Obligatoires !");

    }
  };
  return (
    <section className="section_container listeDattente">
      <h1 className="pageTitle">
        {" "}
        <FontAwesomeIcon icon={faUserPlus} /> Ajouter Un Patient
      </h1>
      <div style={{ padding: "0",width:"95%" }} className="tableContainer">
        <div style={{ height: "40px" }} className="section_heading flex_center">
          informations du patient
        </div>
        <div className="patient_form">
          <TextInput
            onChange={handleChange}
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faUser} />
            }
            id="TextInput-4"
            label="Nom"
            name="Nom"
            value={nom}
          />
          <TextInput
            onChange={handleChange}
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faUser} />
            }
            id="TextInput-5"
            label="Prenom"
            name="Prenom"
            value={prenom}
          />
          <TextInput
            onChange={handleChange}
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faUser} />
            }
            id="TextInput-6"
            label="Date De Naissance"
            name="Age"
            type="date"
          />
          <TextInput
            onChange={handleChange}
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faPhoneAlt} />
            }
            id="TextInput-7"
            label="Numero"
            name="Numero"
            value={Numero}
          />
          <TextInput
            onChange={handleChange}
            icon={
              <FontAwesomeIcon
                style={{ color: "#009879" }}
                icon={faLocationArrow}
              />
            }
            id="TextInput-8"
            label="Adresse"
            name="Adresse"
            value={adresse}
          />
          <TextInput
            onChange={handleChange}
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faUser} />
            }
            id="TextInput-9"
            label="Poids"
            name="Poids"
            value={poids}
          />
          <TextInput
            onChange={handleChange}
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faUser} />
            }
            id="TextInput-10"
            label="TA"
            name="TA"
            value={TA}
          />
          <TextInput
            onChange={handleChange}
            icon={
              <FontAwesomeIcon style={{ color: "#009879" }} icon={faUser} />
            }
            id="TextInput-ss"
            label="Pathologies"
            name="Pathologies"
            value={Pathologies }
          />
          <Select
            onChange={handleChange}
            id="Select-9"
            multiple={false}
            value={Sexe}
            name="sexe"
          >
            <option disabled value="">
              Sexe
            </option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </Select>
        </div>
        <div
          style={{ justifyContent: "flex-end", paddingRight: "20px" }}
          className="flex_center"
        >
          {" "}
          <Button
            onClick={func}
            style={{ width: "150px", marginBottom: "20px" }}
          >
            Ajouter
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AjouterPatient;
