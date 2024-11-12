import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Stats from './components/Stats';
import Network from './components/Network';
import Reviews from './components/Reviews';
import Sidebar from './components/Sidebar';


function App() {

  return (
    <Router>
      <div className='relative'>
        <Sidebar />
        <div> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/friends" element={<Network />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
