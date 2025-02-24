// controllers/taskController.js
const { Task } = require('../models/task');
const catchAsync = require('../utils/catchAsync');  // assuming you have a utility to catch async errors


// Create a new task
const createTask = catchAsync(async (req, res) => {
  const { title, description, est } = req.body;
  const newTask = await Task.create({ title, description, done: false, act: 0, est });
  res.status(201).json(newTask);
});

// Get all tasks
const getTasks = catchAsync(async (req, res) => {
  const tasks = await Task.findAll();
  res.status(200).json(tasks);
});

// Select a task (set it as the selected task)
const selectTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findByPk(taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(200).json(task);
});

// Toggle task's done status
const toggleTaskDone = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findByPk(taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  task.done = !task.done;
  await task.save();
  res.status(200).json(task);
});

// Increment the task's act count
const incrementAct = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findByPk(taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  task.act += 1;
  await task.save();
  res.status(200).json(task);
});

// Delete a task
const deleteTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findByPk(taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  await task.destroy();
  res.status(204).send();
});

// Update a task
const updateTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const { title, description, done, act, est } = req.body;
  const task = await Task.findByPk(taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  task.title = title || task.title;
  task.description = description || task.description;
  task.done = done !== undefined ? done : task.done;
  task.act = act !== undefined ? act : task.act;
  task.est = est !== undefined ? est : task.est;
  await task.save();
  res.status(200).json(task);
});

// Clear finished tasks (tasks marked as done)
const clearFinishedTasks = catchAsync(async (req, res) => {
  await Task.destroy({ where: { done: true } });
  res.status(204).send();
});

// Clear all tasks
const clearAllTasks = catchAsync(async (req, res) => {
  await Task.destroy({ where: {} });
  res.status(204).send();
});

// Reset all tasks' act count
const resetActPomo = catchAsync(async (req, res) => {
  await Task.update({ act: 0 }, { where: {} });
  res.status(204).send();
});

// Change task settings
const changeSetting = catchAsync(async (req, res) => {
  const { autoCheckTasks, autoSwitchTasks } = req.body;
  // Here we would modify settings in your database or elsewhere
  res.status(200).json({ autoCheckTasks, autoSwitchTasks });
});

module.exports = {
  createTask,
  getTasks,
  selectTask,
  toggleTaskDone,
  incrementAct,
  deleteTask,
  updateTask,
  clearFinishedTasks,
  clearAllTasks,
  resetActPomo,
  changeSetting,
};
