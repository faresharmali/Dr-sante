import React, { useState,useEffect } from "react";
import { Button } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { InputGroup, FormControl } from "react-bootstrap";

const NouvelleConsultation = (props) => {

  const { ipcRenderer } = require("electron");
  useEffect(() => {
    return function cleanup() {
      ipcRenderer.removeAllListeners();
    };
  }, []);
  let [motif, setMotif] = useState("");
  let [observation, setobservation] = useState("");
  let [montant, setpaiment] = useState("");
  let [Radiologie, setRadiologie] = useState("");
  let [Autre, setAutre] = useState("");
  const setInfos = (e) => {
    if (e.target.name == "radiologie") setRadiologie(e.target.value);
    else setAutre(e.target.value);
  };

  let examP = {
    GJ: 0,
    GP: 0,
    HB: 0,
    GB: 0,
    hba1c: 0,
    PLQ: 0,
    VGM: 0,
    TP: 0,
    TCK: 0,
    ColT: 0,
    HDL: 0,
    LDL: 0,
    TG: 0,
    ASAT: 0,
    ALAT: 0,
    GamaGT: 0,
    PAL: 0,
    BILTO: 0,
    BILD: 0,
    BILI: 0,
    Protide: 0,
    ALB: 0,
    Albuminurie: 0,
    MicroAlb: 0,
    Ure: 0,
    creat: 0,
    Nat: 0,
    Kal: 0,
  };
  let [examenParaclinique, setexamenParaclinique] = useState(examP);

  const addConsultation = () => {
    let patient = JSON.stringify(props.patient);
    let obj = {
      patient,
      motif,
      observation,
      examenParaclinique: JSON.stringify(examenParaclinique),
      Radiologie,
      Autre,
    };
    ipcRenderer.send("addConsultation", obj);
    ipcRenderer.on("consultationAdded", (e, result) => {
      props.SetPage(7);
      console.log({ montant, id: props.patient.id });
      ipcRenderer.send("updateMontant", {
        montant: parseFloat(montant),
        patient: props.patient.id,
      });
      ipcRenderer.send("openDialog", "consultation ajoutée avec succes");
    });
    ipcRenderer.send("AddPaiment", {
      Paiment: parseFloat(montant),
      patient: JSON.stringify(props.patient),
    });
  };
  const setData = (e) => {
    switch (e.target.name) {
      case "Motif":
        setMotif(e.target.value);
        break;
      case "observation":
        setobservation(e.target.value);
        break;
    }
  };
  const changeData = (e) => {
    switch (e.target.name) {
      case "HbA1c":
        setexamenParaclinique({ ...examenParaclinique, hba1c: e.target.value });
        break;
      case "Créat":
        setexamenParaclinique({ ...examenParaclinique, creat: e.target.value });
        break;
      case "VGM":
        setexamenParaclinique({ ...examenParaclinique, VGM: e.target.value });
        break;
      case "Urée":
        setexamenParaclinique({ ...examenParaclinique, Ure: e.target.value });
        break;
      case "TP":
        setexamenParaclinique({ ...examenParaclinique, TP: e.target.value });
        break;
      case "TG":
        setexamenParaclinique({ ...examenParaclinique, TG: e.target.value });
        break;
      case "TCK":
        setexamenParaclinique({ ...examenParaclinique, TCK: e.target.value });
        break;
      case "Protide":
        setexamenParaclinique({
          ...examenParaclinique,
          Protide: e.target.value,
        });
        break;
      case "PLQ":
        setexamenParaclinique({ ...examenParaclinique, PLQ: e.target.value });
        break;
      case "PAL":
        setexamenParaclinique({ ...examenParaclinique, PAL: e.target.value });
        break;
      case "Nat":
        setexamenParaclinique({ ...examenParaclinique, Nat: e.target.value });
        break;
      case "MicroAlb":
        setexamenParaclinique({
          ...examenParaclinique,
          MicroAlb: e.target.value,
        });
        break;
      case "LDL":
        setexamenParaclinique({ ...examenParaclinique, LDL: e.target.value });
        break;
      case "Kal":
        setexamenParaclinique({ ...examenParaclinique, Kal: e.target.value });
        break;
      case "HDL":
        setexamenParaclinique({ ...examenParaclinique, HDL: e.target.value });
        break;
      case "HB":
        setexamenParaclinique({ ...examenParaclinique, HB: e.target.value });
        break;
      case "Gama":
        setexamenParaclinique({
          ...examenParaclinique,
          GamaGT: e.target.value,
        });
        break;
      case "GlycémieP":
        setexamenParaclinique({ ...examenParaclinique, GP: e.target.value });
        break;
      case "Glycémie":
        setexamenParaclinique({ ...examenParaclinique, GJ: e.target.value });
        break;
      case "GB":
        setexamenParaclinique({ ...examenParaclinique, GB: e.target.value });
        break;
      case "Cholesterol":
        setexamenParaclinique({ ...examenParaclinique, ColT: e.target.value });
        break;
      case "BILTO":
        setexamenParaclinique({ ...examenParaclinique, BILTO: e.target.value });
        break;
      case "BILI":
        setexamenParaclinique({ ...examenParaclinique, BILI: e.target.value });
        break;
      case "BILD":
        setexamenParaclinique({ ...examenParaclinique, BILD: e.target.value });
        break;
      case "Albuminurie":
        setexamenParaclinique({
          ...examenParaclinique,
          Albuminurie: e.target.value,
        });
        break;
      case "ASAT":
        setexamenParaclinique({ ...examenParaclinique, ASAT: e.target.value });
        break;
      case "ALB":
        setexamenParaclinique({ ...examenParaclinique, ALB: e.target.value });
        break;
      case "ALAT":
        setexamenParaclinique({ ...examenParaclinique, ALAT: e.target.value });
        break;
    }
  };
  const setPayementMontant = (e) => {
    setpaiment(e.target.value);
  };
  return (
    <section className="section_container consultationPage">
      <h1 className="pageTitle">
        <FontAwesomeIcon style={{ color: "#009879" }} icon={faPlusCircle} />{" "}
        Nouvelle Consultation
      </h1>
      <div className="consultation_container">
        <div
          style={{ padding: "0", minHeight: "50vh !important" }}
          className="tableContainer consultationElement "
        >
          <div className="section_heading flex_center">
            Motif de Consultation
          </div>
          <div className="informationsgeneral">
            <textarea
              placeholder="Motif De Consultation"
              className="textareainput"
              name="Motif"
              onChange={setData}
              value={motif}
            ></textarea>
          </div>
        </div>

        <div
          style={{ padding: "0", minHeight: "50vh !important" }}
          className="tableContainer consultationElement"
        >
          <div className="section_heading flex_center">Observations</div>
          <div className="informationsgeneral">
            <textarea
              onChange={setData}
              placeholder="observation"
              className="textareainput"
              name="observation"
            ></textarea>
          </div>
        </div>
        <div
          style={{ padding: "0", gridColumnStart: 1, gridColumnEnd: 3 }}
          className="tableContainer consultationElement paraclinique"
        >
          <div className="section_heading flex_center">Paraclinique</div>
          <div className="informationsgeneral paracliniqueData">
            <div style={{ width: "100%" }}>
              <h1 style={{ marginBottom: "5px" }}>Biologie : </h1>

              <div
                style={{ justifyContent: "flex-start", width: "55vw" }}
                className="flex_center"
              >
                <div className="billantContainer">
                  <h2>Glycémie a jeun : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="Glycémie"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">g/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>HbA1c : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="HbA1c"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>Glycémie Post.P : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="GlycémieP"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">g/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>

              <div
                style={{ justifyContent: "flex-start" }}
                className="flex_center"
              >
                <h2 className="billanTitle">FNS : </h2>
                <div className="billantContainer">
                  <h2>HB : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="HB"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">g/dL</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>GB : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="GB"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">E/mL</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>PLQ : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="PLQ"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">E/mL</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>VGM : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="VGM"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">FLT</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>

              <div
                style={{ justifyContent: "flex-start" }}
                className="flex_center"
              >
                <div className="billantContainer">
                  <h2>TP : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="TP"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>TCK : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="TCK"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2"></InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>
              <div
                style={{ justifyContent: "flex-start" }}
                className="flex_center"
              >
                <div className="billantContainer">
                  <h2>Urée : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="Urée"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">g/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>Créat : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="Créat"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">mg/mL</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>Natrémie : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="Nat"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">
                        mmol/L
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>Kaliémie : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="Kal"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">
                        mmol/L
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>

              <div
                style={{ justifyContent: "flex-start" }}
                className="flex_center"
              >
                <h2 className="billanTitle">Bilan Lipidique : </h2>

                <div className="billantContainer">
                  <h2>Cholesterol Total : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="Cholesterol"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">g/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>HDL : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="HDL"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">g/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>LDL : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="LDL"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">g/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>TG : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="TG"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">g/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>
              <div
                style={{ justifyContent: "flex-start" }}
                className="flex_center"
              >
                <h2 className="billanTitle">Bilan Hépatique : </h2>

                <div className="billantContainer">
                  <h2>ASAT : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="ASAT"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">UI</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>ALAT : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="ALAT"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">UI</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>Gama GT : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="Gama"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">UI/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>PAL : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="PAL"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">UI/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>
              <div
                style={{ justifyContent: "flex-start" }}
                className="flex_center"
              >
                <div className="billantContainer">
                  <h2>BILTO : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="BILTO"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">mg/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>BILD : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="BILD"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">mg/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>BILI : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="BILI"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">mg/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>
              <div
                style={{ justifyContent: "flex-start" }}
                className="flex_center"
              >
                <div className="billantContainer">
                  <h2>Protide : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="Protide"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">g/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>ALB : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="ALB"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">g/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>Albuminurie : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="Albuminurie"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">mg/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="billantContainer">
                  <h2>MicroAlb : </h2>
                  <InputGroup size="sm" className="mb-1">
                    <FormControl
                      name="MicroAlb"
                      onChange={changeData}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">mg/L</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>
              <div
                style={{ justifyContent: "flex-start" }}
                className="flex_center"
              >
                <textarea
                  placeholder="Autre"
                  name="Autre"
                  id="textareaBillan"
                  onChange={setInfos}
                ></textarea>
              </div>
            </div>
            <div className="Radiologie">
              <h1>Radiologie : </h1>
              <textarea
                placeholder="RadioLogie"
                name="radiologie"
                id="textareaBillan2"
                onChange={setInfos}
              ></textarea>
              <label id="montantLabel" htmlFor="montantApayer">
                Montant:{" "}
              </label>
              <input
                onChange={setPayementMontant}
                id="montantApayer"
                type="number"
                name="montant"
                placeholder="Montant à Payer"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: "20px",
          justifyContent: "flex-end",
          paddingRight: "30px",
        }}
        className="flex_center"
      >
        <Button onClick={addConsultation}>Enregistrer</Button>
      </div>
    </section>
  );
};

export default NouvelleConsultation;
