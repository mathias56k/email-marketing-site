import React, { useState, useEffect } from 'react';
import supabase from './supabase';

const FetchDataComponent = ({ id, tableName }) => {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: records, error } = await supabase
          .from(tableName)
          .select('title, date, body')
          .eq('id', id);

        if (error) {
          console.error('Error fetching data:', error);
        } else {
          if (records.length > 0) {
            const record = records[0];
            setData(record.body);
            setTitle(record.title);
            setDate(record.date);
          } else {
            setData(null);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, tableName]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: data }}></div>
    </div>
  );
};

export default FetchDataComponent;
