import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Sort() {

  return (
    <div style={styles.sortContainer}>

    </div>
  );
}

const styles = {
  sortContainer: {
    position: 'absolute',
    width: '175px',
    height: '150px',
    marginTop: '30px',
    marginLeft: '10px',
    backgroundColor: '#FFFFFF',
    zIndex: 100000000000,
    borderRadius: '6px',
  },
}
