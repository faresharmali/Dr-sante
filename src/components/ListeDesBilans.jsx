import React, { useState, useEffect } from "react";
import { Pagination, TextInput, Button} from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faList,
  faSearch,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import DeletePopup from './popups/DeletePopup.jsx'
import EditBilan from './popups/editBilan.jsx'
import AddBillan from "./popups/addBillan.jsx"

const BilansListe = () => {
  let { ipcRenderer } = require("electron");
  let [Medicaments, setMedicaments] = useState([]);
  let [BilansList, setListAffiche] = useState([]);
  let [Popup, show] = useState(false);
  let [EditPopup, showEdit] = useState(false);
  let [DeleteP, showDelete] = useState(false);
  let [SelectedMedic, setselectedMedic] = useState(null);
  let [MedicamentAafficher, setMedicamentAafficher] = useState([]);

  const filterTable = (e) => {
      setMedicaments(
        MedicamentAafficher.filter((m) =>
        m.Nom.toUpperCase().includes(e.target.value.toUpperCase())
      )
    );
  };

  useEffect(() => {
    ipcRenderer.send("getBillans");
    ipcRenderer.on("billansending", (e, result) => {
      setMedicaments(result);
      setMedicamentAafficher(result);
      setListAffiche(result.slice(0, 20));


    });
  }, []);
  const refresh=()=>{
    ipcRenderer.send("getBillans");
    ipcRenderer.on("billansending", (e, result) => {
      setMedicaments(result);
    });
  }
  const deletep=()=>{
    ipcRenderer.send("DeleteBilan",SelectedMedic);
    ipcRenderer.on("DeleteBilanRep", (e, result) => {
      refresh()
      showDelete(false)
    })
  }
  let SetActivePage = (e) => {
    setListAffiche(Medicaments.slice((e - 1) * 20, 20 * e));
  };
  return (
    <section className="section_container listeDattente">
     {EditPopup &&  <EditBilan refresh={refresh} showpopup={showEdit} Medic={SelectedMedic}/>}
     {Popup &&  <AddBillan refresh={refresh} ShowPopup={show} />}
     {DeleteP &&  <DeletePopup title={"ce medicament"} delete={deletep} refresh={refresh} showDeletepopup={showDelete} />}
      <h1 className="pageTitle"><FontAwesomeIcon  icon={faList} /> Liste des Bilans</h1>

      <div className="filtercontainer">
        <TextInput
          icon={<FontAwesomeIcon style={{color:"#048175"}} icon={faSearch} />}
          onChange={filterTable}
          id="TextInput-4"
          label="Rechercher Un Bilan"
        />
        <Button onClick={()=>show(true)}> ajouter</Button>
      </div>
      <table class="styled-table">
        <thead>
          <tr>
            <th>N° </th>
            <th>Nom </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {BilansList.map((m) => (
            <tr>
              <td>{Medicaments.indexOf(m)+1}</td>
              <td>{m.Nom}</td>
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
                      setselectedMedic(m.id)
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
      <div style={{ marginTop: "20px" }} className="flex_center">
            <Pagination
              onSelect={SetActivePage}
              activePage={1}
              items={parseInt(Medicaments.length / 20) + 1}
              leftBtn={<FontAwesomeIcon icon={faChevronLeft} />}
              maxButtons={8}
              rightBtn={<FontAwesomeIcon icon={faChevronRight} />}
            />
          </div>
    </section>
  );
};

export default BilansListe;
