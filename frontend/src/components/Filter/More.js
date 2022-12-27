import React from 'react';
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

  return (
    <>
    {isFilterVisible && filterVisibleType === "more" && 
    <div style={styles.popupContainer}>
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
          <input type="checkbox" 
            defaultChecked={hideRepliesInput} 
            onChange={() => dispatch(setHideRepliesInput(!hideRepliesInput))}
          />
          <label style={styles.filterLabel}>Hide Replies</label>
        </div>

        <div style={styles.textInputContainer}>
          <input type="text"
            value={locationInput}
            onChange={(e) => dispatch(setLocationInput(e.target.value))}
            placeholder="Near"
          />
        </div>

        <div style={styles.textInputContainer}>
          <input type="text"
            value={withinInput}
            onChange={(e) => dispatch(setWithinInput(e.target.value))}
            placeholder="Within"
          />
        </div>

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
    height: '150px',
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
    margin: '10px',
    padding: '5px',
  },
  checkboxInputContainer: {
    marginBottom: '5px',
  },
  textInputContainer: {
    marginBottom: '5px',
  },
  filterLabel: {
    
  },
}
