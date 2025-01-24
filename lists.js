import React, { useState, useEffect } from 'react';
import './lists.css';

const Lists = () => {
  const [tasks, setTasks] = useState([]); 
  const [task, setTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userId = "yourUserId"; 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/tasks/tasks/${userId}`);
        const tasksData = await response.json();
  
        console.log('Tasks fetched:', tasksData); 
  
        if (Array.isArray(tasksData)) {
          setTasks(tasksData);
        } else {
          setTasks([]); 
          setError('Invalid task data');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks');
      }
    };
  
    fetchTasks();
  }, [userId]);
  

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === '') {
      setError('Task cannot be empty.');
      return;
    }

    if (tasks.some((existingTask) => existingTask.text === task.trim())) {
      setError('This task already exists.');
      return;
    }

    setTasks([...tasks, { text: task.trim(), isCompleted: false }]);
    setTask('');
    setError('');
    setSuccess('Task added successfully!');
    setTimeout(() => setSuccess(''), 2000);
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
    if (editingText.trim() === '') {
      setError('Task cannot be empty.');
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks[editingIndex].text = editingText.trim();
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText('');
    setError('');
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.isCompleted));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'active') return !task.isCompleted;
    return true;
  });

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    }
  };

  return (
    <div className="task-list">
      <h1>To-Do List</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="input-wrapper">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          aria-label="Task input"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="filters">
        <button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <button className="clear-completed" onClick={clearCompleted}>
        Clear Completed Tasks
      </button>

      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyPress={handleEditKeyPress}
                  aria-label="Edit task"
                />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                <span className={task.isCompleted ? 'completed' : ''}>
                  {task.text}
                </span>
                <button
                  className="complete"
                  onClick={() => toggleTaskCompletion(index)}
                >
                  {task.isCompleted ? 'Undo' : 'Complete'}
                </button>
                <button className="edit" onClick={() => startEditing(index)}>
                  Edit
                </button>
                <button className="delete" onClick={() => removeTask(index)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lists;
