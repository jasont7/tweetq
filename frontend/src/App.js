import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserContent from './components/UserContent';
import { setUser } from './redux/reducers/userReducer';

export default function App({ url }) {

  const dispatch = useDispatch();

  const urlObj = new URL(url);
  const page = urlObj.pathname.replace(/\//g, "");

  useEffect(() => {
    if (page == '' || page == 'home') {
      // TODO: home page
    } else {
      dispatch(setUser(page))
    }
  })

  return (
    <div style={styles.appContainer}>
      <div style={styles.contentContainer}>
        {/* <HideToggle /> */}
        {/* <Header /> */}
        {/* <SearchBar /> */}
        {/* { page === 'home' && <TimelineContent /> } */}
        { page !== 'home' && <UserContent /> }
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'block',
    position: 'fixed',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontSize: '14px',
    right: 0,
    top: 0,
    width: '360px',
    height: '100vh',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    // zIndex: 999999999,
  },
  contentContainer: {
    position: 'relative',
  }
}
