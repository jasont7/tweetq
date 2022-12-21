import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDateRange } from '../../redux/reducers/filterSlice';
import { setFilterVisible } from '../../redux/reducers/filterVisibleSlice';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function TimeRange() {

  const dispatch = useDispatch();

  const isFilterVisible = useSelector(state => state.filterVisible.isVisible);
  const filterVisibleType = useSelector(state => state.filterVisible.filterType);

  const dateRange = useSelector(state => state.filter.dateRange);
  const [startDate, setStartDate] = useState(new Date(dateRange[0] + 'T00:00:00'));
  const [endDate, setEndDate] = useState(new Date(dateRange[1] + 'T00:00:00'));

  const handleDateChange = () => {
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];
    dispatch(setDateRange([startDateString, endDateString]));
  }

  const handleClosePopup = () => {
    dispatch(setFilterVisible({ isVisible: false, filterType: null }));
  }

  return (
    <>
    {isFilterVisible && filterVisibleType === "time-range" && 
    <div style={styles.popupContainer}>
      <span style={styles.closePopup} onClick={handleClosePopup}>
        X
      </span>
      <div style={styles.dateInputContainer}>
        <DatePicker
          renderCustomHeader={options => customDatePicker(options)}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          renderCustomHeader={options => customDatePicker(options)}
          selected={endDate} 
          onChange={(date) => setEndDate(date)}
        />
        <button onClick={handleDateChange}>Update Search</button>
      </div>
    </div>}
    </>
  );
}

const range = (start, stop, step) => 
  Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))

const customDatePicker = (options) => {
  const years = range(2006, new Date().getFullYear() + 1, 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  
  return (
    <div
      style={{
        margin: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button onClick={options.decreaseMonth} disabled={options.prevMonthButtonDisabled}>
        {"<"}
      </button>
      <select
        value={options.date.getFullYear()}
        onChange={({ target: { value } }) => options.changeYear(value)}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={months[options.date.getMonth()]}
        onChange={({ target: { value } }) =>
          options.changeMonth(months.indexOf(value))
        }
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button onClick={options.increaseMonth} disabled={options.nextMonthButtonDisabled}>
        {">"}
      </button>
    </div>
  );
}

const styles = {
  popupContainer: {
    position: 'absolute',
    width: '240px',
    marginTop: '30px',
    marginLeft: '-80px',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    borderRadius: '6px',
  },
  dateInputContainer: {
    margin: '10px',
    padding: '5px',
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
