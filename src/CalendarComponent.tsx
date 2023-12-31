import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import supabase from './supabase';
import './App.css';
import ListDataComponent from './ListDataComponent';

const CalendarComponent = ({ companyName }) => {
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    async function fetchCalendarData() {
      const { data, error } = await supabase.from(companyName).select('*');
      if (error) {
        console.error('Error fetching calendar data:', error);
      } else {
        setCalendarData(data);
      }
    }

    fetchCalendarData();
  }, [companyName]);

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
    <div className="app bg-green-500 m-0 flex flex-wrap justify-center">
      <div className="calendar bg-gray-500">
        <Calendar
          tileContent={tileContent}
          onClickDay={date => setSelectedDate(date)}
        />
      </div>
      {selectedRows.length > 0 && (
        <div className="selected-rows bg-red-500">
          <h2 className="text-xl font-bold mb-3">Selected Rows for {selectedDate.toDateString()}</h2>
          <ul className="flex flex-col gap-2.5 overflow-scroll max-w-xl">
            {selectedRows.map((row, index) => (
              <li className="rounded bg-green-300 p-5" key={index}>
                <ListDataComponent tableName={companyName} dateToGet={row.date} selectedDate={selectedDate} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
