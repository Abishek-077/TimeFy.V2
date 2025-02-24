// routes/taskRoutes.js
const express = require('express');
const {
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
} = require('../controllers/taskController');
const router = express.Router();

router.route('/')
  .get(getTasks)  // Get all tasks
  .post(createTask);  // Create a new task

router.route('/:taskId')
  .get(selectTask)  // Select a task
  .patch(updateTask)  // Update a task
  .delete(deleteTask);  // Delete a task

// Additional routes for specific actions
router.route('/:taskId/done')
  .patch(toggleTaskDone);  // Toggle done status

router.route('/:taskId/increment')
  .patch(incrementAct);  // Increment act count

router.route('/clear-finished')
  .delete(clearFinishedTasks);  // Clear finished tasks

router.route('/clear-all')
  .delete(clearAllTasks);  // Clear all tasks

router.route('/reset-act-pomo')
  .patch(resetActPomo);  // Reset act count for all tasks

router.route('/settings')
  .patch(changeSetting);  // Change task settings

module.exports = router;
