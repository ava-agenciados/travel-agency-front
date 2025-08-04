import React from 'react';
import styled from 'styled-components';


const Button = ({ onClick }) => { 
  return (
    <StyledWrapper>
      <button className="full-rounded" onClick={onClick}>
        <span>Adicionar acompanhante</span>
      </button>
    </StyledWrapper>
  );
}


const StyledWrapper = styled.div`
  button {
    font-size: 15px;
    position: relative;
    margin: auto;
    padding: 0.6em 1.5em 0.6em 1.5em;
    border: none;
    background: #223A5F;
    color: #fff;
    transition: all 0.1s linear;
    box-shadow: 0 0.4em 1em rgba(34, 58, 95, 0.10);
    border-radius: 2em;
    font-family: inherit;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 150px;
  }

  button:active {
    transform: scale(0.97);
  }

  button span {
    color: #fff;
    letter-spacing: 0.01em;
  }
`;

export default Button;
