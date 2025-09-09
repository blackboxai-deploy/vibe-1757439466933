"use client";

import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  decimals?: number;
}

export function AnimatedCounter({ target, duration = 2000, decimals = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = target * easeOutCubic;
      
      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration]);

  const formatNumber = (value: number) => {
    if (decimals === 0) {
      return Math.floor(value).toLocaleString();
    }
    return value.toFixed(decimals);
  };

  return <span>{formatNumber(count)}</span>;
}