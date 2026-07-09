import React from 'react';
import styled from 'styled-components';
import { FaAward } from 'react-icons/fa';

const SkillsContainer = styled.div`
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
`;

const SkillCategory = styled.div`
  background: var(--bg-secondary);
  backdrop-filter: blur(12px);
  padding: 2.2rem 2rem 2rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
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

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

const CategoryIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 176, 136, 0.08);
  border: 1px solid rgba(255, 176, 136, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: var(--accent-peach);
`;

const CategoryTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled.span`
  background: rgba(255, 176, 136, 0.03);
  color: var(--text-secondary);
  padding: 0.35rem 0.8rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(255, 176, 136, 0.08);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  &:hover {
    color: var(--accent-peach);
    border-color: rgba(255, 176, 136, 0.35);
    background: rgba(255, 176, 136, 0.08);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(255, 176, 136, 0.1);
  }
`;

const AchievementsSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const AchievementsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 0.5rem;
`;

const AchievementCard = styled.div`
  background: var(--bg-secondary);
  backdrop-filter: blur(12px);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px var(--shadow-glow);
    border-color: var(--border-hover);
    
    .achievement-icon {
      transform: scale(1.1) rotate(15deg);
      color: var(--accent-pink);
      border-color: var(--accent-pink);
    }
  }
`;

const AchievementIconWrapper = styled.div`
  color: var(--accent-peach);
  font-size: 1.35rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 176, 136, 0.08);
  border: 1px solid rgba(255, 176, 136, 0.15);
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const AchievementText = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5;
`;

const SmallPaw = () => (
  <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" style={{ opacity: 0.7 }}>
    {/* Main pad */}
    <path d="M 12 10 C 9.5 10 8 11.5 8 13.5 C 8 16 10 18 12 18 C 14 18 16 16 16 13.5 C 16 11.5 14.5 10 12 10 Z" />
    {/* Toes */}
    <circle cx="7" cy="8" r="2.2" />
    <circle cx="10.5" cy="5.8" r="2.2" />
    <circle cx="14.5" cy="5.8" r="2.2" />
    <circle cx="18" cy="8" r="2.2" />
  </svg>
);

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming & Scripting",
      icon: "💻",
      skills: ["C++", "Python", "Java", "JavaScript", "TypeScript"],
      gradient: "linear-gradient(90deg, var(--accent-peach), var(--accent-pink))"
    },
    {
      title: "Cloud & DevOps",
      icon: "☁️",
      skills: ["AWS", "Docker", "Elastic Beanstalk", "EC2", "S3", "IAM"],
      gradient: "linear-gradient(90deg, #ff8da1, var(--accent-pink))"
    },
    {
      title: "Web & Mobile",
      icon: "🌐",
      skills: ["React.js", "Node.js", "HTML/CSS", "Android Studio", "API Development"],
      gradient: "linear-gradient(90deg, #fff5f0, var(--accent-peach))"
    },
    {
      title: "Database & Tools",
      icon: "🗄️",
      skills: ["MongoDB", "Firebase", "SQL", "Git", "GitHub", "PostgreSQL"],
      gradient: "linear-gradient(90deg, var(--accent-peach), #ff8da1)"
    }
  ];

  const achievements = [
    "AWS Certified AI Practitioner Challenge Certification",
    "AWS Cloud Practitioner Essentials Certification", 
    "Jury Volunteer at Smart India Hackathon 2025",
    "Kiro Heroes Weekly Challenge Certification",
    "IEEE PlanPal Publication - Intelligent Timetable Generator",
    "Secured Rank 111 in HPE Codewars 2022 Code Battle"
  ];

  return (
    <SkillsContainer>
      <div>
        <SectionTitle>🐾 Skills & Technologies</SectionTitle>
        <SkillsGrid>
          {skillCategories.map((category, index) => (
            <SkillCategory key={index}>
              <InnerEarLeft className="inner-ear" />
              <InnerEarRight className="inner-ear" />
              <CategoryHeader>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryTitle>{category.title}</CategoryTitle>
              </CategoryHeader>
              <SkillsList>
                {category.skills.map((skill, skillIndex) => (
                  <SkillTag key={skillIndex}>
                    <SmallPaw />
                    {skill}
                  </SkillTag>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </SkillsGrid>
      </div>

      <AchievementsSection>
        <SectionTitle>🐾 Achievements & Certifications</SectionTitle>
        <AchievementsList>
          {achievements.map((achievement, index) => (
            <AchievementCard key={index}>
              <AchievementIconWrapper className="achievement-icon">
                <FaAward />
              </AchievementIconWrapper>
              <AchievementText>{achievement}</AchievementText>
            </AchievementCard>
          ))}
        </AchievementsList>
      </AchievementsSection>
    </SkillsContainer>
  );
};

export default Skills;
