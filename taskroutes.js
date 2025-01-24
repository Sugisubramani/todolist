const express = require('express');
const Task = require('../models/task'); 
const router = express.Router();

router.post('/add', async (req, res) => {
  const { userId, text } = req.body;

  if (!userId || !text) {
    return res.status(400).json({ error: "User ID and task text are required." });
  }

  try {
    const task = new Task({ userId, text });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add task' });
  }
});

router.get('/tasks/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.put('/update/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.isCompleted = !task.isCompleted;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

module.exports = router;
