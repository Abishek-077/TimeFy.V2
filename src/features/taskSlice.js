import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('/tasks');
  return response.json();
});

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload); // Add a new task
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload; // Update task
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload); // Delete task
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTasks, addTask, deleteTask, updateTask } from "../redux/taskSlice";

// const Task = () => {
//   const dispatch = useDispatch();
//   const { tasks, loading, error } = useSelector((state) => state.task);

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   // Handler to add a task
//   const handleAddTask = () => {
//     const newTask = { title: "New Task", status: false };
//     dispatch(addTask(newTask));
//   };

//   // Handler to delete a task
//   const handleDeleteTask = (id) => {
//     dispatch(deleteTask(id));
//   };

//   // Handler to update task status
//   const handleUpdateTask = (task) => {
//     dispatch(updateTask({ ...task, status: !task.status }));
//   };

//   // Error handling and loading states
//   if (loading) return <p>Loading tasks...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Task List</h2>
//       <button onClick={handleAddTask}>Add Task</button>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
//             <span>{task.title} - {task.status ? "Completed" : "Pending"}</span>
//             <button onClick={() => handleUpdateTask(task)}>Toggle Status</button>
//             <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Task;
