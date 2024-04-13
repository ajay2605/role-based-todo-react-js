import { useState } from 'react'
import Todo from './assets/components/Todo'
// import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  const [roles, setRoles] = useState([]);

  const handleAddRoleClick = () => {
    setRoles(prevRoles => [...prevRoles, { id: roles.length + 1, name: `Role ${roles.length + 1}` }]);
  }

  return (
    <>
    <div className="header-container">
      <h2 className="header-text">Roles based Todo</h2>
      <button type="button" className="add-role-component" onClick={handleAddRoleClick}>Add Role</button>
    </div>
    <Todo roles={roles} />
  </>
  )
}

export default App
