import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export const CustomCursor: React.FC = () => {
  const { cursorState, reducedMotion, accent } = usePortfolio();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsClient(true);
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);

    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isClient || isTouchDevice || reducedMotion) {
    return null;
  }

  const hasLabel = Boolean(cursorState.text && cursorState.active);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer follow circle / capsule */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: hasLabel || cursorState.variant === 'hover' ? accent.hex : undefined,
        }}
        animate={{
          scale: hasLabel ? 1 : cursorState.variant === 'hover' ? 1.4 : 1,
          width: hasLabel ? 'auto' : cursorState.variant === 'hover' ? 44 : 32,
          height: hasLabel ? 'auto' : cursorState.variant === 'hover' ? 44 : 32,
          paddingLeft: hasLabel ? 14 : 0,
          paddingRight: hasLabel ? 14 : 0,
          paddingTop: hasLabel ? 6 : 0,
          paddingBottom: hasLabel ? 6 : 0,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 400 }}
        className={`fixed flex items-center justify-center rounded-full border transition-colors duration-200 ${
          hasLabel
            ? 'bg-[#18181b]/95 border-emerald-500/40 text-[#fafafa] shadow-xl backdrop-blur-md'
            : cursorState.variant === 'hover'
            ? 'border-emerald-400/80 bg-emerald-500/15 backdrop-blur-[1px]'
            : 'border-white/20 bg-white/5'
        }`}
      >
        {hasLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="whitespace-nowrap font-mono text-[10px] font-bold tracking-wider uppercase"
            style={{ color: accent.hex }}
          >
            {cursorState.text}
          </motion.span>
        )}
      </motion.div>

      {/* Inner precise dot */}
      {!hasLabel && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="fixed h-1.5 w-1.5 rounded-full bg-white transition-opacity duration-150"
        />
      )}
    </div>
  );
};
