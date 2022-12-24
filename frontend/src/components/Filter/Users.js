import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { } from '../../redux/reducers/filterSlice';
import { setFilterVisible } from '../../redux/reducers/filterVisibleSlice';

export default function Users() {

  const dispatch = useDispatch();

  const isFilterVisible = useSelector(state => state.filterVisible.isVisible);
  const filterVisibleType = useSelector(state => state.filterVisible.filterType);

  const handleUpdate = () => {

  }

  const handleClosePopup = () => {
    dispatch(setFilterVisible({ isVisible: false, filterType: null }));
  }

  return (
    <>
    {isFilterVisible && filterVisibleType === "users" && 
    <div style={styles.popupContainer}>
      <div style={styles.popupHeader}>
        <p style={styles.popupName}>
          Filter by user
        </p>
        <svg style={styles.closePopup} onClick={handleClosePopup} xmlns="http://www.w3.org/2000/svg"  class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>
      <div style={styles.mainContainer}>

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
    height: '300px',
    marginTop: '35px',
    marginLeft: '90px',
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
    margin: '10px',
    padding: '5px',
  },
}
