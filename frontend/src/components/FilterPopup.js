import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function FilterPopup({ option }) {

  return (
    <>
      {option == "time-range" &&
      <div style={styles.timeRangeContainer}>
        <div style={styles.dateInputContainer}>
          <input 
            
          />
        </div>
      </div>}

      {option == "users" &&
      <div style={styles.usersContainer}>

      </div>}

      {option == "sort" &&
      <div style={styles.sortContainer}>

      </div>}
      
      {option == "extra" &&
      <div style={styles.extraContainer}>

      </div>}
    </>
  );
}

const styles = {
  timeRangeContainer: {
    position: 'absolute',
    width: '240px',
    height: '120px',
    marginTop: '30px',
    marginLeft: '-80px',
    backgroundColor: '#FFFFFF',
    zIndex: 100000000000,
    borderRadius: '6px',
  },
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
