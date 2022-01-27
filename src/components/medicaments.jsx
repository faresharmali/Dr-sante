import React, { useState, useEffect } from "react";
import { Pagination, TextInput, Button } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faList,
  faSearch,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import AddMedic from './popups/addMedic.jsx'
import DeletePopup from './popups/DeletePopup.jsx'
import EditMedic from './popups/EditMedic.jsx'
const Medicaments = () => {
  let { ipcRenderer } = require("electron");
  let [Medicaments, setMedicaments] = useState([]);
  let [Popup, show] = useState(false);
  let [EditPopup, showEdit] = useState(false);
  let [DeleteP, showDelete] = useState(false);
  let [SelectedMedic, setselectedMedic] = useState(null);
  let [MedicamentAafficher, setMedicamentAafficher] = useState([]);
  const changePage = (e) => {
    setMedicamentAafficher(Medicaments.slice((e - 1) * 20, 20 * e));
  };
  const filterTable = (e) => {
    setMedicamentAafficher(
      Medicaments.filter((m) =>
        m.Nom.toUpperCase().includes(e.target.value.toUpperCase())
      ).slice(0, 20)
    );
  };
  const filterTable2 = (e) => {
    setMedicamentAafficher(
      Medicaments.filter((m) =>
        m.DSI.toUpperCase().includes(e.target.value.toUpperCase())
      ).slice(0, 20)
    );
  };
  useEffect(() => {
    ipcRenderer.send("GetMedications");
    ipcRenderer.on("GetMedicationsAnswer", (e, result) => {
      setMedicaments(result);
      setMedicamentAafficher(result.slice(0, 20));
    });
    return function cleanup() {
      ipcRenderer.removeAllListeners();
    };
  }, []);
  const refresh=()=>{
    ipcRenderer.send("GetMedications");
    ipcRenderer.on("GetMedicationsAnswer", (e, result) => {
      setMedicaments(result);
      setMedicamentAafficher(result.slice(0, 20));
    });
  }
  const deletep=()=>{
    console.log(SelectedMedic)
    ipcRenderer.send("DeleteMedic",SelectedMedic);
    ipcRenderer.on("DeleteMedicRep", (e, result) => {
      refresh()
      showDelete(false)
    })
  }
  console.log("qsdsq",SelectedMedic)
  return (
    <section className="section_container listeDattente">
     {EditPopup &&  <EditMedic refresh={refresh} showpopup={showEdit} Medic={SelectedMedic}/>}
     {Popup &&  <AddMedic refresh={refresh} showpopup={show} />}
     {DeleteP &&  <DeletePopup title={"ce medicament"} delete={deletep} refresh={refresh} showDeletepopup={showDelete} />}
      <h1 className="pageTitle"><FontAwesomeIcon  icon={faList} /> Liste des Medicaments</h1>

      <div style={{gridTemplateColumns:"1fr 1fr .3fr"}} className="filtercontainer">
        <TextInput
          icon={<FontAwesomeIcon style={{color:"#048175"}} icon={faSearch} />}
          onChange={filterTable}
          id="TextInput-4"
          label="Rechercher Un Medicament"
        />
        <TextInput
          icon={<FontAwesomeIcon style={{color:"#048175"}} icon={faSearch} />}
          onChange={filterTable2}
          id="TextInput-6"
          label="Rechercher Un DCI"
        />
        <Button onClick={()=>show(true)}> ajouter</Button>
      </div>
      <table class="styled-table">
        <thead>
          <tr>
            <th>N° </th>
            <th>Nom </th>
            <th>Forme</th>
            <th>DCI</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {MedicamentAafficher.map((m) => (
            <tr>
              <td>{Medicaments.indexOf(m)+1}</td>
              <td>{m.Nom}</td>
              <td>{m.FORME}</td>
              <td>{m.DSI}</td>
              <td style={{display:"flex",justifyContent:"flex-start"}}>
                  <div
                  style={{backgroundColor:"#009788"}}
                    onClick={() => {
                      setselectedMedic(m)
                      showEdit(true)
                    }}
                    className="table_btn"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </div>
                  <div
                   style={{backgroundColor:"#a71d1d"}}
                    onClick={() => {
                      setselectedMedic(m.ID)
                      showDelete(true)
                    }}
                    className="table_btn"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </div></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex_center">
        <Pagination
          onSelect={changePage}
          activePage={1}
          items={parseInt(Medicaments.length / 20)+1}
          leftBtn={<FontAwesomeIcon icon={faChevronCircleLeft} />}
          maxButtons={8}
          rightBtn={<FontAwesomeIcon icon={faChevronCircleRight} />}
        />
      </div>
    </section>
  );
};

export default Medicaments;
