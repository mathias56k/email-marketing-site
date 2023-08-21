import React, { useState } from 'react';
import CompanyList from './CompanyList';
import CalendarComponent from './CalendarComponent';

function App() {
  const [tableName, setTableName] = useState('LIDL'); // Initialize with a default value

  return (
    <div className="App">
      <CompanyList tableName={tableName} changeTableName={setTableName} />
      <CalendarComponent companyName={tableName} />
      <div id='content' className='bg-yellow-500 w-full h-screen'></div>
    </div>
  );
};

export default App;