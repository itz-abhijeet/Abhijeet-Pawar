import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; visibility: hidden; }
`;

const floatUp = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
`;

const floatDown = keyframes`
  0% { transform: translateY(-50%); }
  100% { transform: translateY(0); }
`;

const pulseDot = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.1); }
`;

const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #050505;
  z-index: 9999;
  overflow: hidden;
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  animation: ${props => props.$isFading ? fadeOut : 'none'} 0.8s forwards;
`;

/* Background Image Grid - Taller, fully colorful & sharp */
const BackgroundGrid = styled.div`
  position: absolute;
  top: -20%;
  left: -5%;
  width: 110%;
  height: 140%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  opacity: 0.28; /* Highly visible but behind dark tint overlay */
  pointer-events: none;
  filter: brightness(0.6);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: max-content;
  animation: ${props => props.$reverse ? floatDown : floatUp} ${props => props.$duration}s linear infinite;
`;

const ImageCard = styled.div`
  width: 100%;
  aspect-ratio: 1.3;
  border-radius: 16px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
`;

/* Dark Vignette Overlay for Premium Contrast */
const Vignette = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(5, 5, 5, 0.2) 0%, rgba(5, 5, 5, 0.85) 80%);
  pointer-events: none;
  z-index: 2;
`;

/* Minimal Loader in Bottom Right Corner */
const CornerLoader = styled.div`
  position: absolute;
  bottom: 2.5rem;
  right: 2.5rem;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(11, 11, 11, 0.85);
  padding: 0.7rem 1.2rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 209, 119, 0.2);
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  
  @media (max-width: 480px) {
    bottom: 1.5rem;
    right: 1.5rem;
    padding: 0.6rem 1rem;
  }
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ffd177;
  animation: ${pulseDot} 1.5s ease-in-out infinite;
  box-shadow: 0 0 8px #ffd177;
`;

const LoaderText = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #ffffff;
  
  span {
    color: #ffd177;
    margin-left: 0.4rem;
  }
`;

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Curated list of images
  const col1 = [
    '/game_valorant.webp',
    '/anime_demonslayer.webp',
    '/project_aircraft.webp',
    '/game_cricket.webp',
    '/anime_onepunch.webp'
  ];
  
  const col2 = [
    '/anime_sololeveling.webp',
    '/game_gta5.webp',
    '/anime_myhero.webp',
    '/game_forza.webp',
    '/anime_horimiya.webp'
  ];

  const col3 = [
    '/anime_yourname.webp',
    '/developer_portrait.webp',
    '/anime_suzume.webp',
    '/game_chameleon.webp',
    '/anime_chainsaw.webp'
  ];

  const col4 = [
    '/game_valorant.webp',
    '/anime_demonslayer.webp',
    '/project_aircraft.webp',
    '/game_gta5.webp',
    '/anime_onepunch.webp'
  ];

  useEffect(() => {
    const duration = 2200; // 2.2 seconds loading time
    const intervalTime = 20; 
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 800);
          }, 200);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const renderColumnImages = (list) => {
    return [...list, ...list].map((src, index) => (
      <ImageCard key={index} src={src} />
    ));
  };

  return (
    <SplashContainer $isFading={isFading}>
      <BackgroundGrid>
        <Column $duration={18}>{renderColumnImages(col1)}</Column>
        <Column $reverse $duration={22}>{renderColumnImages(col2)}</Column>
        <Column $duration={20}>{renderColumnImages(col3)}</Column>
        <Column $reverse $duration={16}>{renderColumnImages(col4)}</Column>
      </BackgroundGrid>

      <Vignette />

      <CornerLoader>
        <StatusDot />
        <LoaderText>
          AP PORTFOLIO <span>{Math.round(progress)}%</span>
        </LoaderText>
      </CornerLoader>
    </SplashContainer>
  );
};

export default SplashScreen;
