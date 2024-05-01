import React, { useState, useEffect } from "react";
import "./Todo.css";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faStar } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ roles, setRoles }) => {
  const [todos, setTodos] = useState([]);
  const [inputTexts, setInputTexts] = useState({});

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (roleId) => {
    if (inputTexts[roleId] && inputTexts[roleId].trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        text: inputTexts[roleId],
        completed: false,
        roleId: roleId,
      };
      setTodos([newTodo, ...todos]);
      setInputTexts({ ...inputTexts, [roleId]: "" });
    }
  };

  const handleKeyPress = (e, roleId) => {
    if (e.key === "Enter") {
      handleAddTodo(roleId);
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos
        .map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
        .sort((a, b) => a.completed - b.completed)
    );
  };

  const handleDeleteRole = (roleId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the role and associated todos?"
    );

    if (confirmDelete) {
      const updatedRoles = roles.filter((role) => role.id !== roleId);
      setRoles(updatedRoles);

      const updatedTodos = todos.filter((todo) => todo.roleId !== roleId);
      setTodos(updatedTodos);

      const updatedInputTexts = { ...inputTexts };
      if (updatedInputTexts[roleId]) {
        delete updatedInputTexts[roleId];
        setInputTexts(updatedInputTexts);
      }
    }
  };

  const handleMoveRoleToTop = (roleId) => {
    // Find the clicked role
    const clickedRole = roles.find(role => role.id === roleId);
    // Toggle the isFavorited state
    const updatedRoles = roles.map(role =>
      role.id === roleId ? { ...role, isFavorited: !clickedRole.isFavorited } : role
    );
    // Separate favorited and non-favorited roles
    const favoritedRoles = updatedRoles.filter(role => role.isFavorited);
    const nonFavoritedRoles = updatedRoles.filter(role => !role.isFavorited);
    // Concatenate favorited and non-favorited roles, with favorited roles at the end
    const reorderedRoles = [ ...favoritedRoles, ...nonFavoritedRoles];
    setRoles(reorderedRoles);
  };
  
  

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      {roles.map((role) => (
        <div key={role.id} className="todo-component">
          <div className="heading-component">
            <div className="heading-text-container">
              <h3>{role.name}</h3>
            </div>
            <div className="button-container">
              <button
                class="delete-role"
                onClick={() => handleDeleteRole(role.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button
                className={`favourite-role ${
                  role.isFavorited ? "favorited" : ""
                }`}
                onClick={() => handleMoveRoleToTop(role.id)}
              >
                <FontAwesomeIcon icon={faStar} />
              </button>
            </div>
          </div>
          <div className="input-button-component">
            <input
              className="todo-input"
              type="text"
              placeholder="Add Task"
              value={inputTexts[role.id] || ""}
              onChange={(e) =>
                setInputTexts({ ...inputTexts, [role.id]: e.target.value })
              }
              onKeyPress={(e) => handleKeyPress(e, role.id)}
            />
            <button
              className="todo-button"
              onClick={() => handleAddTodo(role.id)}
            >
              Add Todo
            </button>
          </div>
          <ul className="todo-list">
            {todos
              .filter((todo) => todo.roleId === role.id)
              .map((todo) => (
                <li key={todo.id} className="todo-item">
                  <input
                    className="todo-checkbox"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                  />
                  <span
                    id="span-id"
                    className={`todo-text ${todo.completed ? "completed" : ""}`}
                  >
                    {todo.text}
                  </span>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Todo;
