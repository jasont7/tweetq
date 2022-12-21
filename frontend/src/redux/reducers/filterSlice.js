import { createSlice } from '@reduxjs/toolkit';

const defaultDays = 7;
const startDate = new Date(Date.now() - (defaultDays * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
const endDate = new Date().toISOString().split('T')[0];

const initialState = {
  content: "",
  users: null,
  dateRange: [startDate, endDate],
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
    setUsers(state, action) {
      state.users = action.payload;
    },
    setDateRange(state, action) {
      state.dateRange = action.payload;
    },
  },
});

export const { 
  setContent, setSingleUser, setUsers, setDateRange
} = filterSlice.actions;

export default filterSlice.reducer;
