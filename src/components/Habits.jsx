// components/Habits.js
import React from "react";

const Habits = () => {
  return (
    <div className="habits-list">
      <h2>Habits</h2>
      <h3 style={{ textAlign: "left", marginTop: "10px", color: "#f1263a" }}>Morning</h3>
      <ul>
        <li>Wake Up at 6 AM</li>
        <li>Drink Water in Squat position</li>
        <li>Washroom</li>
        <li>Tai Chi Exercises</li>
        <li>Learning</li>
        <li>Bath</li>
        <li>BreakFast</li>
        <li>Eat Nuts</li>
        <li>Go to Office</li>
      </ul>

      <h3 style={{ textAlign: "left", marginTop: "10px", color: "#f1263a" }}>Office</h3>
      <ul>
        <li>Fill your water bottle</li>
        <li>Automate one test case</li>
        <li>Work</li>
        <li>Eat</li>
        <li>Stretch Regularly</li>
        <li>Drink Water</li>
        <li>Work</li>
      </ul>
      <h3 style={{ textAlign: "left", marginTop: "10px", color: "#f1263a" }}>Evening</h3>
      <ul>
        <li>Return Home</li>
        <li>Stretch(Legs)</li>
        <li>Take Bath</li>
        <li>Sleep</li>
      </ul>
    </div>
  );
};

export default Habits;
