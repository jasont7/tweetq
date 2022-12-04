import { configureStore } from '@reduxjs/toolkit';
import tweetsReducer from './reducers/tweetsSlice';
import filterReducer from './reducers/filterSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    tweets: tweetsReducer,
  },
});
