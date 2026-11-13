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
  duration = 0.72,
  viewport = { amount: 0.14, margin: '0px 0px -32px 0px', once: true },
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -48, y: 0, opacity: 0, filter: 'blur(4px)' };
      case 'right':
        return { x: 48, y: 0, opacity: 0, filter: 'blur(4px)' };
      case 'down':
        return { x: 0, y: -32, opacity: 0, filter: 'blur(4px)' };
      case 'up':
      default:
        return { x: 0, y: 32, opacity: 0, filter: 'blur(4px)' };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ x: 0, y: 0, opacity: 1, filter: 'blur(0px)' }}
      viewport={{
        amount: viewport.amount ?? 0.14,
        margin: viewport.margin ?? '0px 0px -32px 0px',
        once: viewport.once ?? true,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
