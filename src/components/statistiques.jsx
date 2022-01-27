import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import Chart from "react-apexcharts";
import { Select } from "react-materialize";
const Statistiques = (props) => {
  const { ipcRenderer } = require("electron");
  const [paimets, setPaiments] = useState([]);
  const [Today, setToday] = useState([]);
  const [Month, setMonth] = useState([]);
  const [Year, setyear] = useState([]);
  const [ChosenYear, setChosenYear] = useState(new Date().getFullYear());
  const [Monthlymoney, setMonthly] = useState([]);
  useEffect(() => {
    ipcRenderer.send("PaimentList");
    ipcRenderer.on("PaimentReq", (e, result) => {
      setPaiments(result);
      const Mypaiments=result.filter((p)=>p.Date.getFullYear()==ChosenYear)
      console.log(Mypaiments)
      let date = new Date();
      let date2;
      let s = 0;
      Mypaiments.forEach((p) => {
        date2 = new Date(p.Date);
        if (
          date2.getDate() == date.getDate() &&
          date2.getMonth() + 1 == date.getMonth() + 1 &&
          date2.getFullYear() == date.getFullYear()
        ) {
          s += parseFloat(p.Montant);
        }
      });
      setToday(s);
      s = 0;
      Mypaiments.forEach((p) => {
        date2 = new Date(p.Date);
        if (date2.getMonth() + 1 == date.getMonth() + 1) {
          s += parseFloat(p.Montant);
        }
      });
      setMonth(s);
      s = 0;
      Mypaiments.forEach((p) => {
        date2 = new Date(p.Date);
        console.log(date2.getFullYear())
        if (date2.getFullYear()  == ChosenYear) {
          s += parseFloat(p.Montant);
        }
      });
      setyear(s);
      let months = [0];
      for (let i = 1; i <= 12; i++) {
        let somme = 0;
        Mypaiments.forEach((p) => {
          if (p.Date.getMonth() + 1 == i) {
            somme += parseFloat(p.Montant);
          }
        });
        months.push(somme);
      }
      setMonthly(months);
    });
    return function cleanup() {
      ipcRenderer.removeAllListeners();
    };
  }, [ChosenYear]);

  const filerPerYear=(e)=>{
    setChosenYear(parseInt(e.target.value))
  }
  const options2 = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        "",
        "Jan",
        "Ferv",
        "Mar",
        "Avr",
        "Mai",
        "Juin",
        "Juil",
        "Aou",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    stroke: {
      curve: "smooth",
    },
  };
  const series2 = [
    {
      name: "Montant",
      data: Monthlymoney,
    },
  ];

  return (
    <section className="section_container listeDattente">
      <h1 className="pageTitle">
        <FontAwesomeIcon style={{ color: "#009879" }} icon={faChartLine} />{" "}
        Statistiques
      </h1>
      <div className="statsContainer">
        <div className="stat flex_center">
          <h1>
            <FontAwesomeIcon icon={faDollarSign} /> Aujourd'hui : {Today} DA{" "}
          </h1>
        </div>

        <div className="stat flex_center">
          <h1>
            <FontAwesomeIcon icon={faDollarSign} /> Mois : {Month} DA
          </h1>
        </div>
        <div className="stat flex_center">
          <h1>
            <FontAwesomeIcon icon={faDollarSign} /> Année : {Year} DA
          </h1>
        </div>
      </div>
      <div className="chartsContainer">
        <div className="chart">
          <div className="chartHeading flex_center">
            <Select onChange={filerPerYear} id="Select-16" multiple={false}>
              <option disabled selected value="1">Année</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option> 
              <option value="2023">2023</option> 
              <option value="2024">2024</option> 
              <option value="2025">2025</option> 
              <option value="2026">2026</option> 
            </Select>
            <h1>Drahem Par Mois</h1>
          </div>
          <Chart
            options={options2}
            series={series2}
            type="line"
            height={screen.width > 1400 ? 500 : 320}
          />
        </div>
      </div>
    </section>
  );
};

export default Statistiques;
