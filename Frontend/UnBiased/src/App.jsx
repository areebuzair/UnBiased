import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
