"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";

// Selected flags: European, PALOP, CEDAO, US, Brazil, Japan, Canada
const FLAGS = [
  // Main European countries
  "germany", "france", "united-kingdom", "italy", "spain", "portugal", 
  "netherlands", "belgium", "austria", "switzerland", "sweden", "norway", 
  "denmark", "finland", "ireland", "poland", "czech-republic", "greece",
  // PALOP (Portuguese-speaking African)
  "angola", "mozambique", "cape-verde", "guinea-bissau", "sao-tome-and-prince",
  // CEDAO/ECOWAS (West African)
  "benin", "burkina-faso", "ivory-coast", "gambia", "ghana", "guinea", 
  "liberia", "mali", "niger", "nigeria", "senegal", "sierra-leone", "togo",
  // Americas & Asia
  "united-states", "brazil", "japan", "canada",
];

const BALL_RADIUS = 24;

type FlagBall = {
  body: Matter.Body;
  flag: string;
  lastVelocity: { x: number; y: number };
};

export function FlagRain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const flagBallsRef = useRef<FlagBall[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [flagImages, setFlagImages] = useState<Map<string, HTMLImageElement>>(new Map());
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const draggedBallRef = useRef<FlagBall | null>(null);
  const lastMousePosRef = useRef<{ x: number; y: number; time: number }[]>([]);
  const dimensionsRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  // Preload flag images
  useEffect(() => {
    const loadImages = async () => {
      const images = new Map<string, HTMLImageElement>();
      
      await Promise.all(
        FLAGS.map((flag) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              images.set(flag, img);
              resolve();
            };
            img.onerror = () => resolve();
            img.src = `/images/countries/${flag}.svg`;
          });
        })
      );
      
      setFlagImages(images);
    };

    loadImages();
  }, []);

  // Check if section is visible
  useEffect(() => {
    const checkPosition = () => {
      const appSection = document.getElementById("app-section");
      if (appSection) {
        const rect = appSection.getBoundingClientRect();
        const isAtTop = rect.top <= 100 && rect.bottom > window.innerHeight * 0.5;
        setIsVisible(isAtTop);
        
        // Initialize once when first visible
        if (isAtTop && !isInitialized) {
          setIsInitialized(true);
        }
      }
    };

    window.addEventListener("scroll", checkPosition, { passive: true });
    checkPosition();

    return () => window.removeEventListener("scroll", checkPosition);
  }, [isInitialized]);

  // Find ball at position
  const findBallAtPosition = useCallback((x: number, y: number): FlagBall | null => {
    for (const ball of flagBallsRef.current) {
      const pos = ball.body.position;
      const dx = pos.x - x;
      const dy = pos.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= BALL_RADIUS) {
        return ball;
      }
    }
    return null;
  }, []);

  // Mouse handlers
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ball = findBallAtPosition(x, y);
    if (ball) {
      draggedBallRef.current = ball;
      Matter.Body.setStatic(ball.body, true);
      lastMousePosRef.current = [{ x, y, time: Date.now() }];
      mouseRef.current = { x, y };
    }
  }, [findBallAtPosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };

    if (draggedBallRef.current) {
      Matter.Body.setPosition(draggedBallRef.current.body, { x, y });
      lastMousePosRef.current.push({ x, y, time: Date.now() });
      if (lastMousePosRef.current.length > 5) {
        lastMousePosRef.current.shift();
      }
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (draggedBallRef.current && lastMousePosRef.current.length >= 2) {
      const ball = draggedBallRef.current;
      Matter.Body.setStatic(ball.body, false);

      const recent = lastMousePosRef.current[lastMousePosRef.current.length - 1];
      const older = lastMousePosRef.current[0];
      const timeDiff = (recent.time - older.time) / 1000;

      if (timeDiff > 0) {
        const velocityX = ((recent.x - older.x) / timeDiff) * 0.05;
        const velocityY = ((recent.y - older.y) / timeDiff) * 0.05;
        
        const maxVelocity = 35;
        const velocity = {
          x: Math.max(-maxVelocity, Math.min(maxVelocity, velocityX)),
          y: Math.max(-maxVelocity, Math.min(maxVelocity, velocityY)),
        };
        Matter.Body.setVelocity(ball.body, velocity);
        // Store velocity for respawn direction
        ball.lastVelocity = velocity;
      }
    }
    draggedBallRef.current = null;
    lastMousePosRef.current = [];
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (draggedBallRef.current) {
      Matter.Body.setStatic(draggedBallRef.current.body, false);
      draggedBallRef.current = null;
      lastMousePosRef.current = [];
    }
  }, []);

  // Initialize physics engine (only once)
  useEffect(() => {
    if (!isInitialized || !containerRef.current || !canvasRef.current || flagImages.size === 0) {
      return;
    }

    // Skip if already initialized
    if (engineRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    dimensionsRef.current = { width, height };

    // Handle high DPI displays for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Create engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.5 },
    });
    engineRef.current = engine;

    // Create runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    // Create walls (no left/right walls to allow balls to exit)
    const wallThickness = 50;
    const bottomWall = Matter.Bodies.rectangle(
      width / 2, 
      height + wallThickness / 2, 
      width * 3, 
      wallThickness, 
      { isStatic: true, label: "bottom-wall" }
    );
    Matter.Composite.add(engine.world, bottomWall);

    // Create flag balls
    const balls: FlagBall[] = [];
    FLAGS.forEach((flag, i) => {
      const x = Math.random() * (width - BALL_RADIUS * 2) + BALL_RADIUS;
      const y = -Math.random() * 400 - BALL_RADIUS - (i * 30);

      const body = Matter.Bodies.circle(x, y, BALL_RADIUS, {
        restitution: 0.6,
        friction: 0.05,
        frictionAir: 0.01,
        density: 0.001,
        label: `flag-${flag}`,
      });

      balls.push({ body, flag, lastVelocity: { x: 0, y: 0 } });
      Matter.Composite.add(engine.world, body);
    });
    flagBallsRef.current = balls;

    // Track velocities for respawn direction
    Matter.Events.on(engine, "beforeUpdate", () => {
      flagBallsRef.current.forEach((ball) => {
        const vel = ball.body.velocity;
        if (Math.abs(vel.x) > 0.5 || Math.abs(vel.y) > 0.5) {
          ball.lastVelocity = { x: vel.x, y: vel.y };
        }
      });
    });

    // Start the engine
    Matter.Runner.run(runner, engine);

    // Cleanup only on unmount
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
        Matter.Composite.clear(engineRef.current.world, false);
      }
      flagBallsRef.current = [];
      engineRef.current = null;
      runnerRef.current = null;
    };
  }, [isInitialized, flagImages]);

  // Render loop - separate from physics, only runs when visible
  useEffect(() => {
    if (!isVisible || !canvasRef.current || flagImages.size === 0) {
      return;
    }

    const canvas = canvasRef.current;
    const { width, height } = dimensionsRef.current;
    
    if (width === 0 || height === 0) return;

    const renderCtx = canvas.getContext("2d");
    if (!renderCtx) return;

    const render = () => {
      renderCtx.clearRect(0, 0, width, height);

      // Enable image smoothing for better quality
      renderCtx.imageSmoothingEnabled = true;
      renderCtx.imageSmoothingQuality = "high";

      // Draw flag balls
      flagBallsRef.current.forEach(({ body, flag }) => {
        const pos = body.position;
        const angle = body.angle;
        const img = flagImages.get(flag);

        // Only draw if on screen
        if (pos.x < -100 || pos.x > width + 100 || pos.y < -200 || pos.y > height + 200) return;

        renderCtx.save();
        renderCtx.translate(pos.x, pos.y);
        renderCtx.rotate(angle);

        // Shadow
        renderCtx.shadowColor = "rgba(0, 0, 0, 0.12)";
        renderCtx.shadowBlur = 10;
        renderCtx.shadowOffsetX = 2;
        renderCtx.shadowOffsetY = 3;

        // Circle background
        renderCtx.beginPath();
        renderCtx.arc(0, 0, BALL_RADIUS, 0, Math.PI * 2);
        renderCtx.fillStyle = "#ffffff";
        renderCtx.fill();
        renderCtx.closePath();
        
        // Reset shadow before clipping
        renderCtx.shadowColor = "transparent";

        // Clip and draw flag
        renderCtx.beginPath();
        renderCtx.arc(0, 0, BALL_RADIUS, 0, Math.PI * 2);
        renderCtx.clip();

        if (img) {
          const size = BALL_RADIUS * 2.2;
          renderCtx.drawImage(img, -size / 2, -size / 2, size, size);
        }

        renderCtx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isVisible, flagImages]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      
      dimensionsRef.current = { width, height };
      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;
      
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Respawn balls based on direction they left
  useEffect(() => {
    if (!isInitialized || !containerRef.current) return;

    const interval = setInterval(() => {
      const { width, height } = dimensionsRef.current;
      if (width === 0 || height === 0) return;

      flagBallsRef.current.forEach((ball) => {
        const pos = ball.body.position;
        const lastVel = ball.lastVelocity;
        
        // Check if ball is off-screen
        const isOffLeft = pos.x < -150;
        const isOffRight = pos.x > width + 150;
        const isOffTop = pos.y < -500;
        const isOffBottom = pos.y > height + 150;
        
        if (isOffLeft || isOffRight || isOffTop || isOffBottom) {
          let newX: number;
          let newY: number;
          let newVelX = 0;
          let newVelY = 0;

          // Respawn from opposite direction of where it went
          if (isOffLeft && lastVel.x < -1) {
            // Went left, come back from right
            newX = width + BALL_RADIUS;
            newY = Math.random() * (height * 0.6) + 50;
            newVelX = -Math.abs(lastVel.x) * 0.3;
            newVelY = Math.random() * 2 - 1;
          } else if (isOffRight && lastVel.x > 1) {
            // Went right, come back from left
            newX = -BALL_RADIUS;
            newY = Math.random() * (height * 0.6) + 50;
            newVelX = Math.abs(lastVel.x) * 0.3;
            newVelY = Math.random() * 2 - 1;
          } else if (isOffTop && lastVel.y < -1) {
            // Went up, come back from top
            newX = Math.random() * (width - BALL_RADIUS * 2) + BALL_RADIUS;
            newY = -BALL_RADIUS * 2;
            newVelX = (Math.random() - 0.5) * 2;
            newVelY = Math.abs(lastVel.y) * 0.2;
          } else {
            // Default: come from top
            newX = Math.random() * (width - BALL_RADIUS * 2) + BALL_RADIUS;
            newY = -BALL_RADIUS * 2 - Math.random() * 100;
            newVelX = (Math.random() - 0.5) * 2;
            newVelY = 0;
          }

          Matter.Body.setPosition(ball.body, { x: newX, y: newY });
          Matter.Body.setVelocity(ball.body, { x: newVelX, y: newVelY });
          Matter.Body.setStatic(ball.body, false);
          ball.lastVelocity = { x: 0, y: 0 };
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isInitialized]);

  // Don't render if never initialized
  if (!isInitialized) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-visible"
      style={{ 
        zIndex: 60, // Above navbar (z-50)
        visibility: isVisible ? "visible" : "hidden",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}



