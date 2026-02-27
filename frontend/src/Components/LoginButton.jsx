import React from 'react';
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';

const LoginButton = ({ onLogin }) => {
  return (
    <StyledWrapper>
      <button onClick={onLogin}>
        <div className="icon">
          <FaUser size={18} />
        </div>
        <span className="text">Login</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    display: flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #2563eb, #1e40af);
    color: white;
    padding: 10px 18px;
    border-radius: 14px;
    border: none;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 6px 14px rgba(0,0,0,0.25);
  }

  button:hover {
    transform: translateY(-2px);
  }

  .icon {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default LoginButton;