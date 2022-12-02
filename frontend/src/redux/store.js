import { configureStore } from '@reduxjs/toolkit';
import userRecentTweetsReducer from './reducers/userRecentTweetsSlice';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    userRecentTweets: userRecentTweetsReducer,
  },
});
