import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AiFillCaretDown } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataByGenre } from '../store';

export default function SelectGenre({ genres, type, title, isScroll }) {
  const dispach = useDispatch();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const optionContainerRef = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (genresLoaded) {
      setSelected(genres[0].name);
    }
  }, [genresLoaded]);

  const handleOptionChange = (e) => {
    const target = e.target.getAttribute('name');
    const targetIndex = genres.findIndex((genre) => genre.name === target);
    if (targetIndex > -1) {
      setSelected(target);
      setIsClicked(false);
      dispach(fetchDataByGenre({ target, type }));
    }
  };

  window.onclick = () => {
    if (isClicked && !isHovered) {
      setIsClicked(false);
    }
  };

  return (
    <Container>
      <div className={`mainContainer ${isScroll && 'scrolled'}`}>
        <div className="title">
          <h1>{title}</h1>
        </div>
        {genres.length > 0 && (
          <div
            className="select-genres__container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div
              className={`selected j-between a-center ${
                isClicked && 'clicked'
              }`}
              onClick={() => setIsClicked(!isClicked)}>
              {selected}
              <AiFillCaretDown />
            </div>
            <ul
              className="options-container"
              style={{ display: isClicked ? 'block' : 'none' }}>
              <li
                className="options"
                onClick={handleOptionChange}
                ref={optionContainerRef}>
                {genres.map((genre) => {
                  return (
                    <div
                      className="option"
                      name={genre.name}
                      value={genre.id}
                      key={genre.id}>
                      {genre.name}
                    </div>
                  );
                })}
              </li>
            </ul>
          </div>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  background-color: transparent;
  width: 100%;
  z-index: 100;
  top: 5rem;
  color: #fff;
  font-size: 1rem;
  .scrolled {
    background-color: #141414;
  }
  .mainContainer {
    transition: 0.3s ease-in-out;
    padding: 1rem 0 1rem 2.5%;
    display: flex;
    gap: 4rem;
    align-items: center;
    .title {
      font-weight: bold;
      font-size: 1.5rem;
    }
    .clicked {
      background-color: hsla(0, 0%, 100%, 0.1);
    }
    .select-genres__container {
      cursor: pointer;
      border: 1px solid #fff;
      position: relative;
      z-index: 20;
      .selected {
        border: 1px solid hsla(0, 0%, 100%, 0.9);
        display: inline-flex;
        gap: 1rem;
        padding: 0.5rem 1rem;
      }
      .options-container {
        cursor: default;
        position: absolute;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.9);
        border: 1px solid hsla(0, 0%, 100%, 0.15);
        .options {
          display: grid;
          grid-template-columns: auto auto auto;
          gap: 1.5rem;
          padding: 1.5rem;
          .option {
            cursor: pointer;
            white-space: pre;
            /* border: 1px solid #fff; */
            display: inline;
            display: flex;
            justify-content: flex-start;
            align-content: center;
          }
        }
      }
    }
  }
`;
