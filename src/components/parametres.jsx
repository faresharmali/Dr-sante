import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEnvelope,
  faHospitalAlt,
  faLocationArrow,
  faPenAlt,
  faPhoneAlt,
  faUserMd,
} from "@fortawesome/free-solid-svg-icons";
import { TextInput, Select, Button } from "react-materialize";

const Parametres = () => {
  const { ipcRenderer } = require("electron");
  let [Cabinet, setCabinet] = useState({});
  useEffect(() => {
    ipcRenderer.send("Cabinet");
    ipcRenderer.on("CabinetRep", (e, result) => {
      setCabinet(result[0]);
    });
  }, []);
  let called;

  const saveData = () => {
    called = false;
    if (
      Cabinet.Medcin.trim() != "" &&
      Cabinet.Specialite.trim() != "" &&
      Cabinet.Description.trim() != "" &&
      Cabinet.Numero.trim() != "" &&
      Cabinet.Adresse.trim() != ""
    ) {
      ipcRenderer.send("UpdateCabinet", Cabinet);
      ipcRenderer.on("UpdatedCabinet", (e, result) => {
        if (!called) {
          called = true;
         ipcRenderer.send("openDialog","Informations Modifiées Avec Succés !")
        }
      });
    } else {
      ipcRenderer.send("openDialog","Tous Les Champs Sont Obligatoires  !")
    }
  };
  const changeData = (e) => {
    switch (e.target.name) {
      case "Nom":
        setCabinet({ ...Cabinet, Medcin: e.target.value });
        break;
      case "specialite":
        setCabinet({ ...Cabinet, Description: e.target.value });
        break;
      case "Description":
        setCabinet({ ...Cabinet, Specialite: e.target.value });
        break;
      case "Adresse":
        setCabinet({ ...Cabinet, Adresse: e.target.value });
        break;
      case "Numero":
        setCabinet({ ...Cabinet, Numero: e.target.value });
        break;
    }
  };
  return (
    <section className="section_container ">
      <div className="settings_container flex_center">
        <div className="setting_part">
          <React.Fragment>
            <h1
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: "30px",
                color: "#009879",
              }}
            >
              <FontAwesomeIcon
                style={{ color: "#009879" ,marginRight:"10px"}}
                icon={faHospitalAlt}
              />
              INFORMATIONS DE CABINET{" "}
            </h1>
            <div className="settings_form">
              <TextInput
                icon={
                  <FontAwesomeIcon
                    style={{ color: "#009879" }}
                    icon={faUserMd}
                  />
                }
                id="TextInput-4"
                label="Medcin"
                name="Nom"
                value={Cabinet.Medcin}
                onChange={changeData}
              />
              <TextInput
                icon={
                  <FontAwesomeIcon
                    style={{ color: "#009879" }}
                    icon={faPenAlt}
                  />
                }
                id="Description-4"
                label="Specialité"
                name="specialite"
                value={Cabinet.Description}
                onChange={changeData}
              />
              <TextInput
                icon={
                  <FontAwesomeIcon
                    style={{ color: "#009879" }}
                    icon={faHospitalAlt}
                  />
                }
                id="DescriptionCabinet-4"
                label="Description Du Cabinet"
                name="Description"
                value={Cabinet.Specialite}
                onChange={changeData}
              />
              <TextInput
                icon={
                  <FontAwesomeIcon
                    style={{ color: "#009879" }}
                    icon={faLocationArrow}
                  />
                }
                id="Adresse-4"
                label="Adresse Du Cabinet"
                name="Adresse"
                value={Cabinet.Adresse}
                onChange={changeData}
              />

              <TextInput
                icon={
                  <FontAwesomeIcon
                    style={{ color: "#009879" }}
                    icon={faPhoneAlt}
                  />
                }
                id="Numero-4"
                label="Numeros De Telephone "
                name="Numero"
                value={Cabinet.Numero}
                onChange={changeData}
              />
            </div>
            <div
              style={{ justifyContent: "flex-end" }}
              className="btn_container flex_center"
            >
              <Button onClick={saveData} style={{ width: "150px" }}>
                <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faEdit} />
                Enregistrer
              </Button>
            </div>
          </React.Fragment>
        </div>
      </div>
    </section>
  );
};

export default Parametres;
