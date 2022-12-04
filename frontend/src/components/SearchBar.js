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
    <div style={styles.container}>
      <input 
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search Content"
      />
    </div>
  );
}

const styles = {
  container: {

  },
}
