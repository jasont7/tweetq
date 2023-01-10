import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

export default function Loader() {

  const classes = useStyles();

  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(false);
    }, 3000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      { isShown &&
      <div style={styles.loadingIconContainer}>
        <div className={classes.loader}></div>
      </div> }

      { !isShown &&
      <div style={styles.noResultsContainer}>
        <p style={styles.noResults}>No Results</p>
      </div> }
    </>
  );
}

const styles = {
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
