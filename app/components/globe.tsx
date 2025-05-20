'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { useMotionValue, useSpring } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type Marker = {
  location: [number, number];
  size: number;
};

type GlobeConfig = {
  width: number;
  height: number;
  onRender: (state: unknown) => void;
  devicePixelRatio: number;
  phi: number;
  theta: number;
  dark: number;
  diffuse: number;
  mapSamples: number;
  mapBrightness: number;
  baseColor: [number, number, number];
  markerColor: [number, number, number];
  glowColor: [number, number, number];
  markers: Marker[];
};

type GlobeProps = {
  className?: string;
  config?: GlobeConfig;
};

const MOVEMENT_DAMPING = 1400;

const DEFAULT_CONFIG: GlobeConfig = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [1, 1, 1],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export function Globe({ className, config = DEFAULT_CONFIG }: GlobeProps) {
  // useRef hooks to persist these values across renders
  const phi = useRef(0);
  const width = useRef(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width.current = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener('resize', onResize);
    onResize();

    const globeConfig: GlobeConfig = {
      ...config,
      width: width.current * 2,
      height: width.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi.current += 0.005;
        // cobe mutates these fields on the state object
        // we cast to any just here so TS stops complaining
        // while still keeping our own signature safe
            // @ts-ignore
        ;(state as any).phi = phi.current + rs.get();
            // @ts-ignore
        ;(state as any).width = width.current * 2;
            // @ts-ignore
        ;(state as any).height = width.current * 2;
      },
    };

    const globe = createGlobe(canvasRef.current!, globeConfig);

    // fade it in once mounted
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [rs, config]);

  return (
    <div className={twMerge('mx-auto aspect-[1/1] w-full max-w-[600px]', className)}>
      <canvas
        className={twMerge(
          'size-[30rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]'
        )}
        ref={canvasRef}
        onPointerDown={(e) => updatePointerInteraction(e.clientX)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches[0]) updateMovement(e.touches[0].clientX);
        }}
      />
    </div>
  );
}
