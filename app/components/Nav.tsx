'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import SplitType from 'split-type';
import gsap from 'gsap';
import styles from './Nav.module.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.75,
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function Nav() {
  useEffect(() => {
    const split = new SplitType(`.${styles.navItem} a`, { types: 'chars' });

    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.03,
      duration: 0.5,
      ease: 'power2.out',
    });

    return () => {
      split.revert();
    };
  }, []);

  return (
    <motion.div
      className={styles.navContent}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.ul className={styles.navList}>
        {['About', 'Experience', 'Projects', 'Interests', 'Contact'].map((label, i) => (
          <motion.li key={i} variants={itemVariants} className={styles.navItem}>
              <a
  href={`#${label.toLowerCase()}`}
  data-text={label}
  onClick={() => {
    // Unlock scroll immediately after click
    document.body.classList.remove('lock-scroll');
    window.dispatchEvent(new Event('scroll')); // refresh scroll for Lenis
  }}
>
  {label}
</a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}