import NavBar from "./NavBar";
import Map from "./Map";
import Dashboard from "./Dashboard";
import { useState } from "react";


export default function ViewSelector( filterSelection) {

    const [chosenView, setChosenView] = useState("map");

    return (
        <div className="navbarandmap">
            <NavBar setChosenView = {setChosenView} />
            {chosenView=="map" ? <Map filterSelection = {filterSelection} /> : <Dashboard /> }
        </div>
      
    );
  }
  