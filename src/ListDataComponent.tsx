import React, { useState, useEffect } from 'react';
import supabase from './supabase';
import FetchDataComponent from './FetchDataComponent.tsx';

const ListDataComponent = ({ tableName, dateToGet, selectedDate }) => {
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
    <div>
      <ul>
        {dataList.map((record) => (
          <li key={record.id}>
            <a href="#" onClick={() => handleItemClick(record.id)}>
              <strong>Title:</strong> {record.title} - <strong>Date:</strong> {record.date}
            </a>
          </li>
        ))}
      </ul>
      
      {selectedItemId && (
        <FetchDataComponent id={selectedItemId} tableName={tableName} />
      )}
    </div>
  );
};

export default ListDataComponent;
