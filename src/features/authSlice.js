import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));  // Store user in local storage
    },
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
