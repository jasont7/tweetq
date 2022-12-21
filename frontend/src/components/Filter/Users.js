import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Users() {

  return (
      <div style={styles.usersContainer}>

      </div>
  );
}

const styles = {
  usersContainer: {
    position: 'absolute',
    width: '175px',
    height: '250px',
    marginTop: '30px',
    marginLeft: '70px',
    backgroundColor: '#FFFFFF',
    zIndex: 100000000000,
    borderRadius: '6px',
  },
}
