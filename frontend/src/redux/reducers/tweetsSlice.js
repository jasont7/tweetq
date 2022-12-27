import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const getTweets = createAsyncThunk(
  'tweets/getTweets',
  async (filter) => {
    if (!filter.users) return [];
    
    const params = buildAdvancedSearchParams(filter);
    const data = await fetchAdvancedSearch(params);
    return data;
  }
);

function buildAdvancedSearchParams(filter) {
  /* Takes the filter state object and returns the params object which
    matches the format required by the search API query parameters. */

  let params = {};

  if (filter.content) {
    params.content = filter.content;
  }

  if (filter.users && filter.users.length) {
    params.users = filter.users.join();
  }

  if (filter.startDate) {
    params.since = filter.startDate;
  }
  if (filter.endDate) {
    params.until = filter.endDate;
  }

  if (filter.hideReplies == true) {
    params.hide_replies = true;
  }

  if (filter.minLikes) {
    params.min_faves = filter.minLikes;
  }
  if (filter.maxLikes) {
    params.max_faves = filter.maxLikes;
  }

  if (filter.minRetweets) {
    params.min_retweets = filter.minRetweets;
  }
  if (filter.maxRetweets) {
    params.max_retweets = filter.maxRetweets;
  }

  if (filter.minReplies) {
    params.min_replies = filter.minReplies;
  }
  if (filter.maxReplies) {
    params.max_replies = filter.maxReplies;
  }

  if (filter.location) {
    params.location = filter.location;
  }
  if (filter.within) {
    params.within = filter.within;
  }
  
  return params;
}

async function fetchAdvancedSearch(params) {
  const url = `http://localhost:8000/search?`;
  const response = await fetch(url + new URLSearchParams(params));
  const data = await response.json();
  return data;
}

export default tweetsSlice.reducer;
