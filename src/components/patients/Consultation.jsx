import React, { Component, useEffect, useState } from "react";
import { Button } from "react-materialize";

const Consultation = (props) => {
  let { ipcRenderer } = require("electron");
  let [consultation, setConsultation] = useState(null);
  let [Age, SetAge] = useState(0);
  useEffect(() => {
    ipcRenderer.send("getPatienConsultation");
    ipcRenderer.on("PatienConsultationssent", (e, result) => {
      setConsultation(result.filter((x) => x.id == props.ConsultationId)[0]);
      let consult=result.filter((x) => x.id == props.ConsultationId)[0]
        let date = new Date();
        let date2 = new Date(JSON.parse(consult.patient).Age);
        let yearDate=date.getFullYear()-date2.getFullYear()
        if(date.getMonth()<date2.getMonth()){
          yearDate-=1
        }
        SetAge(yearDate)
      
    });
  }, []);
  

  return (
    <section
      style={{ flexDirection: "column" }}
      className="section_container consultationPage flex_center"
    > 
    <div className="revenirBtnContainer">

                  <Button onClick={()=>props.SetPage(7)}>Revenir</Button>
    </div>

      <div
        style={{ width: "95%", marginBottom: "20px" }}
        className="tableContainer consultation_container2"
      >
        <div style={{ height: "50px" }} className="section_heading flex_center">
          Consultation N° 23
        </div>
        <div className="elements_container">
          <div className="consultationElement">
            <h1>
              patient :{" "}
              {consultation && (
                <span>

                  {JSON.parse(consultation.patient).Nom}{" "}
                  {JSON.parse(consultation.patient).Prenom}{" "}
                  {Age} Ans
                </span>
              )}{" "}
            </h1>
          </div>
          <div className="consultationElement">
            <h1>
              Motif de Consultation :
              {consultation && <span>{consultation.Motif}</span>}
            </h1>{" "}
          </div>
          <div className="consultationElement">
            <h1>
              Observation :
              {consultation && <span>{consultation.observation}</span>}
            </h1>{" "}
          </div>

        
        </div>
      </div>
      <div
        style={{ width: "95%", marginBottom: "20px" }}
        className="tableContainer consultation_container2"
      >
        <div style={{ height: "50px" }} className="section_heading flex_center">
          Biologie
        </div>
        {consultation && (
          <div className="elements_container biologieContainer">
            <div className="biologieItemContainer">
              {JSON.parse(consultation.examenparaclinique).GJ != 0 && (
                <h2>
                  Glycémie a jeun :{" "}
                  <span>
                    {JSON.parse(consultation.examenparaclinique).GJ} g/L
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).hba1c != 0 && (
                <h2>
                  HbA1c :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).hba1c}%
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).GP != 0 && (
                <h2>
                  Glycémie Post.P :{" "}
                  <span>
                    {JSON.parse(consultation.examenparaclinique).GP}
                    g/L
                  </span>
                </h2>
              )}
            </div>
            <div className="biologieItemContainer">
              {JSON.parse(consultation.examenparaclinique).HB != 0 && (
                <h2>
                  HB :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).HB} g/dL
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).GB != 0 && (
                <h2>
                  GB :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).GB} E/mL
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).PLQ != 0 && (
                <h2>
                  PLQ : {JSON.parse(consultation.examenparaclinique).PLQ} E/mL
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).VGM != 0 && (
                <h2>
                  VGM :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).VGM} FLT
                  </span>
                </h2>
              )}
            </div>
            <div className="biologieItemContainer">
              {JSON.parse(consultation.examenparaclinique).TP != 0 && (
                <h2>
                  TP :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).TP} %
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).TCK != 0 && (
                <h2>
                  TCK :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).TCK}{" "}
                  </span>
                </h2>
              )}
            </div>
            <div className="biologieItemContainer">
              {JSON.parse(consultation.examenparaclinique).Ure != 0 && (
                <h2>
                  Urée :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).Ure} g/L
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).creat != 0 && (
                <h2>
                  Créat :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).creat} mg/mL
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).Nat != 0 && (
                <h2>
                  Natrémie :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).Nat} mmol/L
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).Kal != 0 && (
                <h2>
                  Kaliémie :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).Kal} mmol/L
                  </span>
                </h2>
              )}
            </div>
            <div className="biologieItemContainer">
              {JSON.parse(consultation.examenparaclinique).ColT != 0 && (
                <h2>
                  Cholesterol Total :{" "}
                  <span>
                    {JSON.parse(consultation.examenparaclinique).ColT} g/L
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).HDL != 0 && (
                <h2>
                  HDL :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).HDL} g/L
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).LDL != 0 && (
                <h2>
                  LDL :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).LDL} g/L
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).TG != 0 && (
                <h2>
                  TG :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).TG} g/L
                  </span>
                </h2>
              )}
            </div>
            <div className="biologieItemContainer">
              {JSON.parse(consultation.examenparaclinique).ASAT != 0 && (
                <h2>
                  ASAT :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).ASAT} UI
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).ALAT != 0 && (
                <h2>
                  ALAT :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).ALAT} UI
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).GamaGT != 0 && (
                <h2>
                  Gama GT :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).GamaGT} UI/L
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).PAL != 0 && (
                <h2>
                  PAL : {JSON.parse(consultation.examenparaclinique).PAL} UI/L
                </h2>
              )}
            </div>
            <div className="biologieItemContainer">
              {JSON.parse(consultation.examenparaclinique).BILTO != 0 && (
                <h2>
                  BILTO :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).BILTO} mg/L
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).BILD != 0 && (
                <h2>
                  BILD :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).BILD} mg/L
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).BILI != 0 && (
                <h2>
                  BILI :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).BILI} mg/L
                  </span>
                </h2>
              )}
            </div>
            <div className="biologieItemContainer">
              {JSON.parse(consultation.examenparaclinique).Protide != 0 && (
                <h2>
                  Protide :{" "}
                  <span>
                    {JSON.parse(consultation.examenparaclinique).Protide} g/L
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).ALB != 0 && (
                <h2>
                  ALB :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).ALB} g/L
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).Albuminurie != 0 && (
                <h2>
                  Albuminurie :{" "}
                  <span>
                    {JSON.parse(consultation.examenparaclinique).Albuminurie}{" "}
                    mg/L
                  </span>
                </h2>
              )}
              {JSON.parse(consultation.examenparaclinique).MicroAlb != 0 && (
                <h2>
                  MicroAlb :
                  <span>
                    {JSON.parse(consultation.examenparaclinique).MicroAlb} mg/L
                  </span>{" "}
                </h2>
              )}
              <h2>
                <span>
                  <h2>Autre : {consultation && consultation.autre}</h2>{" "}
                </span>{" "}
              </h2>
            </div>
          </div>
        )}
      </div>
      <div
        style={{ width: "95%" }}
        className="tableContainer consultation_container2"
      >
        <div style={{ height: "50px" }} className="section_heading flex_center">
          Radiologie
        </div>
        <div className="elements_container">
          <h2 style={{margin:0,fontSize:"18px",fontWeight:600}}>Radiologie  : {consultation && consultation.radiologie}</h2>
        </div>
      </div>
    </section>
  );
};

export default Consultation;
