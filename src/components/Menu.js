import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const MenuWrapper = styled.div`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  
  @media (max-width: 768px) {
    top: 1rem;
    width: 90%;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  background: ${props => props.isDark ? 'rgba(20, 20, 20, 0.75)' : 'rgba(255, 255, 255, 0.75)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(26, 26, 26, 0.08)'};
  padding: 0.5rem 1.8rem;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  gap: 1.5rem;
  transition: var(--transition-smooth);
  
  @media (max-width: 768px) {
    padding: 0.4rem 1.2rem;
    width: 100%;
    justify-content: space-between;
    gap: 0.5rem;
  }
`;

const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: relative;
`;

const ArrowIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 6px;
  height: 6px;
  opacity: 0;
  transform: translateX(-5px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  color: var(--accent-color);
  
  svg {
    width: 100%;
    height: auto;
  }
`;

const StyledLink = styled(Link)`
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${props => props.active ? 'var(--accent-color)' : 'var(--text-color)'};
  padding: 0.4rem 0.2rem;
  transition: var(--transition-fast);
  display: flex;
  align-items: center;
  
  &:hover {
    color: var(--accent-color);
  }

  &:hover + ${ArrowIcon}, & + ${ArrowIcon}:hover {
    opacity: 1;
    transform: translateX(0);
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    letter-spacing: 0.08em;
  }
`;

const MonogramWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${props => props.isDark ? '#fff' : '#1a1a1a'};
  color: ${props => props.isDark ? '#000' : '#fff'};
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 0.95rem;
  letter-spacing: -0.05em;
  cursor: pointer;
  transition: var(--transition-smooth);
  margin: 0 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: rotate(360deg) scale(1.05);
    background: var(--accent-color);
    color: #fff;
  }
  
  @media (max-width: 768px) {
    width: 34px;
    height: 34px;
    font-size: 0.8rem;
    margin: 0;
  }
`;

const MonogramText = styled.span`
  line-height: 1;
`;

const TriangleArrow = () => (
  <svg viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5625 3.22427C8.14583 3.56904 8.14583 4.43096 7.5625 4.77573L2.3125 7.87866C1.72917 8.22343 1 7.79246 1 7.10293L1 0.897074C1 0.207534 1.72917 -0.223427 2.3125 0.121342L7.5625 3.22427Z" />
  </svg>
);

const Menu = () => {
  const location = useLocation();
  const path = location.pathname;
  const isDark = path !== '/' && path !== '';

  return (
    <MenuWrapper>
      <NavContainer isDark={isDark}>
        {/* Left side links */}
        <MenuItemWrapper>
          <StyledLink to="/" active={path === '/'}>me</StyledLink>
          <ArrowIcon><TriangleArrow /></ArrowIcon>
        </MenuItemWrapper>

        <MenuItemWrapper>
          <StyledLink to="/certifications" active={path === '/certifications'}>certs</StyledLink>
          <ArrowIcon><TriangleArrow /></ArrowIcon>
        </MenuItemWrapper>

        {/* Dynamic monogram logo */}
        <Link to="/">
          <MonogramWrapper isDark={isDark}>
            <MonogramText>AP</MonogramText>
          </MonogramWrapper>
        </Link>

        {/* Right side links */}
        <MenuItemWrapper>
          <StyledLink to="/grid" active={path === '/grid'}>grid</StyledLink>
          <ArrowIcon><TriangleArrow /></ArrowIcon>
        </MenuItemWrapper>

        <MenuItemWrapper>
          <StyledLink to="/list" active={path === '/list'}>list</StyledLink>
          <ArrowIcon><TriangleArrow /></ArrowIcon>
        </MenuItemWrapper>
      </NavContainer>
    </MenuWrapper>
  );
};

export default Menu;
