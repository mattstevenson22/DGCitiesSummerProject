// Component Imports
import FilterBar from "./FilterBar";
import {useEffect, useState} from "react";
import ViewSelector from "./ViewSelector";

export default function MainConsole() {

  // state var to hold current filter selection
  const [filterSelection, setFilterSelection] = useState("||||");

  return (
    <div className="main-console">
      <FilterBar setFilterSelection={setFilterSelection} />
      <ViewSelector filterSelection = {filterSelection} />
    </div>
  );
}
