import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheck, FaCopy } from 'react-icons/fa';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: rgba(9, 9, 11, 0.7);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-color);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  
  @media (max-width: 1024px) {
    padding: 0 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    height: 60px;
  }
`;

const Logo = styled.a`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  span {
    background: linear-gradient(135deg, var(--accent-peach), var(--accent-pink));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  &:hover {
    transform: scale(1.02);
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none; /* Hide standard links on small mobile, rely on sections */
  }
`;

const NavLink = styled.a`
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${props => props.active ? 'var(--accent-peach)' : 'var(--text-muted)'};
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
  
  &:hover {
    color: var(--accent-peach);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0%'};
    height: 2px;
    background: linear-gradient(90deg, var(--accent-peach), var(--accent-pink));
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const RightBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ContactsMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 600px) {
    display: none;
  }
`;

const ContactPill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    border-color: var(--border-hover);
    color: var(--accent-peach);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CopyFeedback = styled.span`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 176, 136, 0.95);
  color: #09090b;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  pointer-events: none;
  animation: ${fadeIn} 0.2s ease-out;
  white-space: nowrap;
`;

const SocialGrid = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: var(--text-secondary);
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--accent-peach);
    border-color: var(--border-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px var(--shadow-glow);
    background: rgba(255, 176, 136, 0.05);
  }
`;

const Header = ({ activeSection }) => {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const navItems = [
    { id: 'hero', label: 'Play' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' }
  ];

  return (
    <HeaderWrapper>
      <Logo href="#hero">
        <span>🐾 Abhijeet.cat</span>
      </Logo>
      
      <NavLinks>
        {navItems.map((item) => (
          <NavLink key={item.id} href={`#${item.id}`} active={activeSection === item.id}>
            {item.label}
          </NavLink>
        ))}
      </NavLinks>
      
      <RightBlock>
        <ContactsMenu>
          <ContactPill 
            onClick={() => copyToClipboard('aabhipawar26@gmail.com', 'email')}
            title="Click to copy email"
          >
            <FaEnvelope />
            <span>Email</span>
            {copiedField === 'email' && <CopyFeedback>Copied!</CopyFeedback>}
          </ContactPill>
          
          <ContactPill 
            onClick={() => copyToClipboard('+919822457348', 'phone')}
            title="Click to copy phone"
          >
            <FaPhone />
            <span>Call</span>
            {copiedField === 'phone' && <CopyFeedback>Copying!</CopyFeedback>}
          </ContactPill>
        </ContactsMenu>
        
        <SocialGrid>
          <SocialLink 
            href="https://github.com/itz-abhijeet" 
            target="_blank" 
            rel="noopener noreferrer"
            title="GitHub"
          >
            <FaGithub />
          </SocialLink>
          <SocialLink 
            href="https://www.linkedin.com/in/abhijeetpawar26/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <FaLinkedin />
          </SocialLink>
        </SocialGrid>
      </RightBlock>
    </HeaderWrapper>
  );
};

export default Header;