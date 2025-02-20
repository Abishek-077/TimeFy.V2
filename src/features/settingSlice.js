import { createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { getI18n, initReactI18next } from 'react-i18next';
import en from '../locales/en/translation.json';
import vi from '../locales/vi/translation.json';

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

const getInitialState = () => {
  const state = {};

  state.language = 'en';

  return state;
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState: getInitialState(),
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
      getI18n().changeLanguage(state.language);
    },
  },
});

export const { changeLanguage } = settingSlice.actions;

export const i18n = getI18n();

export default settingSlice.reducer;
