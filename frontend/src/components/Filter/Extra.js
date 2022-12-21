import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Extra() {

  return (
      <div style={styles.extraContainer}>

      </div>
  );
}

const styles = {
  extraContainer: {
    position: 'absolute',
    width: '175px',
    height: '150px',
    marginTop: '30px',
    marginLeft: '150px',
    backgroundColor: '#FFFFFF',
    zIndex: 100000000000,
    borderRadius: '6px',
  },
}
