import React, { useState, useEffect } from 'react';
import supabase from './supabase';
import FetchDataComponent from './FetchDataComponent.tsx';

const ListDataComponent = ({ tableName, dateToGet }) => {
  const [dataList, setDataList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null); // State to track the selected item ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('id, title, date') // Include the ID in the select statement
          .eq('date', dateToGet); // Filter the data by the provided date

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
  }, [tableName, dateToGet]); // Include dateToGet as a dependency

  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
  };

  return (
    <div>
      <h2>List of Data from {tableName} on {dateToGet}</h2>
      <ul>
        {dataList.map((record) => (
          <li key={record.id}>
            <a href="#" onClick={() => handleItemClick(record.id)}>
              <strong>Title:</strong> {record.title} - <strong>Date:</strong> {record.date}
            </a>
          </li>
        ))}
      </ul>
      
      {/* Conditional rendering based on selectedItemId */}
      {selectedItemId && (
        <FetchDataComponent id={selectedItemId} tableName={tableName} />
      )}
    </div>
  );
};

export default ListDataComponent;
