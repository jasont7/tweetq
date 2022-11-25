import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchRecentTweets } from './userRecentTweetsAPI';

const initialState = {
  status: 'idle',
  user: '',
  tweets: [],
};

export const getUserRecentTweets = createAsyncThunk(
  'userRecentTweets/fetchRecentTweets',
  async (user) => {
    const tweets = await fetchRecentTweets(user);
    return { tweets, user };
  }
);

export const userRecentTweetsSlice = createSlice({
  name: 'userRecentTweets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserRecentTweets.pending, (state) => {
        state.status = 'loading';
        state.user = '';
        state.tweets = [];
      })
      .addCase(getUserRecentTweets.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.tweets = action.payload.tweets;
      });
  },
});

// export const { } = counterSlice.actions;

export const selectUserRecentTweets = (state) => state.userRecentTweets;

export default userRecentTweetsSlice.reducer;
