import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import userRecentTweetsReducer from '../components/user_recent_tweets/userRecentTweetsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userRecentTweets: userRecentTweetsReducer,
  },
});
