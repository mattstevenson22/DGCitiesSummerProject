import React, { useState } from 'react';

export default function FilterBar( {setFilterSelection}) {
  // State hooks for each filter
  const [sentiment, setSentiment] = useState('');
  const [progress, setProgress] = useState('');
  const [category, setCategory] = useState('');
  const [actionedBy, setActionedBy] = useState('');
  const [age, setAge] = useState('');

  const updateMap = () => {
    // Logic to update the map based on filters
    console.log("Updating map with filters:");
    console.log({ sentiment, progress, category, actionedBy, age });
    setFilterSelection("Sentiment:"+sentiment + "|Progress:"+progress+"|Category:"+category+"|Actioner:"+actionedBy+"|Age:"+age);
    // Update state and connect to the map
  };

  return (
    <div className="filter-container">
      <h2>Filters</h2>
      <div className="filter">
        <label htmlFor="sentiment">Sentiment</label>
        <select id="sentiment" value={sentiment} onChange={(e) => setSentiment(e.target.value)}>
          <option value="">Select</option>
          <option value="positive">Positive</option>
          <option value="neutral">Neutral</option>
          <option value="negative">Negative</option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="progress">Progress</label>
        <select id="progress" value={progress} onChange={(e) => setProgress(e.target.value)}>
          <option value="">Select</option>
          <option value="notStarted">Not Started</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select</option>
          <option value="maintenance">Maintenance</option>
          <option value="service">Service</option>
          <option value="support">Support</option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="actionedBy">Actioned By</label>
        <select id="actionedBy" value={actionedBy} onChange={(e) => setActionedBy(e.target.value)}>
          <option value="">Select</option>
          <option value="team1">Team 1</option>
          <option value="team2">Team 2</option>
          <option value="team3">Team 3</option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="age">Age</label>
        <select id="age" value={age} onChange={(e) => setAge(e.target.value)}>
          <option value="">Select</option>
          <option value="new">New</option>
          <option value="mid">Mid</option>
          <option value="old">Old</option>
        </select>
      </div>
      <button className="btn" onClick={updateMap}>Update Map</button>
    </div>
  );
}  