import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../../redux/reducers/filterSlice';
import { setFilterVisible, setUserInput } from '../../redux/reducers/filterVisibleSlice';
import { Chip } from '@mui/material';

export default function Users() {

  const dispatch = useDispatch();

  const isFilterVisible = useSelector(state => state.filterVisible.isVisible);
  const filterVisibleType = useSelector(state => state.filterVisible.filterType);
  const users = useSelector(state => state.filter.users);
  const userInput = useSelector(state => state.filterVisible.userInput);

  const handleUpdate = () => {
    // remove initial @ from handle
    let userInputProc = userInput;
    if (userInput.charAt(0) == '@') {
      userInputProc = userInput.substring(1);
    }

    const twitterHandleRegex = new RegExp("^[a-zA-Z0-9_]{1,15}$");
    if (twitterHandleRegex.test(userInputProc)) {
      dispatch(addUser(userInputProc));
    }
  }

  const handleClosePopup = () => {
    dispatch(setFilterVisible({ isVisible: false, filterType: null }));
  }

  // outside click handling code
  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      dispatch(setFilterVisible(false));
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [])

  return (
    <>
    {isFilterVisible && filterVisibleType === "users" && 
    <div ref={ref} style={styles.popupContainer}>

      <div style={styles.popupHeader}>
        <p style={styles.popupName}>
          Filter by user
        </p>
        <svg style={styles.closePopup} onClick={handleClosePopup} xmlns="http://www.w3.org/2000/svg"  className="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>

      <div style={styles.mainContainer}>

        <div style={styles.textInputContainer}>
          <input type="text"
            value={userInput}
            onChange={(e) => dispatch(setUserInput(e.target.value))}
            style={styles.textInput}
            placeholder="Username"
          />
          {/* <div onClick={handleUpdate} style={styles.addButton}>
            Add
          </div> */}
        </div>

        <div style={styles.userChipsContainer}>
          { users.map((user) => 
            <Chip label={`@${user}`} key={user} onDelete={() => dispatch(removeUser(user))}
              style={styles.userChip} sx={{
                '& .MuiChip-deleteIcon': {
                  width: '18px',
                  color: '#E7E9EA',
                },
                '& .MuiChip-deleteIcon:hover': {
                  color: '#FFFFFF',
                },
              }} />)
          }
        </div>

      </div>
    </div>}
    </>
  );
}

const styles = {
  popupContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: '220px',
    maxHeight: '250px',
    marginTop: '35px',
    marginLeft: '-100px',
    zIndex: 1,
    backgroundColor: '#000000',
    color: '#E7E9EA',
    border: '1px solid #44515b',
    borderRadius: '6px',
    boxShadow: '0px 0px 3px 3px rgba(68,81,91,0.5)',
  },
  popupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #44515b',
  },
  popupName: {
    margin: '8px 16px',
    fontSize: '12px',
    fontWeight: '600',
  },
  closePopup: {
    margin: '5px 10px',
    width: '20px',
    height: '20px',
    fill: '#E7E9EA',
    cursor: 'pointer',
  },
  mainContainer: {
    overflowY: 'hidden',
    overflowX: 'hidden',
    maxHeight: '200px',
    margin: '5px 10px',
    padding: '5px',
  },
  textInputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  textInput: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '6px 10px',
    fontSize: '14px',
    backgroundColor: '#212327',
    color: '#E7E9EA',
    border: '1px solid #44515b',
    borderRadius: '4px',
    outline: 'none',
  },
  // addButton: {
  //   cursor: 'pointer',
  //   fontWeight: '500',
  //   textAlign: 'center',
  //   marginLeft: '5px',
  //   padding: '5px 8px',
  //   backgroundColor: '#1D9CEB',
  //   color: '#E7E9EA',
  //   border: '1px solid #1D9CEB',
  //   borderRadius: '2em',
  // },
  userChipsContainer: {
    maxHeight: '175px',
    width: '100%',
    overflowY: 'scroll',
    paddingRight: '20px',
    boxSizing: 'content-box',
  },
  userChip: {
    marginBottom: '5px',
    marginRight: '5px',
    backgroundColor: '#212327',
    color: '#E7E9EA',
    fontWeight: '500',
  },
}
