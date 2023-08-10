import React from 'react';
import styled from 'styled-components';

export default function LoaderSlider() {
  return (
    <Container>
      <div className="row-container">
        <div className="row-header">
          <span className="row-title">&nbsp;</span>
        </div>
        <div className="row-container__inner">
          <div className="slider">
            <div className="loading-title">
              <div className="pulsate item-1"></div>
            </div>
            <div className="loading-title">
              <div className="pulsate item-2"></div>
            </div>
            <div className="loading-title">
              <div className="pulsate item-3"></div>
            </div>
            <div className="loading-title">
              <div className="pulsate item-4"></div>
            </div>
            <div className="loading-title">
              <div className="pulsate item-5"></div>
            </div>
            <div className="loading-title">
              <div className="pulsate item-6"></div>
            </div>
            <div className="loading-title">
              <div className="pulsate item-7"></div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .row-container {
    position: relative;
    margin: 3vw 0;
    padding: 0;
    z-index: 1;
    transition: transform 0.54s cubic-bezier(0.5, 0, 0.1, 1) 0s;
    &:hover {
      z-index: 3;
    }
    .row-header {
      line-height: 1.3;
      margin: 0;
      .row-title {
        font-size: 1.4vw;
        color: #999;
        font-weight: 700;
        margin: 0 4% 0.5em 4%;
        text-decoration: none;
        display: inline-block;
        min-width: 6em;
        background-color: #1a1a1a;
      }
    }
    .row-container__inner {
      overflow-x: hidden;
      white-space: nowrap;
      .slider {
        position: relative;
        margin: 0;
        padding: 0 4%;
        touch-action: pan-y;
        .loading-title {
          display: inline-block;
          border-right: 2px solid #141414;
          border-left: 2px solid #141414;
          display: inline-block;
          position: relative;
          margin: 0 2px;
          z-index: 1;
          cursor: pointer;
          outline: 0;
          .pulsate {
            padding: 27.25% 0;
            animation: pulsateAnimation 3.6s infinite ease-in-out;
          }
          .item-1 {
            animation-delay: 0s;
          }
          .item-2 {
            animation-delay: 0.2s;
            background-color: #fff;
          }
          .item-3 {
            animation-delay: 0.4s;
          }
          .item-4 {
            animation-delay: 0.6000000000000001s;
          }
          .item-5 {
            animation-delay: 0.8s;
          }
          .item-6 {
            animation-delay: 1s;
          }
          .item-7 {
            animation-delay: 1.2000000000000002s;
          }
        }
      }
    }
  }

  @media screen and (min-width: 1500px) {
    .slider {
      padding: 0 60px;
    }
  }

  @keyframes pulsateAnimation {
    from {
      background-color: #1a1a1a;
    }
    25% {
      background-color: #333;
    }
    50% {
      background-color: #1a1a1a;
    }
    to {
      background-color: #1a1a1a;
    }
  }

  @media screen and (max-width: 499px) {
    .loading-title {
      width: 50%;
    }
  }

  @media screen and (min-width: 500px) and (max-width: 799px) {
    .loading-title {
      width: 33.333333%;
    }
  }

  @media screen and (min-width: 800px) and (max-width: 1099px) {
    .loading-title {
      width: 25%;
    }
  }

  @media screen and (min-width: 1100px) and (max-width: 1399px) {
    .loading-title {
      width: 20%;
    }
  }

  @media screen and (min-width: 1400px) {
    .loading-title {
      width: 16.66666667%;
    }
  }
  @media screen and (min-width: 1500px) {
    .row-title {
      margin-left: 60px;
    }
  }

  @media screen and (max-width: 800px) {
    .row-title {
      font-size: 12px;
    }
  }
`;
