import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VerifyBot from './pages/VerifyBot';
import TopBar from './components/TopBar';
import { ArticleView } from './pages/ArticleView';

function App() {

  const [selectedArticle, setSelectedArticle] = useState(null);

  const format_date_time = (t) => {
    // 2024-07-14T00:27:11Z
    const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    t = t.split("T");
    let date = t[0];
    let time = t[1];
    time = time.replace("Z", "");
    date = date.split("-");
    date[1] = Months[parseInt(date[1] - 1)];
    return `${date[1]} ${date[2]}, ${date[0]} - ${time}`;
  }

  return (
    <BrowserRouter>
      <TopBar /> {/* Add the TopBar here */}
      <Routes>
        <Route path="/" element={
          <Home
            setSelectedArticle={setSelectedArticle}
            format_date_time={format_date_time}
          />}
        />
        <Route path="/ReadArticle" element={
          <ArticleView
            selectedArticle={selectedArticle}
            format_date_time={format_date_time}
          />}
        />
        <Route path="/VerifyBot" element={<VerifyBot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
