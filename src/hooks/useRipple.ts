"use client";

import { useCallback, useState, type PointerEvent as ReactPointerEvent } from "react";

export type RippleWave = {
  id: number;
  x: number;
  y: number;
  size: number;
};

type UseRippleOptions = {
  enabled?: boolean;
  disabled?: boolean;
};

export function useRipple({ enabled = true, disabled = false }: UseRippleOptions = {}) {
  const [waves, setWaves] = useState<RippleWave[]>([]);

  const removeWave = useCallback((id: number) => {
    setWaves((prev) => prev.filter((wave) => wave.id !== id));
  }, []);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!enabled || disabled || event.defaultPrevented) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      const id = event.timeStamp;

      setWaves((prev) => [...prev, { id, x, y, size }]);
    },
    [enabled, disabled],
  );

  return { waves, handlePointerDown, removeWave };
}
