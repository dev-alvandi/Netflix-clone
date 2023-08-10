import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { firebaseAuth } from '../utils/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';

import { getGenres, fetchMovies } from '../store';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';
import LoaderSlider from '../components/LoaderSlider';

export default function Movies() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate;

  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  // const [email, setEmail] = useState(undefined);
  const [isScroll, setIsScroll] = useState(false);

  onAuthStateChanged(firebaseAuth, (currUser) => {
    if (!currUser) {
      navigate('/login');
    }
    // return setEmail(currUser.email);
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: 'movie' }));
    }
  }, [genresLoaded]);

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
      <SelectGenre
        genres={genres}
        type="movie"
        title="Movies"
        isScroll={isScroll}
      />
      <div className="data">
        {genres.length <= 0 ? (
          <div className="loader-container" style={{ paddingTop: '1rem' }}>
            <LoaderSlider />
          </div>
        ) : movies.length ? (
          <Slider movies={movies} isLoading={!genresLoaded} />
        ) : (
          <NotAvailable />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 10rem;
    .not-available {
      text-align: center;
      color: #fff;
      margin-top: 4rem;
    }
  }
`;
