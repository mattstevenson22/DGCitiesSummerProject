// Component Imports
import FilterBar from "./FilterBar";
import Map from "./Map";
import {useEffect, useState} from "react";

export default function MainConsole() {

  // state var to hold current filter selection
  const [filterSelection, setFilterSelection] = useState("S:|P:|C:|R:|A:");

  return (
    <div className="main-console">
      <FilterBar setFilterSelection={setFilterSelection} />
      <Map filterSelection = {filterSelection} />
    </div>
  );
}
