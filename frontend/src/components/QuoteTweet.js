import React from 'react';
import { createUseStyles } from 'react-jss';

export default function QuoteTweet({ tweetData }) {

  const classes = useStyles();

  const processTweetContent = (string) => {
    // remove http/https links
    string = string.replace(/(?:https?):\/\/[\n\S]+/g, '');

    // remove twitter.com links
    string = string.replace(/\btwitter.com\S+/g, '');

    // wrap @ tags and hashtags with <span>
    let tags = string.match(/\@[A-Za-z\d]+|\#[A-Za-z\d]+/g);
    if (tags) {
      for (let tag of tags) {
        string = string.replace(tag, `<span>${tag}</span>`);
      }
    }

    // decode html entities
    let txt = document.createElement("textarea");
    txt.innerHTML = string;
    string = txt.value;

    return string;
  }

  return (
    <div className={classes.container}>

      <div className={classes.profilePicContainer}>
        <img src={tweetData.user.profileImageUrl} className={classes.profilePic} />
      </div>

      <div className={classes.contentContainer}>

        <div className={classes.header}>
          <span className={classes.userDisplayName}>
            {tweetData.user.displayname}
          </span>
          <span className={classes.postDate}>
            {new Date(tweetData.date.slice(0, 10)).toLocaleDateString('en-us', {month:"short", day:"numeric", year:"numeric"}) }
          </span>
        </div>

        <div className={classes.content}>
          <div className={classes.tweetText}>
            <span className={classes.tweetTextSpan} 
              dangerouslySetInnerHTML={{ __html: processTweetContent(tweetData.renderedContent) }}
            />
          </div>

          { tweetData.media && 'fullUrl' in tweetData.media[0] &&
          <img src={tweetData.media[0].fullUrl} className={classes.tweetMedia} /> 
          }

          { tweetData.media && 'thumbnailUrl' in tweetData.media[0] &&
          <img src={tweetData.media[0].thumbnailUrl} className={classes.tweetMedia} /> 
          }
        </div>
      </div>
    </div>
  );
}

const useStyles = createUseStyles({
  contentLink: {
    textDecoration: 'none',
  },
  container: {
    display: 'flex',
    position: 'relative',
    color: '#E7E9EA',
    padding: '10px 15px 5px 10px',
    margin: '10px 0px',
    border: 'thin solid rgb(56, 68, 77)',
    borderRadius: '6px',
    '&:hover': {
      backgroundColor: '#15181c',
    },
  },
  profilePicContainer: {
    display: 'block',
    flex: '0 0 30px',
  },
  profilePic: {
    height: '1.75em',
    borderRadius: '50%',
  },
  contentContainer: {
    display: 'block',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '0px',
  },
  header: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  userDisplayName: {
    display: 'inline',
    textDecoration: 'none',
    color: '#E7E9EA',
  },
  postDate: {
    marginLeft: '5px',
    fontWeight: 'normal',
    color: 'rgb(91, 112, 131)',
    textDecoration: 'none',
  },
  content: {
    display: 'block',
  },
  tweetText: {
    marginBottom: '7px',
    whiteSpace: 'pre-wrap',
  },
  tweetTextSpan: {
    '& span': {
      color: '#1d9bf0',
    },
  },
  tweetMedia: {
    height: '150px',
    width: '100%',
    objectFit: 'cover',
    marginBottom: '10px',
    border: 'thin solid rgb(56, 68, 77)',
    borderRadius: '6px',
  },
});
