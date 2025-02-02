import React from 'react';
import ReactCalendar from 'react-calendar';  
import styles from './Calendar.module.css'; 

const Calendar = ({ selectedDate, onDateChange }) => {
    
    return (
      <div className={styles.calendarContainer}> 
        <ReactCalendar
          onChange={onDateChange} 
          value={selectedDate}   
        />
      </div>
    );
  };
  
  export default Calendar;