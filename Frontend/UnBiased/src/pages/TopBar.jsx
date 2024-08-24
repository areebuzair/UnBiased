import React, { useState } from 'react';
import '../TopBar.css';

const TopBar = () => {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <div className="top-bar">
      <div className="button-group">
        <button className="top-bar-button">Verify</button>
        <button className="top-bar-button">Login</button>
        <button className="top-bar-button">Forum</button>
      </div>
      <div className={`search-container ${searchActive ? 'active' : ''}`}>
        <button className="search-icon" onClick={() => setSearchActive(!searchActive)}>
        <img src="/magnify.png" alt="Search" />

        </button>
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          style={{ width: searchActive ? '250px' : '0', opacity: searchActive ? '1' : '0' }}
        />
      </div>
    </div>
  );
};

export default TopBar;
