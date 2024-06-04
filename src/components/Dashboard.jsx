import CountUp from "react-countup";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
ChartJS.register(Tooltip, Legend, ArcElement); 

export default function Dashboard() {

    const totalNoOfComplaints = 1485

    const categoryPieChartData = {
      labels: ["Category 1", "Category 2", "Category 3"],
      datasets: [
        {
          label: "Complaints by Category",
          data: [60,40,20],
          backgroundColor: [
            "rgba(255,99,132,1)",
            "rgba(54,162,235,1)",
            "rgba(153,102,255,1)"
          ],
          hoverOffset: 4,
        }
      ]
    };


    const areaPieChartData = {
      labels: ["Area 1", "Area 2", "Area 3"],
      datasets: [
        {
          label: "Complaints by Area",
          data: [100,10,52],
          backgroundColor: [
            "rgba(255,99,132,1)",
            "rgba(54,162,235,1)",
            "rgba(153,102,255,1)"
          ],
          hoverOffset: 4,
        }
      ]
    };

    const options = {
      maintainAspectRatio: false,
      responsive: true
    }


    return (
      <div className="dashboard-container">

        <div className="dashboard-tile">
           <p className="total-complaints-header"> Total Number of Complaints: </p>
           <CountUp className="total-complaints-value" end={totalNoOfComplaints} />
        </div>

        <div className="dashboard-tile"> 
          <p> Complaints by Category: </p>
          <div className="piechart-container">
            <Pie data={categoryPieChartData} options={options} />
          </div>
        </div>

        <div className="dashboard-tile"> 
          <p> Category with the <span className="bad"> most </span> complaints in prev. month: </p>
          <p> Damp </p>
          <p> Category with the <span className="good"> least </span> complaints in prev. month: </p>
          <p> Parks </p>
        </div>

        <div className="dashboard-tile">
          <p> Complaints by Area: </p>
          <div className="piechart-container">
            <Pie data={areaPieChartData} options={options} />
          </div>
        </div>

        <div className="dashboard-tile">
          <p> Area with the <span className="bad"> most </span> complaints in prev. month: </p>
          <p> Woolwich </p>
          <p> Area with the <span className="good"> least </span> complaints in prev. month: </p>
          <p> Blackheath </p>
        </div>

        <div className="dashboard-tile">
           <p> Number of complaints resolved in prev. month, relative to past months: </p>
           <p> i'm a bar chart </p>
        </div>


      </div>
    );
  }
  