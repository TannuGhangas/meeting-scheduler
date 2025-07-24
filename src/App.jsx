import React from 'react';
import MeetingForm from './components/MeetingForm';
import MeetingList from './components/MeetingList';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <h1>📅 Meeting Scheduler</h1>
      <MeetingForm />
      <MeetingList />
    </div>
  );
};

export default App;
