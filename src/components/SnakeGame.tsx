import React, { useEffect, useRef, useState, useCallback } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [[5, 5], [4, 5], [3, 5]];
const INITIAL_DIRECTION = [1, 0];

export const SnakeGame: React.FC<{ onScoreChange: (score: number) => void }> = ({ onScoreChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState([10, 10]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<number | null>(null);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = [newSnake[0][0] + direction[0], newSnake[0][1] + direction[1]];

    // Wall collision
    if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE) {
      setGameOver(true);
      return;
    }

    // Self collision
    if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    // Food collision
    if (head[0] === food[0] && head[1] === food[1]) {
      const newScore = score + 10;
      setScore(newScore);
      onScoreChange(newScore);
      spawnFood(newSnake);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, score, onScoreChange]);

  const spawnFood = (currentSnake: number[][]) => {
    let newFood;
    while (true) {
      newFood = [Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)];
      if (!currentSnake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1])) {
        break;
      }
    }
    setFood(newFood);
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp': if (direction[1] !== 1) setDirection([0, -1]); break;
      case 'ArrowDown': if (direction[1] !== -1) setDirection([0, 1]); break;
      case 'ArrowLeft': if (direction[0] !== 1) setDirection([-1, 0]); break;
      case 'ArrowRight': if (direction[0] !== -1) setDirection([1, 0]); break;
    }
  }, [direction]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const speed = Math.max(50, 150 - Math.floor(score / 50) * 10);
    gameLoopRef.current = window.setInterval(moveSnake, speed);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, score]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = canvas.width / GRID_SIZE;

    // Clear canvas
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines (subtle)
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.05)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * scale, 0);
      ctx.lineTo(i * scale, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * scale);
      ctx.lineTo(canvas.width, i * scale);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, i) => {
      const isHead = i === 0;
      ctx.fillStyle = isHead ? '#39ff14' : 'rgba(57, 255, 20, 0.6)';
      
      if (isHead) {
        ctx.shadowBlur = 15 + Math.sin(Date.now() / 100) * 5;
        ctx.shadowColor = '#39ff14';
      } else {
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(57, 255, 20, 0.3)';
      }
      
      ctx.fillRect(segment[0] * scale + 1, segment[1] * scale + 1, scale - 2, scale - 2);
      ctx.shadowBlur = 0;
    });

    // Draw food
    ctx.fillStyle = '#ff00ff';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff00ff';
    ctx.beginPath();
    ctx.arc(food[0] * scale + scale / 2, food[1] * scale + scale / 2, scale / 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ff00ff';
      ctx.font = 'bold 30px Space Grotesk';
      ctx.textAlign = 'center';
      ctx.fillText('SIGNAL LOST', canvas.width / 2, canvas.height / 2 - 20);
      ctx.font = '16px JetBrains Mono';
      ctx.fillStyle = '#00f3ff';
      ctx.fillText('PRESS R TO REBOOT', canvas.width / 2, canvas.height / 2 + 20);
    }
  }, [snake, food, gameOver]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood([10, 10]);
    setGameOver(false);
    setScore(0);
    onScoreChange(0);
  };

  useEffect(() => {
    const handleReset = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r' && gameOver) {
        resetGame();
      }
    };
    window.addEventListener('keydown', handleReset);
    return () => window.removeEventListener('keydown', handleReset);
  }, [gameOver]);

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-green opacity-30 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="relative bg-black border border-neon-cyan/30 rounded-lg crt-flicker"
      />
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-white text-center animate-pulse">
            {/* Visual overlay specifically for glitch feel */}
          </div>
        </div>
      )}
    </div>
  );
};
