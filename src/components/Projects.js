import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeIn 0.8s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  &::after {
    content: '';
    height: 1px;
    flex-grow: 1;
    background: linear-gradient(90deg, var(--border-hover), transparent);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const PeekingCatWrapper = styled.div`
  position: absolute;
  top: -20px;
  right: 40px;
  width: 48px;
  height: 20px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(20px);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
`;

const ProjectCard = styled.div`
  background: var(--bg-secondary);
  backdrop-filter: blur(12px);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: visible;
  margin-top: 12px;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px var(--shadow-glow);
    border-color: var(--border-hover);
    
    ${PeekingCatWrapper} {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(180deg, var(--accent-peach), var(--accent-pink));
    opacity: 0.8;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  gap: 1rem;
`;

const ProjectTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.3;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ProjectLink = styled.a`
  color: var(--text-secondary);
  font-size: 1rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 176, 136, 0.02);
  border: 1px solid rgba(255, 176, 136, 0.08);
  
  &:hover {
    color: var(--accent-peach);
    border-color: var(--border-hover);
    background: rgba(255, 176, 136, 0.05);
    transform: translateY(-2px);
  }
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.75rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: rgba(255, 141, 161, 0.05);
  color: var(--accent-peach);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(255, 141, 161, 0.15);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 141, 161, 0.12);
    border-color: var(--accent-pink);
    color: var(--accent-pink);
    transform: translateY(-1px);
  }
`;

const PeekingCat = () => (
  <svg viewBox="0 0 50 22" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    {/* Outer Ears */}
    <polygon points="8,22 4,2 17,16" fill="#14121e" stroke="#ffb088" strokeWidth="1.5" />
    <polygon points="42,22 46,2 33,16" fill="#14121e" stroke="#ffb088" strokeWidth="1.5" />
    
    {/* Inner Ears */}
    <polygon points="9,22 6,6 15,16" fill="#ff8da1" opacity="0.8" />
    <polygon points="41,22 44,6 35,16" fill="#ff8da1" opacity="0.8" />

    {/* Head Outline */}
    <path d="M 4 22 C 4 10, 46 10, 46 22 Z" fill="#14121e" stroke="#ffb088" strokeWidth="1.5" />
    
    {/* Glowing Eyes */}
    <ellipse cx="18" cy="16" rx="2" ry="1.5" fill="#facc15"/>
    <ellipse cx="32" cy="16" rx="2" ry="1.5" fill="#facc15"/>
  </svg>
);

const FishSVG = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style={{ display: 'inline-block' }}>
    <path d="M22,12C22,12 19,8 14,8C11,8 9,9.5 8,11C7,10 5,10 4,11L2,9L3,12L2,15L4,13C5,14 7,14 8,13C9,14.5 11,16 14,16C19,16 22,12 22,12M14,14C12,14 10.5,13 10,12C10.5,11 12,10 14,10C16,10 17.5,11 18,12C17.5,13 16,14 14,14Z"/>
  </svg>
);

const Projects = () => {
  const projects = [
    {
      title: "Aircraft Detection using AI",
      description: "Engineered a real-time detection ecosystem by integrating trained models with Firebase and Moondream for web-based monitoring, supported by a custom Android radar simulator for synthetic data generation.",
      tech: ["Python", "AI/ML", "Firebase", "Android", "Computer Vision"],
      github: "https://github.com/its-abhijeet",
      demo: "https://github.com/its-abhijeet"
    },
    {
      title: "AWS Cloud DevOps CI/CD Pipeline",
      description: "Developed a CI/CD pipeline using AWS CodeBuild, AWS CodePipeline and AWS Elastic Beanstalk to automate the deployment of code from GitHub to Web.",
      tech: ["AWS", "CodeBuild", "CodePipeline", "Elastic Beanstalk", "DevOps"],
      github: "https://github.com/its-abhijeet",
      demo: "https://github.com/its-abhijeet"
    },
    {
      title: "System Health Analysis Agent",
      description: "Developed a Python-based system health monitoring agent using psutil to analyze CPU/Memory metrics with LLM-powered insights for DevOps decision-making.",
      tech: ["Python", "psutil", "LLM", "System Monitoring", "DevOps"],
      github: "https://github.com/its-abhijeet",
      demo: "https://github.com/its-abhijeet"
    },
    {
      title: "Intelligent Timetable Generator",
      description: "IEEE PlanPal Publication - An intelligent system for automated timetable generation with optimization algorithms for educational institutions.",
      tech: ["Python", "Optimization", "Algorithms", "IEEE Publication"],
      github: "https://github.com/its-abhijeet",
      demo: "https://github.com/its-abhijeet"
    }
  ];

  return (
    <ProjectsContainer>
      <SectionTitle>🐾 Featured Projects</SectionTitle>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <PeekingCatWrapper>
              <PeekingCat />
            </PeekingCatWrapper>
            <div>
              <ProjectHeader>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectLinks>
                  <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer" title="View Source">
                    <FaGithub />
                  </ProjectLink>
                  <ProjectLink href={project.demo} target="_blank" rel="noopener noreferrer" title="Live Demo">
                    <FaExternalLinkAlt />
                  </ProjectLink>
                </ProjectLinks>
              </ProjectHeader>
              <ProjectDescription>{project.description}</ProjectDescription>
            </div>
            <TechStack>
              {project.tech.map((tech, techIndex) => (
                <TechTag key={techIndex}>
                  <FishSVG />
                  {tech}
                </TechTag>
              ))}
            </TechStack>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
};

export default Projects;