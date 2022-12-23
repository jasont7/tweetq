import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterVisible } from '../../redux/reducers/filterVisibleSlice';
import TimeRange from './TimeRange';
import Users from './Users';
import Geo from './Geo';
import More from './More';

export default function FilterBar() {

  const dispatch = useDispatch();

  const isFilterVisible = useSelector(state => state.filterVisible.isVisible);
  const filterVisibleType = useSelector(state => state.filterVisible.filterType);

  const handleOptionClick = (type) => {
    dispatch(setFilterVisible({ isVisible: !isFilterVisible, filterType: type }))
  }

  return (
    <>
      <span style={styles.filterOption} onClick={() => handleOptionClick("time-range")}>
        Time Range ▼
      </span>
      <span style={styles.filterOption} onClick={() => handleOptionClick("users")}>
        Users ▼
      </span>
      <span style={styles.filterOption} onClick={() => handleOptionClick("geo")}>
        Geo ▼
      </span>
      <span style={styles.filterOption} onClick={() => handleOptionClick("more")}>
        More ▼
      </span>

      {isFilterVisible && filterVisibleType === "time-range" && <TimeRange />}
      {isFilterVisible && filterVisibleType === "users" && <Users />}
      {isFilterVisible && filterVisibleType === "geo" && <Geo />}
      {isFilterVisible && filterVisibleType === "more" && <More />}
    </>
  );
}

const styles = {
  filterOption: {
    fontWeight: '500',
    margin: '10px',
    cursor: 'pointer',
  },
}
