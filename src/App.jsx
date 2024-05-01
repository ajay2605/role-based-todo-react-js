import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID library to generate unique identifiers


function App() {
  const [roles, setRoles] = useState([]);
  const [todoVisible, setTodoVisible] = useState(false); // State to manage visibility

  // Load roles from local storage on component mount
  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    setRoles(storedRoles);
  }, []);

  // Save roles to local storage whenever roles state changes
  useEffect(() => {
    localStorage.setItem('roles', JSON.stringify(roles));
  }, [roles]);

  const handleAddRoleClick = () => {
    const roleName = prompt("Please enter the name for the new role:", "Role Name");
    if (roleName) { // Check if a name was entered
      setRoles(prevRoles => [
        ...prevRoles,
        {
          id: uuidv4(),
          name: roleName,
          isFavorited:false  // Use the entered name
        }
      ]);
    }
  };

  const handleToggleTodoVisibility = () => {
    setTodoVisible(prevVisible => !prevVisible); // Toggle visibility
  };

  return (
    <>
      <div className="header-container">
        <button type="button" className="add-role-component" onClick={handleAddRoleClick}>Add Role</button>
        <button type="button" onClick={handleToggleTodoVisibility}>
          {todoVisible ? "Hide Roles" : "Show Roles"}
        </button>
      </div>
      {todoVisible && <Todo roles={roles} setRoles={setRoles}/>} {/* Render Todo only if visible */}
    </>
  );
}

export default App;
