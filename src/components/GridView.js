import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGithub, FaPlane, FaCloud, FaChartLine, FaHeartbeat, FaCalendarAlt, FaAndroid } from 'react-icons/fa';

const GridWrapper = styled.div`
  background-color: #0b0b0b;
  color: #ffffff;
  padding: 8rem 0 4rem;
  min-height: 100vh;
`;

const GridHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  align-items: flex-end;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1.5rem;
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const FilterButton = styled.button`
  background: transparent;
  border: none;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${props => props.active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.4)'};
  cursor: pointer;
  transition: var(--transition-fast);
  padding: 0.4rem 0.8rem;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const MixContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
`;

const MixCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-6px);
    border-color: var(--accent-color);
    box-shadow: 0 15px 35px rgba(255, 209, 119, 0.1);
  }
`;

const CardCover = styled.div`
  width: 100%;
  aspect-ratio: 1.6;
  background: ${props => props.$gradient || 'linear-gradient(135deg, #222, #111)'};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  /* Cyber Grid Overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
  }

  /* Radial center glow */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background: radial-gradient(circle, ${props => props.$color || 'var(--accent-color)'}15 0%, transparent 70%);
    pointer-events: none;
    transition: var(--transition-smooth);
  }
`;

const CoverLabel = styled.div`
  position: absolute;
  bottom: 1.2rem;
  left: 1.2rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ffffff;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 2;
  backdrop-filter: blur(5px);
`;

const CoverIconWrapper = styled.div`
  font-size: 3.5rem;
  color: ${props => props.$color || 'var(--accent-color)'};
  opacity: 0.25;
  transform: scale(1);
  transition: var(--transition-smooth);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 10px ${props => props.$color || 'var(--accent-color)'}40);

  ${MixCard}:hover & {
    opacity: 0.55;
    transform: scale(1.15) rotate(5deg);
  }
`;

const CardContent = styled.div`
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  .category {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent-color);
  }
  
  .date {
    font-size: 0.85rem;
    color: var(--text-muted);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  line-height: 1.35;
`;

const CardDesc = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const CardLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const CardLink = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #ffffff;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const GridView = () => {
  const [filter, setFilter] = useState('all');

  const items = [
    {
      title: "Aircraft Detection using AI",
      description: "Integrating computer vision models, Firebase database synchronization, and Moondream visual-LLM querying for remote aircraft identification alerts.",
      category: "research",
      date: "05/2025",
      gradient: "linear-gradient(135deg, #10061e, #290f4e)",
      color: "#a855f7",
      bg: "/project_aircraft.png",
      icon: <FaPlane />,
      label: "AIRCRAFT",
      github: "https://github.com/itz-abhijeet"
    },
    {
      title: "AWS Cloud DevOps Pipeline",
      description: "Engineered continuous delivery stacks on AWS utilizing CodePipeline and Elastic Beanstalk to build, containerize, and deploy production microservices.",
      category: "cloud",
      date: "02/2025",
      gradient: "linear-gradient(135deg, #2b1c0b, #623f13)",
      color: "#f97316",
      icon: <FaCloud />,
      label: "AWS",
      github: "https://github.com/itz-abhijeet"
    },
    {
      title: "Smart Enterprise ERP Platform",
      description: "Full-stack ERP software built for local production management, handling resource accounting, user privileges, inventory state, and data reports.",
      category: "fullstack",
      date: "01/2025",
      gradient: "linear-gradient(135deg, #0e201b, #1d4d42)",
      color: "#10b981",
      icon: <FaChartLine />,
      label: "SMART",
      github: "https://github.com/itz-abhijeet"
    },
    {
      title: "System Diagnostic & Health Analyzer",
      description: "A python resource inspector leveraging psutil metrics, compiling performance statistics and generating troubleshooting suggestions via AI model inferences.",
      category: "automation",
      date: "12/2024",
      gradient: "linear-gradient(135deg, #0e1e2d, #143b5c)",
      color: "#3b82f6",
      icon: <FaHeartbeat />,
      label: "SYSTEM",
      github: "https://github.com/itz-abhijeet"
    },
    {
      title: "Intelligent Timetable Optimizer",
      description: "Optimization scheduling platform using genetic algorithms, designed to auto-map collegiate scheduling layouts without load overlaps. Published by IEEE.",
      category: "research",
      date: "10/2024",
      gradient: "linear-gradient(135deg, #134e2c, #268a52)",
      color: "#22c55e",
      icon: <FaCalendarAlt />,
      label: "INTELLIGENT",
      github: "https://github.com/itz-abhijeet"
    },
    {
      title: "Android Radar Synthetic Simulator",
      description: "Mobile target simulator transmitting synthetic navigational data streams to central Firebase server arrays for synthetic radar visual testing.",
      category: "mobile",
      date: "07/2024",
      gradient: "linear-gradient(135deg, #440d18, #861e33)",
      color: "#e11d48",
      icon: <FaAndroid />,
      label: "ANDROID",
      github: "https://github.com/itz-abhijeet"
    }
  ];

  const categories = [
    { key: 'all', label: 'all' },
    { key: 'cloud', label: 'cloud/devops' },
    { key: 'fullstack', label: 'fullstack' },
    { key: 'mobile', label: 'mobile' },
    { key: 'research', label: 'research' },
    { key: 'automation', label: 'automation' }
  ];

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <GridWrapper>
      <div className="container-full">
        <GridHeader>
          <div>
            <div className="h1" style={{ color: 'var(--accent-color)' }}>GRID</div>
          </div>
          <div className="b2">
            A comprehensive compilation of side projects, research publications, automation scripts, and mobile creations built throughout my developer journey.
          </div>
        </GridHeader>
        
        <FilterBar>
          {categories.map((cat) => (
            <FilterButton 
              key={cat.key} 
              active={filter === cat.key}
              onClick={() => setFilter(cat.key)}
            >
              {cat.label}
            </FilterButton>
          ))}
        </FilterBar>
        
        <MixContainer>
          {filteredItems.map((item, index) => (
            <MixCard key={index}>
              <CardCover $gradient={item.gradient} $color={item.color} $bg={item.bg}>
                {item.bg ? null : (
                  <CoverIconWrapper $color={item.color}>
                    {item.icon}
                  </CoverIconWrapper>
                )}
                <CoverLabel>{item.label}</CoverLabel>
              </CardCover>
              <CardContent>
                <CardMeta>
                  <span className="category">{item.category}</span>
                  <span className="date">{item.date}</span>
                </CardMeta>
                <CardTitle>{item.title}</CardTitle>
                <CardDesc>{item.description}</CardDesc>
                <CardLinks>
                  <CardLink href={item.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub /> Source
                  </CardLink>
                </CardLinks>
              </CardContent>
            </MixCard>
          ))}
        </MixContainer>
      </div>
    </GridWrapper>
  );
};

export default GridView;
