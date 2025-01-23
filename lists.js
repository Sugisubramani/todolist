import React, { useState, useEffect } from "react";
import './lists.css'; 

const Lists = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

 
  const addTask = () => {
    if (task) {
      setTasks([...tasks, { text: task, isCompleted: false }]);
      setTask(""); 
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
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex].text = editingText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
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


      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>Add Task</button>


      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
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
