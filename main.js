const path = require("path");
const url = require("url");
const { app, BrowserWindow, ipcMain,Menu } = require("electron");

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    database: "moncabinet",
  },
});

let mainWindow;

let isDev = false;

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  isDev = true;
}

function createMainWindow() {
  let result = knex.select().table("medicament");
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    show: false,
    icon: `${__dirname}/assets/icon.png`,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  let indexPath;
  /*
  const template = []
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  */
  if (isDev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open devtools if dev
    if (isDev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on("closed", () => (mainWindow = null));

  //update
  ipcMain.on("UpdateBilan", (e, options) => {
    knex("bilans")
      .where("id",options.id)
      .update({
       ...options
      })
      .then(function () {
        mainWindow.webContents.send("BilanUpdated");
      });
  });

  //update
  ipcMain.on("UpdateMedic", (e, options) => {
    knex("medicament")
      .where("id",options.ID)
      .update({
       ...options
      })
      .then(function () {
        mainWindow.webContents.send("MedicUpdated");
      });
  });
  ipcMain.on("UpdateCabinet", (e, options) => {
    knex("Cabinet")
      .where("id",1)
      .update({
       ...options
      })
      .then(function () {
        mainWindow.webContents.send("UpdatedCabinet");
      });
  });
  //update
  ipcMain.on("updatePatient", (e, options) => {
    knex("patients")
      .where("id",options.id)
      .update({
       ...options
      })
      .then(function () {
        mainWindow.webContents.send("patientUpdated");
      });
  });
  //logout
  ipcMain.on("Loggout", (e, options) => {
    knex("sessions")
      .where("active", "=", 1)
      .where("pc",options)
      .update({
        active: 0,
      })
      .then(function () {
        mainWindow.webContents.send("LoggoutAnswer");
      });
  });
  //check if loggedIn
  ipcMain.on("checkIfLoggedIn", (e, options) => {
    let result = knex.select().table("sessions");
    result.then((rows) => {
      mainWindow.webContents.send("IfLoggedInAnswer", rows);
    });
  });
  //Nouveau Paiment
  ipcMain.on("saveCourrier", (e, options) => {
    knex("courriers")
      .insert([
        {
          title:options.title,
          content:options.content,
          editor:options.editor
        },
      ])

      .then(function (result) {
        mainWindow.webContents.send("saveCourrierRep");

      });
  });
  //Nouveau Paiment
  ipcMain.on("updateModel", (e, options) => {
    knex("courriers")
    .where("id",options.ModelId)
      .update(
        {
          content:options.renderedData,
        },
      )

      .then(function (result) {
        mainWindow.webContents.send("modelUpdated");
      });
  });
  //Nouveau Paiment
  ipcMain.on("addBillan", (e, options) => {
    knex("bilans")
      .insert([
        {
          Nom: options.Nom,
        
        },
      ])

      .then(function (result) {
        mainWindow.webContents.send("addBillanRep");

      });
  });
  //Nouveau Paiment
  ipcMain.on("AddOrdonnance", (e, options) => {
    knex("ordonnances")
      .insert([
        {
          patient: options.patient,
          date: options.date,
          medics:options.medics,
        },
      ])

      .then(function (result) {
        mainWindow.webContents.send("ordonnanceSaved");

      });
  });
  //Nouveau Paiment
  ipcMain.on("AddPaiment", (e, options) => {
    knex("paiments")
      .insert([
        {
          Patient: options.patient,
          Montant: options.Paiment,
        },
      ])

      .then(function (result) {
        mainWindow.webContents.send("paimentAjoute");

      });
  });

  //ajouter une session
  ipcMain.on("NewSession", (e, options) => {
    knex("sessions")
      .insert([
        {
          user: options.user,
          active: 1,
          pc:options.pc
        },
      ])

      .then(function (result) {});
  });
}
  // print page
  ipcMain.on("PrintBonSortie", (e, option) => {
    SecondWindow = new BrowserWindow({
      width: 900,
      height: 1100,
      show: false,
      webPreferences: {
        webSecurity: false,
        plugins: true,
        nodeIntegration: true,
      },
    });
    console.log(SecondWindow)
    let dbPath = __dirname + "/src/formulaires/ordonnance.html";
    SecondWindow.loadURL("file://" + dbPath);
    SecondWindow.once("ready-to-show", () => {
      SecondWindow.webContents.send("proforma", option);
      SecondWindow.webContents.send("Print", option);

    });
  });
  ipcMain.on("PrintFacture", (e, option) => {
    win = new BrowserWindow({
      width: 900,
      height: 1100,
      show: false,
      webPreferences: {
        webSecurity: false,
        plugins: true,
        nodeIntegration: true,
      },
    });
    let dbPath = __dirname + "/src/formulaires/facture.html";
    win.loadURL("file://" + dbPath);

    win.once("ready-to-show", () => {
      win.webContents.send("factureDetails", option);
    });
  });
  // print page
  ipcMain.on("PrintCourrier", (e, option) => {
    thirdWindow = new BrowserWindow({
      width: 900,
      height: 1100,
      show: false,
      webPreferences: {
        webSecurity: false,
        plugins: true,
        nodeIntegration: true,
      },
    });
    let dbPath = __dirname + "/src/formulaires/courrier.html";
    thirdWindow.loadURL("file://" + dbPath);
    thirdWindow.once("ready-to-show", () => {
      thirdWindow.webContents.send("PrintCourrier", option);

    });
  });
  // print page
  ipcMain.on("PrintBillan", (e, option) => {
    thirdWindow = new BrowserWindow({
      width: 900,
      height: 1100,
      show: false,
      webPreferences: {
        webSecurity: false,
        plugins: true,
        nodeIntegration: true,
      },
    });
    let dbPath = __dirname + "/src/formulaires/billan.html";
    thirdWindow.loadURL("file://" + dbPath);
    thirdWindow.once("ready-to-show", () => {

      thirdWindow.webContents.send("printBillan", option);

    });
  });
//ajouter une Medicament
ipcMain.on("AjouterMedicament", (e, options) => {
  knex("medicament")
    .insert([
      {
       ...options
      },
    ])

    .then(function (result) {});
  mainWindow.webContents.send("AjouterMedicamentRep");
});
//ajouter une consultation
ipcMain.on("addConsultation", (e, options) => {
  knex("consultations")
    .insert([
      {
        patient: options.patient,
        Motif: options.motif,
        observation:options.observation,
        examenParaclinique: options.examenParaclinique,
        paiment:200,
        autre:options.Autre,
        radiologie:options.Radiologie,
        date:new Date()
      },
    ])

    .then(function (result) {});
  mainWindow.webContents.send("consultationAdded");
});
//ajouter un rdv
ipcMain.on("AjouterRdv", (e, options) => {
  knex("rendezvous")
    .insert([
      {
      patient:options.selectedPatient,
      date:options.selecteddate,
      heure:options.selectedtime,
      remarque:options.remarque
      },
    ])

    .then(function (result) {});
  mainWindow.webContents.send("rdvajoute");
});
// liste attente
ipcMain.on("AjouterAttente", (e, options) => {
  knex("listeAttente")
    .insert([
      {
      Patient:JSON.stringify(options),
        patientID:options.id,
        montant:"en attente",
        PatienAge:options.Age
        
      },
    ])

    .then(function (result) {});
  mainWindow.webContents.send("attenteAjoute");
});
ipcMain.on("updateMontant", (e, options) => {
  console.log(options)
  knex("listeAttente")
  .where("patientID",options.patient)
    .update( {montant:parseFloat(options.montant)})

    .then(function (result) {});
  mainWindow.webContents.send("updateMontantRep");
});
//ajouter un patient
ipcMain.on("AjouterPatient", (e, options) => {
  let result = knex('patients');
  result.then((rows)=>{
    knex("patients")
    .insert([
      {
        Nom: options.nom,
        Prenom: options.prenom,
        Age: options.age,
        Adresse: options.adresse,
        Numero: options.Numero,
        sexe: options.Sexe,
        Poids: options.poids,
        TA: options.TA,
       Pathologies:options.Pathologies,
       dossier:(rows[(rows.length-1)].id+1)+"/2021"
      },
    ])

    .then(function (result) {});
  mainWindow.webContents.send("patientAjoute");
  })

});

ipcMain.on("openDialog", (e,option) => {
  const { dialog } = require('electron')
  let options  = {
    message: option
   }
  dialog.showMessageBox(options)
})
//delete Consultation from db
ipcMain.on("deletePaiment", (e,option) => {
  knex('paiments')
  .where('id', option)
  .del()
  .then((rows) => {
    mainWindow.webContents.send("paimentdeleted");
  });
});
//delete Consultation from db
ipcMain.on("DeleteBilan", (e,option) => {
  knex('bilans')
  .where('id', option)
  .del()
  .then((rows) => {
    mainWindow.webContents.send("DeleteBilanRep");
  });
});
//delete Consultation from db
ipcMain.on("DeleteMedic", (e,option) => {
  knex('medicament')
  .where('ID', option)
  .del()
  .then((rows) => {
    mainWindow.webContents.send("DeleteMedicRep");
  });
});
//delete Consultation from db
ipcMain.on("DeleteOrdonnance", (e,option) => {
  knex('ordonnances')
  .where('id', option)
  .del()
  .then((rows) => {
    mainWindow.webContents.send("DeleteOrdonnanceRep");
  });
});
//delete Consultation from db
ipcMain.on("DeleteConsultation", (e,option) => {
  knex('consultations')
  .where('id', option)
  .del()
  .then((rows) => {
    mainWindow.webContents.send("DeleteConsultationRep");
  });
});
//delete Patient from db
ipcMain.on("DeletePatient", (e,option) => {
  knex('patients')
  .where('id', option)
  .del()
  .then((rows) => {
    mainWindow.webContents.send("DeletePatientAnswer");
  });
});
//delete Patient from waitlist
ipcMain.on("DeletePatientAttente", (e,option) => {
  knex('listeAttente')
  .where('id', option)
  .del()
  .then((rows) => {
    mainWindow.webContents.send("DeletePatientAttenteAnswer");
  });
});
// deleteRdv
ipcMain.on("deleteRdv", (e,option) => {
  knex('rendezvous')
  .where('id', option)
  .del()
  .then((rows) => {
    mainWindow.webContents.send("deleteRdvAnwer", rows);
  });
});
// billans
ipcMain.on("getModels", (e,option) => {
  let result = knex.select().table("courriers");
  result.then((rows) => {
    mainWindow.webContents.send("getModelsRep", rows);
  });
});
// billans
ipcMain.on("getOrdonnances", (e,option) => {
  let result = knex.select().table("ordonnances").orderBy('id','desc');
  result.then((rows) => {
    mainWindow.webContents.send("ordonnanceSending", rows);
  });
});
// billans
ipcMain.on("getBillans", (e,option) => {
  let result = knex.select().table("bilans");
  result.then((rows) => {
    mainWindow.webContents.send("billansending", rows);
  });
});
// lisetAttente
ipcMain.on("getListeAttente", (e,option) => {
  let result = knex.select().table("listeAttente");
  result.then((rows) => {
    mainWindow.webContents.send("listeAttenteSent", rows);
  });
});
// Paiments
ipcMain.on("Cabinet", (e,option) => {
  let result = knex.select().table("cabinet");
  result.then((rows) => {
    mainWindow.webContents.send("CabinetRep", rows);
  });
});
ipcMain.on("PaimentList", (e,option) => {
  let result = knex.select().table("paiments").orderBy('id','desc');
  result.then((rows) => {
    mainWindow.webContents.send("PaimentReq", rows);
  });
});
// rdvList
ipcMain.on("GetRdv", (e,option) => {
  let result = knex.select().table("rendezvous").orderBy('id','desc');
  result.then((rows) => {
    mainWindow.webContents.send("RdvSending", rows);
  });
});

// medicationList
ipcMain.on("GetMedications", (e,option) => {
  let result = knex.select().table("medicament");
  result.then((rows) => {
    mainWindow.webContents.send("GetMedicationsAnswer", rows);
  });
});
// patientList
ipcMain.on("getPatienConsultation", (e,option) => {
  let result = knex.select().table("consultations").orderBy('id','desc');
  result.then((rows) => {
    mainWindow.webContents.send("PatienConsultationssent", rows);
  });
});
// patientList
ipcMain.on("getConsultation", (e,option) => {
  let result = knex.select().table("patients").where("id",option);
  result.then((rows) => {
    mainWindow.webContents.send("consultationssent", rows);
  });
});
// patientList
ipcMain.on("patientsList", () => {
  let result = knex.select().table("patients").orderBy('id','desc');
  result.then((rows) => {
    mainWindow.webContents.send("PatientListRequest", rows);
  });
});
// patientList
ipcMain.on("patientsList1", () => {
  let result = knex.select().table("patients").orderBy('id','desc');
  result.then((rows) => {
    mainWindow.webContents.send("PatientListRequest1", rows);
  });
});
// LoginRequest

ipcMain.on("Loggin", () => {
  let result = knex.select().table("users");
  result.then((rows) => {
    console.log("qsdqsd",rows)
    mainWindow.webContents.send("LogginAnswer", rows);
  });
});

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Stop error
app.allowRendererProcessReuse = true;
