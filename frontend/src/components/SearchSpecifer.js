import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getURLType from '../getURLType';
import { setUsers } from '../redux/reducers/filterSlice';
import { setSearchSpecifier } from '../redux/reducers/filterVisibleSlice';

export default function SearchSpecifier() {
  // Specify what subset of accounts to search from
  // (i.e. all twitter, current user, only people you follow, ...)

  const dispatch = useDispatch();

  const urlType = getURLType(window.location.href);
  const spec1 = {text: 'All Twitter', id: 'all-twitter'};
  const spec2 = {text: 'In This User', id: 'current-user'};

  const selected = useSelector(state => state.filterVisible.searchSpecifier);

  const selectSpecifier = (specId) => {
    dispatch(setSearchSpecifier(specId));
    if (specId === 'all-twitter') {
      dispatch(setUsers([]));
    } else if (specId === 'current-user') {
      dispatch(setUsers([urlType.user]));
    }
  }

  return (
    <div style={styles.specifier}>
      {selected === spec1.id &&
      <div style={styles.spec1Selected}>
        <p style={styles.specTextSelected}>{spec1.text}</p>
      </div>}
      {selected !== spec1.id &&
      <div style={styles.spec1Unselected} onClick={() => selectSpecifier(spec1.id)}>
        <p style={styles.specTextUnselected}>{spec1.text}</p>
      </div>}

      {selected === spec2.id &&
      <div style={styles.spec2Selected}>
        <p style={styles.specTextSelected}>{spec2.text}</p>
      </div>}
      {selected !== spec2.id &&
      <div style={styles.spec2Unselected} onClick={() => selectSpecifier(spec2.id)}>
        <p style={styles.specTextUnselected}>{spec2.text}</p>
      </div>}
    </div>
  );
}

const styles = {
  specifier: {
    display: 'flex',
    textAlign: 'center',
    fontWeight: '500',
    cursor: 'pointer',
  },
  spec1Selected: {
    backgroundColor: '#1d9ceb',
    color: '#E7E9EA',
    borderRadius: '6px 0 0 6px',
    border: '1px solid #1d9ceb',
  },
  spec1Unselected: {
    color: '#E7E9EA',
    borderRadius: '6px 0 0 6px',
    border: '1px solid #44515b',
    borderRight: '1px solid transparent',
  },
  spec2Selected: {
    backgroundColor: '#1d9ceb',
    color: '#E7E9EA',
    borderRadius: '0 6px 6px 0',
    border: '1px solid #1d9ceb',
  },
  spec2Unselected: {
    color: '#E7E9EA',
    borderRadius: '0 6px 6px 0',
    border: '1px solid #44515b',
    borderLeft: '1px solid transparent',
  },
  specTextSelected: {
    margin: '10px 6px',
  },
  specTextUnselected: {
    margin: '10px 6px',
  },
}
