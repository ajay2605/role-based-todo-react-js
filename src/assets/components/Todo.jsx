import React, { useState, useEffect } from 'react';
import './Todo.css';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID library to generate unique identifiers


const Todo = ({ roles, setRoles }) => {
  const [todos, setTodos] = useState([]);
  const [inputTexts, setInputTexts] = useState({});

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  // Save todos to local storage whenever todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Function to handle adding a new todo
  const handleAddTodo = (roleId) => {
    if (inputTexts[roleId] && inputTexts[roleId].trim() !== '') {
      const newTodo = {
        id: uuidv4(), // Generate unique identifier for todo
        text: inputTexts[roleId],
        completed: false,
        roleId: roleId // Store the roleId associated with the todo
      };
      setTodos([newTodo, ...todos]);
      setInputTexts({ ...inputTexts, [roleId]: '' }); // Clear the input text after adding todo
    }
  };

  // Handle Enter key in the input field
  const handleKeyPress = (e, roleId) => {
    if (e.key === 'Enter') {
      handleAddTodo(roleId);
    }
  };

  // Function to handle marking a todo as complete
  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ).sort((a, b) => a.completed - b.completed));
  };

  // Function to handle deleting a role and its associated todos
  const handleDeleteRole = (roleId) => {
    const updatedRoles = roles.filter(role => role.id !== roleId);
    setRoles(updatedRoles);

    // Filter out the todos associated with the roleId
    const updatedTodos = todos.filter(todo => todo.roleId !== roleId);
    setTodos(updatedTodos);

    // Remove the roleId from the inputTexts state
    const updatedInputTexts = { ...inputTexts };
    delete updatedInputTexts[roleId];
    setInputTexts(updatedInputTexts);
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      {roles.map(role => (
        <div key={role.id} className='todo-component'>
          <div className='heading-component'>

            <h3>{role.name}</h3>
            {/* <button onClick={() => handleDeleteRole(role.id)}>Delete Role</button> */}
          </div>
          <div className='input-button-component'>
            <input
              className="todo-input"
              type="text"
              placeholder="Add Task"
              value={inputTexts[role.id] || ''}
              onChange={(e) => setInputTexts({ ...inputTexts, [role.id]: e.target.value })}
              onKeyPress={(e) => handleKeyPress(e, role.id)}
            />
            <button className="todo-button" onClick={() => handleAddTodo(role.id)}>Add Todo</button>
          </div>
          <ul className="todo-list">
            {todos.filter(todo => todo.roleId === role.id).map(todo => (
              <li key={todo.id} className="todo-item">
                <input
                  className="todo-checkbox"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
                <span id="span-id" className={`todo-text ${todo.completed ? 'completed' : ''}`} >
                  {todo.text}
                </span>
                <button className="delete-button" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Todo;

