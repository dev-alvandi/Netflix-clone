import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { GrNext, GrPrevious } from 'react-icons/gr';

import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import LoadingMovies from './LoadingMovies';

export default React.memo(function CardSlider({ data, title }) {
  const listRef = useRef();

  const dispatch = useDispatch();
  const genresLoaded = useSelector((state) => state.netflix.moviesLoaded);

  // const [visibleItemsIndexes, setVisibleItemsIndexes] = useState([]);
  // const [sliderChildWidthVal, setSliderChildWidthVal] = useState(0);
  const [sliderWidthVal, setSliderWidthVal] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideArrow, setHideArrow] = useState('');

  useEffect(() => {
    if (genresLoaded) {
      setIsLoaded(true);
    }
  }, [genresLoaded]);

  useEffect(() => {
    if (listRef.current) {
      setSliderWidthVal(listRef.current.clientWidth);
    }
  }, []);

  const handleDirection = (direction) => {
    const itemCount = data.length;
    const childWidth = listRef.current.children[0].clientWidth;
    const itemPerScreen = Math.floor(sliderWidthVal / childWidth);
    const allowedShift = itemCount - itemPerScreen;

    if (direction === 'left' && sliderValue > 0) {
      listRef.current.style.setProperty('--slider-index', sliderValue - 1);
    } else if (direction === 'right' && sliderValue < Math.ceil(allowedShift)) {
      listRef.current.style.setProperty('--slider-index', sliderValue + 1);
    }
    setSliderValue(
      parseInt(
        getComputedStyle(listRef.current).getPropertyValue('--slider-index')
      )
    );
  };
  return (
    <Container className="flex column">
      <div className="header flex j-between a-center">
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="progress-bar">
          {/* {new Array(progressBarCount).map((blankItem, index) => (
            <div
              key={index}
              className={`progress-item ${index === 0 && 'active'}`}></div>
          ))} */}
        </div>
      </div>
      <div className="wrapper flex j-center">
        <button
          className="handle left-handle"
          onClick={() => handleDirection('left')}>
          {hideArrow !== 'left' && <GrPrevious />}
        </button>
        <div className="flex slider" ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <button
          className="handle right-handle"
          onClick={() => handleDirection('right')}>
          {hideArrow !== 'right' && <GrNext />}
        </button>
      </div>
    </Container>
  );
});

const Container = styled.div`
  --moving-factor: -25%;
  position: relative;
  padding: 2rem 0;
  .none {
    display: none;
  }
  .header {
    width: 95%;
    margin: auto;
    position: relative;

    .title {
      padding: 1rem 0;
      position: relative;
      h1 {
      }
    }
    .progress-bar {
      display: flex;
      gap: 0.2rem;
      .progress-item {
        flex: 0 0 0.75rem;
        height: 0.125rem;
        min-width: 2rem;
        background-color: #4d4d4d;
      }
      .active {
        background-color: #aaa;
      }
    }
  }
  .wrapper {
    .slider {
      --slider-index: -25%;
      width: 95%;
      transition: 0.35s ease-in-out;
      transform: translateX(calc(var(--slider-index) * var(--moving-factor)));
    }
    .handle {
      border: none;
      outline: none;
      flex-grow: 0;
      width: 4%;
      z-index: 80;
      padding: 0 0.5rem;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      transition: 0.1s ease-in-out;
      background: hsla(0, 0%, 8%, 0.5);
      border-radius: 0.2rem;

      cursor: pointer;
      svg {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.2s ease-in-out, opacity 0.3s ease-in-out,
          transform 0.45s ease-in-out;
        font-size: 2rem;
        polyline {
          stroke: #fff;
        }
      }
    }

    .right-handle {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .left-handle {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &:hover {
      .handle {
        background: hsla(0, 0%, 8%, 0.7);
        svg {
          transform: scale(1.3);
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
  @media (max-width: 1024px) {
    --moving-factor: -33.333333%;
    .handle {
      width: 4% !important;
    }
  }
  @media (max-width: 768px) {
    --moving-factor: -50%;
    .handle {
      width: 7% !important;
    }
  }
  @media (max-width: 425px) {
    --moving-factor: -100%;
    .handle {
      width: 10% !important;
    }
  }
`;
