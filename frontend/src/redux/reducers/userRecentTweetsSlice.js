import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

async function fetchRecentTweets(user) {
  const url = `http://localhost:8000/user/recent?user=${user}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export const getUserRecentTweets = createAsyncThunk(
  'userRecentTweets/fetchRecentTweets',
  async (user) => {
    const data = await fetchRecentTweets(user);
    return { user, data };
  }
);

const initialState = {
  status: 'idle',
  user: '',
  data: [],
}

export const userRecentTweetsSlice = createSlice({
  name: 'userRecentTweets',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserRecentTweets.pending, (state) => {
        state.status = 'loading';
        state.user = '';
        state.data = [];
      })
      .addCase(getUserRecentTweets.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.data = action.payload.data;
      });
  },
});

export default userRecentTweetsSlice.reducer;
