'use client';

import { useEffect, useRef, useState } from 'react';
import { db } from '@/lib/db';

type Props = {
  onAdded?: () => void; // parent can refresh list
};

export default function HabitEditor({ onAdded }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [floor, setFloor] = useState('');
  const [stretch, setStretch] = useState('');
  const [cue, setCue] = useState('');

  const fabRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus the first field when the modal opens
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => nameRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  // Basic focus trap + Esc to close while modal is open
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === 'Tab') {
        const root = dialogRef.current;
        if (!root) return;
        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (active === first || !root.contains(active)) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (active === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    // Prevent background scroll when open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const reset = () => {
    setName('');
    setFloor('');
    setStretch('');
    setCue('');
  };

  const close = () => {
    setOpen(false);
    reset();
    // restore focus to FAB for keyboard users
    setTimeout(() => fabRef.current?.focus(), 0);
  };

  const save = async () => {
    if (!name.trim() || !floor.trim()) return;
    const now = new Date().toISOString();
    await db.habits.add({
      id: crypto.randomUUID(),
      name: name.trim(),
      floor: floor.trim(),
      stretch: stretch.trim() || undefined,
      cue: cue.trim() || undefined,
      createdAt: now,
    });
    onAdded?.();
    close();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        ref={fabRef}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg outline-none ring-0 transition-transform active:scale-95 hover:bg-indigo-400 focus:ring-2 focus:ring-indigo-300"
        aria-label="Add habit"
      >
        + Add habit
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4"
          role="presentation"
          onClick={(e) => {
            // click on the backdrop closes
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="habit-editor-title"
            aria-describedby="habit-editor-desc"
            className="w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl bg-neutral-900 text-neutral-100 shadow-xl"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
              <h2 id="habit-editor-title" className="text-lg font-semibold">
                New habit
              </h2>
              <button
                onClick={close}
                className="rounded-md px-2 py-1 text-neutral-300 hover:text-white outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              <p id="habit-editor-desc" className="sr-only">
                Add a new habit with a tiny “floor” action. Optional fields for a stretch and an If–Then cue.
              </p>

              <div>
                <label className="block text-sm text-neutral-300 mb-1">Name *</label>
                <input
                  ref={nameRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Take meds"
                  className="w-full rounded-lg bg-neutral-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-300 mb-1">
                  Floor action (smallest step) *
                </label>
                <input
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  placeholder="Swallow meds with water"
                  className="w-full rounded-lg bg-neutral-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <p className="mt-1 text-xs text-neutral-400">
                  Keep it 30–60 seconds to reduce activation energy.
                </p>
              </div>

              <div>
                <label className="block text-sm text-neutral-300 mb-1">Stretch (optional)</label>
                <input
                  value={stretch}
                  onChange={(e) => setStretch(e.target.value)}
                  placeholder="Also prep tomorrow’s dose"
                  className="w-full rounded-lg bg-neutral-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-300 mb-1">If–Then cue (optional)</label>
                <input
                  value={cue}
                  onChange={(e) => setCue(e.target.value)}
                  placeholder="If it’s 09:00 at my desk, then take meds"
                  className="w-full rounded-lg bg-neutral-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <p className="mt-1 text-xs text-neutral-400">
                  Implementation intentions can improve follow-through.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-neutral-800">
              <button
                onClick={close}
                className="rounded-lg px-3 py-2 text-sm text-neutral-300 hover:text-white outline-none focus:ring-2 focus:ring-neutral-500"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={!name.trim() || !floor.trim()}
                className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-black disabled:opacity-50 outline-none focus:ring-2 focus:ring-emerald-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
