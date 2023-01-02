import React from 'react';
import FilterBar from './Filter/FilterBar';
import SearchBar from './SearchBar';
import SearchSpecifier from './SearchSpecifer';

export default function Header() {

  return (
    <div style={styles.container}>
      {/* <div style={styles.banner}>
        <img src={logoIcon} style={styles.logoIcon} />
        <img src={logoText} style={styles.logoText} />
      </div> */}

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
  banner: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    marginTop: '-8px',
    marginLeft: '-8px',
    marginRight: '-8px',
    paddingBottom: '5px',
    paddingTop: '5px',
    paddingLeft: '8px',
    borderBottom: 'thin solid rgb(56, 68, 77)',
  },
  logoIcon: {
    width: '17px',
  },
  logoText: {
    width: '50px',
    marginLeft: '6px',
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
