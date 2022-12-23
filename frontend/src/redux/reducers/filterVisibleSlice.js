import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  filterType: null,
  startDateInput: "",
  endDateInput: "",
  hideRepliesInput: true,
  minLikesInput: "",
  maxLikesInput: "",
  minRetweetsInput: "",
  maxRetweetsInput: "",
  minRepliesInput: "",
  maxRepliesInput: "",
  locationInput: "",
  withinInput: "",
}

export const filterVisibleSlice = createSlice({
  name: 'filterVisible',
  initialState,
  reducers: {
    setFilterVisible(state, action) {
      state.isVisible = action.payload.isVisible;
      state.filterType = action.payload.filterType;
    },
    setStartDateInput(state, action) {
      state.startDateInput = action.payload;
    },
    setEndDateInput(state, action) {
      state.endDateInput = action.payload;
    },
    setHideRepliesInput(state, action) {
      state.hideRepliesInput = action.payload;
    },
    setMinLikesInput(state, action) {
      state.minLikesInput = action.payload;
    },
    setMaxLikesInput(state, action) {
      state.maxLikesInput = action.payload;
    },
    setMinRetweetsInput(state, action) {
      state.minRetweetsInput = action.payload;
    },
    setMaxRetweetsInput(state, action) {
      state.maxRetweetsInput = action.payload;
    },
    setMinRepliesInput(state, action) {
      state.minRepliesInput = action.payload;
    },
    setMaxRepliesInput(state, action) {
      state.maxRepliesInput = action.payload;
    },
    setLocationInput(state, action) {
      state.locationInput = action.payload;
    },
    setWithinInput(state, action) {
      state.withinInput = action.payload;
    },
  },
});

export const { setFilterVisible, setStartDateInput, setEndDateInput, 
  setHideRepliesInput, setMinLikesInput, setMaxLikesInput, setMinRetweetsInput, 
  setMaxRetweetsInput, setMinRepliesInput, setMaxRepliesInput,
  setLocationInput, setWithinInput } = filterVisibleSlice.actions;

export default filterVisibleSlice.reducer;
