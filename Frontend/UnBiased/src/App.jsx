import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import VerifyBot from './pages/VerifyBot';
import TopBar from './components/TopBar';
import LoginPage from './pages/LoginPage.jsx';
import CreatePost from './pages/CreatePost.jsx';
import Forum from './pages/Forum.jsx';
import { ArticleView } from './pages/ArticleView';

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <BrowserRouter>
      <TopBar isAuth={isAuth} setIsAuth={setIsAuth}/> {/* Add the TopBar here */}
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
        <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/forum" element={<Forum isAuth={isAuth}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
