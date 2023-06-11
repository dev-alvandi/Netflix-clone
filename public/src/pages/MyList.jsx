import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../utils/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLikedMovies } from '../store';
import Card from '../components/Card';

export default function MyList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isScroll, setIsScroll] = useState(false);
  const likedMovies = useSelector((state) => state.netflix.likedMovies);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currUser) => {
    if (currUser) {
      return setEmail(currUser.email);
    }
    navigate('/login');
  });

  console.log(likedMovies);

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [email, likedMovies]);

  window.onscroll = () => {
    setIsScroll(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  onAuthStateChanged(firebaseAuth, (currUser) => {
    if (currUser) {
      // navigate('/movies');
    }
  });
  return (
    <Container>
      <div className="navbar">
        <Navbar isScroll={isScroll} />
      </div>
      <div className="title flex a-center">
        <h1>My List</h1>
      </div>
      <div className="body flex">
        {likedMovies.map((movie, index) => (
          <Card movieData={movie} key={movie.id} isLiked={true} index={index} />
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .title {
    position: fixed;
    top: 0;
    padding: 1rem 0 1rem 2.5%;
    margin-top: 5rem;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .body {
    width: 95%;
    margin: auto;
    margin-top: 15rem;
    flex-wrap: wrap;
  }
`;
