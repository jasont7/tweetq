import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHideReplies, setMinLikes, setMaxLikes, setMinRetweets, setMaxRetweets,
  setMinReplies, setMaxReplies } from '../../redux/reducers/filterSlice';
import { setFilterVisible, setHideRepliesInput, setMinLikesInput, 
  setMaxLikesInput, setMinRetweetsInput, setMaxRetweetsInput,
  setMinRepliesInput, setMaxRepliesInput } from '../../redux/reducers/filterVisibleSlice';

export default function More() {

  const dispatch = useDispatch();

  const isFilterVisible = useSelector(state => state.filterVisible.isVisible);
  const filterVisibleType = useSelector(state => state.filterVisible.filterType);
  const hideRepliesInput = useSelector(state => state.filterVisible.hideRepliesInput);
  const minLikesInput = useSelector(state => state.filterVisible.minLikesInput);
  const maxLikesInput = useSelector(state => state.filterVisible.maxLikesInput);
  const minRetweetsInput = useSelector(state => state.filterVisible.minRetweetsInput);
  const maxRetweetsInput = useSelector(state => state.filterVisible.maxRetweetsInput);
  const minRepliesInput = useSelector(state => state.filterVisible.minRepliesInput);
  const maxRepliesInput = useSelector(state => state.filterVisible.maxRepliesInput);

  const handleUpdate = () => {
    dispatch(setHideReplies(hideRepliesInput));

    dispatch(setMinLikes(minLikesInput));
    dispatch(setMaxLikes(maxLikesInput));

    dispatch(setMinRetweets(minRetweetsInput));
    dispatch(setMaxRetweets(maxRetweetsInput));

    dispatch(setMinReplies(minRepliesInput));
    dispatch(setMaxReplies(maxRepliesInput));
  }

  const handleClosePopup = () => {
    dispatch(setFilterVisible({ isVisible: false, filterType: null }));
  }

  return (
    <>
    {isFilterVisible && filterVisibleType === "more" && 
    <div style={styles.popupContainer}>
      <div style={styles.popupHeader}>
        <p style={styles.popupName}>
          More filters
        </p>
        <svg style={styles.closePopup} onClick={handleClosePopup} xmlns="http://www.w3.org/2000/svg"  class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>
      <div style={styles.mainContainer}>
        <div style={styles.checkboxInputContainer}>
          <input type="checkbox" 
            defaultChecked={hideRepliesInput} 
            onChange={() => dispatch(setHideRepliesInput(!hideRepliesInput))}
          />
          <label style={styles.filterLabel}>Hide Replies</label>
        </div>

        <div style={styles.numberInputContainer}>
          <input type="number"
            value={minLikesInput}
            onChange={(e) => dispatch(setMinLikesInput(e.target.value))}
            placeholder="Min Likes"
          />
        </div>

        <div style={styles.numberInputContainer}>
          <input type="number"
            value={maxLikesInput}
            onChange={(e) => dispatch(setMaxLikesInput(e.target.value))}
            placeholder="Max Likes"
          />
        </div>

        <div style={styles.numberInputContainer}>
          <input type="number"
            value={minRetweetsInput}
            onChange={(e) => dispatch(setMinRetweetsInput(e.target.value))}
            placeholder="Min Retweets"
          />
        </div>

        <div style={styles.numberInputContainer}>
          <input type="number"
            value={maxRetweetsInput}
            onChange={(e) => dispatch(setMaxRetweetsInput(e.target.value))}
            placeholder="Max Retweets"
          />
        </div>

        <div style={styles.numberInputContainer}>
          <input type="number"
            value={minRepliesInput}
            onChange={(e) => dispatch(setMinRepliesInput(e.target.value))}
            placeholder="Min Replies"
          />
        </div>

        <div style={styles.numberInputContainer}>
          <input type="number"
            value={maxRepliesInput}
            onChange={(e) => dispatch(setMaxRepliesInput(e.target.value))}
            placeholder="Max Replies"
          />
        </div>

        <button onClick={handleUpdate}>
          Update Search
        </button>
      </div>
    </div>}
    </>
  );
}

const styles = {
  popupContainer: {
    position: 'absolute',
    width: '175px',
    height: '250px',
    marginTop: '35px',
    marginLeft: '150px',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    borderRadius: '6px',
  },
  popupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #D8DEE4',
  },
  popupName: {
    margin: '8px 16px',
    color: '#242A30',
    fontSize: '12px',
    fontWeight: '600',
  },
  closePopup: {
    margin: '5px 10px',
    width: '20px',
    height: '20px',
    fill: '#57606a',
    cursor: 'pointer',
  },
  mainContainer: {
    margin: '10px',
    padding: '5px',
  },
  checkboxInputContainer: {
    marginBottom: '5px',
  },
  numberInputContainer: {
    marginBottom: '5px',
  },
  filterLabel: {
    color: '#000000',
  },
}

