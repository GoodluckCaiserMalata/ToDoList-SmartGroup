/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

function TodoList(params) {
  const date = new Date();
  const datey =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  const [initialValues, setInitialValues] = useState([
    { id: 1, title: "Wake Up", isDone: false, dueDate: datey },
    { id: 2, title: "Code", isDone: false, dueDate: datey },
    { id: 3, title: "Sleep", isDone: false, dueDate: datey },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [editTodo, setEditTodo] = useState({ id: null, text: "" });
  const [deadline, setDeadline] = useState(initialValues.dueDate);
  const [overallProgress, setOverallProgress] = useState(0);
  const calculateOverallProgress = () => {
    if (initialValues.length === 0) {
      setOverallProgress(0); // If there are no tasks, progress is 0%
    } else {
      const completedTasks = initialValues.filter((todo) => todo.isDone);
      const progress = (completedTasks.length / initialValues.length) * 100;
      setOverallProgress(progress);
    }
  };

  useEffect(() => {
    calculateOverallProgress();
  }, [initialValues]);
  useEffect(() => {
    // Update current date and time every second
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newId = initialValues.length + 1;
      const updatedTodos = [
        ...initialValues,
        { id: newId, title: newTodo, isDone: false, dueDate: deadline },
      ];
      setInitialValues(updatedTodos);
      setNewTodo("");
    }
  };

  const handleOnToggle = (id) => {
    const updatedTodos = initialValues.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setInitialValues(updatedTodos);
  };

  const handleEditClick = (id, text) => {
    setEditTodo({ id, text });
  };

  const handleSaveEdit = (id, newText) => {
    const updatedTodos = initialValues.map((todo) =>
      todo.id === id ? { ...todo, title: newText } : todo
    );
    setInitialValues(updatedTodos);
    setEditTodo({ id: null, text: "" });
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = initialValues.filter((todo) => todo.id !== id);
    setInitialValues(updatedTodos);
  };

  const handleDateOnChange = (event) => {
    setDeadline(event.target.value);
  };

  return (
    <div>
      <div style={{ height: "50px" }}></div>
      <h1 className="header">GOODLUCK CAISER TODO</h1>
      <div className="container">
        <p className="current-datetime">
          Current Date and Time: {currentDateTime.toLocaleString()}
        </p>
      </div>
      <br></br>
      <div className="container">
        <h3>Progress</h3>
        <div className="progress-bar" style={{ width: `${overallProgress}%` }}>
          {`${Math.round(overallProgress)}%`}
        </div>
      </div>
      <br></br>
      <div className="container">
        <br></br>
        <input
          className="input-container-input"
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={handleInputChange}
        />

        <input
          type="date"
          value={deadline}
          onChange={handleDateOnChange}
          className="input-container-date-picker"
        ></input>
        <button className="input-container-button" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {initialValues.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => handleOnToggle(todo.id)}
              />
              {editTodo.id === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editTodo.text}
                    onChange={(e) =>
                      setEditTodo({ ...editTodo, text: e.target.value })
                    }
                  />
                  <button
                    className="todo-item-button"
                    onClick={() => handleSaveEdit(todo.id, editTodo.text)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {todo.isDone ? <del>{todo.title}</del> : todo.title}
                  <button
                    className="todo-item-button"
                    onClick={() => handleEditClick(todo.id, todo.title)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </button>
                  <p>{`Deadline:${todo.dueDate}`}</p>
                </>
              )}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
