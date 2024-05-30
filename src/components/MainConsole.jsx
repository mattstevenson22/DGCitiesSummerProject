// Component Imports
import FilterBar from "./FilterBar";
import Map from "./Map";
import {useEffect, useState} from "react";

export default function MainConsole() {

  const [filterSelection, setFilterSelection] = useState("");

  return (
    <div className="main-console">
      <FilterBar setFilterSelection={setFilterSelection} />
      <Map filterSelection = {filterSelection} />
    </div>
  );
}
