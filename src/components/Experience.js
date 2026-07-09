import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulseNode = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 176, 136, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(255, 176, 136, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 176, 136, 0);
  }
`;

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
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

const Timeline = styled.div`
  position: relative;
  border-left: 2px dashed rgba(255, 141, 161, 0.35);
  margin-left: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 1rem 0;
`;

const YarnBallTop = styled.div`
  position: absolute;
  left: -18px;
  top: -20px;
  font-size: 1.4rem;
  z-index: 5;
  animation: ${spinAnimation} 8s linear infinite;
`;

const YarnBallBottom = styled.div`
  position: absolute;
  left: -18px;
  bottom: -20px;
  font-size: 1.4rem;
  z-index: 5;
  animation: ${spinAnimation} 8s linear infinite reverse;
`;

const TimelineNode = styled.div`
  position: absolute;
  left: -17px;
  top: 24px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--bg-primary);
  border: 2px solid var(--border-color);
  color: var(--text-muted);
  z-index: 2;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
`;

const ExperienceCard = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 2rem;
  border-radius: 16px;
  margin-left: 2.5rem;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px var(--shadow-glow);
    border-color: var(--border-hover);
  }
`;

const TimelineItemWrapper = styled.div`
  position: relative;
  
  &:hover ${TimelineNode} {
    color: var(--accent-peach);
    border-color: var(--accent-peach);
    transform: scale(1.15) rotate(-15deg);
    filter: drop-shadow(0 0 8px rgba(255, 176, 136, 0.5));
  }
`;

const JobTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.15rem;
  font-weight: 600;
`;

const Company = styled.span`
  color: var(--accent-peach);
  font-size: 0.95rem;
  font-weight: 500;
`;

const JobMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

const Duration = styled.span`
  color: var(--text-muted);
  font-size: 0.85rem;
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: rgba(255, 176, 136, 0.06);
  color: var(--accent-peach);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(255, 176, 136, 0.12);
`;

const PositionsSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const PositionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const PawPrintDeco = styled.div`
  position: absolute;
  bottom: -15px;
  right: -15px;
  width: 70px;
  height: 70px;
  opacity: 0.04;
  color: var(--accent-peach);
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(18deg);
`;

const PositionCard = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 1.75rem;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px var(--shadow-glow);
    border-color: var(--border-hover);
    
    ${PawPrintDeco} {
      opacity: 0.14;
      transform: scale(1.15) rotate(5deg);
      color: var(--accent-pink);
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

const PositionTitle = styled.h4`
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const PositionDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
`;

const PawSVG = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    {/* Main pad */}
    <path d="M 12 10 C 9.5 10 8 11.5 8 13.5 C 8 16 10 18 12 18 C 14 18 16 16 16 13.5 C 16 11.5 14.5 10 12 10 Z" fill="currentColor"/>
    {/* Toes */}
    <circle cx="7" cy="8" r="2.2" fill="currentColor"/>
    <circle cx="10.5" cy="5.8" r="2.2" fill="currentColor"/>
    <circle cx="14.5" cy="5.8" r="2.2" fill="currentColor"/>
    <circle cx="18" cy="8" r="2.2" fill="currentColor"/>
  </svg>
);

const Experience = () => {
  const experiences = [
    {
      role: "Software Developer Intern",
      company: "Systech Solutions Pvt Ltd",
      duration: "June 2025 - Present",
      description: "Built a full-stack Enterprise Resource Planning (ERP) platform to streamline company workflows and data management. Deployed and configured the application on local servers for staging and local development.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "ERP Systems"]
    },
    {
      role: "Amazon Web Services Intern",
      company: "Zinagram Consulting Insights Pvt Ltd",
      duration: "Dec 2025 - Feb 2026",
      description: "Orchestrated cloud infrastructure using AWS Elastic Beanstalk for automated application deployment, while managing core services like EC2, S3, IAM, and VPC to ensure scalable and secure environments.",
      tech: ["AWS", "Elastic Beanstalk", "EC2", "S3", "IAM", "VPC", "Cloud Architecture"]
    },
    {
      role: "Android Application Developer Intern",
      company: "Jalgi Technologies",
      duration: "Jun 2024 - Jul 2024",
      description: "Developed and maintained Android applications using Java/XML, implementing UI components, API integration, and bug fixes while following standard development practices.",
      tech: ["Android Studio", "Java", "XML", "API Integration", "Mobile Development"]
    }
  ];

  const positions = [
    {
      title: "Tech Team Member - AWS Skill Builders Group, MIT ADTU",
      description: "Contributing to AWS community initiatives and skill development programs at the university level."
    },
    {
      title: "Technical Team Co-Lead - Layeric, MIT-ADTU",
      description: "Led technical teams in executing end-to-end event solutions and resource planning."
    },
    {
      title: "Technical Team Member - SAE Collegiate Club, MIT-ADTU",
      description: "Managed website maintenance and mobile technical infrastructure/troubleshooting during events."
    },
    {
      title: "Technical Team Member - YuvArth, MIT-ADTU",
      description: "Oversaw technical operations for events, including website support and on-site coordination."
    }
  ];

  return (
    <ExperienceContainer>
      <div>
        <SectionTitle>🐾 Work Experience</SectionTitle>
        <Timeline>
          <YarnBallTop>🧶</YarnBallTop>
          {experiences.map((exp, index) => (
            <TimelineItemWrapper key={index}>
              <TimelineNode>
                <PawSVG />
              </TimelineNode>
              <ExperienceCard>
                <JobMeta>
                  <div>
                    <JobTitle>{exp.role}</JobTitle>
                    <Company>{exp.company}</Company>
                  </div>
                  <Duration>{exp.duration}</Duration>
                </JobMeta>
                <Description>{exp.description}</Description>
                <TechStack>
                  {exp.tech.map((tag, tagIndex) => (
                    <TechTag key={tagIndex}>{tag}</TechTag>
                  ))}
                </TechStack>
              </ExperienceCard>
            </TimelineItemWrapper>
          ))}
          <YarnBallBottom>🧶</YarnBallBottom>
        </Timeline>
      </div>

      <PositionsSection>
        <SectionTitle>🐾 Positions of Responsibility</SectionTitle>
        <PositionsGrid>
          {positions.map((pos, index) => (
            <PositionCard key={index}>
              <PositionTitle>{pos.title}</PositionTitle>
              <PositionDescription>{pos.description}</PositionDescription>
              <PawPrintDeco>
                <PawSVG />
              </PawPrintDeco>
            </PositionCard>
          ))}
        </PositionsGrid>
      </PositionsSection>
    </ExperienceContainer>
  );
};

export default Experience;