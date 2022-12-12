import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';
import SearchSpecifier from './SearchSpecifer';

export default function Header() {

  return (
    <div style={styles.container}>
      <div style={styles.row1}>
        <SearchBar />
        <SearchSpecifier />
      </div>
      <div style={styles.row2}>
        <FilterBar />
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: '8px',
    fontSize: '13px',
  },
  row1: {
    display: 'flex',
    gap: '6px',
  },
  row2: {
    display: 'flex',
    justifyContent: 'space-evenly',
    color: '#E7E9EA',
    marginTop: '8px',
    borderRadius: '6px',
    border: '1px solid #44515b',
  },
}
