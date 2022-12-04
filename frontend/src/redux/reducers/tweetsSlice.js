import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

async function fetchAdvancedSearch(filter) {
  const url = `http://localhost:8000/search?`;
  const response = await fetch(url + new URLSearchParams({
    content: filter.content,
    users: filter.users.join(),
  }));
  const data = await response.json();
  return data;
}

export const getTweets = createAsyncThunk(
  'tweets/getTweets',
  async (filter) => {
    const data = await fetchAdvancedSearch(filter);
    return data;
  }
);

const initialState = {
  status: 'idle',
  data: [],
}

export const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTweets.pending, (state) => {
        state.status = 'loading';
        state.data = [];
      })
      .addCase(getTweets.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      });
  },
});

export default tweetsSlice.reducer;
