import React, { Component, useState } from "react";
import Doctor from "../../assets/doctors.svg";
import login from "../../assets/login.svg";
import { TextInput, Select, Button } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { machineId, machineIdSync } from "node-machine-id";

const Login = (props) => {

  const { ipcRenderer } = require("electron");
  let [username, setUserName] = useState("");
  let [password, setpassword] = useState("");
  let handleChange = (e) => {
    switch (e.target.name) {
      case "username":
        setUserName(e.target.value);
        break;
      case "password":
        setpassword(e.target.value);
        break;
    }
  };
  const loggin = () => {
    let executed = false;
    ipcRenderer.send("Loggin");
    ipcRenderer.on("LogginAnswer", (e, result) => {
      if (!executed) {
        executed = true;
        result.forEach((u) => {
          if (u.username.toUpperCase() == username.toUpperCase()) {
            if (u.password == password) {
              console.log("found")
              ipcRenderer.send("NewSession", {user:u.username,pc:machineIdSync()});
              props.setPage(2);
              props.setActiveUser(u.username);

            } else {
              console.log("wrong Password");
            }
          } else {
            console.log("User Not Found");
          }
        });
      }
    });
  };
  return (
    <section className="section_container Login_page flex_center">
      <div className="login_container">
        <div className="login_left">
          <img className="doctorsimg" src={Doctor} alt="" />
        </div>

        <div className="login_right flex_center">
          <div className="login_form flex_center ">
            <img className="loginPic" src={login} alt="" />

            <h1>BIENVENUE</h1>
            <div className="input_container">
              <TextInput
                onChange={handleChange}
                icon={
                  <FontAwesomeIcon style={{ color: "#009879" }} icon={faUser} />
                }
                id="TextInput-6"
                label="Nom d'utilisateur"
                name="username"
                value={username}
              />{" "}
            </div>
            <div className="input_container">
              <TextInput
                onChange={handleChange}
                type="password"
                icon={
                  <FontAwesomeIcon style={{ color: "#009879" }} icon={faLock} />
                }
                id="TextInput-7"
                label="Mot De Passe"
                name="password"
                value={password}
              />{" "}
            </div>

            <div onClick={() => loggin()} className="login_btn flex_center">
              <FontAwesomeIcon
                style={{ color: "#fff", marginRight: "10px" }}
                icon={faSignInAlt}
              />
              Se Connecter
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
