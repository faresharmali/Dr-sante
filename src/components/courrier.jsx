import React, { useEffect, useState } from "react";
import { Button, Select } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoice,
  faPrint,
  
} from "@fortawesome/free-solid-svg-icons";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertFromRaw, convertToRaw, create } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import AddModel from "../components/popups/addModel.jsx";
import { stateFromHTML } from "draft-js-import-html";

const Courrier = (props) => {
  const { ipcRenderer } = require("electron");
  let [Patients, setPatients] = useState([]);
  let [SelectedDate, setSelectedDate] = useState([]);
  let [editorState, setMessage] = useState(EditorState.createEmpty());
  let [Cabinet, setCabinet] = useState([]);
  let [renderedData, setrenderedData] = useState("");
  let [addModelP, showModelP] = useState(false);
  let [models, setModels] = useState([]);
  let [Age, setAge] = useState([]);
  let [ModelId, setSelectedModel] = useState([]);
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
  const refresh = () => {
    ipcRenderer.send("getModels");

  };
  const changeState = (e) => {
    setMessage(e);
    let data = convertToRaw(e.getCurrentContent());
    setrenderedData(stateToHTML(convertFromRaw(data)));
    document.querySelector(".courriermsgcontainer").innerHTML = stateToHTML(
      convertFromRaw(data)
    );
  };
  useEffect(() => {
    let date = new Date();
    let mydate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setSelectedDate(mydate);
    ipcRenderer.send("getModels");
    ipcRenderer.on("getModelsRep", (e, result) => {
      setModels(result);
    });
    ipcRenderer.send("Cabinet");
    ipcRenderer.on("CabinetRep", (e, result) => {
      setCabinet(result[0]);
    });
  }, []);
  const options = [];
  Patients.forEach((p) => {
    options.push({ label: p.Nom + " " + p.Prenom, Age: p.Age });
  });

  const setDate = (e) => {
    setSelectedDate(e.target.value);
  };

  const printpage = () => {
    ipcRenderer.send("PrintCourrier", {
      renderedData,
      selectedPatient: props.patient,
      age:Age
    });
  };
  const setModelCh = (e) => {
    let model = models.filter((m) => m.id == e.target.value)[0];
    setSelectedModel(model.id)
    setMessage(
      EditorState.createWithContent(stateFromHTML(JSON.parse(model.content)))
    );
    setrenderedData(JSON.parse(model.content));
    document.querySelector(".courriermsgcontainer").innerHTML = JSON.parse(
      model.content
    );
  };
  const saveModel=()=>{
    let called=false
    ipcRenderer.send("updateModel",{ModelId,renderedData:JSON.stringify(renderedData)})
    ipcRenderer.on("modelUpdated",()=>{
      if(!called){
        called=true
        refresh()
        ipcRenderer.send("openDialog","Model Modifié Avec Succes !")
      }
    })
  }
  return (
    <section className="section_container ">
      {addModelP && <AddModel refresh={refresh} showModelP={showModelP} />}
      <div className="ordonance_section">
        <div
          style={{ paddingTop: "60px", position: "relative" }}
          className="ordonnanceForm orelement"
        >
          <div className="ordonnancefomrheading flex_center">
            <h1>
              <FontAwesomeIcon icon={faFileInvoice} /> Creer un courrier
            </h1>
          </div>
          <span>date:</span>
          <input onChange={setDate} type="date" />
          <span>Model:</span>
          <span></span>
          <Select onChange={setModelCh} name="model">
            <option disabled selected value="">
              Courrier
            </option>
            {models.map((m) => (
              <option value={m.id}>{m.title}</option>
            ))}
          </Select>

          <span>Message:</span>
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={changeState}
          />

          <div className="ordBtnContainer flex_center">
            <Button onClick={printpage}>
              <FontAwesomeIcon icon={faPrint} /> Imprimer
            </Button>
            <Button onClick={() => showModelP(true)}>
              <FontAwesomeIcon icon={faPrint} /> Ajouter Un Model
            </Button>
            <Button onClick={saveModel}>
              <FontAwesomeIcon icon={faPrint} /> Sauvgarder Le Model
            </Button>
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
                <span> Nom & Prenom :</span> {props.patient.Nom}{" "}
                {props.patient.Prenom}
              </h1>
              <h1>
                <span>Age :</span>
                {Age} Ans
              </h1>
              <h1>
                <span>Date :</span> {SelectedDate}{" "}
              </h1>
            </div>
            <h1 className="ordonnanceHeading">Ordonnance</h1>
            <div className="ordonnanceContent">
              <div className="courriermsgcontainer"></div>
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

export default Courrier;
