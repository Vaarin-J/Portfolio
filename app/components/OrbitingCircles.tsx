'use client';

import { CSSProperties, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type OrbitingCirclesProps = {
  className?: string;
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
  [key: string]: any;
};

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="absolute inset-0 pointer-events-none size-full"
        >
          <circle
            className="stroke-1 stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {Array.isArray(children) &&
        children.map((child, index) => {
          const angle = (360 / children.length) * index;
          return (
            <div
              key={index}
              style={
                {
                  '--duration': calculatedDuration,
                  '--radius': radius,
                  '--angle': angle,
                  '--icon-size': `${iconSize}px`,
                } as CSSProperties
              }
              className={twMerge(
                `absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full ${
                  reverse ? '[animation-direction:reverse]' : ''
                }`,
                className
              )}
              {...props}
            >
              {child}
            </div>
          );
        })}
    </>
  );
}