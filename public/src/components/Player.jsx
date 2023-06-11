import React from 'react';
import styled from 'styled-components';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import video from '../assets/dummyTrailer.mp4';

export default function Player() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="player">
        <div className="back-btn">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video src={video} autoPlay loop controls muted />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    position: relative;
    .back-btn {
      position: absolute;
      top: 2rem;
      left: 2rem;
      z-index: 2;
      cursor: pointer;
      svg {
        font-size: 3rem;
      }
    }
    video {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      /* object-fit: cover; */
    }
  }
`;
