import React, { useState, useEffect } from 'react';

import supabase from './supabase';
import FetchDataComponent from './FetchDataComponent.tsx';

const ListDataComponent = ({ tableName, dateToGet, selectedDate, onItemClick }) => {
  const [dataList, setDataList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('id, title, date')
          .eq('date', dateToGet);

        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setDataList(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [tableName, dateToGet]);
  

  useEffect(() => {
    setSelectedItemId(null); // Reset selected item when selectedDate changes
  }, [selectedDate]);

  const handleItemClick = (itemId) => {
    setSelectedItemId(prevSelectedItemId => prevSelectedItemId === itemId ? null : itemId);
  };

  return (
    <div className="flex flex-col">
      <ul>
        {dataList.map((record) => {
          const dateObject = new Date(record.date);
          const formattedTime = `${dateObject.getUTCHours().toString().padStart(2, "0")}:${dateObject.getUTCMinutes().toString().padStart(2, "0")}:${dateObject.getUTCSeconds().toString().padStart(2, "0")}`;

          return (
            <li key={record.id}>
              <a href="#" onClick={() => handleItemClick(record.id)}>
                <strong>Title:</strong> {record.title} <strong>Time:</strong> {formattedTime}
              </a>
            </li>
          );
        })}
      </ul>
        {selectedItemId && (
          <FetchDataComponent id={selectedItemId} tableName={tableName} />
        )}
    </div>
  );
};

export default ListDataComponent;
