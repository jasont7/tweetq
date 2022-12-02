import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  handle: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
        state.handle = action.payload;  // change to action.payload.handle in the future
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
