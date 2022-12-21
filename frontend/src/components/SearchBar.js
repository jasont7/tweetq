import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setContent } from '../redux/reducers/filterSlice';

export default function SearchBar() {

  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => dispatch(setContent(query)), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <>
      <input 
        style={styles.searchBar}
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search tweet content"
      />
      <svg style={styles.searchIcon}>
        <path fillRule="evenodd" d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"></path>
      </svg>
    </>
  );
}

const styles = {
  searchBar: {
    position: 'relative',
    flexGrow: 1,
    width: '138px',
    paddingLeft: '26px',
    backgroundColor: '#15181C',
    color: '#FFFFFF',
    borderRadius: 6,
    border: '1px solid #44515b',
    fontSize: 14,
  },
  searchIcon: {
    position: 'absolute',
    fill: '#E7E9EA',
    width: '15px',
    height: '15px',
    marginLeft: '6px',
    marginTop: '10px'
  },
}
