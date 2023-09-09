import React, { useState } from 'react';
import styled from 'styled-components';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import Button from '../components/Button';
import { firebaseAuth } from '../utils/firebase.config';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          setError('The entered email is invalid.');
          break;
        case 'auth/email-already-in-use':
          setError('Email is already registered.');
          break;
        case 'auth/missing-password':
          setError('Password is missing.');
          break;
        case 'auth/weak-password':
          setError('A weak password is entered.');
          break;
        default:
      }
    }
  };

  onAuthStateChanged(firebaseAuth, (currUser) => {
    if (currUser) {
      navigate('/');
    }
  });

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited films, TV programmes and more</h1>
            <h4>Watch anywhere. Cancel at any time.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {showPassword && (
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            )}
            {!showPassword && (
              <Button
                style={{ borderRadius: '0' }}
                type="submit"
                onClick={() => setShowPassword(true)}>
                Get Started
              </Button>
            )}
          </div>
          {showPassword && <Button onClick={handleSignup}>Sign Up</Button>}
          {error.length > 0 && <div className="error">{error}</div>}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${(showPassword) =>
          showPassword ? '1fr 1fr' : '2fr 1fr'};
        width: 60%;
        input {
          color: #000;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
      }
      .error {
        width: 30%;
        margin-top: 1rem;
        text-align: center;
        padding: 10px 20px;
        border-radius: 0.25rem;
        background: #e87c03;
        color: #fff;
      }
    }
  }
  @media only screen and (max-width: 48rem) {
    .content {
      background-color: transparent;
    }
  }
`;
