import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VerifyBot from './pages/VerifyBot';
import TopBar from './pages/TopBar'; 

function App() {
  return (
    <BrowserRouter>
      <TopBar /> {/* Add the TopBar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/VerifyBot" element={<VerifyBot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
