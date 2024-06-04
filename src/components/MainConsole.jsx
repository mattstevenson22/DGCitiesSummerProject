import NavBar from "./NavBar";
import Map from "./Map";
import Dashboard from "./Dashboard";
import { useState } from "react";
import FilterBar from "./FilterBar";

export default function MainConsole() {

  // state var to hold current chosen view
  const [chosenView, setChosenView] = useState("dashboard");

  // state var to hold current filter selection
  const [filterSelection, setFilterSelection] = useState("||||");

  return (
    <div className="main-console">

      <NavBar setChosenView={setChosenView} />

      {chosenView == "mapwithfilters" ? (
        <div className="filterandmap-container">
          <FilterBar setFilterSelection={setFilterSelection} />
          <Map filterSelection={filterSelection} />
        </div>
      ) : (
        <Dashboard />
      )}

    </div>
  );
}
