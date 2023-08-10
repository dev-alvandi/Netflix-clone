import React, { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';

import Navbar from '../components/Navbar';
import BackgroundImage from '../assets/home.jpg';
import MovieLogo from '../assets/MovieLogo.png';
import Button from '../components/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Slider from '../components/Slider';

export default function Netflix() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isScroll, setIsScroll] = useState(false);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: 'all' }));
    }
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScroll(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScroll={isScroll} />
      <div className="hero">
        <img src={BackgroundImage} alt="" className="background-image" />
        <div className="container flex column j-center">
          <div className="title">
            <img src={MovieLogo} alt="" />
          </div>
          <div className="paragraph">
            The Avengers are a team of superheroes appearing in American comic
            books published by Marvel Comics, created by writer-editor Stan Lee
            and artist/co-plotter Jack Kirby.
          </div>
          <div className="button flex">
            <Button
              className="play flex j-center a-center"
              onClick={() => navigate('/player')}>
              <div className="btn-icon flex j-center a-center">
                <FaPlay />
              </div>
              <div className="btn-name">Play</div>
            </Button>
            <Button className="more-info flex j-center a-center">
              <div className="btn-icon flex j-center a-center">
                <AiOutlineInfoCircle />
              </div>
              <div className="btn-name">More Info</div>
            </Button>
          </div>
        </div>
      </div>
      <Slider movies={movies} isLoading={movies.length <= 0} />
    </Container>
  );
}

const Container = styled.div`
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
      width: 100%;
    }
    .container {
      width: 36%;
      position: absolute;
      top: 50%;
      left: 3%;
      transform: translateY(-60%);
      gap: 1.5rem;
      .title {
        height: 13.2vw;
        img {
          height: 100%;
        }
      }
      .paragraph {
        font-size: 1.2vw;
        line-height: 1.2;
        font-weight: 400;
        text-shadow: 2px 2px 4px #00000072;
      }
      .button {
        gap: 1rem;
        font-size: 1.2vw;
        button {
          padding-left: 2rem;
          padding-right: 2.4rem;
          font-size: inherit;
          transition: 0.2s ease-in-out;
          .btn-icon {
            font-size: inherit;
          }
          .btn-name {
            padding-left: 0.7rem;
            font-size: 1.6rem;
            font-size: inherit;
          }
        }
        .play {
          background-color: #fff;
          color: #000;
          &:hover {
            background-color: #ffffffbf;
          }
        }
        .more-info {
          background-color: #6d6d6eb2;
          color: white;
          &:hover {
            background-color: #6d6d6e66;
          }
        }
      }
    }
  }
`;
