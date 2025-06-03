
import React, { useEffect, useRef, FC } from "react";
import * as THREE from "three";

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

// Simplified App class for basic road effect
class App {
  container: HTMLElement;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  clock: THREE.Clock;
  disposed: boolean = false;

  constructor(container: HTMLElement, options: HyperspeedOptions) {
    this.container = container;
    
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    if (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      options.fov,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 8, -5);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(options.colors.background);
    
    this.scene.fog = new THREE.Fog(
      options.colors.background,
      options.length * 0.2,
      options.length * 2
    );

    this.clock = new THREE.Clock();
    
    this.createRoad(options);
    this.createLights(options);
    
    window.addEventListener("resize", this.onResize);
    this.onResize();
    
    this.tick();
  }

  createRoad(options: HyperspeedOptions) {
    const roadGeometry = new THREE.PlaneGeometry(options.roadWidth, options.length, 20, 100);
    const roadMaterial = new THREE.MeshBasicMaterial({ 
      color: options.colors.roadColor,
      transparent: true,
      opacity: 0.8 
    });
    
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.z = -options.length / 2;
    this.scene.add(road);
  }

  createLights(options: HyperspeedOptions) {
    for (let i = 0; i < 50; i++) {
      const lightGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const lightMaterial = new THREE.MeshBasicMaterial({ 
        color: i % 2 ? options.colors.leftCars[0] : options.colors.rightCars[0],
        transparent: true,
        opacity: 0.8
      });
      
      const light = new THREE.Mesh(lightGeometry, lightMaterial);
      light.position.x = (i % 2 ? -1 : 1) * (options.roadWidth / 4);
      light.position.y = 0.5;
      light.position.z = -i * 10;
      
      this.scene.add(light);
    }
  }

  onResize = () => {
    if (!this.container) return;
    
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  };

  tick = () => {
    if (this.disposed) return;
    
    const time = this.clock.getElapsedTime();
    
    // Animate camera
    this.camera.position.z += 0.1;
    if (this.camera.position.z > 50) {
      this.camera.position.z = -5;
    }
    
    // Animate lights
    this.scene.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
        child.position.z += 2;
        if (child.position.z > 20) {
          child.position.z = -500;
        }
      }
    });
    
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.tick);
  };

  dispose() {
    this.disposed = true;
    window.removeEventListener("resize", this.onResize);
    this.renderer.dispose();
    this.scene.clear();
  }
}

export const Component: FC<ComponentProps> = ({ effectOptions = {} }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);

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

    if (appRef.current) {
      appRef.current.dispose();
    }

    const app = new App(container, mergedOptions);
    appRef.current = app;

    return () => {
      if (app) {
        app.dispose();
      }
      appRef.current = null;
    };
  }, [mergedOptions]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
    />
  );
};
