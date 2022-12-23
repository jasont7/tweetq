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
      <span style={styles.closePopup} onClick={handleClosePopup}>
        X
      </span>
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
    marginTop: '30px',
    marginLeft: '150px',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    borderRadius: '6px',
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
  closePopup: {
    position: 'absolute',
    marginTop: '4px',
    marginRight: '8px',
    right: '0',
    color: '#000000',
    cursor: 'pointer',
    zIndex: 2,
  },
}

