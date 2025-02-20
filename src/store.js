import { combineReducers, configureStore } from '@reduxjs/toolkit';
import timerReducer, { getInitialState, getTime } from './features/timerSlice';
import taskReducer from './features/taskSlice';
import settingReducer, { i18n } from './features/settingSlice';
import authReducer from './features/authSlice';
import storage from 'redux-persist/lib/storage';
import { createTransform, persistReducer, persistStore } from 'redux-persist';

const timerTransform = createTransform(
  (inboundState) => {
    return {
      setting: inboundState.setting,
      main: {
        count: inboundState.main.count,
      },
      shortBreak: {
        count: inboundState.shortBreak.count,
      },
      longBreak: {
        count: inboundState.longBreak.count,
      },
    };
  },
  (outboundState) => {
    const initialState = getInitialState();
    const { setting, main, shortBreak, longBreak } = outboundState;
    return {
      ...initialState,
      setting,
      main: {
        count: main.count,
        time: getTime(initialState.startAt, setting.main),
      },
      shortBreak: {
        time: getTime(initialState.startAt, setting.shortBreak),
        count: shortBreak.count,
      },
      longBreak: {
        time: getTime(initialState.startAt, setting.longBreak),
        count: longBreak.count,
      },
    };
  },
  { whitelist: ['timer'] }
);

const settingTransform = createTransform(
  (inboundState) => inboundState,
  (outboundState) => {
    i18n.changeLanguage(outboundState.language);
    return outboundState;
  },
  { whitelist: ['setting'] }
);

const rootPersistConfig = {
  key: 'root',
  storage,
  transforms: [timerTransform, settingTransform],
};

const rootReducer = combineReducers({
  timer: timerReducer,
  task: taskReducer,
  setting: settingReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
