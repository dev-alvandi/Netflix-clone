import React, { useState } from 'react';
import styled from 'styled-components';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { MdOutlineVisibilityOff, MdOutlineVisibility } from 'react-icons/md';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import Button from '../components/Button';
import { firebaseAuth } from '../utils/firebase.config';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    const { email, password } = formValues;
    signInWithEmailAndPassword(firebaseAuth, email, password).catch((err) => {
      switch (err.code) {
        case 'auth/invalid-email':
          setError('The entered email is invalid.');
          break;
        case 'auth/weak-password':
          setError('A weak password is entered.');
          break;
        case 'auth/user-not-found':
          setError('Email and/or password is entered incorrectly.');
          break;
        case 'auth/wrong-password':
          setError('Wrong password is entered.');
          break;
        default:
      }
    });
  };

  onAuthStateChanged(firebaseAuth, (currUser) => {
    if (currUser) {
      navigate('/');
    }
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column j-center a-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Log in</h3>
            </div>
            {error.length > 0 && <div className="error">{error}</div>}
            <div className="container flex column">
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
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
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
                {showPassword ? (
                  <MdOutlineVisibility onClick={() => setShowPassword(false)} />
                ) : (
                  <MdOutlineVisibilityOff
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              <Button
                style={{ padding: '1rem' }}
                type="submit"
                onClick={handleLogin}>
                Login
              </Button>
            </div>
          </div>
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
    .form-container {
      height: 85vh;
      .title {
        font-size: 2rem;
      }
      .form {
        padding: 3.5rem 4rem;
        border-radius: 0.25rem;
        background-color: #000000b0;
        gap: 2rem;
        color: white;
        .error {
          width: 20rem;
          padding: 10px 20px;
          border-radius: 0.25rem;
          background: #e87c03;
          color: #fff;
        }
        .container {
          gap: 2rem;
          input {
            width: 20rem;
            background-color: #333;
            padding: 1rem 1.25rem;
            border-radius: 0.25rem;
            color: #fff;
            border: none;
            outline: none;

            &:focus {
              background-color: #454545;
            }
          }
          .password-wrapper {
            position: relative;
            svg {
              position: absolute;
              top: 50%;
              right: 0.75rem;
              transform: translateY(-50%);
              border-radius: 50%;
              padding: 0.4rem;
              color: #8c8c8c;
              font-size: 2rem;
              transition: 0.2s ease-in-out;
              cursor: pointer;
              &:hover {
                background-color: #1a1a1a;
              }
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 48rem) {
    .content {
      background-color: transparent;
    }
  }
`;
