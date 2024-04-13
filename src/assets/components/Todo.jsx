import React, { useState, useEffect } from 'react';
import './Todo.css';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

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
  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputText, completed: false }]);
      setInputText('');
    }
  };

  // Function to handle marking a todo as complete
  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ).sort((a, b) => a.completed - b.completed));
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <input 
        className="todo-input"
        type="text" 
        placeholder="Enter your todo..." 
        value={inputText} 
        onChange={(e) => setInputText(e.target.value)} 
      />
      <button className="todo-button" onClick={handleAddTodo}>Add Todo</button>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <input 
              className="todo-checkbox"
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => handleToggleComplete(todo.id)} 
            />
            <span id="span-id" className={`todo-text ${todo.completed ? 'completed' : ''}`}>
              {todo.text}
            </span>
            <button className="todo-button" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
