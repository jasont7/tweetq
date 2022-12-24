import React from 'react';
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

  return (
    <>
    {isFilterVisible && filterVisibleType === "time-range" && 
    <div style={styles.popupContainer}>
      <div style={styles.popupHeader}>
        <p style={styles.popupName}>
          Filter by time range
        </p>
        <svg style={styles.closePopup} onClick={handleClosePopup} xmlns="http://www.w3.org/2000/svg"  class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>
      <div style={styles.mainContainer}>
        <input 
          type="date" 
          id="start" 
          style={styles.dateInput}
          value={startDateInput}
          onChange={(e) => dispatch(setStartDateInput(e.target.value))}
          min="2006-01-01"
          max={new Date().toISOString().slice(0, 10)}
        />
        <input 
          type="date" 
          id="end" 
          style={styles.dateInput}
          value={endDateInput}
          onChange={(e) => dispatch(setEndDateInput(e.target.value))}
          min="2006-01-01"
          max={new Date().toISOString().slice(0, 10)}
        />
        <button onClick={handleUpdate}>
          Update Search
        </button>
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
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    borderRadius: '6px',
  },
  popupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #D8DEE4',
  },
  popupName: {
    margin: '8px 16px',
    color: '#242A30',
    fontSize: '12px',
    fontWeight: '600',
  },
  closePopup: {
    margin: '5px 10px',
    width: '20px',
    height: '20px',
    fill: '#57606a',
    cursor: 'pointer',
  },
  mainContainer: {
    margin: '5px 10px',
    padding: '5px',
  },
  dateInput: {
    display: 'inline-block !important',
    marginBottom: '8px',
    padding: '5px',
    width: '110px',
    fontSize: '14px',
    background: '#ecf0f1',
    color: '#758182',
    border: '1px solid #ecf0f1',
    borderRadius: '6px',
  },
}
