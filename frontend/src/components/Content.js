import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTweets } from '../redux/reducers/tweetsSlice';
import { createUseStyles } from 'react-jss';
import Tweet from './Tweet';

export default function Content() {

	const dispatch = useDispatch();
  const classes = useStyles();

  const filter = useSelector(state => state.filter);
	const tweets = useSelector(state => state.tweets);

  useEffect(() => {
    dispatch(getTweets(filter));
  }, [filter])

  return (
    <div style={styles.container}>
      <div style={styles.tweetsContainer}>
        { tweets.status === 'loading' &&
        <div style={styles.loadingIconContainer}>
          <div className={classes.loader}></div>
        </div>
        }

        { tweets.status === 'idle' && tweets.data.length === 0 && 
        <div style={styles.noResultsContainer}>
          <p style={styles.noResults}>No Results</p>
        </div>
        }

        { tweets.status === 'idle' && tweets.data.length !== 0 &&
          tweets.data.map((tweet) => 
          <Tweet key={tweet.id} tweetData={tweet} />)
        }
        
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
  loadingIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75%',
  },
  loadingIcon: {
    width: '50px',
  },
  noResultsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75%',
  },
  noResults: {
    fontSize: '16px',
    fontWeight: '500',
    color: 'rgb(91, 112, 131)',
  },
  emptySpace: {
    height: '100px',
  }
}

const useStyles = createUseStyles({
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  loader: {
    border: '6px solid #E7E9EA', /* Light grey */
    borderTop: '6px solid #1D9CEB', /* Blue */
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: '$spin 1.5s linear infinite',
  },
})
