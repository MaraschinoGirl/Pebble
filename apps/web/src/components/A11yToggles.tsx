// apps/web/src/components/A11yToggles.tsx (CLIENT COMPONENT)
'use client';

import { useEffect, useState } from 'react';

export default function A11yToggles() {
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.body.classList.toggle('reduce-motion', reduceMotion);
  }, [reduceMotion]);

  return (
    <div className="fixed bottom-4 left-4 z-50 space-x-3 text-xs">
      <button onClick={() => setHighContrast(v => !v)} className="underline">
        {highContrast ? 'Normal' : 'High Contrast'}
      </button>
      <button onClick={() => setReduceMotion(v => !v)} className="underline">
        {reduceMotion ? 'Motion On' : 'Motion Off'}
      </button>
    </div>
  );
}
