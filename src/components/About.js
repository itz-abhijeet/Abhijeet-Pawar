import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
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

const BioLayout = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const CatAvatarWrapper = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  position: relative;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 8px 25px var(--shadow-glow);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 15px;
  
  /* Left Ear Outer */
  &::before {
    content: '';
    position: absolute;
    top: -14px;
    left: 24px;
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-bottom: 15px solid var(--border-color);
    transition: all 0.3s ease;
  }
  
  /* Right Ear Outer */
  &::after {
    content: '';
    position: absolute;
    top: -14px;
    right: 24px;
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-bottom: 15px solid var(--border-color);
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: rotate(3deg) scale(1.04);
    border-color: var(--accent-peach);
    box-shadow: 0 12px 30px rgba(255, 176, 136, 0.2);
    
    &::before, &::after {
      border-bottom-color: var(--accent-peach);
    }
    
    .avatar-inner-ear {
      border-bottom-color: var(--accent-pink);
    }
  }
`;

const AvatarInnerEarLeft = styled.div`
  position: absolute;
  top: -11px;
  left: 26px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid rgba(255, 141, 161, 0.25);
  transition: all 0.3s ease;
  z-index: 2;
`;

const AvatarInnerEarRight = styled.div`
  position: absolute;
  top: -11px;
  right: 26px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid rgba(255, 141, 161, 0.25);
  transition: all 0.3s ease;
  z-index: 2;
`;

const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex-grow: 1;
`;

const AboutText = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-secondary);
`;

const EducationSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-top: 0.5rem;
`;

const EducationCard = styled.div`
  background: var(--bg-secondary);
  backdrop-filter: blur(12px);
  padding: 2.2rem 2rem 2rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 15px;
  
  /* Left Ear Outer */
  &::before {
    content: '';
    position: absolute;
    top: -14px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-bottom: 14px solid var(--border-color);
    transition: all 0.3s ease;
  }
  
  /* Right Ear Outer */
  &::after {
    content: '';
    position: absolute;
    top: -14px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-bottom: 14px solid var(--border-color);
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px var(--shadow-glow);
    border-color: var(--border-hover);
    
    &::before, &::after {
      border-bottom-color: var(--border-hover);
    }
    
    .inner-ear {
      border-bottom-color: var(--accent-pink);
    }
  }
`;

const InnerEarLeft = styled.div`
  position: absolute;
  top: -11px;
  left: 23px;
  width: 0;
  height: 0;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-bottom: 11px solid rgba(255, 141, 161, 0.25);
  transition: all 0.3s ease;
  z-index: 2;
  pointer-events: none;
`;

const InnerEarRight = styled.div`
  position: absolute;
  top: -11px;
  right: 23px;
  width: 0;
  height: 0;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-bottom: 11px solid rgba(255, 141, 161, 0.25);
  transition: all 0.3s ease;
  z-index: 2;
  pointer-events: none;
`;

const EducationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

const EducationIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(255, 176, 136, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  color: var(--accent-peach);
  border: 1px solid rgba(255, 176, 136, 0.15);
`;

const EducationTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
`;

const EducationInstitute = styled.h4`
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  margin-top: 0.2rem;
`;

const EducationDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  padding-top: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const EducationDuration = styled.span`
  color: var(--text-muted);
  font-size: 0.85rem;
`;

const CGPA = styled.div`
  background: rgba(255, 141, 161, 0.08);
  color: var(--accent-pink);
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 141, 161, 0.15);
`;

const CoderCatAvatar = () => (
  <svg viewBox="0 0 100 100" width="80%" height="80%" xmlns="http://www.w3.org/2000/svg">
    {/* Cat Face background */}
    <circle cx="50" cy="52" r="32" fill="#14121e" stroke="#ff8da1" strokeWidth="2.2"/>
    
    {/* Glasses */}
    <circle cx="36" cy="46" r="10" stroke="#facc15" strokeWidth="2" fill="none"/>
    <circle cx="64" cy="46" r="10" stroke="#facc15" strokeWidth="2" fill="none"/>
    <line x1="46" y1="46" x2="54" y2="46" stroke="#facc15" strokeWidth="2"/>
    
    {/* Eyes behind glasses */}
    <ellipse cx="36" cy="46" rx="2" ry="4" fill="#ffb088"/>
    <ellipse cx="64" cy="46" rx="2" ry="4" fill="#ffb088"/>
    
    {/* Nose */}
    <polygon points="48,56 52,56 50,59" fill="#ff8da1"/>
    
    {/* Mouth */}
    <path d="M 45 64 Q 50 66 50 63 Q 50 66 55 64" stroke="#ff8da1" strokeWidth="1.5" fill="none" opacity="0.8"/>
    
    {/* Cheeks */}
    <circle cx="24" cy="54" r="3.5" fill="#ff8da1" opacity="0.3"/>
    <circle cx="76" cy="54" r="3.5" fill="#ff8da1" opacity="0.3"/>
    
    {/* Whiskers */}
    <line x1="20" y1="58" x2="5" y2="56" stroke="#fff" strokeWidth="0.85" opacity="0.5"/>
    <line x1="18" y1="64" x2="4" y2="65" stroke="#fff" strokeWidth="0.85" opacity="0.5"/>
    
    <line x1="80" y1="58" x2="95" y2="56" stroke="#fff" strokeWidth="0.85" opacity="0.5"/>
    <line x1="82" y1="64" x2="96" y2="65" stroke="#fff" strokeWidth="0.85" opacity="0.5"/>
  </svg>
);

const About = () => {
  return (
    <AboutContainer>
      <BioLayout>
        <CatAvatarWrapper>
          <AvatarInnerEarLeft className="avatar-inner-ear" />
          <AvatarInnerEarRight className="avatar-inner-ear" />
          <CoderCatAvatar />
        </CatAvatarWrapper>
        
        <BioContainer>
          <SectionTitle>🐾 About Me</SectionTitle>
          <AboutText>
            I'm Abhijeet Pawar, a passionate Full Stack Developer and Cloud Architect currently pursuing B.Tech in Computer Science & Engineering at MIT-ADTU University. 
            With hands-on experience in building scalable web applications, cloud infrastructure, and mobile development, I thrive on creating innovative solutions 
            that bridge technology and business needs.
          </AboutText>
          <AboutText>
            My journey spans from developing enterprise-level ERP platforms to orchestrating cloud infrastructure on AWS. 
            I'm particularly interested in the intersection of artificial intelligence and cloud computing, always eager to learn cutting-edge technologies 
            and contribute to meaningful projects that make a real impact.
          </AboutText>
        </BioContainer>
      </BioLayout>
      
      <EducationSection>
        <SectionTitle>🐾 Education</SectionTitle>
        
        <EducationGrid>
          <EducationCard>
            <InnerEarLeft className="inner-ear" />
            <InnerEarRight className="inner-ear" />
            <EducationHeader>
              <EducationIcon>🎓</EducationIcon>
              <div>
                <EducationTitle>Bachelor of Technology</EducationTitle>
                <EducationInstitute>MIT-ADTU University</EducationInstitute>
              </div>
            </EducationHeader>
            
            <EducationDetails>
              <EducationDuration>Computer Science & Engineering • 2022 - 2025</EducationDuration>
              <CGPA>CGPA: 8.55</CGPA>
            </EducationDetails>
          </EducationCard>
          
          <EducationCard>
            <InnerEarLeft className="inner-ear" />
            <InnerEarRight className="inner-ear" />
            <EducationHeader>
              <EducationIcon>📚</EducationIcon>
              <div>
                <EducationTitle>Diploma in Computer Engineering</EducationTitle>
                <EducationInstitute>JSPM's Jayawantrao Sawant Polytechnic</EducationInstitute>
              </div>
            </EducationHeader>
            
            <EducationDetails>
              <EducationDuration>2019 - 2022</EducationDuration>
              <CGPA>Percentage: 92.29%</CGPA>
            </EducationDetails>
          </EducationCard>
        </EducationGrid>
      </EducationSection>
    </AboutContainer>
  );
};

export default About;