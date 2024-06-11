import CountUp from "react-countup";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { useEffect, useState } from "react";
import api from "../api/backendapi";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default function Dashboard() {
  const [dashboardJson, setDashboardJson] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get("/analytics");
        console.log("Sending api request: /analytics");
        setDashboardJson(res.data);
      } catch (err) {
        console.log("Unsuccessful Request");
      }
    };
    fetchDashboardData();
  }, []);

  let totalComplaints = dashboardJson.total_complaints;
  let catPCdata = dashboardJson.catPCdata;
  let cat_most = dashboardJson.cat_most;
  let cat_least = dashboardJson.cat_least;

  let areaPCdata = [100,10,40];
  let area_most = "Woolwich";
  let area_least = "Blackheath";
  let resolution_data = [700,901,624,544,791];

  let categoryPieChartData = {
    labels: ["Adult Social Care", "Business", "Children's Services"],
    datasets: [
      {
        label: "Complaints",
        data: catPCdata,
        backgroundColor: [
          "rgba(255,99,132,1)",
          "rgba(54,162,235,1)",
          "rgba(153,102,255,1)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  let areaPieChartData = {
    labels: ["Woolwich", "Charlton", "Blackheath"],
    datasets: [
      {
        label: "Complaints",
        data: areaPCdata,
        backgroundColor: [
          "rgba(255,99,132,1)",
          "rgba(54,162,235,1)",
          "rgba(153,102,255,1)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  let resolutionLineChartData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Complaints Resolved",
        data: resolution_data,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-tile">
        <p className="total-complaints-header"> Total Number of Complaints: </p>
        <CountUp className="total-complaints-value" end={totalComplaints} />
      </div>

      <div className="dashboard-tile">
        <p> Total Number of Complaints by Category: </p>
        <div className="piechart-container">
          <Pie data={categoryPieChartData} options={options} />
        </div>
      </div>

      <div className="dashboard-tile">
        <p>
          Category with <span className="bad"> most </span> complaints in the
          previous week:
        </p>
        <p> {cat_most} </p>
        <p>
          Category with <span className="good"> least </span> complaints in the
          previous week:
        </p>
        <p> {cat_least} </p>
      </div>

      <div className="dashboard-tile2">
        <p> Total Number of Complaints by Area: </p>
        <div className="piechart-container">
          <Pie data={areaPieChartData} options={options} />
        </div>
      </div>

      <div className="dashboard-tile">
        <p>
          Area with <span className="bad"> most </span> complaints in the
          previous week:
        </p>
        <p> {area_most} </p>
        <p>
          Area with <span className="good"> least </span> complaints in the
          previous week:
        </p>
        <p> {area_least} </p>
      </div>

      <div className="dashboard-tile2">
        <p>
          Number of complaints resolved in previous month, relative to past
          months:
        </p>
        <div className="linechart-container">
          <Line data={resolutionLineChartData} options={options} />
        </div>
      </div>
    </div>
  );
}
