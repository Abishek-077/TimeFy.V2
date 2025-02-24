// const { Task } = require('../models');

// // Get all tasks
// exports.getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.findAll();
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Create a task
// exports.createTask = async (req, res) => {
//   try {
//     const { title, est, note } = req.body;
//     const newTask = await Task.create({ title, est, note, status: false, act: 0 });
//     res.json(newTask);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update a task
// exports.updateTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, est, note, status, act } = req.body;
//     const task = await Task.findByPk(id);

//     if (!task) return res.status(404).json({ error: "Task not found" });

//     await task.update({ title, est, note, status, act });
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete a task
// exports.deleteTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const task = await Task.findByPk(id);
//     if (!task) return res.status(404).json({ error: "Task not found" });

//     await task.destroy();
//     res.json({ message: "Task deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
