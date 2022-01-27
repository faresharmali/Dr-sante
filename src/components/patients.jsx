import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faList,
  faUsers,
  faEye,
  faEdit,
  faTrashAlt,
  faSearch,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import DeletePopup from "./popups/DeletePopup.jsx";
import EditPopup from "./popups/EditPopup.jsx";
import {  Button,TextInput ,Pagination} from "react-materialize";

const Patients = (props) => {
  const { ipcRenderer } = require("electron");
  let [Patients, setPatients] = useState([]);
  let [PatientList, setListAffiche] = useState([]);
  let [SavedPatients, setSavedPatients] = useState([]);
  let [selectedPatient, setselectedPatient] = useState(null);
  let [DeleteP, showDelete] = useState(false);
  let [Editp, showEdit] = useState(false);
  useEffect(() => {
    ipcRenderer.send("patientsList1");
    ipcRenderer.on("PatientListRequest1", (e, result) => {
      setPatients(result);
      setListAffiche(result.slice(0, 20));
      setSavedPatients(result);
      props.Refresh();
    });
    return function cleanup() {
      ipcRenderer.removeAllListeners();
    };
  }, []);
  const deletePatient = () => {
    ipcRenderer.send("DeletePatient", selectedPatient);
    ipcRenderer.on("DeletePatientAnswer", () => {
      refresh();
      showDelete(false);
    });
  };
  const refresh = () => {
    ipcRenderer.send("patientsList1");

  };
  const filterTable = (e) => {
    setListAffiche(
      SavedPatients.filter((m) =>
        m.Nom.toUpperCase().includes(e.target.value.toUpperCase())
      ).slice(0, 20)
    );
  };
  let SetActivePage = (e) => {
    setListAffiche(Patients.slice((e - 1) * 20, 20 * e));
  };
  return (
    <section className="section_container listeDattente">
      {Editp && (
        <EditPopup
          refresh={refresh}
          patient={selectedPatient}
          showpopup={showEdit}
        />
      )}
      {DeleteP && (
        <DeletePopup
          delete={deletePatient}
          showDeletepopup={showDelete}
          title={"Ce Patient"}
        />
      )}
      <h1 className="pageTitle">
        <FontAwesomeIcon icon={faUsers} /> Mes Patients
      </h1>
      <div style={{width:"95%"}} className="tableContainer">
        <div className="table_heading">
          <h1>
            {" "}
            <FontAwesomeIcon icon={faList} /> Liste Des Patients
          </h1>
          <div onClick={() => props.SetPage(6)} className="addBtn flex_center">
            {" "}
            <FontAwesomeIcon icon={faUserPlus} /> Ajouter Un Patient
          </div>
        </div>
        <div className="filtercontainer">
        <TextInput
          icon={<FontAwesomeIcon style={{color:"#048175"}} icon={faSearch} />}
          onChange={filterTable}
          id="TextInput-4"
          label="Rechercher Par Nom"
        />
        <Button>Reset</Button>
        </div>
        <table className="styled-table">
          <thead>
            <tr className="tablehead">
              <th>Nom / Prenom</th>
              <th>Date De Naissance</th>
              <th>Poids</th>
              <th>Sexe</th>
              <th>Numero De Telephone</th>
              <th>Adresse</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {PatientList.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.Nom} {p.Prenom}
                </td>
                <td>{p.Age.getDate()}/{p.Age.getMonth()+1}/{p.Age.getFullYear()} </td>
                <td>{p.Poids}Kg</td>
                <td>{p.sexe}</td>
                <td>{p.numero}</td>
                <td>{p.Adresse}</td>
                <td className="flex_center">
                  {props.user == "Medcin" && (
                    <React.Fragment>
                      <div
                        onClick={() => {
                          props.SetPage(7);
                          props.SetPatient(p);
                        }}
                        className="table_btn"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </div>
                      <div
                        style={{ backgroundColor: "#009788" }}
                        onClick={() => {
                          setselectedPatient(p);
                          showEdit(true);
                        }}
                        className="table_btn"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </div>
                      <div
                        style={{ backgroundColor: "#a71d1d" }}
                        onClick={() => {
                          setselectedPatient(p.id);
                          showDelete(true);
                        }}
                        className="table_btn"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </div>
                    </React.Fragment>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: "20px" }} className="flex_center">
            <Pagination
              onSelect={SetActivePage}
              activePage={1}
              items={parseInt(Patients.length / 20) + 1}
              leftBtn={<FontAwesomeIcon icon={faChevronLeft} />}
              maxButtons={8}
              rightBtn={<FontAwesomeIcon icon={faChevronRight} />}
            />
          </div>
      </div>
    </section>
  );
};

export default Patients;
