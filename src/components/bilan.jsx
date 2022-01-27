import React, { useEffect, useState } from "react";
import { Button ,Pagination} from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoice,
  faChevronRight,
  faChevronLeft,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Typeahead } from "react-bootstrap-typeahead";
import Form from "react-bootstrap/Form";
import AddBillan from "./popups/addBillan.jsx"
const Billan = (props) => {
  
  const print=()=>{
    ipcRenderer.send("PrintBillan", {
      SelectedMedicaments,
      selectedPatient:props.patient,
      age:Age
    });
   
  }
  const { ipcRenderer } = require("electron");
  let [SelectedMedics, setSelectedMedics] = useState([]);
  let [Medicaments, setMedicaments] = useState([]);
  let [SelectedMedicaments, setSelectedMedicaments] = useState([]);
  let [Cabinet, setCabinet] = useState([]);
  let [Todaydate, setTDate] = useState([]);
  let [popup, ShowPopup] = useState(false);
  let [Age, setAge] = useState(false);

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
    return function cleanup() {
      ipcRenderer.removeAllListeners();
    };
  }, [props.patient]);

  const ref = React.useRef();
const refresh=()=>{
  ipcRenderer.send("getBillans");
  ipcRenderer.on("billansending", (e, result) => {
    setMedicaments(result);

  });
} 

useEffect(() => {
    let date=new Date()
    let mydate=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    setTDate(mydate)

    ipcRenderer.send("getBillans");
    ipcRenderer.on("billansending", (e, result) => {
      setMedicaments(result);
    });
 ipcRenderer.send("Cabinet");
    ipcRenderer.on("CabinetRep", (e, result) => {
      setCabinet(result[0]);
    });
  }, []);
  
  const options3 = [];
  Medicaments.forEach((p) => {
    options3.push(p.Nom);
  });

  const setDate = (e) => {
    setTDate(e.target.value);
  };
  const addMedics = (e) => {
    if(SelectedMedics.length>0){
      const medicc = [...SelectedMedicaments];
      medicc.push({ SelectedMedics: SelectedMedics[0] });
    setSelectedMedicaments(medicc);
    setSelectedMedics(null)
    ref.current.clear()
    }

  };

  const ChangeMedic2 = (e) => {
    setSelectedMedics(e);
  };
  const deleteMedic = (e) => {
    setSelectedMedicaments(
      SelectedMedicaments.filter((m) => m.SelectedMedics != e)
    );
  };

  return (
    <section className="section_container ">
      {popup && <AddBillan refresh={refresh} ShowPopup={ShowPopup} />}
      <div className="ordonance_section">
        <div
          style={{ paddingTop: "60px", position: "relative" }}
          className="ordonnanceForm orelement"
        >
          <div className="ordonnancefomrheading flex_center">
            <h1>
              <FontAwesomeIcon icon={faFileInvoice} /> Creer un Bilan
            </h1>
          </div>
          <span>date:</span>
          <input onChange={setDate} type="date" />
          <span>Patient:</span>
          <span></span>


          <span>Bilan:</span>
          <Form.Group>
            <Typeahead
              id="example2"
              onChange={ChangeMedic2}
              options={options3}
              placeholder="Bilan"
              selected={SelectedMedics}
              ref={ref}
              value={SelectedMedics}
            />
           
          </Form.Group>
          <div className="ordBtnContainer flex_center">
            <Button onClick={addMedics}>Ajouter</Button>
            <Button onClick={print}>Imprimer</Button>
            <Button onClick={()=>ShowPopup(true)}>Ajouter Un Bilan à la base des données</Button>
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
                <span> Nom & Prenom :</span>{" "}
                {props.patient.Nom}{" "} {props.patient.Prenom}
              </h1>
              <h1>
                <span>Age :</span>
                {Age } Ans
              </h1>
              <h1>
                <span>Date :</span> {Todaydate}{" "}
              </h1>
            </div>
            <h1 className="ordonnanceHeading">Bilan</h1>
            <div className="ordonnanceContent">
              <ul className="medicList">
                {SelectedMedicaments.map((m) => (
                  <li>
                    <FontAwesomeIcon
                      style={{
                        marginRight: "5px",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteMedic(m.SelectedMedics)}
                      icon={faTimesCircle}
                    />
                    <span style={{ textTransform: "uppercase" }}>
                      {m.SelectedMedics}
                    </span>
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

export default Billan;
