import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import { v4 as uuidv4 } from "uuid"; // Importing UUID library to generate unique identifiers
import "./App.css";

function App() {
  const [roles, setRoles] = useState([]);
  const [todoVisible, setTodoVisible] = useState(false); 

  // Load roles from local storage on component mount
  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setRoles(storedRoles);
  }, []);

  // Save roles to local storage whenever roles state changes
  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  const handleAddRoleClick = () => {
    const roleName = prompt(
      "Please enter the name for the new role:",
      "Role Name"
    );
    if (roleName) {
      // Check if a name was entered
      setRoles((prevRoles) => [
        ...prevRoles,
        {
          id: uuidv4(),
          name: roleName,
          isFavorited: false, // Use the entered name
        },
      ]);
    }
  };

  const handleToggleTodoVisibility = () => {
    setTodoVisible((prevVisible) => !prevVisible); // Toggle visibility
  }; 
  return (
    <>
      <div className="header-container">
        <button
          type="button"
          className="add-role-component"
          onClick={handleAddRoleClick}
        >
          Add Role
        </button>
        <button type="button" onClick={handleToggleTodoVisibility}>
          {todoVisible ? "Hide Roles" : "Show Roles"}
        </button>
      </div>
      <div className="container">
        <div className="habits-list">
          {todoVisible && (
            <>
              <h3 style={{ textAlign: 'left', marginTop:'10px', color:'#f1263a'}}>Morning</h3>

              <ul>
                <li>Wake Up at 6 AM</li>
                <li>Drink Water in Squat position</li>
                <li>Washroom</li>
                <li>Tai Chi Exercises</li>
                <li>Bath</li>
                <li>BreakFast</li>
                <li>Eat Nuts</li>
                <li>Go to Office</li>
              </ul>

              <h3 style={{ textAlign: 'left', marginTop:'10px', color:'#f1263a' }}>Office</h3>
              <ul>
                <li>Fill your water bottle</li>
                <li>Automate one test case</li>
                <li>Work</li>
                <li>Eat</li>
                <li>Stretch Regularly</li>
                <li>Drink Water</li>
                <li>Work</li>
              </ul>
              <h3 style={{ textAlign: 'left', marginTop:'10px', color:'#f1263a' }}>Evening</h3>
              <ul>
                <li>Return Home</li>
                <li>Stretch(Legs)</li>
                <li>Take Bath</li>
                <li>Sleep</li>
              </ul>
            </>
          )}
        </div>
        <div className="todos-component">
          {todoVisible && <Todo roles={roles} setRoles={setRoles} />}
        </div>
      </div>
    </>
  );
}

export default App;
