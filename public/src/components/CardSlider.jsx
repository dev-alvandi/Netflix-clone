import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { GrNext, GrPrevious } from 'react-icons/gr';

import Card from './Card';

export default React.memo(function CardSlider({ data, title }) {
  const listRef = useRef();

  // const [visibleItemsIndexes, setVisibleItemsIndexes] = useState([]);
  // const [sliderChildWidthVal, setSliderChildWidthVal] = useState(0);
  const [sliderWidthVal, setSliderWidthVal] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    if (listRef.current) {
      setSliderWidthVal(listRef.current.clientWidth);
    }
    // if (listRef.current.children[0]) {
    //   setSliderChildWidthVal(listRef.current.children[0].clientWidth);
    // }
  }, []);

  // ! Fixing the horizontal scroll logic!
  // useEffect(() => {
  //   const itemPerScreen = Math.floor(sliderWidthVal / sliderChildWidthVal);
  //   const visibleItems = [];
  //   for (let i = itemPerScreen * sliderValue; i < itemPerScreen; i++) {
  //     visibleItems.push(i);
  //   }
  //   console.log(visibleItems);
  //   setVisibleItemsIndexes(visibleItems);
  // }, [sliderValue]);

  const handleDirection = (direction) => {
    const itemCount = data.length;
    const childWidth = listRef.current.children[0].clientWidth;
    const itemPerScreen = Math.floor(sliderWidthVal / childWidth);
    const allowedShift = itemCount / itemPerScreen;

    if (direction === 'left' && sliderValue > 0) {
      listRef.current.style.setProperty('--slider-index', sliderValue - 1);
    } else if (direction === 'right' && sliderValue + 1 < allowedShift) {
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
          <GrPrevious />
        </button>
        <div className="flex slider" ref={listRef}>
          {data.map((movie, index) => {
            return (
              <Card
                // extraClass={
                //   visibleItemsIndexes.includes(index) && `on-screen-${index}`
                // }
                movieData={movie}
                index={index}
                key={movie.id}
              />
            );
          })}
        </div>
        <button
          className="handle right-handle"
          onClick={() => handleDirection('right')}>
          <GrNext />
        </button>
      </div>
    </Container>
  );
});

const Container = styled.div`
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
      --slider-index: 0;
      width: 95%;
      transition: 0.6s ease-in-out;
      transform: translateX(calc(var(--slider-index) * -100%));
    }
    .handle {
      border: none;
      outline: none;
      flex-grow: 0;
      width: 2.5%;
      z-index: 80;
      padding: 0 0.5rem;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      transition: 0.2s ease-in-out;
      background: hsla(0, 0%, 8%, 0.5);
      border-radius: 0.2rem;

      cursor: pointer;
      svg {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out,
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
`;
