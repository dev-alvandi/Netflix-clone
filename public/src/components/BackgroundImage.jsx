import React from 'react';
import styled from 'styled-components';

import background from '../assets/backgroundImage.jpg';

export default function BackgroundImage() {
  return (
    <Container>
      <img src={background} alt="" />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  display: block;
  background-size: cover;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  img {
    min-width: 100vw;
    min-height: 100vh;
  }
  @media only screen and (max-width: 48rem) {
    background-color: #000;
    img {
      display: none;
    }
  }
`;
