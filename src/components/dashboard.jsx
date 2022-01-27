import React, { useEffect, useState } from "react";
import SideBar from "./navigation/sideBar.jsx";
import ListeDattente from "./listeD'attente.jsx";
import Patients from "./patients.jsx";
import RendezVous from "./rendezvous.jsx";
import Paiments from "./paiments.jsx";
import Medicaments from "./medicaments.jsx";
import AjouterPatient from "./patients/ajouterPatient.jsx";
import ModifierPatient from "./patients/modifierPatient.jsx";
import DossierPatient from "./patients/DossierPatient.jsx";
import Consultation from "./patients/Consultation.jsx";
import NouvelleConsultation from "./patients/nouvelleConsultation.jsx";
import OrdonnancesBillans from "./Ordonnances&billans.jsx";
import Statistiques from "./statistiques.jsx";
import Billan from "./bilan.jsx";
import Factures from "./factures.jsx";
import Courrier from "./courrier.jsx";
import Parametres from "./parametres.jsx";
import Logo from "../../assets/Logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Button } from "react-materialize";
import { machineIdSync } from "node-machine-id";
import Select from "react-select";
import BilansListe from "./ListeDesBilans.jsx";
const Dashboard = (props) => {
  let [currentPage, SetPage] = useState(15);
  let [patient, SetPatient] = useState({});
  let [ConsultationId, Setconsultation] = useState(0);
  let [patientList, setPatients] = useState([]);
  let [PatientChoisi, setPatientChoisiId] = useState({});
  let [Medics, SetMedics] = useState([]);
  const { ipcRenderer } = require("electron");
  useEffect(() => {
    ipcRenderer.send("patientsList");
    ipcRenderer.on("PatientListRequest", (e, result) => {
      setPatients(result);
    });
    return function cleanup() {
      ipcRenderer.removeAllListeners();
    };
  }, []);

  const Refresh = () => {
    ipcRenderer.send("patientsList");
    ipcRenderer.on("PatientListRequest", (e, result) => {
      setPatients(result);
      setPatientChoisiId({});
    });
  };
  const loggout = () => {
    ipcRenderer.send("Loggout", machineIdSync());
    ipcRenderer.on("LoggoutAnswer", (e) => {
      props.setPage(1);
    });
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "40px",
      height: "45px",
      marginTop: "5px",
      boxShadow: state.isFocused ? null : null,
      marginRight: "20px",
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      marginTop: "5px",
      height: "40px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
      width: "200px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "40px",
    }),
  };
  const data = [];
  patientList.forEach((c) =>
    data.push({ value: c, label: c.Nom + " " + c.Prenom })
  );
  const data2 = [];
  patientList.forEach((c) => data2.push({ value: c, label: c.dossier }));
  let setPatientChoisi = (e) => {
    setPatientChoisiId(e.value);
  };
  return (
    <section className="section_container dashboard_container ">
      <div className="navbar">
        <div
          className="flex_center patientHeadContainer"
          style={{ height: "100%" }}
        >
          <img className="sidebarLogo" src={Logo} alt="" />
          {props.ActiveUser == "Medcin" && (
            <React.Fragment>
              <Select
                value={PatientChoisi}
                styles={customStyles}
                placeholder="Patients Par Nom"
                options={data}
                onChange={setPatientChoisi}
              />
              <Select
                value={PatientChoisi}
                styles={customStyles}
                placeholder="Patients Par Dossier"
                options={data2}
                onChange={setPatientChoisi}
              />
              <h1>
                Nom : <span>{PatientChoisi.Nom}</span>{" "}
              </h1>
              <h1>
                Prenom : <span>{PatientChoisi.Prenom}</span>{" "}
              </h1>
              {PatientChoisi.Age != undefined && (
                <h1>
                  Date De Naissance :{" "}
                  <span>
                    {PatientChoisi.Age.getDate()}/
                    {PatientChoisi.Age.getMonth() + 1}/
                    {PatientChoisi.Age.getFullYear()}
                  </span>{" "}
                </h1>
              )}
              <h1>
                Dossier : <span>{PatientChoisi.dossier}</span>{" "}
              </h1>
            </React.Fragment>
          )}

          <div className="userInfo flex_center">
            <div className="ProfilePic"></div>

            <Dropdown
              id="Dropdown_6"
              options={{
                width: 120,
                alignment: "left",
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                container: null,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 250,
              }}
              trigger={
                <h1 style={{ fontSize: "17px", margin: "0" }}>
                  {props.ActiveUser}{" "}
                  <FontAwesomeIcon
                    node="button"
                    style={{ marginLeft: "5px" }}
                    icon={faChevronCircleDown}
                  />
                </h1>
              }
            >
              <div onClick={loggout} className="dropDownElement flex_center">
                Deconnecter
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
      <section className="dashboardPage">
        <SideBar
          user={props.ActiveUser}
          SetPage={SetPage}
          SetMedics={SetMedics}
        />
        <div className="main">
          {currentPage == 1 && (
            <ListeDattente
              user={props.ActiveUser}
              SetPage={SetPage}
              SetPatient={setPatientChoisiId}
            />
          )}
          {currentPage == 2 && (
            <Patients
              user={props.ActiveUser}
              SetPage={SetPage}
              SetPatient={setPatientChoisiId}
              Refresh={Refresh}
            />
          )}
          {currentPage == 3 && <RendezVous />}
          {currentPage == 4 && <Paiments />}
          {currentPage == 5 && <Medicaments />}
          {currentPage == 6 && <AjouterPatient SetPage={SetPage} />}
          {currentPage == 7 && (
            <DossierPatient
              SetMedics={SetMedics}
              SetPage={SetPage}
              patient={PatientChoisi}
              SetPatient={SetPatient}
              Setconsultation={Setconsultation}
            />
          )}
          {currentPage == 8 && (
            <Consultation SetPage={SetPage} ConsultationId={ConsultationId} />
          )}
          {currentPage == 9 && (
            <NouvelleConsultation SetPage={SetPage} patient={PatientChoisi} />
          )}
          {currentPage == 10 && <ModifierPatient />}
          {currentPage == 11 && (
            <OrdonnancesBillans
              Medics={Medics}
              SetPage={SetPage}
              patient={PatientChoisi}
            />
          )}
          {currentPage == 12 && <Billan patient={PatientChoisi} />}
          {currentPage == 13 && <Courrier patient={PatientChoisi} />}
          {currentPage == 14 && <Parametres />}
          {currentPage == 15 && <Statistiques />}
          {currentPage == 16 && <BilansListe />}
          {currentPage == 17 && (
            <Factures
              Medics={Medics}
              SetPage={SetPage}
              patient={PatientChoisi}
            />
          )}
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
