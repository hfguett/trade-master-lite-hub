
import React, { useEffect, useRef, FC } from "react";

// Simple hyperspeed effect without three.js dependencies for now
interface HyperspeedOptions {
  onSpeedUp?: (ev: MouseEvent) => void;
  onSlowDown?: (ev: MouseEvent) => void;
  distortion?: string;
  length: number;
  roadWidth: number;
  islandWidth: number;
  lanesPerRoad: number;
  fov: number;
  fovSpeedUp: number;
  speedUp: number;
  carLightsFade: number;
  totalSideLightSticks: number;
  lightPairsPerRoadWay: number;
  shoulderLinesWidthPercentage: number;
  brokenLinesWidthPercentage: number;
  brokenLinesLengthPercentage: number;
  lightStickWidth: [number, number];
  lightStickHeight: [number, number];
  movingAwaySpeed: [number, number];
  movingCloserSpeed: [number, number];
  carLightsLength: [number, number];
  carLightsRadius: [number, number];
  carWidthPercentage: [number, number];
  carShiftX: [number, number];
  carFloorSeparation: [number, number];
  colors: {
    roadColor: number;
    islandColor: number;
    background: number;
    shoulderLines: number;
    brokenLines: number;
    leftCars: number[];
    rightCars: number[];
    sticks: number;
  };
}

interface ComponentProps {
  effectOptions?: Partial<HyperspeedOptions>;
}

const defaultOptions: HyperspeedOptions = {
  distortion: "turbulentDistortion",
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0x4f46e5,
    brokenLines: 0x4f46e5,
    leftCars: [0x4f46e5, 0x6366f1, 0x8b5cf6],
    rightCars: [0x06b6d4, 0x0ea5e9, 0x3b82f6],
    sticks: 0x06b6d4,
  },
};

// CSS-only hyperspeed effect as fallback
export const Component: FC<ComponentProps> = ({ effectOptions = {} }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mergedOptions: HyperspeedOptions = {
    ...defaultOptions,
    ...effectOptions,
    colors: {
      ...defaultOptions.colors,
      ...(effectOptions.colors || {}),
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Simple CSS animation for hyperspeed effect
    const style = document.createElement('style');
    style.textContent = `
      @keyframes hyperspeed {
        0% { transform: translateZ(-1000px) scale(1); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateZ(1000px) scale(3); opacity: 0; }
      }
      
      .hyperspeed-particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: linear-gradient(45deg, #4f46e5, #06b6d4);
        border-radius: 50%;
        animation: hyperspeed linear infinite;
      }
    `;
    document.head.appendChild(style);

    // Create particles
    const particles: HTMLElement[] = [];
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'hyperspeed-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 2 + 1) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [mergedOptions]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 0,
        background: `linear-gradient(45deg, 
          rgb(${(mergedOptions.colors.background >> 16) & 255}, ${(mergedOptions.colors.background >> 8) & 255}, ${mergedOptions.colors.background & 255}),
          rgb(${(mergedOptions.colors.roadColor >> 16) & 255}, ${(mergedOptions.colors.roadColor >> 8) & 255}, ${mergedOptions.colors.roadColor & 255})
        )`
      }}
    />
  );
};
