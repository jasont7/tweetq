import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterVisible } from '../../redux/reducers/filterVisibleSlice';
import TimeRange from './TimeRange';
import Users from './Users';
import Activity from './Activity';
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
      <div style={styles.filterOption} onClick={() => handleOptionClick("users")}>
        <p style={styles.filterOptionText}>
          Users
        </p>
        <svg style={styles.downCaret} xmlns="http://www.w3.org/2000/svg" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
      </div>

      <div style={styles.filterOption} onClick={() => handleOptionClick("time-range")}>
        <p style={styles.filterOptionText}>
          Time Range
        </p>
        <svg style={styles.downCaret} xmlns="http://www.w3.org/2000/svg" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
      </div>

      <div style={styles.filterOption} onClick={() => handleOptionClick("activity")}>
        <p style={styles.filterOptionText}>
          Activity
        </p>
        <svg style={styles.downCaret} xmlns="http://www.w3.org/2000/svg" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
      </div>

      <div style={styles.filterOption} onClick={() => handleOptionClick("more")}>
        <p style={styles.filterOptionText}>
          More
        </p>
        <svg style={styles.downCaret} xmlns="http://www.w3.org/2000/svg" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
      </div>

      {isFilterVisible && filterVisibleType === "time-range" && <TimeRange />}
      {isFilterVisible && filterVisibleType === "users" && <Users />}
      {isFilterVisible && filterVisibleType === "activity" && <Activity />}
      {isFilterVisible && filterVisibleType === "more" && <More />}
    </>
  );
}

const styles = {
  filterOption: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 3px',
    cursor: 'pointer',
  },
  filterOptionText: {
    fontWeight: '500',
  },
  downCaret: {
    fill: '#E7E9EA',
    width: '12px',
    height: '12px',
    marginLeft: '4px',
  }
}
