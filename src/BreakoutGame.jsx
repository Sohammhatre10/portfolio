import React, { useRef, useEffect, useState } from 'react';
import { letterGrids } from './letterData';

const BreakoutGame = () => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Responsive setup
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 240;

    // Game state
    const paddle = { w: 100, h: 6, x: canvas.width / 2 - 50, y: canvas.height - 15 };
    const ball = { x: canvas.width / 2, y: canvas.height - 30, radius: 4, dx: 3.5, dy: -3.5 };
    
    // Build bricks from "SOHAM" and "MHATRE"
    const buildBricks = () => {
      const rows = 5;
      const colsPerLetter = 5;
      // Calculate dynamic brick size to fit screen
      const words = ["SOHAM", "MHATRE"];
      const maxChars = Math.max(words[0].length, words[1].length);
      
      const padding = 2;
      const letterSpacing = 8;
      const availableWidth = canvas.width * 0.9;
      
      const brickW = Math.min(10, (availableWidth / maxChars - letterSpacing) / colsPerLetter - padding);
      const brickH = brickW; 
      
      const startY = 30;
      let initialBricks = [];

      words.forEach((word, wordIdx) => {
        const wordWidth = word.length * (colsPerLetter * (brickW + padding)) + (word.length - 1) * letterSpacing;
        const startX = (canvas.width - wordWidth) / 2;
        const currentY = startY + wordIdx * (rows * (brickH + padding) + 20);

        word.split('').forEach((char, charIdx) => {
          const grid = letterGrids[char];
          if(!grid) return;
          const letterStartX = startX + charIdx * (colsPerLetter * (brickW + padding) + letterSpacing);
          
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < colsPerLetter; c++) {
              if (grid[r][c] === 1) {
                initialBricks.push({
                  x: letterStartX + c * (brickW + padding),
                  y: currentY + r * (brickH + padding),
                  w: brickW,
                  h: brickH,
                  status: 1,
                  color: '#ffffff'
                });
              }
            }
          }
        });
      });
      return initialBricks;
    };

    let bricks = buildBricks();
    let particles = [];

    // Particle system for explosion effect
    const createParticles = (x, y, color) => {
      for (let i = 0; i < 6; i++) {
        particles.push({
          x, y,
          dx: (Math.random() - 0.5) * 4,
          dy: (Math.random() - 0.5) * 4,
          life: 1,
          color
        });
      }
    };

    const updateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.dx;
        p.y += p.dy;
        p.life -= 0.05;
        if (p.life <= 0) particles.splice(i, 1);
      }
    };

    const drawParticles = () => {
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.life})`;
        ctx.fill();
        ctx.closePath();
      });
    };

    // Event listeners
    const mouseMoveHandler = (e) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      if(relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.w / 2;
        // Keep paddle inside canvas
        if (paddle.x < 0) paddle.x = 0;
        if (paddle.x + paddle.w > canvas.width) paddle.x = canvas.width - paddle.w;
      }
    };
    
    const clickHandler = () => {
      if (!isPlaying) setIsPlaying(true);
    };

    // Use window to track mouse better
    window.addEventListener("mousemove", mouseMoveHandler);
    canvas.addEventListener("click", clickHandler);

    // Drawing functions
    const drawPaddle = () => {
      ctx.beginPath();
      ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#fff';
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0; // reset
    };

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f0ff';
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0;
    };

    const drawBricks = () => {
      let allBroken = true;
      bricks.forEach(b => {
        if (b.status === 1) {
          allBroken = false;
          ctx.beginPath();
          ctx.rect(b.x, b.y, b.w, b.h);
          ctx.fillStyle = b.color;
          ctx.shadowBlur = 5;
          ctx.shadowColor = b.color;
          ctx.fill();
          ctx.closePath();
          ctx.shadowBlur = 0;
        }
      });
      
      // Auto-win reset
      if (allBroken && bricks.length > 0) {
        bricks = buildBricks();
        setIsPlaying(false);
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
      }
    };

    const collisionDetection = () => {
      for (let i = 0; i < bricks.length; i++) {
        let b = bricks[i];
        if (b.status === 1) {
          if (ball.x > b.x && ball.x < b.x + b.w && ball.y > b.y && ball.y < b.y + b.h) {
            ball.dy = -ball.dy;
            b.status = 0;
            createParticles(b.x + b.w/2, b.y + b.h/2, b.color);
            // Increase speed slightly
            ball.dx *= 1.02;
            ball.dy *= 1.02;
          }
        }
      }
    };

    const draw = () => {
      // Clear canvas (no background motion blur)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawBricks();
      drawPaddle();
      updateParticles();
      drawParticles();
      
      if (!isPlaying) {
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '12px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.letterSpacing = "0.3em";
        ctx.fillText('CLICK TO DESTRUCT', canvas.width / 2, canvas.height - 40);
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      
      drawBall();
      collisionDetection();

      // Wall bounce
      if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
      }
      if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
      } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        // Paddle collision
        if (ball.x > paddle.x - ball.radius && ball.x < paddle.x + paddle.w + ball.radius) {
          ball.dy = -ball.dy;
          // English logic based on where it hit the paddle
          const hitPoint = ball.x - (paddle.x + paddle.w / 2);
          ball.dx = hitPoint * 0.15;
          // Cap speed
          ball.dx = Math.max(Math.min(ball.dx, 6), -6);
        } else {
          // Game over reset
          setIsPlaying(false);
          ball.x = canvas.width / 2;
          ball.y = canvas.height - 30;
          ball.dx = 3.5 * (Math.random() > 0.5 ? 1 : -1);
          ball.dy = -3.5;
          bricks = buildBricks();
          particles = [];
        }
      }

      ball.x += ball.dx;
      ball.y += ball.dy;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", mouseMoveHandler);
      canvas.removeEventListener("click", clickHandler);
    };
  }, [isPlaying]);

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[240px] cursor-crosshair my-4">
      <canvas 
        ref={canvasRef} 
        className="relative block w-full h-full"
      />
    </div>
  );
};

export default BreakoutGame;
