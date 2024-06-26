import React, { useState } from "react";

export default function FilterBar({ setFilterSelection }) {
  // State hooks for each filter
  const [urgency, setUrgency] = useState("");
  const [progress, setProgress] = useState("");
  const [category, setCategory] = useState("");
  const [actionedBy, setActionedBy] = useState("");
  const [age, setAge] = useState("");

  const updateMap = () => {
    console.log("Updating map with filters:");
    console.log({ urgency, progress, category, actionedBy, age });
    setFilterSelection(
      urgency + "|" + progress + "|" + category + "|" + actionedBy + "|" + age
    );
  };

  return (
    <div className="filter-container">
      <h2 className="filter-title">Filters</h2>
      <div className="filter">
        <label htmlFor="urgency">Urgency</label>
        <select
          id="urgency"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
        >
          <option value="">Select</option>
          <option value="5">5 (Most Urgent) </option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1 (Least Urgent) </option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Adult Social Care">Adult Social Care</option>
          <option value="Business">Business</option>
          <option value="Children's Services">Children's Services</option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="age">Age</label>
        <select id="age" value={age} onChange={(e) => setAge(e.target.value)}>
          <option value="">Select</option>
          <option value="7">Previous 7 Days</option>
          <option value="30">Previous 30 Days</option>
          <option value="365">Previous Year</option>
        </select>
      </div>
      <button className="btn-update-map" onClick={updateMap}>
        Update Map
      </button>
    </div>

    /* <div className="filter">
        <label htmlFor="progress">Progress</label>
        <select
          id="progress"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
        >
          <option value="">Select</option>
          <option value="notStarted">Not Started</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div> */

    /* <div className="filter">
        <label htmlFor="actionedBy">Actioned By</label>
        <select
          id="actionedBy"
          value={actionedBy}
          onChange={(e) => setActionedBy(e.target.value)}
        >
          <option value="">Select</option>
          <option value="team1">Team 1</option>
          <option value="team2">Team 2</option>
          <option value="team3">Team 3</option>
        </select>
      </div> */
  );
}
