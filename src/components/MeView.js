import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaEnvelope, FaCheck } from 'react-icons/fa';

// Styled Components for MeView

const MeContainer = styled.div`
  background-color: var(--bg-color);
  color: var(--text-color);
  padding: 0 0 4rem;
  min-height: 100vh;
  transition: var(--transition-smooth);
`;

const HeroWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  height: 100vh;
  width: 100%;
  position: relative;
  
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 100vh;
  }
`;

const HeroLeft = styled.div`
  background-color: #ffd177;
  color: #1a1a1a;
  padding: 6rem 4rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;
  
  @media (max-width: 991px) {
    padding: 8rem 2rem 4rem;
    min-height: 60vh;
  }
  
  @media (max-width: 480px) {
    padding: 7rem 1.5rem 3rem;
  }
`;

const LogoBox = styled.div`
  width: 48px;
  height: 48px;
  background: #1a1a1a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffd177;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.15rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  margin-bottom: 2rem;
`;

const NameAndDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin: auto 0;
`;

const TitleBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const BigName = styled.h1`
  font-family: 'Syne', sans-serif;
  font-size: clamp(3.2rem, 9.5vw, 6.2rem);
  font-weight: 800;
  line-height: 0.85;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: #1a1a1a;
  display: flex;
  flex-direction: column;
`;

const SideDesc = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.6;
  max-width: 260px;
  color: #1a1a1a;
  opacity: 0.9;
  
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const LocationClock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid rgba(26, 26, 26, 0.15);
  padding-top: 1.5rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #1a1a1a;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const HeroRight = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(/developer_portrait.png);
  background-size: cover;
  background-position: center;
  position: relative;
  
  @media (max-width: 991px) {
    height: 50vh;
    min-height: 400px;
  }
`;

const FloatingMailBtn = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #1a1a1a;
  color: #ffd177;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  transition: var(--transition-fast);
  z-index: 10;
  
  &:hover {
    transform: scale(1.06) translateY(-2px);
    background: #000000;
  }
`;

const CopyNotification = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--text-color);
  color: var(--bg-color);
  padding: 0.8rem 1.6rem;
  border-radius: 30px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(${props => props.show ? '0' : '150%'});
  opacity: ${props => props.show ? '1' : '0'};
  transition: var(--transition-smooth);
  z-index: 2000;
`;

const MainBioSection = styled.div`
  margin-bottom: 6rem;
`;

const BioH3 = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-color);
  max-width: 950px;
  
  a {
    color: var(--accent-color);
    border-bottom: 2px solid var(--accent-color);
    padding-bottom: 2px;
    
    &:hover {
      background: rgba(229, 169, 50, 0.08);
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 3rem;
  flex-wrap: wrap;
  
  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled.button`
  background: var(--text-color);
  color: var(--bg-color);
  border: 1px solid var(--text-color);
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 1rem 2.2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: var(--transition-fast);
  
  &:hover {
    background: transparent;
    color: var(--text-color);
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 1rem 2.2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: var(--transition-fast);
  
  &:hover {
    border-color: var(--text-color);
    transform: translateY(-2px);
  }
`;

const SectionTitle = styled.div`
  margin-bottom: 3.5rem;
`;

const CareerList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border-color);
`;

const CareerItem = styled.a`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--border-color);
  transition: var(--transition-smooth);
  
  &:hover {
    padding-left: 1.5rem;
    border-bottom-color: var(--accent-color);
    
    .company-logo {
      color: var(--accent-color);
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    text-align: left;
    
    &:hover {
      padding-left: 0;
    }
  }
`;

const CompanyLogo = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  transition: var(--transition-fast);
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const CareerDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  
  .role {
    font-size: 1.15rem;
    font-weight: 600;
  }
  
  .company {
    font-size: 0.95rem;
    color: var(--text-muted);
  }
`;

const CareerDate = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--text-muted);
`;

// Shows / Anime layout
const ShowsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const ShowCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ShowPoster = styled.div`
  width: 100%;
  aspect-ratio: 1.6;
  border-radius: 12px;
  background: ${props => props.bg ? `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.75)), url(${props.bg})` : 'var(--card-bg)'};
  background-size: cover;
  background-position: center;
  border: 1px solid var(--border-color);
  overflow: hidden;
  position: relative;
  transition: var(--transition-smooth);
  
  .cover-title {
    position: absolute;
    bottom: 1.5rem;
    left: 1.5rem;
    font-family: 'Syne', sans-serif;
    font-size: 1.4rem;
    font-weight: 800;
    color: #ffffff;
    text-shadow: 0 2px 5px rgba(0,0,0,0.6);
    text-transform: uppercase;
    font-style: italic;
  }
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--accent-color);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ShowMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  
  .title-group {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  
  .title {
    font-size: 1.15rem;
    font-weight: 700;
  }
  
  .genre {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent-color);
  }
  
  .tag {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 1px solid var(--accent-color);
    color: var(--accent-color);
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
  }
`;

const ShowReview = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-muted);
`;



// Hobbies Gaming Section
const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3rem;
  
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const GamerCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.8rem;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  transition: var(--transition-smooth);
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--accent-color);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);
  }
`;

const GamerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
`;

const GamerAvatar = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--accent-secondary);
  border: 2px solid var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  overflow: hidden;
`;

const GamerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  
  .alias {
    font-size: 1.15rem;
    font-weight: 700;
  }
  .tag {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
`;

const IdList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const IdItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  
  .platform {
    font-family: 'Space Grotesk', sans-serif;
    color: var(--text-muted);
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  .username {
    font-weight: 600;
    color: var(--text-color);
  }
`;

const GamesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const GameCard = styled.a`
  display: flex;
  flex-direction: column;
  aspect-ratio: 1.2;
  border-radius: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  overflow: hidden;
  position: relative;
  background-image: ${props => props.bg ? `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.75)), url(${props.bg})` : 'none'};
  background-size: cover;
  background-position: top center;
  transition: var(--transition-smooth);
  
  .game-title {
    position: absolute;
    bottom: 1.2rem;
    left: 1.2rem;
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 800;
    color: #ffffff;
    text-shadow: 0 2px 5px rgba(0,0,0,0.6);
    transition: var(--transition-smooth);
    font-style: italic;
    text-transform: uppercase;
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    border-color: var(--accent-color);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    
    .game-title {
      transform: translateY(-4px);
    }
  }
`;

// Q&A Layout
const QnaSection = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 4rem;
  
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const QnaSticky = styled.div`
  position: sticky;
  top: 8rem;
  height: fit-content;
  
  @media (max-width: 991px) {
    position: relative;
    top: 0;
  }
`;

const QnaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

const QnaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .question {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-color);
  }
  .answer {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--text-muted);
  }
`;

// Footer
const FooterSection = styled.footer`
  border-top: 1px solid var(--border-color);
  padding: 4rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 6rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterSocials = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FooterIcon = styled.a`
  font-size: 1.2rem;
  color: var(--text-color);
  transition: var(--transition-fast);
  
  &:hover {
    color: var(--accent-color);
    transform: translateY(-2px);
  }
`;

const FooterCopy = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: var(--text-muted);
`;

const MeView = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [showCopyBanner, setShowCopyBanner] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const optionsTime = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true };
      const optionsDate = { timeZone: 'Asia/Kolkata', month: 'short', day: 'numeric', year: 'numeric' };
      
      const kolkataTime = new Intl.DateTimeFormat('en-US', optionsTime).format(new Date());
      const kolkataDate = new Intl.DateTimeFormat('en-US', optionsDate).format(new Date());
      
      setTime(kolkataTime);
      setDate(kolkataDate);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('aabhipawar26@gmail.com');
    setShowCopyBanner(true);
    setTimeout(() => {
      setShowCopyBanner(false);
    }, 2500);
  };

  return (
    <MeContainer>
      {/* Viewport Split-Screen Entry Hero */}
      <HeroWrapper>
        <HeroLeft className="animate-slide-up">
          <LogoBox>AP</LogoBox>
          <NameAndDesc>
            <TitleBlock>
              <BigName>
                <span>ABHIJEET</span>
                <span>PAWAR</span>
              </BigName>
              <SideDesc>
                Orchestrating scalable cloud architectures, automating DevOps pipelines, and building responsive full-stack applications.
              </SideDesc>
            </TitleBlock>
          </NameAndDesc>
          <LocationClock>
            <span>PUNE, INDIA</span>
            <span>{date || 'July 9, 2026'}</span>
            <span>{time || '10:50 PM'}</span>
          </LocationClock>
        </HeroLeft>
        
        <HeroRight>
          <FloatingMailBtn onClick={copyEmail} title="Copy email address">
            <FaEnvelope />
          </FloatingMailBtn>
        </HeroRight>
      </HeroWrapper>

      <div className="container-full" style={{ marginTop: '6rem' }}>
        {/* Main Bio Paragraph */}
        <MainBioSection className="reveal">
          <BioH3>
            I'm a computer science engineer currently based in Pune. I realize notable ideas across full-stack development, AWS cloud infrastructure, and DevOps — I care just as much about automation as I do about visual precision. I'm a detail-oriented builder: always optimizing, always delivering production-grade craft.
          </BioH3>
          <ActionButtons>
            <PrimaryButton onClick={() => navigate('/certifications')}>Certifications</PrimaryButton>
            <SecondaryButton onClick={() => navigate('/grid')}>More Works</SecondaryButton>
            <SecondaryButton onClick={copyEmail} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaEnvelope /> Email Copier
            </SecondaryButton>
          </ActionButtons>
        </MainBioSection>

        <div className="divider reveal-line"></div>

        {/* Career Timeline */}
        <div style={{ marginBottom: '6rem' }}>
          <SectionTitle className="reveal">
            <div className="h4" style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>Career Path</div>
            <div className="h2">I work dev</div>
          </SectionTitle>
                   <CareerList className="reveal">
            <CareerItem href="https://www.linkedin.com/in/abhijeetpawar26/" target="_blank" rel="noopener noreferrer">
              <CompanyLogo className="company-logo">
                <svg viewBox="0 0 80 80" fill="currentColor"><circle cx="40" cy="40" r="30" opacity="0.1"/><text x="40" y="46" fontSize="18" textAnchor="middle" fontWeight="bold">SS</text></svg>
              </CompanyLogo>
              <CareerDetails>
                <div className="role">Software Developer Intern</div>
                <div className="company">Systech Solutions Pvt Ltd</div>
              </CareerDetails>
              <CareerDate>June 2026 – June 2026</CareerDate>
            </CareerItem>
            
            <CareerItem href="https://www.linkedin.com/in/abhijeetpawar26/" target="_blank" rel="noopener noreferrer">
              <CompanyLogo className="company-logo">
                <svg viewBox="0 0 80 80" fill="currentColor"><circle cx="40" cy="40" r="30" opacity="0.1"/><text x="40" y="46" fontSize="18" textAnchor="middle" fontWeight="bold">ZC</text></svg>
              </CompanyLogo>
              <CareerDetails>
                <div className="role">Amazon Web Services Intern</div>
                <div className="company">Zhagaram Consulting Insights Pvt Ltd</div>
              </CareerDetails>
              <CareerDate>Dec 2025 – Feb 2026</CareerDate>
            </CareerItem>
            
            <CareerItem href="https://www.linkedin.com/in/abhijeetpawar26/" target="_blank" rel="noopener noreferrer">
              <CompanyLogo className="company-logo">
                <svg viewBox="0 0 80 80" fill="currentColor"><circle cx="40" cy="40" r="30" opacity="0.1"/><text x="40" y="46" fontSize="18" textAnchor="middle" fontWeight="bold">JT</text></svg>
              </CompanyLogo>
              <CareerDetails>
                <div className="role">Android Application Developer Intern</div>
                <div className="company">Jalgi Technologies</div>
              </CareerDetails>
              <CareerDate>Jun 2024 – Jul 2024</CareerDate>
            </CareerItem>
          </CareerList>
        </div>

        <div className="divider reveal-line"></div>

        {/* Positions of Responsibility */}
        <div style={{ marginBottom: '6rem' }}>
          <SectionTitle className="reveal">
            <div className="h4" style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>Leadership</div>
            <div className="h2">Positions of Responsibility</div>
          </SectionTitle>
          
          <CareerList className="reveal">
            <CareerItem href="https://www.linkedin.com/in/abhijeetpawar26/" target="_blank" rel="noopener noreferrer">
              <CompanyLogo className="company-logo">
                <svg viewBox="0 0 80 80" fill="currentColor"><circle cx="40" cy="40" r="30" opacity="0.1"/><text x="40" y="46" fontSize="16" textAnchor="middle" fontWeight="bold">AWS</text></svg>
              </CompanyLogo>
              <CareerDetails>
                <div className="role">Technical Team Member</div>
                <div className="company">AWS Skill Builders Group, MIT-ADTU</div>
                <div className="company" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Engaged in cloud computing advocacy, study groups, and hands-on AWS sandbox architecture reviews.</div>
              </CareerDetails>
              <CareerDate>July 2026 – Present</CareerDate>
            </CareerItem>

            <CareerItem href="https://www.linkedin.com/in/abhijeetpawar26/" target="_blank" rel="noopener noreferrer">
              <CompanyLogo className="company-logo">
                <svg viewBox="0 0 80 80" fill="currentColor"><circle cx="40" cy="40" r="30" opacity="0.1"/><text x="40" y="46" fontSize="16" textAnchor="middle" fontWeight="bold">LA</text></svg>
              </CompanyLogo>
              <CareerDetails>
                <div className="role">Technical Team Co-Lead</div>
                <div className="company">Laveric, MIT-ADTU</div>
                <div className="company" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Led technical teams in executing end-to-end event solutions and resource planning.</div>
              </CareerDetails>
              <CareerDate>March 2026 – Present</CareerDate>
            </CareerItem>

            <CareerItem href="https://www.linkedin.com/in/abhijeetpawar26/" target="_blank" rel="noopener noreferrer">
              <CompanyLogo className="company-logo">
                <svg viewBox="0 0 80 80" fill="currentColor"><circle cx="40" cy="40" r="30" opacity="0.1"/><text x="40" y="46" fontSize="16" textAnchor="middle" fontWeight="bold">YA</text></svg>
              </CompanyLogo>
              <CareerDetails>
                <div className="role">Technical Team Member</div>
                <div className="company">YuvArth, MIT-ADTU</div>
                <div className="company" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Oversee technical operations for events, including website support and on-site coordination.</div>
              </CareerDetails>
              <CareerDate>Aug 2025 – Present</CareerDate>
            </CareerItem>
          </CareerList>
        </div>

        <div className="divider reveal-line"></div>

        {/* Anime Logs Tracker */}
        <div style={{ marginBottom: '6rem' }}>
          <SectionTitle className="reveal">
            <div className="h4" style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>Anime Logs</div>
            <div className="h2">I love anime</div>
          </SectionTitle>
          
          <ShowsGrid className="reveal">
            <ShowCard>
              <ShowPoster bg="/anime_demonslayer.webp">
                <div className="cover-title">DEMON SLAYER</div>
              </ShowPoster>
              <ShowMeta>
                <div className="title-group">
                  <div className="title">Demon Slayer</div>
                  <div className="genre">Dark Fantasy / Action</div>
                </div>
                <div className="tag">Anime</div>
              </ShowMeta>
              <ShowReview>
                Breath-taking animation, dynamic battle choreography, and a deeply emotional journey of sibling bonds. The Kizuki boss battles are legendary landmarks in modern animation history.
              </ShowReview>
            </ShowCard>

            <ShowCard>
              <ShowPoster bg="/anime_onepunch.webp">
                <div className="cover-title">ONE PUNCH MAN</div>
              </ShowPoster>
              <ShowMeta>
                <div className="title-group">
                  <div className="title">One Punch Man</div>
                  <div className="genre">Superhero / Comedy</div>
                </div>
                <div className="tag">Anime</div>
              </ShowMeta>
              <ShowReview>
                A hilarious subversion of shonen tropes combined with godly action sequences. Saitama's struggle with absolute power and boredom delivers brilliant comedy and peak hype.
              </ShowReview>
            </ShowCard>

            <ShowCard>
              <ShowPoster bg="/anime_sololeveling.webp">
                <div className="cover-title">SOLO LEVELING</div>
              </ShowPoster>
              <ShowMeta>
                <div className="title-group">
                  <div className="title">Solo Leveling</div>
                  <div className="genre">Action / Fantasy</div>
                </div>
                <div className="tag">Anime</div>
              </ShowMeta>
              <ShowReview>
                Electrifying progress tracking and shadow hunter hierarchy details. The transition from weak scavenger to shadow monarch is spectacularly paced with sleek visual details.
              </ShowReview>
            </ShowCard>

            <ShowCard>
              <ShowPoster bg="/anime_myhero.webp">
                <div className="cover-title">MY HERO ACADEMIA</div>
              </ShowPoster>
              <ShowMeta>
                <div className="title-group">
                  <div className="title">My Hero Academia</div>
                  <div className="genre">Action / Sci-Fi</div>
                </div>
                <div className="tag">Anime</div>
              </ShowMeta>
              <ShowReview>
                Inspiring character growth, profound heroic philosophies, and high-stakes superhero clashes. Emphasizes what it truly means to be a symbol of peace and protect others.
              </ShowReview>
            </ShowCard>

            <ShowCard>
              <ShowPoster bg="/anime_horimiya.webp">
                <div className="cover-title">HORIMIYA</div>
              </ShowPoster>
              <ShowMeta>
                <div className="title-group">
                  <div className="title">Horimiya</div>
                  <div className="genre">Slice of Life / Romance</div>
                </div>
                <div className="tag">Anime</div>
              </ShowMeta>
              <ShowReview>
                A refreshingly realistic, warm, and sweet slice-of-life romance that skips standard dramatic delays. The character chemistry is incredibly genuine and lighthearted.
              </ShowReview>
            </ShowCard>

            <ShowCard>
              <ShowPoster bg="/anime_yourname.webp">
                <div className="cover-title">YOUR NAME</div>
              </ShowPoster>
              <ShowMeta>
                <div className="title-group">
                  <div className="title">Your Name</div>
                  <div className="genre">Romance / Fantasy</div>
                </div>
                <div className="tag">Anime</div>
              </ShowMeta>
              <ShowReview>
                An absolute visual masterwork with spectacular comet animation details and an emotional story of star-crossed connection. The soundtrack by RADWIMPS is legendary.
              </ShowReview>
            </ShowCard>

            <ShowCard>
              <ShowPoster bg="/anime_suzume.webp">
                <div className="cover-title">SUZUME</div>
              </ShowPoster>
              <ShowMeta>
                <div className="title-group">
                  <div className="title">Suzume</div>
                  <div className="genre">Adventure / Fantasy</div>
                </div>
                <div className="tag">Anime</div>
              </ShowMeta>
              <ShowReview>
                A stunning fantasy road movie dealing with grief, closure, and memory. The door imagery and starlit sky sequences represent peak visual craft from Makoto Shinkai.
              </ShowReview>
            </ShowCard>

            <ShowCard>
              <ShowPoster bg="/anime_chainsaw.webp">
                <div className="cover-title">CHAINSAW MAN</div>
              </ShowPoster>
              <ShowMeta>
                <div className="title-group">
                  <div className="title">Chainsaw Man</div>
                  <div className="genre">Dark Fantasy / Action</div>
                </div>
                <div className="tag">Anime</div>
              </ShowMeta>
              <ShowReview>
                Raw, cinematic, and boundary-pushing. Combines dark humor with outstanding filmic direction, gritty animation, and unmatched action choreography. Highly refreshing.
              </ShowReview>
            </ShowCard>
          </ShowsGrid>
        </div>

        <div className="divider reveal-line"></div>

        {/* Hobbies / Switch */}
        <div style={{ marginBottom: '6rem' }} className="reveal">
          <SectionTitle>
            <div className="h4" style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>Hobby Hub</div>
            <div className="h2">Gaming is my jam</div>
          </SectionTitle>
          
          <GamesGrid>
            <GamerCard>
              <GamerHeader>
                <GamerAvatar>🎮</GamerAvatar>
                <GamerInfo>
                  <span className="alias">Abhi</span>
                  <span className="tag">Active Profiles</span>
                </GamerInfo>
              </GamerHeader>
              <IdList>
                <IdItem>
                  <span className="platform">Steam</span>
                  <span className="username">abhijeet26</span>
                </IdItem>
                <IdItem>
                  <span className="platform">Epic Games</span>
                  <span className="username">abhijeet_26</span>
                </IdItem>
                <IdItem>
                  <span className="platform">Riot Games</span>
                  <span className="username">Kirito#V4L0</span>
                </IdItem>
              </IdList>
            </GamerCard>
            
            <GamesList>
              <GameCard href="https://youtube.com" target="_blank" rel="noopener noreferrer" bg="/game_valorant.webp">
                <span className="game-title">Valorant</span>
              </GameCard>

              <GameCard href="https://youtube.com" target="_blank" rel="noopener noreferrer" bg="/game_cricket.webp">
                <span className="game-title">Cricket 19</span>
              </GameCard>

              <GameCard href="https://youtube.com" target="_blank" rel="noopener noreferrer" bg="/game_gta5.webp">
                <span className="game-title">GTA 5</span>
              </GameCard>

              <GameCard href="https://youtube.com" target="_blank" rel="noopener noreferrer" bg="/game_forza.webp">
                <span className="game-title">Forza Horizon 6</span>
              </GameCard>

              <GameCard href="https://youtube.com" target="_blank" rel="noopener noreferrer" bg="/game_chameleon.webp">
                <span className="game-title">Meccha Chameleon</span>
              </GameCard>
            </GamesList>
          </GamesGrid>
        </div>

        <div className="divider reveal-line"></div>

        {/* Q&A Scroll List */}
        <div style={{ marginBottom: '6rem' }} className="reveal">
          <QnaSection>
            <QnaSticky>
              <div className="h1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--accent-color)' }}>Q&A</div>
            </QnaSticky>
            
            <QnaList>
              <QnaItem>
                <div className="question">What makes a good developer, in your opinion?</div>
                <div className="answer">
                  A good developer understands the business purpose, the technical constraints, and the humans they are building for. The code and algorithms can be extremely clever, but if the end users find it confusing or if it fails to solve the root problem, the developer has failed their primary duty. Production-grade software is as much about communication as it is about clean code.
                </div>
              </QnaItem>
              
              <QnaItem>
                <div className="question">What do you do when you are not coding?</div>
                <div className="answer">
                  I strive for a balanced, active lifestyle. You will find me exercising, testing out new cooking recipes, gaming on my Nintendo Switch, or spending time outdoors by the lake or in parks.
                </div>
              </QnaItem>

              <QnaItem>
                <div className="question">What is your stance on the AI engineering wave?</div>
                <div className="answer">
                  I hold balanced views. LLMs and developer agents serve as incredible multipliers for speed, debugging, and learning. However, relying on them blindly degrades core engineering skills. A developer must always inspect generated output critically, understand the low-level systems, and ensure codebases remain clean, maintainable, and secure.
                </div>
              </QnaItem>
            </QnaList>
          </QnaSection>
        </div>

        {/* Footer */}
        <FooterSection>
          <FooterSocials>
            <FooterIcon href="https://www.linkedin.com/in/abhijeetpawar26/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></FooterIcon>
            <FooterIcon href="https://github.com/itz-abhijeet" target="_blank" rel="noopener noreferrer"><FaGithub /></FooterIcon>
            <FooterIcon onClick={copyEmail} style={{ cursor: 'pointer' }}><FaEnvelope /></FooterIcon>
          </FooterSocials>
          <FooterCopy>© 2026 Abhijeet Pawar. 🐾</FooterCopy>
        </FooterSection>
      </div>

      {/* Copy Banner Alert */}
      <CopyNotification show={showCopyBanner}>
        <FaCheck style={{ color: 'var(--accent-color)' }} /> Email Copied!
      </CopyNotification>
    </MeContainer>
  );
};

export default MeView;
