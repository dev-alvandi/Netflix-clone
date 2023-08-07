import React from 'react';
import styled from 'styled-components';
import Card from './Card';

export default function SearchedMovies({ movies, closeSearchHandler }) {
  return (
    <SearchContainer onClick={closeSearchHandler}>
      <div className="body flex">
        {movies.map((movie, index) => (
          <Card movieData={movie} key={movie.id} index={index} />
        ))}
      </div>
    </SearchContainer>
  );
}
const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #141414;
  position: fixed;
  left: 0;
  z-index: 1001;
  .body {
    width: 95%;
    margin: auto;
    margin-top: 15rem;
    flex-wrap: wrap;
  }
`;
