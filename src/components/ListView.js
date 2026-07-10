import React from 'react';
import styled from 'styled-components';

const ListWrapper = styled.div`
  background-color: #0b0b0b;
  color: #ffffff;
  padding: 8rem 0 4rem;
  min-height: 100vh;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 5rem;
  align-items: flex-end;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
`;

const ListLayout = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
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
  
  @media (max-width: 991px) {
    position: relative;
    top: 0;
  }
`;

const SidebarMenu = styled.div`
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

const SidebarItem = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.4);
  transition: var(--transition-fast);
  width: fit-content;
  
  &:hover {
    color: var(--accent-color);
    padding-left: 0.5rem;
  }
  
  @media (max-width: 991px) {
    font-size: 0.8rem;
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 0.4rem 1rem;
    border-radius: 20px;
    
    &:hover {
      padding-left: 1rem;
      background: rgba(255,255,255,0.05);
    }
  }
`;

const SectionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  scroll-margin-top: 8rem;
`;

const SectionHeader = styled.div`
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
`;

const TableRow = styled.a`
  display: grid;
  grid-template-columns: 2.2fr 1.2fr 0.8fr 0.8fr;
  align-items: center;
  padding: 1.5rem 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: var(--transition-fast);
  color: inherit;
  
  .title {
    font-size: 1.05rem;
    font-weight: 600;
    transition: var(--transition-fast);
  }
  
  .category, .detail {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    color: var(--text-muted);
  }
  
  .action {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-muted);
    justify-content: flex-end;
    transition: var(--transition-fast);
  }
  
  svg {
    width: 8px;
    height: auto;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.02);
    border-bottom-color: var(--accent-color);
    padding-left: 1rem;
    padding-right: 1rem;
    
    .title {
      color: var(--accent-color);
    }
    
    .action {
      color: #ffffff;
      
      svg {
        transform: translate(2px, -2px);
      }
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
    
    .detail {
      display: none;
    }
  }
`;

const DiagonalArrow = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.61736 0.816602H1.33366V0.0166016H7.58366H7.98366V0.416602V6.6666H7.18366V1.38167L1.28248 7.28282L0.716797 6.71713L6.61736 0.816602Z" />
  </svg>
);

const ListView = () => {
  const filmData = [
    { title: "Inception ★", category: "Sci-Fi / Thriller", detail: "2010" },
    { title: "Interstellar", category: "Sci-Fi / Drama", detail: "2014" },
    { title: "Obsession", category: "Mystery / Thriller", detail: "2026" },
    { title: "The Matrix", category: "Sci-Fi / Action", detail: "1999" }
  ];

  const animeData = [
    { title: "Demon Slayer ★", category: "Dark Fantasy / Action", detail: "2019–Present" },
    { title: "One Punch Man", category: "Superhero / Comedy", detail: "2015–Present" },
    { title: "Solo Leveling", category: "Action / Fantasy", detail: "2024–Present" },
    { title: "My Hero Academia", category: "Action / Sci-Fi", detail: "2016–Present" },
    { title: "Horimiya", category: "Slice of Life / Romance", detail: "2021" },
    { title: "Your Name", category: "Romance / Fantasy", detail: "2016" },
    { title: "Suzume", category: "Adventure / Fantasy", detail: "2022" },
    { title: "Chainsaw Man", category: "Dark Fantasy / Action", detail: "2022–Present" }
  ];

  const gameData = [
    { title: "Valorant ★", category: "FPS / Tactical Shooter", detail: "Riot Games" },
    { title: "Cricket 19", category: "Sports / Simulation", detail: "Big Ant Studios" },
    { title: "GTA 5", category: "Action / Adventure", detail: "Rockstar Games" },
    { title: "Forza Horizon 6", category: "Racing / Simulation", detail: "Playground Games" },
    { title: "Meccha Chameleon", category: "Sci-Fi / Platformer", detail: "Indie Studio" }
  ];

  return (
    <ListWrapper>
      <div className="container-full">
        <ListHeader>
          <div>
            <div className="h1" style={{ color: 'var(--accent-color)' }}>LIST</div>
          </div>
          <div className="b2">
            A curated log of recommendations documenting the films, anime, and games that bring inspiration and balance to my lifestyle.
          </div>
        </ListHeader>
        
        <ListLayout>
          <SidebarWrapper>
            <SidebarMenu>
              <SidebarItem href="#films">Films</SidebarItem>
              <SidebarItem href="#anime">Anime</SidebarItem>
              <SidebarItem href="#games">Games</SidebarItem>
            </SidebarMenu>
          </SidebarWrapper>
          
          <SectionsList>
            <ListSection id="films">
              <SectionHeader>
                <div className="h3">Films</div>
              </SectionHeader>
              {filmData.map((item, index) => (
                <TableRow key={index} as="div">
                  <span className="title">{item.title}</span>
                  <span className="category">{item.category}</span>
                  <span className="detail">{item.detail}</span>
                </TableRow>
              ))}
            </ListSection>

            <ListSection id="anime">
              <SectionHeader>
                <div className="h3">Anime</div>
              </SectionHeader>
              {animeData.map((item, index) => (
                <TableRow key={index} as="div">
                  <span className="title">{item.title}</span>
                  <span className="category">{item.category}</span>
                  <span className="detail">{item.detail}</span>
                </TableRow>
              ))}
            </ListSection>

            <ListSection id="games">
              <SectionHeader>
                <div className="h3">Games</div>
              </SectionHeader>
              {gameData.map((item, index) => (
                <TableRow key={index} as="div">
                  <span className="title">{item.title}</span>
                  <span className="category">{item.category}</span>
                  <span className="detail">{item.detail}</span>
                </TableRow>
              ))}
            </ListSection>
          </SectionsList>
        </ListLayout>
      </div>
    </ListWrapper>
  );
};

export default ListView;
