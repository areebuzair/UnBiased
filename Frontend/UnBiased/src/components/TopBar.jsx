import React, { useState } from 'react';
import { createSearchParams, useNavigate, Link } from 'react-router-dom';
import '../TopBar.css';

const TopBar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchBarText, setSearchBarText] = useState("");
  const navigate = useNavigate();

  const SearchTopic = (e) => {
    e.preventDefault();
    if (searchBarText != "") {
      navigate({
        pathname: '/',
        search: createSearchParams({ query: searchBarText }).toString()
      });
    }
    else{
      navigate('/');
    }
  }

  return (
    <div className="top-bar">
      <div className="button-group">
        <button className="top-bar-button" onClick={()=>navigate("/VerifyBot")}>Verify</button>
        <button className="top-bar-button">Login</button>
        <button className="top-bar-button">Forum</button>
      </div>
      <div className={`search-container ${searchActive ? 'active' : ''}`}>
        <button className="search-icon" onClick={() => setSearchActive(!searchActive)}>
          <img src="/magnify.png" alt="Search" />

        </button>
        <form onSubmit={(e) => { SearchTopic(e); }}>
          <input
            type="search"
            className="search-bar"
            placeholder="Search..."
            style={{ width: searchActive ? '250px' : '0', opacity: searchActive ? '1' : '0' }}
            value={searchBarText}
            onInput={(e) => setSearchBarText(e.target.value.slice(0, 500))}
          />
        </form>
      </div>
    </div>
  );
};

export default TopBar;
