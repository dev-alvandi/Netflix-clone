import React, { Fragment, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import Logo from '../assets/Logo.png';
import Button from './Button';
import { firebaseAuth } from '../utils/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../store';
import SearchedMovies from './SearchedMovies';

export default function Navbar({ isScroll }) {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const serchedMovies = useSelector((state) => state.netflix.searchedMovies);

  const links = [
    { name: 'Home', link: '/' },
    { name: 'TV Shows', link: '/tv' },
    { name: 'Movies', link: '/movies' },
    { name: 'My List', link: '/mylist' },
  ];

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();

  window.addEventListener('resize', (e) => {
    if (window.innerWidth < 900) {
      setShowHamburgerMenu(false);
    } else {
      setShowHamburgerMenu(true);
    }
  });

  const handleLogout = async () => {
    await signOut(firebaseAuth);
  };

  onAuthStateChanged(firebaseAuth, (currUser) => {
    if (!currUser) {
      navigate('/login');
    }
  });

  const searchEnterHandler = (e) => {
    if (e.key === 'Enter') {
      dispatch(searchMovies({ term: searchTerm }));
      setIsSearching(true);
      // document.body.style.overflow = 'hidden';
    }
  };

  const closeSearchHandler = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setIsSearching(false);
    }
  };

  return (
    <Fragment>
      <NavContainer>
        <nav className={`flex ${isScroll ? 'scrolled' : ''}`}>
          <div className="flex a-center left">
            <div
              className="flex a-center j-center logo"
              onClick={() => navigate('/')}>
              <img src={Logo} alt="Netflix" />
            </div>
            <div
              className="browse-menu flex j-center a-center"
              onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}>
              Browse
              <AiFillCaretDown
                style={{
                  transform: showHamburgerMenu ? 'rotate(180deg)' : 'rotate(0)',
                }}
              />
            </div>
            <ul
              className="links"
              style={{ display: showHamburgerMenu ? 'flex' : 'none' }}
              active={showHamburgerMenu ? 'flex;' : 'none;'}>
              {links.map(({ name, link }) => {
                return (
                  <li key={name}>
                    <Link to={link}>{name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex a-center right">
            <div className={`search ${showSearch ? 'show-search' : ''}`}>
              <button
                className="search-icon"
                onFocus={() => setShowSearch(true)}
                onBlur={() => !inputHover && setShowSearch(false)}
                onClick={() => inputRef.current.focus()}>
                <FaSearch />
              </button>
              <input
                type="text"
                placeholder="Search..."
                ref={inputRef}
                onMouseEnter={() => setInputHover(true)}
                onBlur={() => {
                  setShowSearch(false);
                  // setInputHover(false);
                }}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value.toLowerCase().replaceAll(' ', '+')
                  )
                }
                onKeyDown={searchEnterHandler}
              />
            </div>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </nav>
      </NavContainer>
      {isSearching && (
        <SearchedMovies
          movies={serchedMovies.movies}
          closeSearchHandler={closeSearchHandler}
        />
      )}
    </Fragment>
  );
}

const NavContainer = styled.div`
  .scrolled {
    background-color: #141414;
  }
  position: fixed;
  top: 0;
  left: 0;
  font-size: 1rem;
  z-index: 1002;
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  nav {
    padding: 0 2rem;
    width: 100%;
    height: 100%;
    transition: 0.3s ease-in-out;
    justify-content: space-between;
    background-color: transparent; // if the isScroll is false...
    .left {
      min-width: 0;
      .logo {
        cursor: pointer;
        img {
          width: 9.25rem;
          height: 2.5rem;
        }
      }
      .browse-menu {
        display: none;
        gap: 0.5rem;
        padding-left: 2rem;
        svg {
          transition: 0.15s ease-in-out;
        }
      }
      .links {
        padding: 0 2rem;
        list-style-type: none;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        gap: 1rem;
        li {
          a {
            text-decoration: none;
            color: #fff;
            transition: color 0.4s ease-in-out;
            white-space: nowrap;
          }
          &:hover {
            a {
              color: #b3b3b3;
            }
          }
        }
      }
    }
    .right {
      min-width: 0;
      gap: 0 2rem;
      .search {
        gap: 0.4rem;
        padding: 0.2rem;
        padding-left: 0.5rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        .search-icon {
          outline: none;
          border: none;
          cursor: pointer;
          background-color: transparent;
          svg {
            color: #fff;
            cursor: pointer;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          padding: 0.7rem;
          font-size: 1rem;
          background-color: transparent;
          color: white;
          border: none;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid #fff;
        background-color: rgba(0, 0, 0, 0.6);
        button {
          padding-left: 0.5rem;
        }
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }

  @media (max-width: 900px) {
    background-color: #14141466;
    position: sticky;
    nav {
      .left {
        position: relative;
        .browse-menu {
          display: flex;
          cursor: pointer;
        }
        .links {
          display: ${({ active }) => active};
          background-color: rgba(0, 0, 0, 0.9);
          border: 1px solid #ffffff15;
          border-top: 2px solid #e5e5e5;
          padding: 1.5rem 3rem;
          flex-direction: column;
          position: relative;
          top: 150%;
          left: 0;
          transform: translateX(-50%);
          li {
          }
        }
      }
      .right {
        justify-content: flex-end;
        .show-search {
          width: 50%;
          border: 1px solid #fff;
          background-color: rgba(0, 0, 0, 0.6);

          input {
            width: 100%;
            opacity: 1;
            visibility: visible;
          }
        }
        button {
          /* padding-left: 0.1rem; */
          padding: 0.5rem !important;
        }
      }
    }
  }

  @media (max-width: 600px) {
    nav {
      font-size: 0.8rem;
      padding: 0.5rem;
      .left {
        .logo {
          display: none;
        }
        .browse-menu {
          padding: 0;
        }
      }
      .right {
        gap: 0.2rem;
        .show-search {
          border: 1px solid #fff;
          background-color: rgba(0, 0, 0, 0.6);
          button {
            padding-left: 0.5rem;
          }
          input {
            font-size: 0.8rem;
            width: 100%;
            opacity: 1;
            visibility: visible;
          }
        }
        button {
          font-size: 0.8rem;
        }
      }
    }
  }
`;
