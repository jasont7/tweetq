import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMinLikes, setUsers } from './redux/reducers/filterSlice';
import { setSearchSpecifier } from './redux/reducers/filterVisibleSlice';
import Content from './components/Content';
import Header from './components/Header';
import getUrlType from './getUrlType';

export default function App({ url }) {

  const dispatch = useDispatch();

  const [sidebarHidden, setSidebarHidden] = useState(false);

  const urlType = getUrlType(url);

  useEffect(() => {
    if (urlType.type === 'home') {
      // TODO: set users to only people you follow
      dispatch(setUsers([]));
      dispatch(setMinLikes(0));
      dispatch(setSearchSpecifier('all-twitter'));
    } else if (urlType.type === 'user') {
      dispatch(setUsers([urlType.user]));
      dispatch(setMinLikes(0));
      dispatch(setSearchSpecifier('current-user'));
    }
  })

  return (
    <div style={styles.app}>
      { sidebarHidden &&
      <div style={styles.openButton}
        onClick={() => setSidebarHidden(false)}>«&nbsp;&nbsp;Open tweetQ</div>}

      { !sidebarHidden && urlType.type !== 'invalid' &&
      <div style={styles.sidebar}>
        <div style={styles.closeButton} 
          onClick={() => setSidebarHidden(true)}>»</div>

        <Header />
        <Content />
      </div>}
    </div>
  );
}

const styles = {
  app: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  sidebar: {
    display: 'block',
    position: 'fixed',
    fontSize: '14px',
    right: 0,
    top: 0,
    width: '365px',
    height: '100vh',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    borderLeft: '1px solid #44515b',
  },
  closeButton: {
    position: 'absolute',
    left: '-18px',
    top: '47%',
    padding: '14px 3px',
    background: '#000000',
    color: 'rgb(91, 112, 131)',
    fontSize: '16px',
    cursor: 'pointer',
    borderTop: '1px solid #44515b',
    borderLeft: '1px solid #44515b',
    borderBottom: '1px solid #44515b',
    borderBottomLeftRadius: '6px',
    borderTopLeftRadius: '6px',
  },
  openButton: {
    position: 'fixed',
    top: '0',
    right: '0',
    padding: '5px 15px',
    background: '#000000',
    color: 'rgb(91, 112, 131)',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    borderLeft: '1px solid #44515b',
    borderBottom: '1px solid #44515b',
    borderBottomLeftRadius: '6px',
  },
}
