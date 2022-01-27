import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faList,
  faChevronLeft,
  faUsers,
  faPlusCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Button,Pagination } from "react-materialize";

import AddPaiment from "./popups/AjouterPaiment.jsx";
import DeletePopup from "./popups/DeletePopup.jsx";
const Paiments = (props) => {
  const { ipcRenderer } = require("electron");
  let [Paiments, setPatients] = useState([]);
  let [PaimentsList, SetPaiments] = useState([]);
  let [PaymentList, setListAffiche] = useState([]);
  let [Popup, showpopup] = useState(false);
  let [DeleteP, showDelete] = useState(false);
  let [Selected, setSelectedConsultation] = useState(null);
  const filterData = (e) => {
    let date = new Date(e.target.value);
    setPatients(
      PaimentsList.filter(
        (r) =>
          r.Date.getDate() == date.getDate() &&
          r.Date.getMonth() == date.getMonth() &&
          r.Date.getFullYear() == date.getFullYear()
      )
    );
  };
  const deletePaiment = () => {
    ipcRenderer.send("deletePaiment", Selected);
    ipcRenderer.on("paimentdeleted", () => {
      refresh();
      showDelete(false);
    });
  };
  useEffect(() => {
    ipcRenderer.send("PaimentList");
    ipcRenderer.on("PaimentReq", (e, result) => {
      setPatients(result);
      SetPaiments(result);
      setListAffiche(result.slice(0, 20));

    });
    return function cleanup() {
      ipcRenderer.removeAllListeners();
    };
  }, []);
  const refresh = () => {
    ipcRenderer.send("PaimentList");
    ipcRenderer.on("PaimentReq", (e, result) => {
      setPatients(result);
      SetPaiments(result);
    });
  };
  let SetActivePage = (e) => {
    setListAffiche(Paiments.slice((e - 1) * 20, 20 * e));
  };
  return (
    <section className="section_container listeDattente">
      {Popup && <AddPaiment refresh={refresh} showpopup={showpopup} />}
      {DeleteP && (
        <DeletePopup
          delete={deletePaiment}
          title={"Ce Paiment"}
          refresh={refresh}
          showpopup={showpopup}
        />
      )}
      <h1 className="pageTitle">
        <FontAwesomeIcon icon={faUsers} /> Mes Paiments
      </h1>
      <div style={{ width: "95%" }} className="tableContainer">
        <div className="table_heading">
          <h1>
            {" "}
            <FontAwesomeIcon icon={faList} /> Liste Des Paiments
          </h1>
          <div onClick={() => showpopup(true)} className="addBtn flex_center">
            {" "}
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={faPlusCircle}
            />{" "}
            Ajouter Un Paiment
          </div>
        </div>
        <div className="filtercontainer">

        <input type="date" name="dateFilter" onChange={filterData} />
        <Button onClick={() => setPatients(PaimentsList)}>Reset</Button>
        </div>

        <table className="styled-table">
          <thead>
            <tr className="tablehead">
              <th>Patient</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {PaymentList.map((p) => (
              <tr>
                <td>
                  {JSON.parse(p.Patient).Nom} {JSON.parse(p.Patient).Prenom}
                </td>
                <td>{p.Montant} DA</td>
                <td>
                  {p.Date.getDate()}/{p.Date.getMonth() + 1}/
                  {p.Date.getFullYear()}
                </td>
                <td>
                  <div
                    style={{ backgroundColor: "#a71d1d" }}
                    onClick={() => {
                      showDelete(true);
                      setSelectedConsultation(p.id);
                    }}
                    className="table_btn"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: "20px" }} className="flex_center">
            <Pagination
              onSelect={SetActivePage}
              activePage={1}
              items={parseInt(Paiments.length / 20) + 1}
              leftBtn={<FontAwesomeIcon icon={faChevronLeft} />}
              maxButtons={8}
              rightBtn={<FontAwesomeIcon icon={faChevronRight} />}
            />
          </div>
      </div>
    </section>
  );
};

export default Paiments;
