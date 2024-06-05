//CSS imports
import "leaflet/dist/leaflet.css";

//Component imports
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

//Misc imports
import pin from "../images/red-pin.png";
import { useEffect, useState } from "react";
import api from "../api/backendapi";

export default function Map({ filterSelection }) {
  // ----- 1: Setup -----

  // marker icon
  const customIcon = new Icon({
    iconUrl: pin,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
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
    const fetchMapData = async () => {
      try {
        const filterSelectionArray = filterSelection.split("|");
        const urgency = filterSelectionArray[0];
        const progress = filterSelectionArray[1];
        const category = filterSelectionArray[2];
        const responder = filterSelectionArray[3];
        const age = filterSelectionArray[4];
        const response = await api.get(
          "/data?urgency=" +
            urgency +
            "&progress=" +
            progress +
            "&category=" +
            category +
            "&responder=" +
            responder +
            "&age=" +
            age
        );
        console.log(
          "Sending api request: /data?urgency=" +
            urgency +
            "&progress=" +
            progress +
            "&category=" +
            category +
            "&responder=" +
            responder +
            "&age=" +
            age
        );
        setComplaintsJson(response.data);
      } catch (err) {
        console.log("Unsuccessful Request");
      }
    };
    fetchMapData();
  }, [filterSelection]);

  // ----- 2: Functional components used within this component -----

  // maps the complaint markers array to actual marker components in react leaflet.
  function Markers({ data }) {
    const map = useMap();

    return data.map((marker) => {
      return (
        <Marker
          key={marker.key}
          eventHandlers={{
            click: () => {
              map.setView(marker.geocode, 18);
            },
          }}
          position={marker.geocode}
          icon={customIcon}
        >
          <Popup>{marker.popUp} </Popup>
        </Marker>
      );
    });
  }

  // displays more info about each complaint in the popup window
  function InfoPopup(props) {
    let complaint_info = complaintsJson[props.currentComplaintKey];

    function getCorrectCategoryStyling(category) {
      if (category == "Damp") {
        return "damp-category-tag";
      } else if (category == "Bins") {
        return "bin-category-tag";
      } else {
        return "neighbour-category-tag";
      }
    }

    function getCorrectSentimentStyling(sentiment) {
      if (sentiment == "5") {
        return "negative-sentiment-tag";
      } else if (sentiment == "4") {
        return "mildly-negative-sentiment-tag";
      } else if (sentiment == "3") {
        return "neutral-sentiment-tag";
      } else if (sentiment == "2") {
        return "mildly-positive-sentiment-tag";
      } else {
        return "positive-sentiment-tag";
      }
    }

    return props.trigger ? (
      <div className="additional-info-box">
        <h3 className="AddInfoBoxTitleText"> {complaint_info.address} </h3>
        <p className="AddInfoBoxRegularText">
          {" "}
          Category:{" "}
          <span className={getCorrectCategoryStyling(complaint_info.category)}>
            {" "}
            {complaint_info.category}{" "}
          </span>{" "}
        </p>
        <p className="AddInfoBoxRegularText">
          {" "}
          Full Complaint: {complaint_info.full_complaint}{" "}
        </p>
        <p className="AddInfoBoxRegularText">
          {" "}
          Date: {complaint_info.timestamp}{" "}
        </p>
        <p className="AddInfoBoxRegularText">
          {" "}
          &#129668; Sentiment:{" "}
          <span
            className={getCorrectSentimentStyling(complaint_info.sentiment)}
          >
            {" "}
            {complaint_info.sentiment}{" "}
          </span>{" "}
        </p>
        <p className="AddInfoBoxRegularText">
          {" "}
          Email Address: {complaint_info.email}{" "}
        </p>
        <p className="AddInfoBoxRegularText">
          {" "}
          Telephone: {complaint_info.telephone}{" "}
        </p>
        <button className="btn" onClick={() => props.setTrigger(false)}>
          Close
        </button>
      </div>
    ) : (
      ""
    );
  }

  // ----- 3: Preparing the Complaint Markers Array -----

  // iterate through each complaint in the JSON response and add a corresponding marker to the complaint markers array
  for (let c_key in complaintsJson) {
    if (complaintsJson.hasOwnProperty(c_key)) {
      let complaint = complaintsJson[c_key];

      //choose correct category styling

      let correctCategoryColour;

      if (complaint.category == "Damp") {
        correctCategoryColour = "damp-category-tag";
      } else if (complaint.category == "Bins") {
        correctCategoryColour = "bin-category-tag";
      } else {
        correctCategoryColour = "neighbour-category-tag";
      }

      // choose correct sentiment styling

      let correctSentimentColour;

      if (complaint.sentiment == "5") {
        correctSentimentColour = "negative-sentiment-tag";
      } else if (complaint.sentiment == "4") {
        correctSentimentColour = "mildly-negative-sentiment-tag";
      } else if (complaint.sentiment == "3") {
        correctSentimentColour = "neutral-sentiment-tag";
      } else if (complaint.sentiment == "2") {
        correctSentimentColour = "mildly-positive-sentiment-tag";
      } else {
        correctSentimentColour = "positive-sentiment-tag";
      }

      complaint_markers.push({
        key: c_key,
        geocode: complaint.geocode,
        popUp: (
          <>
            {" "}
            <h4 className="PopupTitleText"> {complaint.address} </h4>{" "}
            <p className="PopupRegularText">
              {" "}
              Category:{" "}
              <span className={correctCategoryColour}>
                {" "}
                {complaint.category}{" "}
              </span>{" "}
            </p>{" "}
            <p className="PopupRegularText">
              {" "}
              &#129668; Summary: {complaint.summary}{" "}
            </p>{" "}
            <p className="PopupRegularText">
              {" "}
              &#129668; Urgency:{" "}
              <span className={correctSentimentColour}>
                {" "}
                {complaint.sentiment}{" "}
              </span>{" "}
            </p>{" "}
            <button
              className="btn"
              onClick={() => {
                setCurrentComplaintKey(c_key);
                setButtonPopup(true);
              }}
            >
              {" "}
              See more{" "}
            </button>{" "}
          </>
        ),
      });
    }
  }

  // ----- 4: return JSX -----

  return (
    <>
      <MapContainer center={[51.476852, 0.015]} zoom={13.5}>
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        />

        <MarkerClusterGroup maxClusterRadius={30} chunkedLoading>
          <Markers data={complaint_markers} />
        </MarkerClusterGroup>
      </MapContainer>

      <InfoPopup
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        currentComplaintKey={currentComplaintKey}
      />
    </>
  );
}

// Notes:
// when giving a co-ordinate, latitude (north or south) comes before longitude (east or west).
