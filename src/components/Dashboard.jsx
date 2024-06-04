import CountUp from "react-countup";


export default function Dashboard() {

    const totalNoOfComplaints = 1485
    return (
      <div className="dashboard-container">

        <div className="dashtile-1">
           <p className="totalComplaintsHeader"> Total Number of Complaints: </p>
           <CountUp className="totalComplaintsValue" end={totalNoOfComplaints} />
        </div>

        <div className="dashtile-2"> 
          <p> hello </p>
        </div>

        <div className="dashtile-3"> 
          <p> insights! </p>
        </div>

        <div className="dashtile-4">
          <p> look at me </p>
        </div>

        <div className="dashtile-5">
          <p> woohooo </p>
        </div>

        <div className="dashtile-6">
           <p> yay </p>
        </div>



      </div>
    );
  }
  