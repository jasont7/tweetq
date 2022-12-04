import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: "",
  users: [null],
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setContent(state, action) {
      state.content = action.payload;
    },
    setSingleUser(state, action) {
      state.users = [action.payload];
    },
  },
});

export const { setContent, setSingleUser } = filterSlice.actions;

export default filterSlice.reducer;
