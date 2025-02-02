import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Lists from './components/lists';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Lists />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
