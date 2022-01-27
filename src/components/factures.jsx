import React, { useEffect, useState } from "react";
import { Button } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const Factures = (props) => {
  const { ipcRenderer } = require("electron");
  let [SelectedDate, setSelectedDate] = useState([]);
  let [qte, setqte] = useState("");
  let [prix, setprix] = useState("");
  let [TVA, setTva] = useState("");
  let [PrixTotal, setPrixTotal] = useState(0);
  let [description, setDescription] = useState("");
  let [Cabinet, setCabinet] = useState([]);
  let [elements, setelements] = useState([]);
  let [Age, setAge] = useState([]);
  useEffect(() => {
    let date = new Date();
    let mydate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setSelectedDate(mydate);

    ipcRenderer.send("Cabinet");
    ipcRenderer.on("CabinetRep", (e, result) => {
      setCabinet(result[0]);
    });
  }, []);

  useEffect(() => {
    if (props.patient.Age != undefined) {
      let date = new Date();
      let date2 = new Date(props.patient.Age);
      let yearDate = date.getFullYear() - date2.getFullYear();
      if (date.getMonth() < date2.getMonth()) {
        yearDate -= 1;
      }
      setAge(yearDate);
    }
  }, [props.patient]);

  const setDate = (e) => {
    setSelectedDate(e.target.value);
  };

  const addMedics = (e) => {
    if (description.trim() != "" && prix.trim() != "" && qte.trim() != "") {
      let elementList = [...elements];
      elementList.push({
        prix: parseFloat(prix),
        description,
        qte: parseInt(qte),
        Id: Math.random().toString(36).substr(2, 9),
      });
      setelements(elementList);
      let prixtt = 0;
      elementList.forEach((e) => {
        prixtt += e.prix * e.qte;
      });
      setPrixTotal(prixtt);
      setDescription("");
      setqte("");
      setprix("");
    } else {
      console.log("no");
    }
  };
  const deleteElement = (m) => {
    setelements(elements.filter((e) => e.Id != m.Id));
  };
  const setMedicData = (e) => {
    if (e.target.name == "qte") setqte(e.target.value);
    else if (e.target.name == "desc") setDescription(e.target.value);
    else if (e.target.name == "prix") setprix(e.target.value);
    else setTva(e.target.value);
  };

  const printpage = () => {
    ipcRenderer.send("PrintFacture", {
      elements,
      selectedPatient: props.patient,
      age: Age,
      date:SelectedDate,
      PrixTotal,
      TVA,
      patient:props.patient
    });
  };
 
  return (
    <section className="section_container ">
      <div className="ordonance_section">
        <div
          style={{ paddingTop: "60px", position: "relative" }}
          className="ordonnanceForm orelement facture"
        >
          <div className="ordonnancefomrheading flex_center">
            <h1>
              <FontAwesomeIcon icon={faFileInvoice} /> Creer une facture
            </h1>
          </div>
          <span>date:</span>
          <input onChange={setDate} type="date" />

          <span>Description:</span>
          <input
            onChange={setMedicData}
            placeholder="Description"
            type="text"
            name="desc"
            value={description}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
            }}
          >
            <div>
              <span>Prix:</span>
              <input
                onChange={setMedicData}
                placeholder="Prix"
                type="text"
                name="prix"
                value={prix}
              />
            </div>
            <div>
              <span>Quantité:</span>
              <input
                onChange={setMedicData}
                placeholder="quantité"
                type="text"
                name="qte"
                value={qte}
              />
            </div>
            <div>
              <span>TVA:</span>
              <input
                onChange={setMedicData}
                placeholder="TVA"
                type="text"
                name="TVA"
                value={TVA}
              />
            </div>
          </div>

          <div
            style={{ gridTemplateColumns: "1fr 1fr !important" }}
            className="ordBtnContainer AddOrBtns2"
          >
            <Button onClick={addMedics}>Ajouter</Button>
            <Button onClick={printpage}>Imprimer</Button>
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
                <span>
                  {" "}
                  Nom & Prenom :{props.patient.Nom} {props.patient.Prenom}
                </span>{" "}
              </h1>
              <h1>
                <span>Age :{Age} Ans</span>
              </h1>
              <h1>
                <span>Date :</span> {SelectedDate}{" "}
              </h1>
            </div>
            <h1 className="ordonnanceHeading">Facture</h1>
            <div className="ordonnanceContent">
              <table style={{ boxShadow: "none" }} className="styled-table">
                <thead>
                  <tr className="tablehead">
                    <th>N</th>
                    <th>Description</th>
                    <th>Qte</th>
                    <th>Prix unitaire HT</th>
                    <th>Prix Total HT</th>
                    <th>Supp</th>
                  </tr>
                </thead>
                <tbody>
                  {elements.map((m) => (
                    <tr>
                      <td>{elements.indexOf(m) + 1}</td>
                      <td>{m.description}</td>
                      <td>{m.qte}</td>
                      <td>{m.prix} Da</td>
                      <td>{m.qte * m.prix} Da</td>
                      <td>
                        <div
                          style={{ backgroundColor: "#a71d1d" }}
                          onClick={() => {
                            deleteElement(m);
                          }}
                          className="table_btn"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {elements.length > 0 && (
                <div className="ttRowsContainer">
                  <div className="totalRow">
                    <div className="flex_center"> Total HT</div>
                    <div className="flex_center"> {PrixTotal} Da</div>
                  </div>
                  <div className="totalRow">
                    <div className="flex_center">TVA ({TVA}%)</div>
                    <div className="flex_center">
                      {" "}
                      {PrixTotal * (TVA / 100)} Da
                    </div>
                  </div>
                  <div className="totalRow">
                    <div className="flex_center">Total TTC</div>
                    <div className="flex_center">
                      {" "}
                      {PrixTotal + PrixTotal * (TVA / 100)} Da
                    </div>
                  </div>
                </div>
              )}
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

export default Factures;
