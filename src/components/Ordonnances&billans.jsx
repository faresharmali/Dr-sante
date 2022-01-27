import React, { useEffect, useState } from "react";
import { Button } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoice,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Typeahead } from "react-bootstrap-typeahead";
import Form from "react-bootstrap/Form";
import AddMedic from "./popups/addMedic.jsx"
const OrdonnancesBillans = (props) => {
  const ref = React.createRef();

  const { ipcRenderer } = require("electron");
  let [SelectedMedics, setSelectedMedics] = useState([]);
  let [typedmedic, settypedMedic] = useState([]);
  let [SelectedDate, setSelectedDate] = useState([]);
  let [Medicaments, setMedicaments] = useState([]);
  let [qte, setqte] = useState(null);
  let [dose, setDose] = useState(null);
  let [SelectedMedicaments, setSelectedMedicaments] = useState(props.Medics);
  let [Cabinet, setCabinet] = useState([]);
  let [Age, setAge] = useState([]);
  let [AddPopup, showpopup] = useState(false);
  useEffect(() => {
    let date = new Date();
    let mydate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setSelectedDate(mydate);
   
    ipcRenderer.send("GetMedications");
    ipcRenderer.on("GetMedicationsAnswer", (e, result) => {
      setMedicaments(result);
    });
    ipcRenderer.send("Cabinet");
    ipcRenderer.on("CabinetRep", (e, result) => {
      setCabinet(result[0]);
    });
  }, []);

  useEffect(() => {
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
  const options3 = [];
  Medicaments.forEach((p) => {
    options3.push({ label: p.Nom, Forme: p.FORME });
  });

  const setDate = (e) => {
    setSelectedDate(e.target.value);
  };
  const refresh=()=>{
    ipcRenderer.send("GetMedications");

  }
  const addMedics = (e) => {
    const medicc = [...SelectedMedicaments];
    if (typedmedic != null) medicc.push({ SelectedMedics: typedmedic[0] });
    if (SelectedMedics != null) {
      SelectedMedics[0].qte = qte;
      SelectedMedics[0].Dose = dose;
    }
    medicc.push(SelectedMedics[0]);
    setSelectedMedicaments(medicc);
    setqte("");
    setDose("");
    ref.current.clear();
    setSelectedMedics("");
  };
  const setMedicData = (e) => {
    if (e.target.name == "qte") setqte(e.target.value);
    else setDose(e.target.value);
  };
  const ChangeMedic = (e) => {
    setSelectedMedics(null);
    settypedMedic([e]);
  };
  const ChangeMedic2 = (e) => {
    setSelectedMedics(e);
    settypedMedic(null);
  };
  const deleteMedic = (e) => {
    setSelectedMedicaments(SelectedMedicaments.filter((m) => m != e));
  };
  const printpage = () => {
    ipcRenderer.send("PrintBonSortie", {
      SelectedMedicaments,
      selectedPatient: props.patient,
      age:Age
    });
  };
  const save = () => {
    let called=false
    ipcRenderer.send("AddOrdonnance", {
      patient: props.patient.id,
      medics: JSON.stringify(SelectedMedicaments),
      date: SelectedDate,
    });
    ipcRenderer.on("ordonnanceSaved", () => {
      if(!called){
        called=true
        ipcRenderer.send("openDialog", "ordonnance Enregistré Avec Succes");
      }
    });
  };
  return (
    <section className="section_container ">
      {AddPopup && <AddMedic refresh={refresh} showpopup={showpopup} />}
      <div className="ordonance_section">
        <div
          style={{ paddingTop: "60px", position: "relative" }}
          className="ordonnanceForm orelement"
        >
          <div className="ordonnancefomrheading flex_center">
            <h1>
              <FontAwesomeIcon icon={faFileInvoice} /> Creer une Ordonnance
            </h1>
          </div>
          <span>date:</span>
          <input onChange={setDate} type="date" />

          <span>Medicaments:</span>
          <Form.Group>
            <Typeahead
              ref={ref}
              id="example2"
              onInputChange={ChangeMedic}
              onChange={ChangeMedic2}
              options={options3}
              placeholder="Medicaments"
              selected={SelectedMedics}
            />
          </Form.Group>

          <span>Quantité:</span>
          <input
            onChange={setMedicData}
            placeholder="Quantité"
            type="text"
            name="qte"
            value={qte}
          />
          <span>Dose:</span>
          <input
            onChange={setMedicData}
            placeholder="Dose"
            type="text"
            name="dose"
            value={dose}
          />
          <div className="ordBtnContainer AddOrBtns">
            <Button onClick={addMedics}>Ajouter</Button>
            <Button onClick={printpage}>Imprimer</Button>
            <Button onClick={save}>Sauvgarder</Button>
            <Button onClick={()=>showpopup(true)}>+ Base</Button>
            <Button onClick={()=>props.SetPage(7)}>Revenir</Button>
          </div>
        </div>
        <div className="Ordonnancepresentation orelement">
          <div className="border flex_center">
            <div className="entite flex_center">
              <h1>{Cabinet.Specialite}</h1>
              <h1>{Cabinet.Medcin}</h1>
              <h1 style={{ maxWidth: "70%", textAlign: "center" }}>
                {Cabinet.Description}
              </h1>
            </div>
            <div className="ordonnance_details ">
              <h1>
                <span>
                  {" "}
                  Nom & Prenom :{props.patient.Nom} {props.patient.Prenom}
                </span>{" "}
              </h1>
              <h1>
                <span>Age :{Age} Ans</span>
              </h1>
              <h1>
                <span>Date :</span> {SelectedDate}{" "}
              </h1>
            </div>
            <h1 className="ordonnanceHeading">Ordonnance</h1>
            <div className="ordonnanceContent">
              <ul className="medicList">
                {SelectedMedicaments.map((m) => (
                  <li className="medicItem">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "50px",
                      }}
                    >
                      <h1
                        style={{
                          textDecoration: "underline",
                          marginTop: "10px",
                        }}
                      >
                        {" "}
                        <FontAwesomeIcon
                          style={{
                            marginRight: "5px",
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteMedic(m)}
                          icon={faTimesCircle}
                        />{" "}
                        {m.label}
                      </h1>
                      <h1 style={{ marginLeft: "20px" }}> {m.qte}</h1>
                    </div>
                    <h1 style={{ marginLeft: "50px" }}> {m.Dose}</h1>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ordonnanceFooter flex_center">
              <h1>
                <span>Adresse:</span> {Cabinet.Adresse}{" "}
              </h1>
              <h1>
                <span>Telephone:</span> {Cabinet.Numero}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrdonnancesBillans;
