import React from 'react';
import styled from 'styled-components';

export default function Button({ children, style, onClick, className }) {
  return (
    <ButtonTag onClick={onClick} style={style} className={className}>
      {children}
    </ButtonTag>
  );
}

const ButtonTag = styled.button`
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1.5rem;
  font: inherit;
  background: rgb(229, 9, 20);
  color: #fff;
  cursor: pointer;
  font-weight: bolder;
  font-size: 1.05rem;
  transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
  &:hover {
    background: rgb(193, 17, 25);
  }
`;
