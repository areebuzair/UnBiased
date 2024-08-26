import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VerifyBot from './pages/VerifyBot';
import TopBar from './components/TopBar';
import { ArticleView } from './pages/ArticleView';

function App() {

  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <BrowserRouter>
      <TopBar /> {/* Add the TopBar here */}
      <Routes>
        <Route path="/" element={
          <Home
            setSelectedArticle={setSelectedArticle}
          />}
        />
        <Route path="/ReadArticle" element={
          <ArticleView
            selectedArticle={selectedArticle}
          />}
        />
        <Route path="/VerifyBot" element={<VerifyBot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
