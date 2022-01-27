import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faList,
  faUsers,
  faEye,
  faEdit,
  faTrashAlt,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-materialize";
import AjouterPatient from "./popups/AjouterPatient.jsx";
import DeletePopup from "./popups/DeletePopup.jsx";
const ListeDattente = (props) => {
  const { ipcRenderer } = require("electron");
  const [addPatient, showpopup] = useState(false);
  const [DeletePatient, showDpopup] = useState(false);
  const [patients, setPatients] = useState([]);
  const [SelectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    ipcRenderer.send("getListeAttente");
    ipcRenderer.on("listeAttenteSent", (e, result) => {
      setPatients(result);
    });
    return function cleanup() {
      ipcRenderer.removeAllListeners();
    };
  }, []);
  const refresh = () => {
    ipcRenderer.send("getListeAttente");
    ipcRenderer.on("listeAttenteSent", (e, result) => {
      setPatients(result);
    });
  };
  const deletePatient = () => {
    ipcRenderer.send("DeletePatientAttente", SelectedPatient);
    ipcRenderer.on("DeletePatientAttenteAnswer", () => {
      refresh();
      showDpopup(false);
    });
  };
  return (
    <section className="section_container listeDattente">
      {DeletePatient && (
        <DeletePopup
          delete={deletePatient}
          showDeletepopup={showDpopup}
          title={"Ce Patient de la liste d'attente"}
        />
      )}
      {addPatient && <AjouterPatient refresh={refresh} showpopup={showpopup} />}
      <h1 className="pageTitle">
        <FontAwesomeIcon icon={faList} /> Liste d'attente
      </h1>
      <div style={{width:"95%"}} className="tableContainer">
        <div
          className="flex_center"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <h1>
            Nombre De Patients Dans la salle d'attente : {patients.length}
          </h1>
          <div>

          <Button  style={{marginRight:"10px",backgroundColor:"#7E4ADD"}} onClick={() => refresh()}>  <FontAwesomeIcon icon={faSync} /></Button>
          <Button style={{marginRight:"10px",backgroundColor:"#DD644A"}} onClick={() => showpopup(true)}> Ajouter</Button>
          </div>
        </div>

        <table class="styled-table">
          <thead>
            <tr className="tablehead">
              <th>N°</th>
              <th>Nom / Prenom</th>
              <th>Montant à Payer</th>
              <th style={{ width: "26%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr>
                <td>{patients.indexOf(p) + 1}</td>
                <td>
                  {JSON.parse(p.Patient).Nom} {JSON.parse(p.Patient).Prenom}
                </td>
                <td>{p.montant} {p.montant!="en attente" && "DA"} </td>
                <td
                  style={{ justifyContent: "flex-start", width: "26%" }}
                  className="flex_center"
                >
                  {" "}
                  {props.user == "Medcin" && (
                    <div
                      onClick={() => {
                        props.SetPage(7);
                        props.SetPatient({...JSON.parse(p.Patient),Age:p.PatienAge});
                      }}
                      className="table_btn"
                      style={{ width: "120px", padding: "10px" }}
                    >
                      <FontAwesomeIcon
                        style={{ marginRight: "5px" }}
                        icon={faEye}
                      />
                      Consulter
                    </div>
                  )}
                  <div
                    style={{
                      backgroundColor: "#a71d1d",
                      width: "120px",
                      padding: "10px",
                    }}
                    onClick={() => {
                      showDpopup(true);
                      setSelectedPatient(p.id);
                    }}
                    className="table_btn"
                  >
                    <FontAwesomeIcon
                      style={{ marginRight: "5px" }}
                      icon={faTrashAlt}
                    />
                    Supprimer
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ListeDattente;
