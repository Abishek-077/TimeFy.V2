import { createSlice } from '@reduxjs/toolkit';

const ONE_SECOND = 1000;

export const getInitialState = () => {
  const state = {};

  state.setting = {
    main: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreak: false,
    autoStartPomo: false,
    longBreakInterval: 4,
  };

  state.startAt = Date.now();

  state.main = {
    count: 1,
    time: getTime(state.startAt, state.setting.main),
  };

  state.shortBreak = {
    count: 1,
    time: getTime(state.startAt, state.setting.shortBreak),
  };

  state.longBreak = {
    count: 1,
    time: getTime(state.startAt, state.setting.longBreak),
  };

  state.tab = 'main';
  state.isRunning = false;
  state.isFinishedMain = false;

  return state;
};

export const getTime = (start, mins) => {
  return new Date(start + mins * 60000).getTime();
};

const resetState = (state, isRunning = false) => {
  state.isRunning = isRunning;
  state.main.time = getTime(state.startAt, state.setting.main);
  state.shortBreak.time = getTime(state.startAt, state.setting.shortBreak);
  state.longBreak.time = getTime(state.startAt, state.setting.longBreak);
};

const finish = (state) => {
  state[state.tab].count += 1;
  state.isFinishedMain = state.tab === 'main';
  if (
    state.tab === 'main' &&
    state[state.tab].count > 0 &&
    state[state.tab].count % state.setting.longBreakInterval === 0
  ) {
    state.tab = 'longBreak';
  } else if (state.tab === 'main') {
    state.tab = 'shortBreak';
  } else {
    state.tab = 'main';
  }
  resetState(state);
  if (state.setting.autoStartPomo && state.tab === 'main') {
    state.isRunning = true;
  } else if (state.setting.autoStartBreak && state.tab !== 'main') {
    state.isRunning = true;
  }
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState: getInitialState(),
  reducers: {
    start: (state) => {
      state.isRunning = true;
    },
    pause: (state) => {
      state.isRunning = false;
    },
    skip: (state) => {
      finish(state);
    },
    changeTab: (state, action) => {
      state.tab = action.payload;
      resetState(state);
    },
    decrease: (state) => {
      state[state.tab].time -= ONE_SECOND;
      if (state[state.tab].time === state.startAt) {
        finish(state);
      }
    },
    changeSetting: (state, action) => {
      const shouldResetState =
        state.setting[state.tab] !== action.payload[state.tab];

      state.setting = {
        ...state.setting,
        ...action.payload,
      };

      if (shouldResetState) {
        resetState(state, state.isRunning);
      }
    },
  },
});

export const { start, pause, skip, changeTab, decrease, changeSetting } =
  timerSlice.actions;

export default timerSlice.reducer;
