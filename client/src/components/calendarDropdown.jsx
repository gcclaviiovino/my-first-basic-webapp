// /components/CustomDatePicker.jsx
import React from 'react';
import './calendarDropdown.css';

function calendarDropdown({ selectedDate, onChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    // Convert string to Date object to match the expected format
    onChange(value ? new Date(value) : null);
  };

  // Convert Date object to YYYY-MM-DD string for input value
  const dateValue = selectedDate ? selectedDate.toISOString().split('T')[0] : '';

  return (
    <div className="date-input-container">
      <input
        type="date"
        value={dateValue}
        onChange={handleChange}
        placeholder="DD/MM/YYYY"
        className="custom-date-input"
      />
      <span className="date-input-label">Birth Date</span>
      <i className="date-input-underline"></i>
    </div>
  );
}

export default calendarDropdown;
