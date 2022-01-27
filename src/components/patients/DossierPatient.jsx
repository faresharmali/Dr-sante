import React, { Component, useEffect, useState } from "react";
import patient from "../../../assets/patient.png";
import femalePatient from "../../../assets/femalePatient.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faEye,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-materialize";
import DeletePopup from "../popups/DeletePopup.jsx"
const DossierPatient = (props) => {
  let { ipcRenderer } = require("electron");
  let [consultations, setConsultations] = useState([]);
  let [Ordonnances, SetOrdonnances] = useState([]);
  let [Delete, showDelete] = useState(false);
  let [DeleteOr, showDeleteOR] = useState(false);
  let [SelectedConsultation, setSelectedConsultation] = useState(null);
  let [SelectedOrdonnance, setSelectedOrdonnance] = useState(null);
  let [Age, setAge] = useState(false);

  useEffect(() => {
    ipcRenderer.send("getPatienConsultation");
    ipcRenderer.on("PatienConsultationssent", (e, result) => {
      setConsultations(
        result.filter((x) => JSON.parse(x.patient).id == props.patient.id)
      );
    });
    ipcRenderer.send("getOrdonnances");
    ipcRenderer.on("ordonnanceSending", (e, result) => {
      SetOrdonnances(result.filter((x) => x.patient == props.patient.id));
    });
    if (props.patient.Age != undefined) {
      let date = new Date();
      let date2 = new Date(props.patient.Age);
      let yearDate=date.getFullYear()-date2.getFullYear()
      if(date.getMonth()<date2.getMonth()){
        yearDate-=1
      }
      setAge(yearDate)
    }
  }, [props.patient]);

const deleteConsultation=()=>{
  ipcRenderer.send("DeleteConsultation",SelectedConsultation);
  ipcRenderer.on("DeleteConsultationRep", (e, result) => {
    refresh()
    showDelete(false)
  })
}
const DeleteOrdonnance=()=>{
  ipcRenderer.send("DeleteOrdonnance",SelectedOrdonnance);
  ipcRenderer.on("DeleteOrdonnanceRep", (e, result) => {
    refresh()
    showDeleteOR(false)
  })
}
const refresh=()=>{
  ipcRenderer.send("getPatienConsultation");
    ipcRenderer.on("PatienConsultationssent", (e, result) => {
      setConsultations(
        result.filter((x) => JSON.parse(x.patient).id == props.patient.id)
      );
    });
    ipcRenderer.send("getOrdonnances");
    ipcRenderer.on("ordonnanceSending", (e, result) => {
      SetOrdonnances(result.filter((x) => x.patient == props.patient.id));
    });
}
  return (
    <section className="section_container">
      {Delete && <DeletePopup showDeletepopup={showDelete} delete={deleteConsultation} title={"Cette Consultation"} />}
      {DeleteOr && <DeletePopup showDeletepopup={showDeleteOR} delete={DeleteOrdonnance} title={"Cette Ordonnance"} />}
      <div style={{padding:"20px"}} className="dossierPatient">
    <div className="patientDetailsContainer">
    <div style={{minHeight:"30px !important"}} className="section_heading flex_center">
            Patient
          </div>
          <div className="patientDataContainer">
            <h2>Nom & Prenom : <span> {props.patient.Nom} {props.patient.Prenom}</span></h2>
            <h2>Age :<span> {Age} Ans</span></h2>
            <h2 style={{color:"red"}} > Pathologies : <span>{props.patient.Pathologies}</span></h2>
            <Button onClick={ ()=> props.SetPage(9)}><FontAwesomeIcon icon={faPlusCircle} /> Consultation</Button>
          </div>
    </div>

      <div>
        <table style={{ width: "100%" }} className="styled-table">
          <thead>
            <tr className="tablehead">
              <th>Consultation N°</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((c) => (
              <tr>
                <td>{consultations.indexOf(c)+1}</td>
                <td>
                  {c.date.getDate()}/{c.date.getMonth() + 1}/
                  {c.date.getFullYear()}
                </td>

                <td
                  style={{ justifyContent: "flex-start" }}
                  className="flex_center"
                >
                  <div
                    onClick={() => {
                      props.SetPage(8);
                      props.Setconsultation(c.id);
                    }}
                    className="table_btn"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </div>
                  <div
                    style={{ backgroundColor: "#a71d1d" }}
                    onClick={() => {showDelete(true);setSelectedConsultation(c.id)}}
                    className="table_btn"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <table style={{ width: "100%" }} className="styled-table">
          <thead>
            <tr className="tablehead">
              <th>Ordonnance N°</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Ordonnances.map((c) => (
              <tr>
                <td>{Ordonnances.indexOf(c)+1}</td>
                <td>
                  {c.date}
                </td>

                <td
                  style={{ justifyContent: "flex-start" }}
                  className="flex_center"
                >
                  <div
                    onClick={() => {
                      props.SetMedics(JSON.parse(c.medics));
                      props.SetPage(11);
                    }}
                    className="table_btn"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </div>
                  <div
                    style={{ backgroundColor: "#a71d1d" }}
                    onClick={() => {showDeleteOR(true);setSelectedOrdonnance(c.id)}}
                    className="table_btn"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      </div>
    </section>
  );
};

export default DossierPatient;
