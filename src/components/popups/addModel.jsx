import React, { Component, useState } from "react";
import { Pagination, TextInput, Button } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
const AddModel = (props) => {
    const { ipcRenderer } = require("electron");

  let [editorState, setMessage] = useState(EditorState.createEmpty());
  let [renderedData, setrenderedData] = useState("");
  let [title, setTitle] = useState("");
  const save = () => {
    ipcRenderer.send("saveCourrier", {
      content:JSON.stringify(renderedData),
      title,
      editor:JSON.stringify(editorState)

    });
    ipcRenderer.on("saveCourrierRep",()=>{
        props.showModelP(false)
        props.refresh()
    })
  };

  const changeState = (e) => {
      console.log(e)
    setMessage(e);
    let data = convertToRaw(e.getCurrentContent());
    setrenderedData(stateToHTML(convertFromRaw(data)));
  };
  const saveInput=(e)=>{
    setTitle(e.target.value)
  }
  return (
    <div className="popup flex_center">
      <div className="popupElement">
        <div className="popupheading flex_center">
          <FontAwesomeIcon style={{ color: "#048175" }} icon={faPlusCircle} />{" "}
          Ajouter Un Model
        </div>
        <div className="popupContent2">
          <TextInput label="Titre" placeholder="Titre" onChange={saveInput} />
          <Editor
            style={{ innerHeight: "300px" }}
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={changeState}
          />
        </div>

        <div className="btn_container2">
         
          <Button style={{marginRight:"20px"}} onClick={()=>props.showModelP(false)}>
            <FontAwesomeIcon icon={faPlusCircle} /> Annuler
          </Button>
          <Button onClick={save}>
            <FontAwesomeIcon icon={faPlusCircle} /> Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddModel;
