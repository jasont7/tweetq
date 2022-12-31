import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEndDate, setStartDate } from '../../redux/reducers/filterSlice';
import { setFilterVisible, setStartDateInput, setEndDateInput } from '../../redux/reducers/filterVisibleSlice';

export default function TimeRange() {

  const dispatch = useDispatch();

  const isFilterVisible = useSelector(state => state.filterVisible.isVisible);
  const filterVisibleType = useSelector(state => state.filterVisible.filterType);
  const startDateInput = useSelector(state => state.filterVisible.startDateInput);
  const endDateInput = useSelector(state => state.filterVisible.endDateInput);

  const handleUpdate = () => {
    dispatch(setStartDate(startDateInput));
    dispatch(setEndDate(endDateInput));
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
    {isFilterVisible && filterVisibleType === "time-range" && 
    <div ref={ref} style={styles.popupContainer}>

      <div style={styles.popupHeader}>
        <p style={styles.popupName}>
          Filter by time range
        </p>
        <svg style={styles.closePopup} onClick={handleClosePopup} xmlns="http://www.w3.org/2000/svg"  class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>

      <div style={styles.mainContainer}>

        <div style={styles.dateInputContainer}>
          <label style={styles.inputLabel}>From:</label>
          <input 
            type="date" 
            id="start" 
            style={styles.dateInput}
            value={startDateInput}
            onChange={(e) => dispatch(setStartDateInput(e.target.value))}
            min="2006-01-01"
            max={new Date().toISOString().slice(0, 10)}
          />
        </div>

        <div style={styles.dateInputContainer}>
          <label style={styles.inputLabel}>To:</label>
          <input 
            type="date" 
            id="end" 
            style={styles.dateInput}
            value={endDateInput}
            onChange={(e) => dispatch(setEndDateInput(e.target.value))}
            min="2006-01-01"
            max={new Date().toISOString().slice(0, 10)}
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
    height: '155px',
    marginTop: '35px',
    marginLeft: '-125px',
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
  dateInputContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '8px',
  },
  dateInput: {
    display: 'inline-block',
    padding: '5px',
    width: '110px',
    colorScheme: 'dark',
    border: '1px solid #44515b',
    borderRadius: '6px',
  },
  inputLabel: {
    marginRight: '8px',
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
  }
}
