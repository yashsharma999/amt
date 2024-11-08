'use client';
import React, { useEffect, useState } from 'react';

export default function PulsatingElement() {
  const [pos, setPos] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const top = Math.floor(Math.random() * 100); // Random percentage for top
    const left = Math.floor(Math.random() * 100); // Random percentage for left

    setPos({ top, left });
  }, []);

  return (
    <div
      className={`pulsating-element z-10 `}
      style={{
        top: `${pos.top}%`,
        left: `${pos.left}%`,
      }}
    ></div>
  );
}
