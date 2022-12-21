import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterVisible } from '../../redux/reducers/filterVisibleSlice';
import TimeRange from './TimeRange';
import Users from './Users';
import Sort from './Sort';
import Extra from './Extra';

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
      <span style={styles.filterOption} onClick={() => handleOptionClick("sort")}>
        Sort ▼
      </span>
      <span style={styles.filterOption} onClick={() => handleOptionClick("extra")}>
        Extra ▼
      </span>

      {isFilterVisible && filterVisibleType === "time-range" && <TimeRange />}
      {isFilterVisible && filterVisibleType === "users" && <Users />}
      {isFilterVisible && filterVisibleType === "sort" && <Sort />}
      {isFilterVisible && filterVisibleType === "extra" && <Extra />}
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
