import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ScrollAnimationProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
  delay?: number;
  duration?: number;
  viewport?: {
    amount?: number | 'some' | 'all';
    margin?: string;
    once?: boolean;
  };
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  direction,
  className = '',
  delay = 0,
  duration = 0.7,
  viewport = { amount: 0.25, margin: '0px 0px -40px 0px', once: false },
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -60, y: 0, opacity: 0 };
      case 'right':
        return { x: 60, y: 0, opacity: 0 };
      case 'down':
        return { x: 0, y: -40, opacity: 0 };
      case 'up':
      default:
        return { x: 0, y: 40, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{
        amount: viewport.amount ?? 0.25,
        margin: viewport.margin ?? '0px',
        once: viewport.once ?? false,
      }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
