import React, { useState } from 'react';
import styled from 'styled-components';
import { FaExternalLinkAlt, FaAward } from 'react-icons/fa';

const VaultWrapper = styled.div`
  background-color: #0b0b0b;
  color: #ffffff;
  padding: 8rem 0 4rem;
  min-height: 100vh;
`;

const VaultHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 5rem;
  align-items: flex-end;
  
  .h1 {
    font-size: clamp(2.2rem, 7vw, 4.5rem);
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
`;

const VaultLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 4rem;
  
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const SidebarWrapper = styled.div`
  position: sticky;
  top: 8rem;
  height: fit-content;
`;

const FilterMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 991px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.8rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 1.5rem;
  }
`;

const FilterItem = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${props => props.$active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.4)'};
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: var(--transition-fast);
  width: fit-content;
  padding: 0;
  
  &:hover {
    color: var(--accent-color);
  }
  
  @media (max-width: 991px) {
    font-size: 0.75rem;
    border: 1px solid ${props => props.$active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.15)'};
    padding: 0.4rem 1rem;
    border-radius: 20px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }
`;

const CertsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const CertCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: var(--transition-smooth);
  min-height: 280px;
  
  /* Colorful Accent Left Stripe */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.$accent || 'var(--accent-color)'};
    transition: var(--transition-smooth);
  }
  
  &:hover {
    transform: translateY(-8px);
    border-color: ${props => props.$accent || 'var(--accent-color)'};
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.03);
    
    &::before {
      width: 6px;
    }
  }
`;

const CertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  .badge {
    color: ${props => props.$accent || 'var(--accent-color)'};
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .category-pill {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const CertBody = styled.div`
  margin-bottom: 2rem;
  
  .title {
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.4;
    margin-bottom: 0.5rem;
    color: #ffffff;
  }
  
  .issuer {
    font-size: 0.9rem;
    color: var(--text-muted);
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .id-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const SkillPillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SkillPill = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const VerifyButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: var(--transition-fast);
  
  svg {
    font-size: 0.75rem;
  }
  
  &:hover {
    background: ${props => props.$accent || 'var(--accent-color)'};
    border-color: ${props => props.$accent || 'var(--accent-color)'};
    color: #0b0b0b;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CertificationsView = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const certData = [
    {
      title: "AWS AI Practitioner Challenge",
      issuer: "Udacity Certification",
      id: "Credential ID: 0280ae10-3c1c-11f1-909c-4bd5ceb0d4f6",
      category: "cloud",
      date: "Dec 2024",
      accent: "#ef4444", // Red Orange
      verifyLink: "https://www.udacity.com/certificate/e/0280ae10-3c1c-11f1-909c-4bd5ceb0d4f6",
      skills: ["Machine Learning", "Generative AI", "SageMaker", "AWS Bedrock"]
    },
    {
      title: "AWS Cloud Practitioner Essentials",
      issuer: "Amazon Web Services (AWS)",
      id: "Training Ref: Essentials Course (No Creds Link)",
      category: "cloud",
      date: "Nov 2024",
      accent: "#f59e0b", // Gold Yellow
      verifyLink: "https://www.linkedin.com/in/abhijeetpawar26/",
      skills: ["Cloud Architecture", "AWS Core Services", "Billing & Pricing"]
    },
    {
      title: "Kiro Heroes Weekly Challenge",
      issuer: "Hack2Skill Certification",
      id: "Credential ID: 2025H2S11AB-KV00034",
      category: "achievements",
      date: "Jan 2025",
      accent: "#ec4899", // Pink
      verifyLink: "https://certificate.hack2skill.com/legacy/2025H2S11AB-KV00034",
      skills: ["Problem Solving", "Data Structures", "Speed Coding"]
    },
    {
      title: "HPE Codewars 2022 Code Battle",
      issuer: "Secured Rank 111",
      id: "Credential ID: 8df9cb1c-13dd-4ba6-9ee5-63447a89ab3a",
      category: "achievements",
      date: "Apr 2022",
      accent: "#00b388", // HPE Teal Green
      verifyLink: "https://certificate.givemycertificate.com/c/8df9cb1c-13dd-4ba6-9ee5-63447a89ab3a",
      skills: ["Competitive Programming", "Algorithms", "Optimization"]
    },
    {
      title: "MIT ADT Grand AI Challenge Finalist",
      issuer: "Qualified till the finals of AI Challenge Hackathon",
      id: "Finalist Placement Award",
      category: "achievements",
      date: "Sep 2024",
      accent: "#0ea5e9", // Sky Blue
      verifyLink: "https://www.linkedin.com/in/abhijeetpawar26/",
      skills: ["Artificial Intelligence", "Pitching", "Prototype Development"]
    },
    {
      title: "Genetic Scheduling Timetable Optimizer",
      issuer: "IEEE Xplore Research Publication",
      id: "Publication DOI: IEEE-PP-104",
      category: "achievements",
      date: "Oct 2024",
      accent: "#a855f7", // Purple Research
      verifyLink: "https://github.com/itz-abhijeet",
      skills: ["Algorithms", "Genetic Models", "Constraint Optimization"]
    }
  ];

  const filteredCerts = activeFilter === 'all' 
    ? certData 
    : certData.filter(cert => cert.category === activeFilter);

  return (
    <VaultWrapper>
      <div className="container-full">
        <VaultHeader>
          <div>
            <div className="h4" style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>Credentials Vault</div>
            <div className="h1">Certifications</div>
          </div>
          <div className="b2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            A verified archive documenting my professional software certifications, cloud architectural credentials, and published optimization research records.
          </div>
        </VaultHeader>
        
        <VaultLayout>
          <SidebarWrapper>
            <FilterMenu>
              <FilterItem $active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>All Credentials</FilterItem>
              <FilterItem $active={activeFilter === 'cloud'} onClick={() => setActiveFilter('cloud')}>Cloud / AWS</FilterItem>
              <FilterItem $active={activeFilter === 'achievements'} onClick={() => setActiveFilter('achievements')}>Awards & Research</FilterItem>
            </FilterMenu>
          </SidebarWrapper>
          
          <CertsGrid>
            {filteredCerts.map((cert, index) => (
              <CertCard key={index} $accent={cert.accent} className="reveal">
                <div>
                  <CertHeader $accent={cert.accent}>
                    <div className="badge"><FaAward /></div>
                    <span className="category-pill">{cert.category}</span>
                  </CertHeader>
                  
                  <CertBody>
                    <div className="title">{cert.title}</div>
                    <div className="issuer">{cert.issuer}</div>
                    <div className="id-label">{cert.id} • {cert.date}</div>
                    
                    <SkillPillContainer>
                      {cert.skills.map((skill, sIndex) => (
                        <SkillPill key={sIndex}>{skill}</SkillPill>
                      ))}
                    </SkillPillContainer>
                  </CertBody>
                </div>
                
                <VerifyButton 
                  href={cert.verifyLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  $accent={cert.accent}
                >
                  Verify Credential <FaExternalLinkAlt />
                </VerifyButton>
              </CertCard>
            ))}
          </CertsGrid>
        </VaultLayout>
      </div>
    </VaultWrapper>
  );
};

export default CertificationsView;
