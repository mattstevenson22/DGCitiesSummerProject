//CSS imports
import "leaflet/dist/leaflet.css";

//Component imports
import { MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

//Misc imports
import pin from "../images/red-pin.png";
import {useEffect, useState} from "react";
import api from '../api/complaints';

export default function Map( {filterSelection} ){


  // ----- 1: Setup -----


  // marker icon
  const customIcon = new Icon({
      iconUrl: pin,
      iconSize: [30, 30],
      iconAnchor: [15, 30]
  });

  // var to store the complaint data in json format
  const [complaintsJson, setComplaintsJson] = useState({});

  // var to store the state of whether the extra info popup is shown or not
  const [buttonPopup, setButtonPopup] = useState(false);

  // var to store state of current complaint key for use in generating the extra info popup
  const [currentComplaintKey, setCurrentComplaintKey] = useState("");
  
  // create an empty array to store the complaint markers 
  let complaint_markers = [];
  

  // retrieve the complaint data from server whenever the filter selection changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/complaints?filters="+filterSelection);
        console.log("Sending Api Request: /complaints?filters="+filterSelection);
        setComplaintsJson(response.data);
      } catch (err) {
        console.log('Error: ${err.message}');
      }
    }
    fetchData();
  }, [filterSelection])


  // ----- 2: Functional components used within this component -----


  // maps the complaint markers array to actual marker components in react leaflet.
  function Markers({ data }) {

    const map = useMap();

    return (
      data.map((marker) => {
        return (
          <Marker key={marker.key} eventHandlers={{click: () => {map.setView(marker.geocode, 18)}}} position={marker.geocode} icon={customIcon}>
            <Popup >{marker.popUp} </Popup>
          </Marker>
        );
      })
    );
  }

  // displays more info about each complaint in the popup window
  function InfoPopup(props) {

    let complaint_info = complaintsJson[props.currentComplaintKey];

    return (props.trigger) ? (
        <div className="info-popup-inner">
          <h3 className="BoxTitleText"> {complaint_info.address} </h3>
          <p className="BoxRegularText"> Category: {complaint_info.category} </p>
          <p className="BoxRegularText"> Full Complaint: {complaint_info.full_complaint} </p>
          <p className="BoxRegularText"> Date: {complaint_info.timestamp} </p>
          <p className="BoxRegularText"> &#129668; Sentiment: {complaint_info.sentiment} </p>
          <p className="BoxRegularText"> Email Address: {complaint_info.email} </p>
          <p className="BoxRegularText"> Telephone: {complaint_info.telephone} </p>
          <button className="btn" onClick={() => props.setTrigger(false)}>Close</button>
        </div>
    ) : "";
  }


  // ----- 3: Preparing the Complaint Markers Array -----


  // iterate through each complaint in the JSON response and add a corresponding marker to the complaint markers array
  for (let c_key in complaintsJson) {
    if (complaintsJson.hasOwnProperty(c_key)) {
        let complaint = complaintsJson[c_key];
        complaint_markers.push({
            key: c_key,
            geocode: complaint.geocode,
            popUp:  <> <h4 className="PopupTitleText"> {complaint.address} </h4> <p className="PopupRegularText"> Category: {complaint.category} </p> <p className="PopupRegularText"> &#129668; Summary: {complaint.summary} </p> <p className="PopupRegularText"> &#129668; Sentiment: {complaint.sentiment} </p> <button className="btn" onClick={() => {setCurrentComplaintKey(c_key); setButtonPopup(true);}}> See more </button> </>
      });
    }}


  // ----- 4: return JSX -----


  return (
    <>
    <MapContainer center={[51.476852, 0.015]} zoom={13.5}>

      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png' />

      
      <MarkerClusterGroup chunkedLoading> 

        <Markers data={complaint_markers} />

      </MarkerClusterGroup>

    </MapContainer>

    <InfoPopup trigger={buttonPopup} setTrigger={setButtonPopup} currentComplaintKey={currentComplaintKey} />

    </>
  );
}


// Notes:
// when giving a co-ordinate, latitude (north or south) comes before longitude (east or west).

// emoji options for ai stuff: wand, sparkle, robot?