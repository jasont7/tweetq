import React from 'react';
import { createUseStyles } from 'react-jss';
import QuoteTweet from './QuoteTweet';

export default function Tweet({ tweetData, index, usersLength }) {

  const classes = useStyles();

  const formatNumber = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e4) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e4 && n < 1e6) return +(n / 1e3).toFixed(0) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

  const processTweetContent = (string) => {
    // remove http/https links
    string = string.replace(/(?:https?):\/\/[\n\S]+/g, '');

    // remove twitter.com links
    string = string.replace(/\btwitter.com\S+/g, '');

    // wrap @ tags and hashtags with <span>
    let tags = string.match(/\@[A-Za-z\d_]+|\#[A-Za-z\d]+/g);
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
    <>
    { index === 0 && usersLength > 1 && 
      <span className={classes.title}>Tweets</span> }
    
    <a href={tweetData.url} className={classes.contentLink}>
      <div className={classes.container}>

        <div className={classes.profilePicContainer}>
          <a href={tweetData.user.url}>
            <img src={tweetData.user.profileImageUrl} className={classes.profilePic} />
          </a>
        </div>

        <div className={classes.contentContainer}>

          <div className={classes.header}>
            <a href={tweetData.user.url} className={classes.userDisplayName}>
              {tweetData.user.displayname}
            </a>

            <span className={classes.userHandle}>
              @{tweetData.user.username} · 
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

            { tweetData.quotedTweet && 
            <QuoteTweet tweetData={tweetData.quotedTweet} /> 
            }

            <div className={classes.tweetActions}>
              <div className={classes.commentContainer}>
                <div className={classes.commentIcon}>
                  <svg viewBox="0 0 24 24" className={classes.commentIconSVG}><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
                </div>
                {formatNumber(tweetData.replyCount)}
              </div>

              <div className={classes.retweetContainer}>
                {/* TODO: hover color */}
                <div className={classes.retweetIcon}>
                  <svg viewBox="0 0 24 24" className={classes.retweetIconSVG}><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
                </div>
                {formatNumber(tweetData.retweetCount)}
              </div>

              <div className={classes.likeContainer}>
                {/* TODO: hover color */}
                <div className={classes.likeIcon}>
                <svg viewBox="0 0 24 24" className={classes.likeIconSVG}><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                </div>
                {formatNumber(tweetData.likeCount)}
              </div>

              <span className={classes.copyLink} onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(tweetData.url);
              }}>
                copy link
              </span>

            </div>
          </div>
        </div>
      </div>
    </a>
    </>
  );
}

const useStyles = createUseStyles({
  title: {
    display: 'inline-block',
    paddingTop: '10px',
    paddingBottom: '4px',
    paddingLeft: '10px',
    fontSize: '15px',
    fontWeight: '600',
    color: 'rgb(91, 112, 131)',
  },
  contentLink: {
    textDecoration: 'none',
  },
  container: {
    display: 'flex',
    position: 'relative',
    color: '#E7E9EA',
    padding: '10px 15px 10px 10px',
    borderBottom: 'thin solid rgb(56, 68, 77)',
    '&:hover': {
      backgroundColor: '#15181c',
    },
  },
  profilePicContainer: {
    display: 'block',
    flex: '0 0 35px',
  },
  profilePic: {
    height: '2em',
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
    '&:hover': {
      textDecoration: 'solid underline #E7E9EA 1.5px',
    },
  },
  userHandle: {
    marginLeft: '5px',
    fontWeight: 'normal',
    color: 'rgb(91, 112, 131)',
    textDecoration: 'none',
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
    width: '300px',
    objectFit: 'cover',
    marginBottom: '10px',
    border: 'thin solid rgb(56, 68, 77)',
    borderRadius: '6px',
  },
  tweetActions: {
    display: 'flex',
    fontSize: '13px',
    color: 'rgb(91, 112, 131)',
  },
  commentContainer: {
    display: 'inline-block',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0px',
  },
  commentIcon: {
    display: 'inline-block',
    marginRight: '3px',
    pointerEvents: 'none',
  },
  commentIconSVG: {
    display: 'inline-block',
    position: 'relative',
    height: '1.25em',
    width: '1.25em',
    maxWidth: '100%',
    verticalAlign: 'text-bottom',
    fill: 'currentcolor',
    userSelect: 'none',
  },
  retweetContainer: {
    display: 'inline-block',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0px',
  },
  retweetIcon: {
    display: 'inline-block',
    marginRight: '3px',
    pointerEvents: 'none',
  },
  retweetIconSVG: {
    display: 'inline-block',
    position: 'relative',
    height: '1.25em',
    width: '1.25em',
    maxWidth: '100%',
    verticalAlign: 'text-bottom',
    fill: 'currentcolor',
    userSelect: 'none',
  },
  likeContainer: {
    display: 'inline-block',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0px',
  },
  likeIcon: {
    display: 'inline-block',
    marginRight: '3px',
    pointerEvents: 'none',
  },
  likeIconSVG: {
    display: 'inline-block',
    position: 'relative',
    height: '1.25em',
    width: '1.25em',
    maxWidth: '100%',
    verticalAlign: 'text-bottom',
    fill: 'currentcolor',
    userSelect: 'none',
  },
  copyLink: {
    '&:hover': {
      textDecoration: 'underline',
    }
  }
});
