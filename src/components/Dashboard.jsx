import CountUp from "react-countup";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { useEffect, useState } from "react";
import api from "../api/backendapi";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [dashboardJson, setDashboardJson] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get("/dashboard");
        console.log("Sending api request: /dashboard");
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
  let areaPCdata = dashboardJson.areaPCdata;
  let area_most = dashboardJson.area_most;
  let area_least = dashboardJson.area_least;
  let resolution_data = dashboardJson.resolution_data;

  let categoryPieChartData = {
    labels: ["Category 1", "Category 2", "Category 3"],
    datasets: [
      {
        label: "Complaints by Category",
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
    labels: ["Area 1", "Area 2", "Area 3"],
    datasets: [
      {
        label: "Complaints by Area",
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
        <p> Complaints by Category: </p>
        <div className="piechart-container">
          <Pie data={categoryPieChartData} options={options} />
        </div>
      </div>

      <div className="dashboard-tile">
        <p>
          {" "}
          Category with the <span className="bad"> most </span> complaints in
          prev. month:{" "}
        </p>
        <p> {cat_most} </p>
        <p>
          {" "}
          Category with the <span className="good"> least </span> complaints in
          prev. month:{" "}
        </p>
        <p> {cat_least} </p>
      </div>

      <div className="dashboard-tile2">
        <p> Complaints by Area: </p>
        <div className="piechart-container">
          <Pie data={areaPieChartData} options={options} />
        </div>
      </div>

      <div className="dashboard-tile">
        <p>
          {" "}
          Area with the <span className="bad"> most </span> complaints in prev.
          month:{" "}
        </p>
        <p> {area_most} </p>
        <p>
          {" "}
          Area with the <span className="good"> least </span> complaints in
          prev. month:{" "}
        </p>
        <p> {area_least} </p>
      </div>

      <div className="dashboard-tile">
        <p>
          {" "}
          Number of complaints resolved in prev. month, relative to past months:{" "}
        </p>
        <p> {resolution_data} </p>
      </div>
    </div>
  );
}
