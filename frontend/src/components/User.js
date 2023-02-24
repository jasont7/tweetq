import React from 'react';
import { createUseStyles } from 'react-jss';

export default function User({ userData, index }) {

  const classes = useStyles();

  return (
    <>
      { index === 0 && <span className={classes.title}>Users</span> }
      
      <a href={`https://twitter.com/${userData.screen_name}`} className={classes.contentLink}>
        <div className={classes.container}>

          <img src={userData.profile_image_url_https}
            className={classes.profilePic} />
          
          <span className={classes.name}>{userData.name}</span>

          <span className={classes.handle}>@{userData.screen_name}</span>

        </div>
      </a>
    </>
  );
}

const useStyles = createUseStyles({
  title: {
    display: 'inline-block',
    padding: '4px 10px',
    fontSize: '15px',
    fontWeight: '600',
    color: 'rgb(91, 112, 131)',
  },
  contentLink: {
    textDecoration: 'none',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    color: '#E7E9EA',
    padding: '7px 10px',
    borderBottom: 'thin solid rgb(56, 68, 77)',
    '&:hover': {
      backgroundColor: '#15181c',
    },
  },
  profilePic: {
    height: '1.75em',
    borderRadius: '50%',
  },
  name: {
    paddingLeft: '8px',
    fontWeight: 'bold',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  handle: {
    paddingLeft: '6px',
    color: 'rgb(91, 112, 131)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
});
