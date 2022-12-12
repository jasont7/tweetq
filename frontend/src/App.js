import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSingleUser } from './redux/reducers/filterSlice';
import Content from './components/Content';
import Header from './components/Header';
import getURLType from './getURLType';

export default function App({ url }) {

  const dispatch = useDispatch();

  const urlType = getURLType(url);

  useEffect(() => {
    if (urlType.type === 'home') {
      // TODO: set users to only people you follow
    } else if (urlType.type === 'user') {
      dispatch(setSingleUser(urlType.user))
    }
  })

  return (
    <>
    { urlType.type !== 'invalid' &&
    <div style={styles.appContainer}>
      <Header />
      <div style={styles.contentContainer}>
        <Content />
      </div>
    </div>}
    </>
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
    width: '365px',
    height: '100vh',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    // zIndex: 999999999,
  },
  contentContainer: {
    position: 'relative',
  }
}
