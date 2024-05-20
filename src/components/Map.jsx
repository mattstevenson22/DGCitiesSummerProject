//CSS imports
import "leaflet/dist/leaflet.css";

//Component imports
import {useState, useEffect } from "react"; 
import { MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from "axios";

//Asset imports
import pin from "../images/red-pin.png";

// note to self: when giving a co-ordinate, latitude (north or south) comes before longitude (east or west).

export default function Map(){

  // marker icon
  const customIcon = new Icon({
      iconUrl: pin,
      iconSize: [30, 30],
      iconAnchor: [15, 30]
  });

  // create an empty array to store the complaint markers
  let complaint_markers = [];

  // function that displays info box after button is pressed
  const handleClick = () => {
 
  }

  // Markers component/function that maps the complaint markers array to actual marker components in react leaflet.
  function Markers({ data }) {

    const map = useMap();

    return (
      data.map((marker) => {
        return (
          <Marker eventHandlers={{click: () => {map.setView(marker.geocode, 18)}}} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        );
      })
    );
  }



  // // fetch complaint json data from backend server
  // async function fetchData() {
  //   const response = await axios.get("url")
  //   return response.data
  // }
  // complaints_json = fetchData();

  //dummy complaints json for experimentation
  let complaints_json = {
    complaint1: {
      full_complaint: "blah",
      timestamp: "blah",
      name: "barack",
      address: "123 Wallaby Way, SE10 8DX", 
      geocode: [51.483, 0.0001], 
      email: "hello@hello.com",
      telephone: "blah",
      category: "Damp",
      summary: "There is damp issues in the bathroom and kitchen.",
      sentiment: "Moderately Negative"
    },

    complaint2: {
      full_complaint: "blah",
      timestamp: "blah",
      name: "obama",
      address: "64 Zoo Lane, SE10 8DX", 
      geocode: [51.471, 0.014], 
      email: "blah",
      telephone: "120129412912",
      category: "Bins",
      summary: "There is no bin collection from my house at the moment.",
      sentiment: "Mildy Negative"
    }
  };


  // iterate through each complaint in the JSON response and add a corresponding marker to the complaint markers array
  for (let key in complaints_json) {
    if (complaints_json.hasOwnProperty(key)) {
        let complaint = complaints_json[key];
        complaint_markers.push({
        geocode: complaint.geocode,
        popUp:  <> <h4> {complaint.address} </h4> <p> Category: {complaint.category} </p> <p> Summary: {complaint.summary} </p> <p> Sentiment: {complaint.sentiment} </p> <button onClick={handleClick}> See more </button> </>
      });
     }
  }

  return (
    <MapContainer center={[51.476852, 0.005]} zoom={13.5}>

      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png' />

      <MarkerClusterGroup chunkedLoading>

        <Markers data={complaint_markers} />

      </MarkerClusterGroup>

    </MapContainer>
  );
}