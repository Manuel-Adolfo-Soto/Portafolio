import { useState, useEffect } from 'react';

export default function Spotlight() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const move = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(6,182,212,0.06), transparent 40%)`,
      }}
    />
  );
}
