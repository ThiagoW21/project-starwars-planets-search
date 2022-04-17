import React from 'react';
import Table from './components/Table';
import Filters from './components/Filters';
import Provider from './context/Provider';
import './App.css';

function App() {
  return (
    <Provider>
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
