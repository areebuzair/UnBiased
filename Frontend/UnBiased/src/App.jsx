import Home from './pages/Home';
import VerifyBot from './pages/VerifyBot';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/VerifyBot" element={<VerifyBot/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
