import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { ArrowForward } from '@mui/icons-material';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(45deg, #00B4D8, #0096C7);
  color: white;
  padding: 0.7rem 1.8rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 180, 216, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  font-family: 'Inter', 'Poppins', sans-serif;
  text-transform: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: linear-gradient(45deg, #0096C7, #00B4D8);
    box-shadow: 0 6px 20px rgba(0, 180, 216, 0.4);
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
    }
    
    svg {
      transform: translateX(5px);
    }
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
    }
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(45deg, #00B4D8, #0096C7);
  color: white;
  padding: 0.7rem 1.8rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 180, 216, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', 'Poppins', sans-serif;
  text-transform: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: linear-gradient(45deg, #0096C7, #00B4D8);
    box-shadow: 0 6px 20px rgba(0, 180, 216, 0.4);
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
    }
    
    svg {
      transform: translateX(5px);
    }
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
`;

const Button = ({ 
  children, 
  to, 
  onClick, 
  disabled, 
  showArrow = true,
  fullWidth = false,
  ...props 
}) => {
  const style = fullWidth ? { width: '100%' } : {};
  
  if (to) {
    return (
      <StyledLink to={to} style={style} {...props}>
        {children}
        {showArrow && <ArrowForward />}
      </StyledLink>
    );
  }
  
  return (
    <StyledButton onClick={onClick} disabled={disabled} style={style} {...props}>
      {children}
      {showArrow && <ArrowForward />}
    </StyledButton>
  );
};

export default Button; 