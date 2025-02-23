import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  const state = {};
  state.tasks = [];
  state.selectedTask = null;
  state.setting = {
    autoCheckTasks: false,
    autoSwitchTasks: true,
  };
  return state;
};

const checkOne = (state, action, toggle = true) => {
  const { id } = action.payload;
  const task = state.tasks.find((task) => task.id === id);
  if (toggle && task.done) {
    state.tasks = state.tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
      return task;
    });
  } else {
    task.done = true;
    if (state.setting.autoSwitchTasks) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
      state.tasks.push(task);
      state.selectedTask = state.tasks[0];
    }
  }
};

export const taskSlice = createSlice({
  name: 'task',
  initialState: getInitialState(),
  reducers: {
    save: (state, action) => {
      state.tasks.push({
        id: Math.random(),
        done: false,
        act: 0,
        ...action.payload,
      });
      if (!state.selectedTask) {
        state.selectedTask = state.tasks[0];
      }
    },
    select: (state, action) => {
      state.selectedTask = action.payload;
    },
    check: (state, action) => {
      checkOne(state, action);
    },
    doOne: (state) => {
      if (!state.selectedTask) {
        return;
      }
      state.selectedTask.act += 1;
      state.tasks = state.tasks.map((task) => {
        if (task.id === state.selectedTask.id) {
          task.act += 1;
        }
        return task;
      });
      if (state.selectedTask.act >= state.selectedTask.est) {
        if (state.setting.autoCheckTasks) {
          checkOne(
            state,
            {
              payload: {
                id: state.selectedTask.id,
              },
            },
            false
          );
        }
        if (state.setting.autoSwitchTasks) {
          for (const task of state.tasks) {
            if (!task.done) {
              state.selectedTask = task;
              return;
            }
          }
        }
      }
    },
    deleteOne: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      if (state.selectedTask.id === action.payload) {
        state.selectedTask = null;
      }
    },
    update: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
      state.selectedTask = state.tasks.find(
        (task) => task.id === state.selectedTask.id
      );
    },
    clearFinished: (state) => {
      state.tasks = state.tasks.filter((task) => !task.done);
      state.selectedTask = state.tasks.find(
        (task) => task.id === state.selectedTask.id
      );
    },
    clearAll: (state) => {
      state.tasks = [];
      state.selectedTask = null;
    },
    clearActPomo: (state) => {
      state.tasks = state.tasks.map((task) => {
        task.act = 0;
        return task;
      });
    },
    changeSetting: (state, action) => {
      state.setting = {
        ...state.setting,
        ...action.payload,
      };
    },
  },
});

export const {
  save,
  select,
  check,
  doOne,
  deleteOne,
  update,
  changeSetting,
  clearActPomo,
  clearAll,
  clearFinished,
} = taskSlice.actions;

export default taskSlice.reducer;