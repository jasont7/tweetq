import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLocation, setWithin } from '../../redux/reducers/filterSlice';
import { setFilterVisible, setLocationInput, setWithinInput } from '../../redux/reducers/filterVisibleSlice';

export default function Geo() {

  const dispatch = useDispatch();

  const isFilterVisible = useSelector(state => state.filterVisible.isVisible);
  const filterVisibleType = useSelector(state => state.filterVisible.filterType);
  const locationInput = useSelector(state => state.filterVisible.locationInput);
  const withinInput = useSelector(state => state.filterVisible.withinInput);

  const handleUpdate = () => {
    dispatch(setLocation(locationInput));
    dispatch(setWithin(withinInput));
  }

  const handleClosePopup = () => {
    dispatch(setFilterVisible({ isVisible: false, filterType: null }));
  }

  return (
    <>
    {isFilterVisible && filterVisibleType === "geo" && 
    <div style={styles.popupContainer}>
      <span style={styles.closePopup} onClick={handleClosePopup}>
        X
      </span>
      <div style={styles.mainContainer}>
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
    width: '175px',
    height: '150px',
    marginTop: '30px',
    marginLeft: '10px',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    borderRadius: '6px',
  },
  mainContainer: {
    margin: '10px',
    padding: '5px',
  },
  textInputContainer: {
    marginBottom: '5px',
  },
  filterLabel: {
    color: '#000000',
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
