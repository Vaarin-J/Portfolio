'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const circle = useRef<HTMLDivElement>(null);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  const defaultSize = 30;
  const hoverSize = 70;

  const lerp = (start: number, end: number, amt: number) =>
    start * (1 - amt) + end * amt;

  const handleMouseMove = (e: MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY };

    const target = e.target as HTMLElement;

    const isHoverTarget =
  target.closest(
    'a, button, [role="button"], img, h3, h4, h5, h6, .text-blur-target'
  ) !== null;

setIsHoveringClickable(isHoverTarget);
  }

  const animate = () => {
    const { x: dx, y: dy } = delayedMouse.current;
    const { x: mx, y: my } = mouse.current;
    delayedMouse.current = {
      x: lerp(dx, mx, 0.15),
      y: lerp(dy, my, 0.15),
    };
    if (circle.current) {
      gsap.set(circle.current, {
        x: delayedMouse.current.x,
        y: delayedMouse.current.y,
        xPercent: -50,
        yPercent: -50,
      });
    }
    rafId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div>
      <div
        ref={circle}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          width: isHoveringClickable ? hoverSize : defaultSize,
          height: isHoveringClickable ? hoverSize : defaultSize,
          borderRadius: '50%',
          backgroundColor: 'rgba(188,228,242,0.8)',
          filter: isHoveringClickable ? 'blur(15px)' : 'none',
          transition: 'width 0.2s ease, height 0.2s ease, filter 0.2s ease',
          mixBlendMode: 'difference',
          zIndex: 9999,
        }}
      />
    </div>
  );
}