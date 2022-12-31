import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHideReplies, setLocation, setWithin } from '../../redux/reducers/filterSlice';
import { setHideRepliesInput, setFilterVisible, setLocationInput, 
  setWithinInput } from '../../redux/reducers/filterVisibleSlice';

export default function More() {

  const dispatch = useDispatch();

  const isFilterVisible = useSelector(state => state.filterVisible.isVisible);
  const filterVisibleType = useSelector(state => state.filterVisible.filterType);
  const hideRepliesInput = useSelector(state => state.filterVisible.hideRepliesInput);
  const locationInput = useSelector(state => state.filterVisible.locationInput);
  const withinInput = useSelector(state => state.filterVisible.withinInput);

  const handleUpdate = () => {
    dispatch(setHideReplies(hideRepliesInput));
    dispatch(setLocation(locationInput));
    dispatch(setWithin(withinInput));
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
    {isFilterVisible && filterVisibleType === "more" && 
    <div ref={ref} style={styles.popupContainer}>

      <div style={styles.popupHeader}>
        <p style={styles.popupName}>
          More filters
        </p>
        <svg style={styles.closePopup} onClick={handleClosePopup} xmlns="http://www.w3.org/2000/svg"  class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>

      <div style={styles.mainContainer}>

        <div style={styles.checkboxInputContainer}>
          <label style={styles.inputLabel}>Hide Replies</label>
          <input type="checkbox" 
            defaultChecked={hideRepliesInput} 
            onChange={() => dispatch(setHideRepliesInput(!hideRepliesInput))}
            style={styles.checkboxInput}
          />
        </div>

        <div style={styles.divider} />

        <div style={styles.textInputContainer}>
          <label style={styles.inputLabel}>Near:</label>
          <input type="text"
            value={locationInput}
            onChange={(e) => dispatch(setLocationInput(e.target.value))}
            style={styles.textInput}
            placeholder="London, LA, ..."
          />
        </div>

        <div style={styles.textInputContainer}>
          <label style={styles.inputLabel}>Within:</label>
          <input type="text"
            value={withinInput}
            onChange={(e) => dispatch(setWithinInput(e.target.value))}
            style={styles.textInput}
            placeholder="1km, 2mi, ..."
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
    width: '200px',
    height: '180px',
    marginTop: '35px',
    marginLeft: '130px',
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
    margin: '5px 10px',
    padding: '5px',
  },
  checkboxInputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '7px',
    // border: '1px solid white',
  },
  checkboxInput: {
    colorScheme: 'dark',
  },
  textInputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  inputLabel: {
    marginRight: '6px',
    fontWeight: '500',
  },
  textInput: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '4px 8px',
    fontSize: '14px',
    backgroundColor: '#212327',
    color: '#E7E9EA',
    border: '1px solid #44515b',
    borderRadius: '4px',
    outline: 'none',
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
  divider: {
    borderBottom: '1px solid #44515b',
    marginBottom: '7px',
  }
}
