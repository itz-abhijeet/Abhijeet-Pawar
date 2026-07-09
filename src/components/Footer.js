import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  border-top: 1px solid var(--border-color);
  padding: 3rem 0;
  text-align: center;
  margin-top: 4rem;
`;

const FooterText = styled.p`
  color: var(--text-muted);
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const Highlight = styled.span`
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--accent-peach);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        Built with <Highlight>React.js</Highlight> & <Highlight>styled-components</Highlight>
      </FooterText>
      <FooterText>
        © 2026 Abhijeet Pawar. All rights reserved. 🐾
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;