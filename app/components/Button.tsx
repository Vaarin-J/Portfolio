'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

export default function Button({
  isActive,
  toggleMenu,
}: {
  isActive: boolean;
  toggleMenu(): void;
}) {
  const btnRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={btnRef} className={styles.button}>
      <motion.div
        className={styles.slider}
        animate={{ top: isActive ? '-100%' : '0%' }}
        transition={{ duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className={styles.el}
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleMenu();
          }}
        >
          <PerspectiveText label="Menu" />
        </div>
        <div
          className={styles.el}
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleMenu();
          }}
        >
          <PerspectiveText label="Close" />
        </div>
      </motion.div>
    </div>
  );
}

function PerspectiveText({ label }: { label: string }) {
  return (
    <div className={styles.perspectiveText}>
      <p>{label}</p>
      <p>{label}</p>
    </div>
  );
}