import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import supabase from './supabase';
import './App.css';
import ListDataComponent from './ListDataComponent';

const CalendarComponent = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    async function fetchCalendarData() {
      const { data, error } = await supabase.from('LIDL').select('*');
      if (error) {
        console.error('Error fetching calendar data:', error);
      } else {
        setCalendarData(data);
      }
    }

    fetchCalendarData();
  }, []);


useEffect(() => {
  if (selectedDate) {
    const matchingRows = calendarData.filter(item => {
      const rowDate = new Date(item.date);
      return rowDate.toDateString() === selectedDate.toDateString();
    });
    setSelectedRows(matchingRows);
  }
}, [selectedDate, calendarData]);

const highlightedDates = calendarData.map(item => new Date(item.date));

const tileContent = ({ date, view }) => {
    if (view === 'month' && highlightedDates.some(d => d.toDateString() === date.toDateString())) {
      return <div className="highlighted-date"></div>;
    }
    return null;
};

  return (
    <div className="app">
      <h1>Supabase Calendar App</h1>
      <div className="calendar">
        <Calendar
          tileContent={tileContent}
          onClickDay={date => setSelectedDate(date)}
        />
      </div>
      {selectedRows.length > 0 && (
        <div className="selected-rows">
          <h2>Selected Rows for {selectedDate.toDateString()}:</h2>
          <ul>
            {selectedRows.map((row, index) => (
              <li key={index}>
                <ListDataComponent tableName={"LIDL"} dateToGet={row.date}/>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  
};

export default CalendarComponent;
