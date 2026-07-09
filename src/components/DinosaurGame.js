import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

const pulseGlow = keyframes`
  0%, 100% {
    border-color: rgba(255, 176, 136, 0.15);
    box-shadow: 0 0 15px rgba(255, 176, 136, 0.05);
  }
  50% {
    border-color: rgba(255, 176, 136, 0.4);
    box-shadow: 0 0 25px rgba(255, 176, 136, 0.15);
  }
`;

const GameWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

const GameContainer = styled.div`
  width: 100%;
  height: 220px;
  background: rgba(20, 18, 18, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  animation: ${pulseGlow} 4s infinite ease-in-out;
  
  &:hover {
    border-color: var(--border-hover);
  }
`;

const GameCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`;

const GameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(9, 9, 11, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 10;
`;

const GameTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    background: linear-gradient(135deg, var(--accent-peach), var(--accent-pink));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const ScorePanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  color: var(--text-secondary);
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
`;

const ScoreValue = styled.span`
  color: var(--accent-peach);
  font-weight: 700;
`;

const StartButton = styled.button`
  background: linear-gradient(135deg, var(--accent-peach), var(--accent-pink));
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  color: #09090b;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 0.75rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px var(--shadow-glow);
  }
`;

const Instructions = styled.p`
  color: var(--text-muted);
  text-align: center;
  font-size: 0.75rem;
  max-width: 280px;
  line-height: 1.4;
`;

const ScoreDisplay = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: var(--accent-peach);
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
`;

const DinosaurGame = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('cat_high_score');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = 600;
    const height = 200;
    const groundY = 170;

    const game = {
      canvas,
      ctx,
      width,
      height,
      ground: groundY,
      dinosaur: {
        x: 50,
        y: groundY - 26,
        width: 28,
        height: 26,
        velocityY: 0,
        jumping: false,
        gravity: 0.55,
        jumpPower: -10.2
      },
      obstacles: [],
      gameSpeed: 3.8,
      score: 0,
      gameRunning: false
    };

    gameRef.current = game;
    
    // Initial draw of ground and cat
    ctx.clearRect(0, 0, width, height);
    drawGround(ctx, width, groundY);
    drawDinosaur(ctx, game.dinosaur);
  }, []);

  // Draw Cute Custom Vector Cat
  const drawDinosaur = (ctx, dino) => {
    ctx.save();
    ctx.shadowColor = 'rgba(255, 176, 136, 0.4)';
    ctx.shadowBlur = 8;
    
    const gradient = ctx.createLinearGradient(dino.x, dino.y, dino.x + dino.width, dino.y + dino.height);
    gradient.addColorStop(0, '#ffb088');
    gradient.addColorStop(1, '#ff8da1');
    ctx.fillStyle = gradient;
    
    // Cat body
    ctx.beginPath();
    ctx.roundRect(dino.x + 2, dino.y + 6, dino.width - 6, dino.height - 10, 6);
    ctx.fill();

    // Cat Head
    ctx.beginPath();
    ctx.arc(dino.x + dino.width - 8, dino.y + 9, 7, 0, Math.PI * 2);
    ctx.fill();

    // Cat Ears (Triangles)
    ctx.beginPath();
    ctx.moveTo(dino.x + dino.width - 13, dino.y + 4);
    ctx.lineTo(dino.x + dino.width - 11, dino.y - 1);
    ctx.lineTo(dino.x + dino.width - 8, dino.y + 3);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(dino.x + dino.width - 8, dino.y + 3);
    ctx.lineTo(dino.x + dino.width - 5, dino.y - 2);
    ctx.lineTo(dino.x + dino.width - 3, dino.y + 4);
    ctx.fill();

    // Cat Tail (Curved)
    ctx.strokeStyle = '#ff8da1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(dino.x + 3, dino.y + 12);
    ctx.quadraticCurveTo(dino.x - 5, dino.y + 8, dino.x - 2, dino.y + 1);
    ctx.stroke();

    // Cat Legs (Animated swing)
    ctx.strokeStyle = '#ff8da1';
    ctx.lineWidth = 2.5;
    
    const time = Date.now() / 100;
    const legSwing = Math.sin(time) * 4;
    
    // Front Leg
    ctx.beginPath();
    ctx.moveTo(dino.x + dino.width - 8, dino.y + 14);
    ctx.lineTo(dino.x + dino.width - 8 + legSwing, dino.y + dino.height);
    ctx.stroke();

    // Back Leg
    ctx.beginPath();
    ctx.moveTo(dino.x + 6, dino.y + 14);
    ctx.lineTo(dino.x + 6 - legSwing, dino.y + dino.height);
    ctx.stroke();

    ctx.restore();

    // Cat Eye
    ctx.fillStyle = '#000';
    ctx.fillRect(dino.x + dino.width - 7, dino.y + 7, 1.8, 1.8);
    
    // Whisker lines
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(dino.x + dino.width - 3, dino.y + 9);
    ctx.lineTo(dino.x + dino.width + 1, dino.y + 8);
    ctx.moveTo(dino.x + dino.width - 3, dino.y + 10);
    ctx.lineTo(dino.x + dino.width + 2, dino.y + 10);
    ctx.stroke();
  };

  // Draw balls of yarn / fish bones
  const drawObstacle = (ctx, obstacle) => {
    ctx.save();
    
    const isYarn = Math.floor(obstacle.y + obstacle.x) % 2 === 0;

    if (isYarn) {
      // Yarn Ball
      ctx.shadowColor = '#ff8da1';
      ctx.shadowBlur = 6;
      ctx.fillStyle = '#ff8da1';
      
      const cx = obstacle.x + obstacle.width / 2;
      const cy = obstacle.y + obstacle.height / 2;
      const r = Math.min(obstacle.width, obstacle.height) / 2;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Yarn textures
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.2;
      
      ctx.beginPath();
      ctx.arc(cx - 2, cy - 2, r - 3, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx + 2, cy + 2, r - 3, 0, Math.PI * 2);
      ctx.stroke();

      // Loose thread trailing
      ctx.beginPath();
      ctx.moveTo(cx, cy + r);
      ctx.quadraticCurveTo(cx - 4, cy + r + 4, cx - 8, cy + r + 2);
      ctx.stroke();
    } else {
      // Fish Bone
      ctx.shadowColor = '#ffb088';
      ctx.shadowBlur = 6;
      ctx.strokeStyle = '#c5b8b1';
      ctx.lineWidth = 1.8;

      const x = obstacle.x;
      const y = obstacle.y + obstacle.height / 2;
      const w = obstacle.width;
      const h = obstacle.height;

      // Spine
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + w, y);
      ctx.stroke();

      // Head
      ctx.fillStyle = '#c5b8b1';
      ctx.beginPath();
      ctx.moveTo(x + w - 4, y - 5);
      ctx.lineTo(x + w + 2, y);
      ctx.lineTo(x + w - 4, y + 5);
      ctx.fill();

      // Tail
      ctx.beginPath();
      ctx.moveTo(x + 4, y);
      ctx.lineTo(x - 2, y - 5);
      ctx.lineTo(x - 2, y + 5);
      ctx.fill();

      // Ribs
      ctx.beginPath();
      ctx.moveTo(x + w * 0.3, y - 4);
      ctx.lineTo(x + w * 0.3, y + 4);
      
      ctx.moveTo(x + w * 0.5, y - 5);
      ctx.lineTo(x + w * 0.5, y + 5);

      ctx.moveTo(x + w * 0.7, y - 4);
      ctx.lineTo(x + w * 0.7, y + 4);
      ctx.stroke();
    }
    
    ctx.restore();
  };

  const drawGround = (ctx, width, ground) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 176, 136, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, ground);
    ctx.lineTo(width, ground);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 176, 136, 0.01)';
    ctx.fillRect(0, ground, width, 30);
    ctx.restore();
  };

  const checkCollision = (dino, obstacle) => {
    const collides = (
      dino.x < obstacle.x + obstacle.width - 3 &&
      dino.x + dino.width > obstacle.x + 3 &&
      dino.y < obstacle.y + obstacle.height - 3 &&
      dino.y + dino.height > obstacle.y + 3
    );
    if (collides) {
      console.log(`COLLISION: dino[x=${dino.x},y=${dino.y}] obstacle[x=${obstacle.x},y=${obstacle.y},w=${obstacle.width},h=${obstacle.height}]`);
    }
    return collides;
  };

  const gameLoop = useCallback(() => {
    const game = gameRef.current;
    if (!game || !game.gameRunning) return;

    const { ctx, width, height, dinosaur, obstacles, ground } = game;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Update Jump
    if (dinosaur.jumping) {
      dinosaur.velocityY += dinosaur.gravity;
      dinosaur.y += dinosaur.velocityY;

      if (dinosaur.y >= ground - dinosaur.height) {
        dinosaur.y = ground - dinosaur.height;
        dinosaur.jumping = false;
        dinosaur.velocityY = 0;
      }
    }

    // Spawn Obstacles
    if (obstacles.length === 0 || (width - obstacles[obstacles.length - 1].x > 240 && Math.random() < 0.015)) {
      const obstacleWidth = 16;
      const obstacleHeight = 22 + Math.random() * 8;
      obstacles.push({
        x: width,
        y: ground - obstacleHeight,
        width: obstacleWidth,
        height: obstacleHeight
      });
    }

    // Update & Draw
    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obstacle = obstacles[i];
      obstacle.x -= game.gameSpeed;

      if (checkCollision(dinosaur, obstacle)) {
        game.gameRunning = false;
        setGameOver(true);
        if (game.score > highScore) {
          setHighScore(game.score);
          localStorage.setItem('cat_high_score', game.score.toString());
        }
        return;
      }

      drawObstacle(ctx, obstacle);

      if (obstacle.x + obstacle.width < 0) {
        obstacles.splice(i, 1);
        game.score += 10;
        setScore(game.score);
      }
    }

    game.gameSpeed += 0.0008;

    drawGround(ctx, width, ground);
    drawDinosaur(ctx, dinosaur);

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [highScore]);

  const startGame = () => {
    const game = gameRef.current;
    if (!game || game.gameRunning) return;

    game.gameRunning = true;
    game.obstacles = [];
    game.score = 0;
    game.gameSpeed = 3.8;
    game.dinosaur.y = game.ground - game.dinosaur.height;
    game.dinosaur.jumping = false;
    game.dinosaur.velocityY = 0;
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    gameLoop();
  };

  const jump = useCallback(() => {
    const game = gameRef.current;
    if (!game) return;

    if (game.gameRunning && !game.dinosaur.jumping) {
      game.dinosaur.jumping = true;
      game.dinosaur.velocityY = game.dinosaur.jumpPower;
    }
  }, []);

  const resetGame = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    initGame();
  };

  useEffect(() => {
    initGame();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initGame]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!gameStarted) {
          startGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump, gameStarted]);

  return (
    <GameWrapper>
      <ScorePanel>
        <div>Score: <ScoreValue>{score}</ScoreValue></div>
        <div>High Score: <ScoreValue>{highScore}</ScoreValue></div>
      </ScorePanel>

      <GameContainer onClick={gameStarted ? jump : startGame}>
        <GameCanvas ref={canvasRef} width={600} height={200} />
        
        <GameOverlay show={!gameStarted && !gameOver}>
          <GameTitle>🐱 <span>Cat Runner</span></GameTitle>
          <StartButton onClick={(e) => { e.stopPropagation(); startGame(); }}>
            Start Play
          </StartButton>
          <Instructions>
            Click or press SPACEBAR/ARROW UP to jump over yarn & fish bones!
          </Instructions>
        </GameOverlay>
        
        <GameOverlay show={gameOver}>
          <GameTitle>GameOver! 😿</GameTitle>
          <ScoreDisplay>{score}</ScoreDisplay>
          <StartButton onClick={(e) => { e.stopPropagation(); resetGame(); }}>
            Play Again
          </StartButton>
          <Instructions>
            Great try! Beat your high score of {highScore}?
          </Instructions>
        </GameOverlay>
      </GameContainer>
    </GameWrapper>
  );
};

export default DinosaurGame;
