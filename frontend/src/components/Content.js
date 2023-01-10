import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTweets } from '../redux/reducers/tweetsSlice';
import Tweet from './Tweet';
import Loader from './Loader';

export default function Content() {

	const dispatch = useDispatch();

	const tweets = useSelector(state => state.tweets);
  const filter = useSelector(state => state.filter);

  const [loaderKey, triggerLoaderRerender] = useState(1);

  useEffect(() => {
    dispatch(getTweets(filter));
    triggerLoaderRerender(loaderKey + 1);
  }, [filter])

  return (
    <div style={styles.container}>
      <div style={styles.tweetsContainer}>
        { tweets.data.length == 0 && <Loader key={loaderKey} /> }

        { tweets.data.length > 0 &&
          tweets.data.map((tweet) => 
          <Tweet key={tweet.id} tweetData={tweet} />) }
        
        <div style={styles.emptySpace}></div>
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
    overflow: 'scroll',
    height: '100vh',
    marginRight: '-15px',
  },
  emptySpace: {
    height: '100px',
  }
}
