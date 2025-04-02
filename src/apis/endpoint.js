export const AUTH_ENDPOINT = {
  signUp: '/api/v1/auth/signup', // User Registration
  signIn: '/api/v1/auth/login',  // User Login
};

export const USER_ENDPOINT = {
  getAllUsers: '/api/v1/users', // Requires authentication & role restriction
};

export const TASK_ENDPOINT = {
  getAllTasks: '/api/v1/tasks',          // Get all tasks
  createTask: '/api/v1/tasks',           // Create a new task
  selectTask: (taskId) => `/api/v1/tasks/${taskId}`, // Get a specific task
  updateTask: (taskId) => `/api/v1/tasks/${taskId}`, // Update a task
  deleteTask: (taskId) => `/api/v1/tasks/${taskId}`, // Delete a task
  toggleTaskDone: (taskId) => `/api/v1/tasks/${taskId}/done`, // Toggle task completion
  incrementAct: (taskId) => `/api/v1/tasks/${taskId}/increment`, // Increment task activity
  clearFinishedTasks: '/api/v1/tasks/clear-finished', // Delete finished tasks
  clearAllTasks: '/api/v1/tasks/clear-all', // Delete all tasks
  resetActPomo: '/api/v1/tasks/reset-act-pomo', // Reset all Pomodoro counts
  changeSetting: '/api/v1/tasks/settings', // Change settings
};

