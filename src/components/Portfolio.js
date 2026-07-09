import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './Header';
import About from './About';
import Experience from './Experience';
import Skills from './Skills';
import Projects from './Projects';
import Footer from './Footer';
import DinosaurGame from './DinosaurGame';

const Container = styled.div`
  min-height: 100vh;
  position: relative;
  background-color: var(--bg-primary);
  overflow-x: hidden;
  color: var(--text-primary);
`;

const Spotlight = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: radial-gradient(
    600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
    rgba(255, 176, 136, 0.04),
    transparent 80%
  );
  z-index: 1;
`;

// Floating background elements
const FloatingElement = styled.div`
  position: absolute;
  font-size: ${props => props.size || '1.5rem'};
  opacity: 0.15;
  pointer-events: none;
  animation: drift ${props => props.duration || '20s'} linear infinite;
  animation-delay: ${props => props.delay || '0s'};
  bottom: -100px;
  left: ${props => props.left || '10%'};
  z-index: 0;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 4rem 4rem;
  max-width: 1300px;
  margin: 0 auto;
  gap: 4rem;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 8rem 2rem 4rem;
    gap: 3rem;
    text-align: center;
  }
`;

const HeroLeft = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroRight = styled.div`
  flex: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
`;

const Greeting = styled.span`
  color: var(--accent-peach);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1rem;
  display: block;
`;

const Name = styled.h1`
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  
  span {
    background: linear-gradient(135deg, var(--accent-peach), var(--accent-pink));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const RoleContainer = styled.div`
  min-height: 45px;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const typingAnimation = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent }
  50% { border-color: var(--accent-peach) }
`;

const RoleText = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  color: var(--accent-pink);
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid var(--accent-peach);
  animation: 
    ${typingAnimation} 2.5s steps(30, end) infinite alternate,
    ${blinkCaret} .75s step-end infinite;
  letter-spacing: 0.02em;
`;

const SubText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  max-width: 540px;
  
  @media (max-width: 1024px) {
    margin: 0 auto;
  }
`;

const ScrollWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 4rem 10rem;
  display: flex;
  flex-direction: column;
  gap: 12rem; /* Extremely spacious! */
  
  @media (max-width: 1024px) {
    padding: 0 2rem 8rem;
    gap: 8rem;
  }
`;

const SectionWrapper = styled.section`
  scroll-margin-top: 8rem;
  width: 100%;
`;

const blinkAnimation = keyframes`
  0%, 90%, 100% {
    transform: scaleY(1);
  }
  95% {
    transform: scaleY(0.1);
  }
`;

const BlinkingEye = styled.g`
  transform-origin: ${props => props.cx}px ${props => props.cy}px;
  animation: ${blinkAnimation} 4.5s infinite ease-in-out;
`;

const PeekingCat = styled.div`
  position: fixed;
  bottom: -12px;
  left: 20px;
  width: 150px;
  height: 150px;
  z-index: 1000;
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  filter: drop-shadow(0 0 15px rgba(255, 176, 136, 0.15));
  
  svg {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const RolesList = [
  "AWS Specialist",
  "Web Dev",
  "Android Dev",
  "DevOps Enthusiast"
];

const Portfolio = () => {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState(RolesList[0]);

  // Roles cycling animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % RolesList.length;
        setRoleText(RolesList[nextIndex]);
        return nextIndex;
      });
    }, 5000); // Change role every 5 seconds (matching the keyframe typewriter timings)
    return () => clearInterval(interval);
  }, []);

  // Spotlight mouse tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      container.style.setProperty('--mouse-x', `${e.clientX}px`);
      container.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer scrollspy
  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'projects', 'skills'];
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <Spotlight />
      
      {/* Peeking Serious Black Cat in Bottom Left */}
      <PeekingCat>
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ears */}
          <path d="M 28 85 L 12 18 L 48 65 Z" fill="#09090b" stroke="#ffb088" strokeWidth="2.5"/>
          <path d="M 132 85 L 148 18 L 112 65 Z" fill="#09090b" stroke="#ffb088" strokeWidth="2.5"/>

          {/* Head */}
          <path d="M 0 160 C 0 85 160 85 160 160 Z" fill="#09090b" stroke="#ffb088" strokeWidth="2.5"/>
          
          {/* Piercing Glowing Eyes */}
          <path d="M 33 112 Q 50 90 67 112 Q 50 123 33 112 Z" fill="#facc15" filter="drop-shadow(0 0 4px rgba(250, 204, 21, 0.8))"/>
          <ellipse cx="50" cy="111.5" rx="1.8" ry="8" fill="#000"/>
          <circle cx="48" cy="108" r="1.5" fill="#fff" opacity="0.9"/>
          
          <path d="M 93 112 Q 110 90 127 112 Q 110 123 93 112 Z" fill="#facc15" filter="drop-shadow(0 0 4px rgba(250, 204, 21, 0.8))"/>
          <ellipse cx="110" cy="111.5" rx="1.8" ry="8" fill="#000"/>
          <circle cx="108" cy="108" r="1.5" fill="#fff" opacity="0.9"/>

          {/* Nose */}
          <polygon points="76,122 84,122 80,126" fill="#ffb088"/>
          
          {/* Mouth (Subtle) */}
          <path d="M 74 131 Q 80 134 80 131 Q 80 134 86 131" stroke="#ffb088" strokeWidth="1.5" fill="none" opacity="0.6"/>

          {/* Whiskers (Thin and elegant) */}
          <line x1="28" y1="126" x2="3" y2="123" stroke="#fff5f0" strokeWidth="1" opacity="0.4" />
          <line x1="26" y1="133" x2="1" y2="132" stroke="#fff5f0" strokeWidth="1" opacity="0.4" />
          
          <line x1="132" y1="126" x2="157" y2="123" stroke="#fff5f0" strokeWidth="1" opacity="0.4" />
          <line x1="134" y1="133" x2="159" y2="132" stroke="#fff5f0" strokeWidth="1" opacity="0.4" />
        </svg>
      </PeekingCat>

      {/* Drifting Background Cats */}
      <FloatingElement left="5%" size="2.5rem" duration="25s" delay="0s">🐱</FloatingElement>
      <FloatingElement left="20%" size="1.2rem" duration="18s" delay="4s">🐾</FloatingElement>
      <FloatingElement left="40%" size="2rem" duration="30s" delay="2s">🐈</FloatingElement>
      <FloatingElement left="60%" size="1.5rem" duration="22s" delay="6s">🐈‍⬛</FloatingElement>
      <FloatingElement left="75%" size="1.8rem" duration="26s" delay="1s">🐾</FloatingElement>
      <FloatingElement left="90%" size="2.2rem" duration="28s" delay="5s">🐱</FloatingElement>

      <ContentContainer>
        {/* Horizontal Nav Bar */}
        <Header activeSection={activeSection} />
        
        {/* Hero Section (Landing fold showing Name, animated roles, and Cat game) */}
        <HeroSection id="hero">
          <HeroLeft>
            <Greeting>Welcome to my playground</Greeting>
            <Name>
              Abhijeet <span>Pawar</span>
            </Name>
            <RoleContainer>
              {/* Typewriter keyframe triggers visual updates */}
              <RoleText key={roleIndex}>{roleText}</RoleText>
            </RoleContainer>
            <SubText>
              I build scalable full-stack applications, automate DevOps delivery pipelines, orchestrate secure AWS architectures, and love cats!
            </SubText>
          </HeroLeft>
          
          <HeroRight>
            {/* DinosaurGame acts as the Cat Runner Game */}
            <DinosaurGame />
          </HeroRight>
        </HeroSection>

        {/* Spacious scrollable sections below the hero fold */}
        <ScrollWrapper>
          <SectionWrapper id="about">
            <About />
          </SectionWrapper>
          <SectionWrapper id="experience">
            <Experience />
          </SectionWrapper>
          <SectionWrapper id="projects">
            <Projects />
          </SectionWrapper>
          <SectionWrapper id="skills">
            <Skills />
          </SectionWrapper>
          <Footer />
        </ScrollWrapper>
      </ContentContainer>
    </Container>
  );
};

export default Portfolio;