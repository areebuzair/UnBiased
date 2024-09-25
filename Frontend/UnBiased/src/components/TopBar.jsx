import React, { useState } from 'react';
import { createSearchParams, useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import '../TopBar.css';

const TopBar = ({isAuth, setIsAuth}) => {
  const [searchActive, setSearchActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
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
    else {
      navigate('/');
    }
  }

  const Navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(()=>{
      setIsAuth(false);
      localStorage.clear();
      Navigate("/login");
    })
  };

  return (
    <div className="top-bar">
      <div className={`button-group ${menuActive ? 'open' : ''}`} onClick={() => setMenuActive(!menuActive)}>
        <button className="top-bar-button" onClick={() => navigate("/")}>Home</button>
        <button className="top-bar-button" onClick={() => navigate("/VerifyBot")}>Verify</button>
        <button className="top-bar-button" onClick={() => navigate("/forum")}>Forum</button>
        {!isAuth && <button className="top-bar-button" onClick={() => navigate("/login")}>Login</button>}
        {isAuth && <button className="top-bar-button" onClick={() => signUserOut()}>Logout</button>}
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
        <button className="menu-icon" onClick={() => setMenuActive(!menuActive)}>
          <img src="/hamburger.png" alt="Search" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
