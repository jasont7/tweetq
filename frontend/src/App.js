import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMinLikes, setUsers } from './redux/reducers/filterSlice';
import { setSearchSpecifier } from './redux/reducers/filterVisibleSlice';
import Content from './components/Content';
import Header from './components/Header';

export default function App({ url }) {

  const dispatch = useDispatch();

  const urlType = getURLType(url);

  useEffect(() => {
    if (urlType.type === 'home') {
      // TODO: set users to only people you follow
      dispatch(setUsers([]));
      dispatch(setMinLikes(500000));
      dispatch(setSearchSpecifier('all-twitter'));
    } else if (urlType.type === 'user') {
      dispatch(setUsers([urlType.user]));
      dispatch(setSearchSpecifier('current-user'));
    }
  })

  return (
    <>
    { urlType.type !== 'invalid' &&
    <div style={styles.container}>
      <Header />
      <Content />
    </div>}
    </>
  );
}


function getURLType(url) {
  const urlObj = new URL(url);
  const page = urlObj.pathname.substring(1);
  
  const invalidPages = new Set([
      'explore',
      'notifications',
      'messages',
  ]);

  if (page == '' || page == 'home') {
    return {type: 'home'}
  } else if (invalidPages.has(page) || page.includes('/')) {
    return {type: 'invalid'}
  } else {
    return {type: 'user', user: page}
  }
}


const styles = {
  container: {
    display: 'block',
    position: 'fixed',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontSize: '14px',
    right: 0,
    top: 0,
    width: '365px',
    height: '100vh',
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
}
