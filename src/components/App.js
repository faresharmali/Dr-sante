import React, { useEffect, useState } from 'react'
import Dashboard from './dashboard.jsx'
import Login from './Login.jsx'
import { machineId, machineIdSync } from "node-machine-id";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	const { ipcRenderer } = require("electron");
	let [cuurentPage,setPage]=useState(1)
	let [ActiveUser,setActiveUser]=useState(1)
	useEffect(()=>{
		ipcRenderer.send("checkIfLoggedIn");
		ipcRenderer.on("IfLoggedInAnswer",(e,result)=>{
			result.forEach(r=>{
				if(r.active===1 && r.pc==machineIdSync()){
					setActiveUser(r.user)
					setPage(2)
				}
			})
		})
	},[])
	return (
		<section>
			{cuurentPage==1 &&  <Login setActiveUser={setActiveUser} setPage={setPage}/>}	
			{cuurentPage==2 &&  <Dashboard setPage={setPage} ActiveUser={ActiveUser}/>}	
		</section>
		
	)
}

export default App
