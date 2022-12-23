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
      <span style={styles.closePopup} onClick={handleClosePopup}>
        X
      </span>
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
    width: '240px',
    marginTop: '30px',
    marginLeft: '-80px',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    borderRadius: '6px',
  },
  mainContainer: {
    margin: '10px',
    padding: '5px',
  },
  dateInput: {
    appearance: 'none',
    color: '#758182',
    fontSize: '14px',
    border: '1px solid #ecf0f1',
    background: '#ecf0f1',
    padding: '5px',
    display: 'inline-block !important',
    visibility: 'visible !important',
  },
  closePopup: {
    position: 'absolute',
    marginTop: '4px',
    marginRight: '8px',
    right: '0',
    color: '#000000',
    cursor: 'pointer',
    zIndex: 2,
  },
}
