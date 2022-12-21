import { configureStore } from '@reduxjs/toolkit';
import tweetsReducer from './reducers/tweetsSlice';
import filterReducer from './reducers/filterSlice';
import filterVisibleSlice from './reducers/filterVisibleSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    filterVisible: filterVisibleSlice,
    tweets: tweetsReducer,
  },
});
