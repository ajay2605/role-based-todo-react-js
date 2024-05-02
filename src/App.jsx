import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Todo from "./components/Todo";
import Habits from "./components/Habits"; // Import the Habits component
import { v4 as uuidv4 } from "uuid"; // Importing UUID library to generate unique identifiers
import "./App.css";

function App() {
  const [roles, setRoles] = useState([]);

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

  return (
    <Router>
      <>
        <div className="header-container">
          <button
            type="button"
            className="add-role-component"
            onClick={handleAddRoleClick}
          >
            Add Role
          </button>
          <Link to="/roles">
            <button type="button">Roles</button>
          </Link>
          <Link to="/habits">
            <button type="button">Go to Habits</button>
          </Link>
        </div>
        <div className="container">
          <Routes>
            <Route path="/roles" element={<Todo roles={roles} setRoles={setRoles} />} />
            <Route path="/habits" element={<Habits />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
