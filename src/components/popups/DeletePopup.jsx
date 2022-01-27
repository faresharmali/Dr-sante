import React, { useEffect, useState } from "react";
import { Button } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faExclamationCircle, faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const DeletePopup = (props) => {

  return (
    <div className="popup flex_center">
      <div style={{minHeight:"20%"}} className="popupElement">
        <div style={{backgroundColor:"rgb(146, 9, 9)"}} className="popupheading flex_center">
          <FontAwesomeIcon style={{marginRight:"10px"}}  icon={faExclamationCircle} />{" "}
          Attention
        </div>
        <div className="popupContent">
          <h1 className="popupTitle">
          voulez vous vraiment supprimer {props.title} ??
          </h1>
        </div>
        <div className="btn_container2">
        <Button style={{marginRight:"10px",backgroundColor:"rgb(146, 9, 9)"}} onClick={()=>props.showDeletepopup(false)}>
            <FontAwesomeIcon icon={faTimesCircle} /> Annuler
          </Button>
          <Button onClick={props.delete}>
            <FontAwesomeIcon icon={faPlusCircle} /> Supprimer
          </Button>
          
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
