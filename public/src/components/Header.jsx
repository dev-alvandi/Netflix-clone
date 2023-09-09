import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Logo from '../assets/Logo.png';
import Button from './Button';

export default function Header({ login }) {
  const navigate = useNavigate();

  return (
    <Container className="flex a-center j-between">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <Button onClick={() => navigate(login ? '/login' : '/signup')}>
        {login ? 'Login' : 'Sign in'}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  /* border: 1px solid #fff; */
  width: 100vw;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  .logo {
    img {
      width: 9.25rem;
      height: 2.5rem;
    }
  }
`;
