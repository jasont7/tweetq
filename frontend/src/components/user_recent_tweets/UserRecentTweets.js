import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserRecentTweets, selectUserRecentTweets } from './userRecentTweetsSlice';

export function UserRecentTweets() {
	const dispatch = useDispatch();
	const tweets = useSelector(selectUserRecentTweets);
  const [user, setUser] = useState('');

  useEffect(() => {
    console.log(tweets.tweets);
  }, [tweets])

  return (
    <div>
      <div>
        <input
          aria-label="User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <button
          onClick={() => dispatch(getUserRecentTweets(user))}
        >
          Get User Recent Tweets
        </button>
        <ul>
          {tweets.tweets.length !== 0 && tweets.tweets.map((tweet) => (
            <li>{tweet.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
