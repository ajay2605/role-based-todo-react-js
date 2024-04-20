import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';

function App() {
  const [roles, setRoles] = useState([]);

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
          id: prevRoles.length + 1, 
          name: roleName  // Use the entered name
        }
      ]);
    }
  };

  // const handleListAllItems = () => {
    
  // }

  return (
    <>
      <div className="header-container"
      >
        <button type="button" className="add-role-component" onClick={handleAddRoleClick}>Add Role</button>
        {/* <button className="list-all-items" onClick={handleListAllItems}>List Items</button> */}
      </div>
      <Todo roles={roles} />
    </>
  );
}

export default App;
