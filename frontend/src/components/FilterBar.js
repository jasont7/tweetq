import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setContent } from '../redux/reducers/filterSlice';
import FilterPopup from './FilterPopup';

export default function FilterBar() {

  const dispatch = useDispatch();

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterOption, setFilterOption] = useState("");

  return (
    <>
      <span style={styles.filterOption} onClick={() => {
          setFilterVisible(!filterVisible);
          setFilterOption("time-range");
        }}>
          Time Range ▼
        </span>
        <span style={styles.filterOption} onClick={() => {
          setFilterVisible(!filterVisible);
          setFilterOption("users");
        }}>
          Users ▼
        </span>
        <span style={styles.filterOption} onClick={() => {
          setFilterVisible(!filterVisible);
          setFilterOption("sort");
        }}>
          Sort ▼
        </span>
        <span style={styles.filterOption} onClick={() => {
          setFilterVisible(!filterVisible);
          setFilterOption("extra");
        }}>
          Extra ▼
      </span>

      {filterVisible && <FilterPopup option={filterOption} />}
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
