import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTweets } from '../redux/reducers/tweetsSlice';
import Tweet from './Tweet';

export default function UserContent() {

	const dispatch = useDispatch();

  const filter = useSelector(state => state.filter);
	const tweets = useSelector(state => state.tweets);

  useEffect(() => {
    dispatch(getTweets(filter));
  }, [filter])

  return (
    <div style={styles.container}>
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
  tweetsContainer: {
    display: 'block',
    overflowY: 'scroll',
    height: '100vh',
  },
}
