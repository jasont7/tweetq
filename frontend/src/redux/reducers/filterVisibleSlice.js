import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  filterType: null,
}

export const filterVisibleSlice = createSlice({
  name: 'filterVisible',
  initialState,
  reducers: {
    setFilterVisible(state, action) {
      state.isVisible = action.payload.isVisible;
      state.filterType = action.payload.filterType;
    },
  },
});

export const { setFilterVisible } = filterVisibleSlice.actions;

export default filterVisibleSlice.reducer;
