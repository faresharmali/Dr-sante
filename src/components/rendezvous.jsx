import React, { Component, useEffect, useState } from "react";
import AjouterRendezVous from "./popups/ajouterRendezVous.jsx";
import DeletePopup from "./popups/DeletePopup.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faList,
  faUsers,
  faPlusCircle,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import {  Button ,Pagination} from "react-materialize";
const RendezVous = (props) => {
  const { ipcRenderer } = require("electron");
  let [AddPopup, showpopup] = useState(false);
  let [Delete, showDeletepopup] = useState(false);
  let [rdv, setRdv] = useState([]);
  let [rdvList, setListAffiche] = useState([]);
  let [selectedRdv, setSelectedRdv] = useState(0);
  let [SavedRdv, setRdvSaved] = useState(0);
  useEffect(() => {
    ipcRenderer.send("GetRdv");
    ipcRenderer.on("RdvSending", (e, result) => {
      setRdv(result);
      setListAffiche(result.slice(0, 20));      setRdvSaved(result);
    });
    return function cleanup() {
      ipcRenderer.removeAllListeners();
    };
  }, []);
  const refresh = () => {
    ipcRenderer.send("GetRdv");
    ipcRenderer.on("RdvSending", (e, result) => {
      setRdv(result);
    });
  };
  const deleteRdv = () => {
    ipcRenderer.send("deleteRdv", selectedRdv);
    ipcRenderer.on("deleteRdvAnwer", (e, result) => {
      showDeletepopup(false);
      refresh();
    });
  };
  const filterData=(e)=>{
    let date=new Date(e.target.value)
    setListAffiche(SavedRdv.filter(r=>r.date.getDate()==date.getDate() && r.date.getMonth()==date.getMonth() && r.date.getFullYear()==date.getFullYear()))

  }
  let SetActivePage = (e) => {
    setListAffiche(rdv.slice((e - 1) * 20, 20 * e));
  };
  return (
    <section className="section_container listeDattente">
      {AddPopup && (
        <AjouterRendezVous refresh={refresh} showpopup={showpopup} />
      )}
      {Delete && (
        <DeletePopup
          delete={deleteRdv}
          showDeletepopup={showDeletepopup}
          title={"ce Rendez-vous"}
        />
      )}
      <h1 className="pageTitle">
        <FontAwesomeIcon icon={faUsers} /> Mes Rendez-Vous
      </h1>
      <div style={{width:"95%"}} className="tableContainer">
        <div className="table_heading">
          <h1>
            {" "}
            <FontAwesomeIcon icon={faList} /> Liste Des Rendez-Vous
          </h1>
          <div onClick={() => showpopup(true)} className="addBtn flex_center">
            {" "}
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={faPlusCircle}
            />{" "}
            Rendez-Vous
          </div>
        </div>
        <div className="filtercontainer">
          <input type="date" name="dateFilter" onChange={filterData}/>
          <Button onClick={()=>setListAffiche(SavedRdv)}>Reset</Button>
        </div>
        <table className="styled-table">
          <thead>
            <tr className="tablehead">
              <th>Patient</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Numero</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rdvList.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.patient}
                </td>
            
                <td>
                  {" "}
                  {p.date.getDate()}/{p.date.getMonth() + 1}/
                  {p.date.getFullYear()}
                </td>
                <td>{p.heure.split("").slice(0, 5).join("")}</td>
                <td>{p.remarque}</td>
                <td
                  style={{ justifyContent: "flex-start" }}
                  className="flex_center"
                >
        
                  <div
                    onClick={() => {
                      showDeletepopup(true);
                      setSelectedRdv(p.id);
                    }}
                    style={{ backgroundColor: "#a71d1d" }}
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
              items={parseInt(rdv.length / 20) + 1}
              leftBtn={<FontAwesomeIcon icon={faChevronLeft} />}
              maxButtons={8}
              rightBtn={<FontAwesomeIcon icon={faChevronRight} />}
            />
      </div>
      </div>
    </section>
  );
};

export default RendezVous;
