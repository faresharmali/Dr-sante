import React, { Component } from "react";
import Logo from "../../../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faDollarSign,
  faList,
  faMedkit,
  faUsers,
  faFileInvoice,
  faCogs,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import StopWatch from "../stopwatch/StopWatch.jsx";
const SideBar = (props) => {
  const openMenu = () => {
    document.querySelector(".documents_container").classList.toggle("openIt");
  };
  const closeMenu = () => {
    document.querySelector(".documents_container").classList.remove("openIt");
  };
  return (
    <div className="sidebar">
      {props.user == "Medcin" && (
        <div
          onClick={() => {
            props.SetPage(7);
            closeMenu();
          }}
          className="sidebar_item flex_center"
        >
          <FontAwesomeIcon icon={faChartLine} /> <span>Dossier Patient</span>{" "}
        </div>
      )}

      {props.user == "Medcin" && (
        <div
          onClick={() => {
            props.SetPage(15);
            closeMenu();
          }}
          className="sidebar_item flex_center"
        >
          <FontAwesomeIcon icon={faChartLine} /> <span>Statistiques</span>{" "}
        </div>
      )}

      <div
        onClick={() => {
          props.SetPage(1);
          closeMenu();
        }}
        className="sidebar_item flex_center"
      >
        <FontAwesomeIcon icon={faList} /> <span>Liste d'attente</span>{" "}
      </div>
      <div
        onClick={() => {
          props.SetPage(2);
          closeMenu();
        }}
        className="sidebar_item flex_center"
      >
        <FontAwesomeIcon icon={faUsers} />
        <span>Mes Patients</span>
      </div>
      <div
        onClick={() => {
          props.SetPage(3);
          closeMenu();
        }}
        className="sidebar_item flex_center"
      >
        <FontAwesomeIcon icon={faClock} />
        <span>Mes Rendez-Vous</span>
      </div>
      {props.user == "Medcin" && (
        <React.Fragment>
          <div
            onClick={() => {
              props.SetPage(4);
              closeMenu();
            }}
            className="sidebar_item flex_center"
          >
            <FontAwesomeIcon icon={faDollarSign} />
            <span>Gestion De Paiments</span>
          </div>
          <div onClick={openMenu} className="sidebar_item flex_center">
            <FontAwesomeIcon icon={faFileInvoice} />
            <span>Documents</span>
          </div>
          <div className="documents_container">
            <div
              onClick={() => {
                props.SetPage(11);
                props.SetMedics([]);
                closeMenu();
              }}
              className="sidebar_item flex_center"
            >
              <FontAwesomeIcon icon={faFileInvoice} />
              <span>Ordonnances</span>
            </div>
            <div
              onClick={() => {
                props.SetPage(12);
                closeMenu();
              }}
              className="sidebar_item flex_center"
            >
              <FontAwesomeIcon icon={faFileInvoice} />
              <span> Bilans</span>
            </div>
            <div
              onClick={() => {
                props.SetPage(13);
                closeMenu();
              }}
              className="sidebar_item flex_center"
            >
              <FontAwesomeIcon icon={faFileInvoice} />
              <span>Courriers</span>
            </div>
            <div
              onClick={() => {
                props.SetPage(17);
                closeMenu();
              }}
              className="sidebar_item flex_center"
            >
              <FontAwesomeIcon icon={faFileInvoice} />
              <span>Factures</span>
            </div>
          </div>
          <div
            onClick={() => {
              props.SetPage(5);
              closeMenu();
            }}
            className="sidebar_item flex_center"
          >
            <FontAwesomeIcon icon={faMedkit} />
            <span>Liste Des Medicaments</span>
          </div>
          <div
            onClick={() => {
              props.SetPage(16);
              closeMenu();
            }}
            className="sidebar_item flex_center"
          >
            <FontAwesomeIcon icon={faMedkit} />
            <span>Liste Des Bilans</span>
          </div>
          <div
            onClick={() => {
              props.SetPage(14);
            }}
            className="sidebar_item flex_center"
          >
            <FontAwesomeIcon icon={faCogs} />
            <span>Parametres</span>
          </div>
        
        <StopWatch/>
        </React.Fragment>
      )}
    </div>
  );
};

export default SideBar;
