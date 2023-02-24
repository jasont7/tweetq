import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTweets } from '../redux/reducers/tweetsSlice';
import { getUsers } from '../redux/reducers/usersSlice';
import Tweet from './Tweet';
import User from './User';
import Loader from './Loader';

export default function Content() {

	const dispatch = useDispatch();

	const tweets = useSelector(state => state.tweets);
  const users = useSelector(state => state.users);
  const filter = useSelector(state => state.filter);

  const [loaderKey, triggerLoaderRerender] = useState(1);

  useEffect(() => {
    dispatch(getTweets(filter));
    dispatch(getUsers(filter.content));
    triggerLoaderRerender(loaderKey + 1);
  }, [filter])

  const dummyUsers = [
    {
      "id": 970812776,
      "id_str": "970812776",
      "verified": false,
      "badges": [],
      "is_dm_able": false,
      "is_blocked": false,
      "can_media_tag": false,
      "name": "Jason",
      "screen_name": "jasonth0",
      "profile_image_url": "http://pbs.twimg.com/profile_images/1627413354758438912/Whnk-GM-_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/1627413354758438912/Whnk-GM-_normal.jpg",
      "location": "☁️",
      "is_protected": false,
      "rounded_score": 0,
      "social_proof": 0,
      "connecting_user_count": 0,
      "connecting_user_ids": [],
      "social_proofs_ordered": [],
      "social_context": {
        "following": false,
        "followed_by": false
      },
      "tokens": [],
      "inline": false
    },
    {
      "id": 788065764255211500,
      "id_str": "788065764255211520",
      "verified": false,
      "badges": [],
      "is_dm_able": false,
      "is_blocked": false,
      "can_media_tag": false,
      "name": "Jason Warner",
      "screen_name": "jasoncwarner",
      "profile_image_url": "http://pbs.twimg.com/profile_images/1538765024021258240/qXJBzw6U_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/1538765024021258240/qXJBzw6U_normal.jpg",
      "location": "Victoria BC",
      "is_protected": false,
      "rounded_score": 0,
      "social_proof": 0,
      "connecting_user_count": 0,
      "connecting_user_ids": [],
      "social_proofs_ordered": [],
      "social_context": {
        "following": true,
        "followed_by": false
      },
      "tokens": [],
      "inline": false,
      "result_context": {
        "display_string": "Following",
        "types": [
          {
            "type": "follow_relationship"
          }
        ]
      }
    },
    {
      "id": 3840,
      "id_str": "3840",
      "verified": true,
      "badges": [
        {
          "badge_url": "https://pbs.twimg.com/profile_images/1625519166248701954/SBm0PofP_bigger.jpg",
          "badge_type": "BusinessLabel",
          "description": "The All-In Podcast"
        }
      ],
      "is_dm_able": false,
      "is_blocked": false,
      "can_media_tag": false,
      "name": "@jason",
      "screen_name": "Jason",
      "profile_image_url": "http://pbs.twimg.com/profile_images/1483572454979031040/HZgTqHjX_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/1483572454979031040/HZgTqHjX_normal.jpg",
      "location": "California, USA",
      "is_protected": false,
      "rounded_score": 0,
      "social_proof": 0,
      "connecting_user_count": 0,
      "connecting_user_ids": [],
      "social_proofs_ordered": [],
      "social_context": {
        "following": false,
        "followed_by": false
      },
      "tokens": [],
      "inline": false
    },
    {
      "id": 19018401,
      "id_str": "19018401",
      "verified": true,
      "badges": [],
      "is_dm_able": false,
      "is_blocked": false,
      "can_media_tag": false,
      "name": "Jason MMRRRaz",
      "screen_name": "jason_mraz",
      "profile_image_url": "http://pbs.twimg.com/profile_images/1623045972283781121/GMn_dVGt_normal.jpg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/1623045972283781121/GMn_dVGt_normal.jpg",
      "location": "Earth",
      "is_protected": false,
      "rounded_score": 0,
      "social_proof": 0,
      "connecting_user_count": 0,
      "connecting_user_ids": [],
      "social_proofs_ordered": [],
      "social_context": {
        "following": false,
        "followed_by": false
      },
      "tokens": [],
      "inline": false
    },
  ]

  return (
    <div style={styles.container}>
      <div style={styles.tweetsContainer}>
        { users.data.length > 1 &&
          users.data.slice(0, 4).map((user, index) => 
            <User key={user.id} userData={user} index={index} />) }

        { tweets.data.length == 0 && <Loader key={loaderKey} /> }
        { tweets.data.length > 0 &&
          tweets.data.map((tweet, index) => 
            <Tweet key={tweet.id} tweetData={tweet} index={index} usersLength={users.data.length} />) }
        
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
