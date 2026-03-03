'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface OriginButtonProps {
  children: React.ReactNode;
  className?: string;
  hoverColor?: string;
  baseColor?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function OriginButton({
  children,
  className = '',
  hoverColor = '#cbcaff', // blue-600
  baseColor = '#fffdfd',
  onClick,
  type = 'button',
}: OriginButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function getRelativePosition(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  return (
    <button
  ref={ref}
  className={`relative overflow-hidden rounded-lg border transition-colors duration-200 ${className}`}
  style={{
    backgroundColor: baseColor,
    borderColor: hovered ? '#0c5fef' : '#9ca3af', // gray-400 : black
  }}
  type={type}
  onClick={onClick}
  onMouseEnter={(e) => {
    setCoords(getRelativePosition(e));
    setHovered(true);
  }}
  onMouseLeave={(e) => {
    setCoords(getRelativePosition(e));
    setHovered(false);
  }}
>

      {/* Hover Overlay */}
      <motion.span
        className="absolute rounded-full pointer-events-none"
        style={{
          backgroundColor: hoverColor,
          left: coords.x,
          top: coords.y,
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{
          width: hovered ? 600 : 0,
          height: hovered ? 600 : 0,
          opacity: hovered ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 180,
          damping: 20,
        }}
      />

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
