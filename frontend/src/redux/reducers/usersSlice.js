import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authTokens } from '../..';

const initialState = {
  status: 'loading',
  data: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
        state.data = [];
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      });
  },
});

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (query) => {
    const data = await fetchSearchUsers(query);
    return data;
  }
);

async function fetchSearchUsers(query) {
  const url = `https://twitter.com/i/api/1.1/search/typeahead.json?q=${query}&src=search_box&result_type=users`;
  const response = await fetch(url, {
    "method": "GET",
    "headers": {
      "authorization": authTokens.bearer,
      "x-csrf-token": authTokens.csrf,
      "x-twitter-active-user": "yes",
      "x-twitter-auth-type": "OAuth2Session",
      "x-twitter-client-language": "en"
    },
  });
  const data = await response.json();
  return data;
}

export default usersSlice.reducer;
