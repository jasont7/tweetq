import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMinLikes, setMaxLikes, setMinRetweets, setMaxRetweets,
  setMinReplies, setMaxReplies } from '../../redux/reducers/filterSlice';
import { setFilterVisible, setMinLikesInput, 
  setMaxLikesInput, setMinRetweetsInput, setMaxRetweetsInput,
  setMinRepliesInput, setMaxRepliesInput } from '../../redux/reducers/filterVisibleSlice';
import { createUseStyles } from 'react-jss';

export default function Activity() {

  const dispatch = useDispatch();
  const classes = useStyles();

  const isFilterVisible = useSelector(state => state.filterVisible.isVisible);
  const filterVisibleType = useSelector(state => state.filterVisible.filterType);
  const minLikesInput = useSelector(state => state.filterVisible.minLikesInput);
  const maxLikesInput = useSelector(state => state.filterVisible.maxLikesInput);
  const minRetweetsInput = useSelector(state => state.filterVisible.minRetweetsInput);
  const maxRetweetsInput = useSelector(state => state.filterVisible.maxRetweetsInput);
  const minRepliesInput = useSelector(state => state.filterVisible.minRepliesInput);
  const maxRepliesInput = useSelector(state => state.filterVisible.maxRepliesInput);

  const handleUpdate = () => {
    dispatch(setMinLikes(minLikesInput));
    dispatch(setMaxLikes(maxLikesInput));

    dispatch(setMinRetweets(minRetweetsInput));
    dispatch(setMaxRetweets(maxRetweetsInput));

    dispatch(setMinReplies(minRepliesInput));
    dispatch(setMaxReplies(maxRepliesInput));
  }

  const handleClosePopup = () => {
    dispatch(setFilterVisible({ isVisible: false, filterType: null }));
  }

  // outside click handling code
  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      dispatch(setFilterVisible(false));
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [])

  return (
    <>
    {isFilterVisible && filterVisibleType === "activity" && 
    <div ref={ref} style={styles.popupContainer}>

      <div style={styles.popupHeader}>
        <p style={styles.popupName}>
          Filter by activity
        </p>
        <svg style={styles.closePopup} onClick={handleClosePopup} xmlns="http://www.w3.org/2000/svg"  className="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>

      <div style={styles.mainContainer}>

        <div style={styles.numberInputContainer}>
          <label style={styles.inputLabel}>Likes:</label>
          <input type="number"
            value={minLikesInput}
            onChange={(e) => dispatch(setMinLikesInput(e.target.value))}
            className={classes.numberInput}
            placeholder="Min"
          />
          <label>&nbsp;-&nbsp;</label>
          <input type="number"
            value={maxLikesInput}
            onChange={(e) => dispatch(setMaxLikesInput(e.target.value))}
            className={classes.numberInput}
            placeholder="Max"
          />
        </div>

        <div style={styles.numberInputContainer}>
          <label style={styles.inputLabel}>RT's:</label>
          <input type="number"
            value={minRetweetsInput}
            onChange={(e) => dispatch(setMinRetweetsInput(e.target.value))}
            className={classes.numberInput}
            placeholder="Min"
          />
          <label>&nbsp;-&nbsp;</label>
          <input type="number"
            value={maxRetweetsInput}
            onChange={(e) => dispatch(setMaxRetweetsInput(e.target.value))}
            className={classes.numberInput}
            placeholder="Max"
          />
        </div>

        <div style={styles.numberInputContainer}>
          <label style={styles.inputLabel}>Replies:</label>
          <input type="number"
            value={minRepliesInput}
            onChange={(e) => dispatch(setMinRepliesInput(e.target.value))}
            className={classes.numberInput}
            placeholder="Min"
          />
          <label>&nbsp;-&nbsp;</label>
          <input type="number"
            value={maxRepliesInput}
            onChange={(e) => dispatch(setMaxRepliesInput(e.target.value))}
            className={classes.numberInput}
            placeholder="Max"
          />
        </div>

        <div onClick={handleUpdate} style={styles.searchButton}>
          Search
        </div>

      </div>
    </div>}
    </>
  );
}

const styles = {
  popupContainer: {
    position: 'absolute',
    width: '225px',
    height: '185px',
    marginTop: '35px',
    marginLeft: '-20px',
    zIndex: 1,
    backgroundColor: '#000000',
    color: '#E7E9EA',
    border: '1px solid #44515b',
    borderRadius: '6px',
    boxShadow: '0px 0px 3px 3px rgba(68,81,91,0.5)',
  },
  popupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #44515b',
  },
  popupName: {
    margin: '8px 16px',
    fontSize: '12px',
    fontWeight: '600',
  },
  closePopup: {
    margin: '5px 10px',
    width: '20px',
    height: '20px',
    fill: '#E7E9EA',
    cursor: 'pointer',
  },
  mainContainer: {
    margin: '5px 7px',
    padding: '5px',
  },
  numberInputContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '8px',
  },
  inputLabel: {
    marginRight: '6px',
    fontSize: '12px',
    fontWeight: '500',
  },
  searchButton: {
    cursor: 'pointer',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '10px',
    padding: '4px 0px',
    backgroundColor: '#1D9CEB',
    color: '#E7E9EA',
    border: '1px solid #1D9CEB',
    borderRadius: '6px',
  },
}

const useStyles = createUseStyles({
  numberInput: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '4px 8px',
    fontSize: '14px',
    backgroundColor: '#212327',
    color: '#E7E9EA',
    border: '1px solid #44515b',
    borderRadius: '4px',
    outline: 'none',
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: '0px',
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: '0px',
    },
    '&[type=number]': {
      '-moz-appearance': 'textfield',
    },
  },
})
