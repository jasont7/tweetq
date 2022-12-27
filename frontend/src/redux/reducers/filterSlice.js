import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: "",
  users: null,
  startDate: "",
  endDate: "",
  hideReplies: true,
  minLikes: "",
  maxLikes: "",
  minRetweets: "",
  maxRetweets: "",
  minReplies: "",
  maxReplies: "",
  location: "",
  within: "",
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setContent(state, action) {
      state.content = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    addUser(state, action) {
      if (!state.users.includes(action.payload))
        state.users.push(action.payload);
    },
    removeUser(state, action) {
      state.users = state.users.filter(user => user !== action.payload);
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    setHideReplies(state, action) {
      state.hideReplies = action.payload;
    },
    setMinLikes(state, action) {
      state.minLikes = action.payload;
    },
    setMaxLikes(state, action) {
      state.maxLikes = action.payload;
    },
    setMinRetweets(state, action) {
      state.minRetweets = action.payload;
    },
    setMaxRetweets(state, action) {
      state.maxRetweets = action.payload;
    },
    setMinReplies(state, action) {
      state.minReplies = action.payload;
    },
    setMaxReplies(state, action) {
      state.maxReplies = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setWithin(state, action) {
      state.within = action.payload;
    },
  },
});

export const { setContent, setUsers, addUser, removeUser, setStartDate, setEndDate, 
  setHideReplies, setMinLikes, setMaxLikes, setMinRetweets, setMaxRetweets,
  setMinReplies, setMaxReplies, setLocation, setWithin } = filterSlice.actions;

export default filterSlice.reducer;
