import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserRecentTweets } from '../redux/reducers/userRecentTweetsSlice';
import Tweet from './Tweet';

export default function UserContent() {

	const dispatch = useDispatch();

  const user = useSelector(state => state.user.handle);
	const tweets = useSelector(state => state.userRecentTweets);

  useEffect(() => {
    dispatch(getUserRecentTweets(user));
  }, [user])

  return (
    <div style={styles.container}>
      <div style={styles.tweetsNavContainer}>

      </div>
      <div style={styles.tweetsContainer}>
        {tweets.status === 'idle' && tweets.data.map((tweetData) => (
          <Tweet key={tweetData.id} tweetData={tweetData} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    fontSize: '14px',
    color: '#E7E9EA',
  },
  tweetsNavContainer: {
    display: 'block',
  },
  tweetsContainer: {
    display: 'block',
    overflowY: 'scroll',
    height: '100vh',
  },
}
