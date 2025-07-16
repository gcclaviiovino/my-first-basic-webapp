// /components/CustomDatePicker.jsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // base styles
import './calendarDropdown.css'; // our custom styles

function calendarDropdown({ selectedDate, onChange }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      showMonthDropdown
      showYearDropdown
      scrollableYearDropdown
      dateFormat="yyyy-MM-dd"
      placeholderText="Select your birth date"
      className="custom-date-input"
      dropdownMode="select" // dropdown instead of scroll
    />
  );
}

export default calendarDropdown;
