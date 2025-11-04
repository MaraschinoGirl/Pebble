'use client';
import { useEffect, useRef } from 'react';

export function useLongPress(callback: () => void, ms = 400) {
  const timer = useRef<number | null>(null);

  const onPointerDown = () => {
    timer.current = window.setTimeout(() => callback(), ms);
  };
  const clear = () => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => clear, []);

  return {
    onPointerDown,
    onPointerUp: clear,
    onPointerLeave: clear
  };
}
