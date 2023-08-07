import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri';
import { BsCheck } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';

import video from '../assets/dummyTrailer.mp4';
import { firebaseAuth } from '../utils/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { SERVER_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFromLikedMovies } from '../store';

export default React.memo(function Card({
  movieData,
  index,
  isLiked = false,
  extraClass,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(undefined);
  const [isHovered, setIsHovered] = useState(false);

  onAuthStateChanged(firebaseAuth, (currUser) => {
    if (currUser) {
      return setEmail(currUser.email);
    }
    navigate('/login');
  });

  // console.log(movieData);
  // const RemoveFromList = () => {
  //   try {
  //     axios.post(`${SERVER_URL}/api/user/remove`, { email, data: movieData });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const addToList = () => {
    try {
      axios.post(`${SERVER_URL}/api/user/add`, { email, data: movieData });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      className={extraClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieData.image}`}
        alt="Movie"
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieData.image}`}
              alt="Movie"
              onClick={() => navigate('/player')}
            />
            <video
              src={video}
              autoPlay={true}
              loop
              muted
              onClick={() => navigate('/player')}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate('/player')}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate('/player')}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck
                    title="Remove from List"
                    onClick={() =>
                      dispatch(
                        removeFromLikedMovies({ email, movieId: movieData.id })
                      )
                    }
                  />
                ) : (
                  <AiOutlinePlus
                    title="Add to my list"
                    onClick={() => addToList(movieData)}
                  />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  --items-per-screen: 4;
  flex: 0 0 calc(100% / var(--items-per-screen));
  max-width: calc(100% / var(--items-per-screen));
  aspect-ratio: 16 / 9;
  padding: 0.25rem;
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    z-index: 10;
    border-radius: 0.3rem;
  }
  .hover {
    z-index: 90;
    height: 150%;
    width: 100%;
    position: absolute;
    cursor: pointer;
    bottom: 0;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.7s ease-in-out;
    .image-video-container {
      position: relative;
      height: calc(100% - 9rem);

      img,
      video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.3rem;
        transition: 0.5s ease-in-out;
      }
      img {
        z-index: 4;
      }
      video {
        opacity: 0;
        visibility: hidden;
        z-index: 5;
      }
    }
    .info-container {
      width: 100%;
      position: absolute;
      bottom: 0;
      transition: 0.3s ease-in-out;
      padding: 1rem;
      height: 9rem;
      gap: 0.5rem;
      background-color: #141414;
      .icons {
        .controls {
          display: flex;
          gap: 1rem;
        }
        svg {
          font-size: 1.8rem;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            color: #b8b8b8;
          }
        }
      }
      .genres {
        ul {
          width: 100%;
          gap: 1rem;
          /* border: 1px solid #fff; */
          li {
            /* border: 1px solid #fff; */
            font-size: 0.9rem;
            list-style-type: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            &:not(:first-of-type) {
              &::before {
                display: inline-block;
                content: '';
                width: 0.25vw;
                height: 0.25vw;
                background-color: #fff;
                border-radius: 50%;
                border: 1px solid #fff;
              }
            }
          }
        }
      }
    }
    &:hover {
      img {
        opacity: 0;
        visibility: hidden;
      }
      video {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  @media (max-width: 1024px) {
    --items-per-screen: 3;
  }
  @media (max-width: 768px) {
    --items-per-screen: 2;
  }
  @media (max-width: 425px) {
    --items-per-screen: 1;
  }
`;
