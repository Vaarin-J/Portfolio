'use client';
import { useRef, useEffect } from 'react';

const IMAGES = [
  '/photo1.jpg',
  '/photo2.jpg',
  '/photo3.webp',
  '/photo4.jpg',
  '/photo5.webp',
  '/photo6.avif',
  '/photo7.jpg',
  '/images/photo8.jpg',
];

export default function ImageSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current!;
    track.dataset.mouseDownAt = '0';
    track.dataset.prevPercentage = '0';
    track.dataset.percentage = '0';

    const handleOnDown = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        track.dataset.mouseDownAt = String(x);
      };

    const handleOnUp = () => {
      track.dataset.mouseDownAt = '0';
      track.dataset.prevPercentage = track.dataset.percentage!;
    };

    const handleOnMove = (e: MouseEvent | TouchEvent) => {
      if (track.dataset.mouseDownAt === '0') return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const mouseDelta = parseFloat(track.dataset.mouseDownAt!) - clientX;
      const maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100;
      const nextUnconstrained = parseFloat(track.dataset.prevPercentage!) + percentage;
      const next = Math.max(Math.min(nextUnconstrained, 0), -100);

      track.dataset.percentage = String(next);

      track.animate(
        { transform: `translate(${next}%, -50%)` },
        { duration: 1200, fill: 'forwards' }
      );

      for (const img of Array.from(track.getElementsByClassName('image') as HTMLCollectionOf<HTMLImageElement>)) {
        img.animate(
          { objectPosition: `${100 + next}% center` },
          { duration: 1200, fill: 'forwards' }
        );
      }
    };

    // attach
    window.addEventListener('mousedown', handleOnDown);
    window.addEventListener('touchstart', handleOnDown);
    window.addEventListener('mouseup', handleOnUp);
    window.addEventListener('touchend', handleOnUp);
    window.addEventListener('mousemove', handleOnMove);
    window.addEventListener('touchmove', handleOnMove);

    return () => {
      window.removeEventListener('mousedown', handleOnDown);
      window.removeEventListener('touchstart', handleOnDown);
      window.removeEventListener('mouseup', handleOnUp);
      window.removeEventListener('touchend', handleOnUp);
      window.removeEventListener('mousemove', handleOnMove);
      window.removeEventListener('touchmove', handleOnMove);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="image-track absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[4vmin] user-select-none"
      data-mouse-down-at="0"
      data-prev-percentage="0"
      data-percentage="0"
    >
      {IMAGES.map((src) => (
        <img
          key={src}
          className="image w-[40vmin] h-[56vmin] object-cover object-[100%_center] rounded-lg"
          src={src}
          draggable="false"
        />
      ))}
    </div>
  );
}