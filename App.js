import React from 'react';
import './App.css'; 
import Lists from './components/lists';

function App() {
  return (
    <div className="App">
      <Lists /> 
    </div>
  );
}import React, { useState, useEffect } from "react";
import './lists.css'; 

const Lists = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task.trim(), isCompleted: false }]);
      setTask("");
      setError("");
    } else {
      setError("Task cannot be empty.");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const saveEdit = () => {
    if (editingText.trim()) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex].text = editingText.trim();
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditingText("");
    } else {
      setError("Task cannot be empty.");
    }
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.isCompleted));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "active") return !task.isCompleted;
    return true;
  });

  return (
    <div className="task-list">
      <h1>To-Do List</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
        aria-label="Task input"
      />
      <button onClick={addTask}>Add Task</button>
      <div className="filters">
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <button onClick={clearCompleted}>Clear Completed Tasks</button>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  aria-label="Edit task"
                />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.isCompleted ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
                <button onClick={() => toggleTaskCompletion(index)}>
                  {task.isCompleted ? "Undo" : "Complete"}
                </button>
                <button onClick={() => startEditing(index)}>Edit</button>
              </>
            )}
            <button onClick={() => removeTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lists;


export default App;
