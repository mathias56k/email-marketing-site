import React from 'react';
import FetchDataComponent from './FetchDataComponent.tsx';
import ListDataComponent from './ListDataComponent.tsx';
import CalendarComponent from './CalendarComponent.tsx';

function App() {
  return (
    <div className="App">
      <ListDataComponent tableName="LIDL"></ListDataComponent>
      <CalendarComponent/>
    </div>
  );
}

export default App;