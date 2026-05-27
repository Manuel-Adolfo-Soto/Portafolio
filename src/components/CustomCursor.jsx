import { useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorX = useSpring(0, { stiffness: 200, damping: 20 });
  const cursorY = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select')) {
        setHovering(true);
      }
    };

    const out = () => setHovering(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, [isTouch, visible]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-cyan-400"
          animate={{
            width: hovering ? 8 : 4,
            height: hovering ? 8 : 4,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
          style={{
            boxShadow: '0 0 6px rgba(6,182,212,0.8), 0 0 12px rgba(6,182,212,0.4)',
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border"
          animate={{
            width: hovering ? 48 : 32,
            height: hovering ? 48 : 32,
            opacity: visible ? 0.6 : 0,
            borderColor: hovering ? 'rgba(6,182,212,0.6)' : 'rgba(6,182,212,0.3)',
          }}
          transition={{ duration: 0.2 }}
          style={{
            borderWidth: '1.5px',
            boxShadow: hovering
              ? '0 0 20px rgba(6,182,212,0.2), inset 0 0 20px rgba(6,182,212,0.05)'
              : '0 0 10px rgba(6,182,212,0.1)',
          }}
        />
      </motion.div>
    </>
  );
}
