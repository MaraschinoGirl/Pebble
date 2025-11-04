'use client';

import { useEffect, useMemo, useState } from 'react';
import { db } from '@/lib/db';
import type { Habit, Entry, StreakState } from '@/lib/types';
import { todayKey } from '@/lib/date';
import HabitEditor from '@/components/HabitEditor';
import { updateStreakFor } from '@/lib/streak';
import { useLongPress } from '@/components/useLongPress';
import BackupMenu from '@/components/BackupMenu';

export default function Page() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [entries, setEntries] = useState<Record<string, Entry>>({});
  const [streaks, setStreaks] = useState<Record<string, StreakState>>({});
  const today = useMemo(() => todayKey(), []);

  // Seed 2 habits on first run if empty
  useEffect(() => {
    (async () => {
      const count = await db.habits.count();
      if (count === 0) {
        const now = new Date().toISOString();
        await db.habits.bulkAdd([
          { id: crypto.randomUUID(), name: 'Take meds', floor: 'Swallow meds with water', createdAt: now },
          { id: crypto.randomUUID(), name: 'Drink water', floor: 'One full glass', createdAt: now }
        ]);
      }
      const all = await db.habits.toArray();
      setHabits(all);
    })();
  }, []);

  // Load today's entries + streaks
  useEffect(() => {
    (async () => {
      const todays = await db.entries.where('date').equals(today).toArray();
      const map: Record<string, Entry> = {};
      todays.forEach(e => (map[e.habitId] = e));
      setEntries(map);

      const s = await db.streaks.toArray();
      setStreaks(Object.fromEntries(s.map(x => [x.habitId, x])));
    })();
  }, [today]);

  const toggleFloor = async (habitId: string) => {
    const existing = entries[habitId];
    let next: Entry;
    if (existing) {
      next = { ...existing, floorDone: !existing.floorDone };
      await db.entries.put(next);
    } else {
      next = { id: crypto.randomUUID(), habitId, date: today, floorDone: true };
      await db.entries.add(next);
    }
    setEntries(prev => ({ ...prev, [habitId]: next }));

    // update streaks based on floorDone
    const s = await updateStreakFor(habitId, today, next.floorDone === true);
    setStreaks(prev => ({ ...prev, [habitId]: s }));
  };

  const toggleStretch = async (habitId: string) => {
    const existing = entries[habitId];
    if (!existing) {
      const created: Entry = { id: crypto.randomUUID(), habitId, date: today, floorDone: false, stretchDone: true };
      await db.entries.add(created);
      setEntries(prev => ({ ...prev, [habitId]: created }));
      // no streak change for “stretch only”
      return;
    }
    const updated = { ...existing, stretchDone: !existing.stretchDone };
    await db.entries.put(updated);
    setEntries(prev => ({ ...prev, [habitId]: updated }));
  };

  return (
    <main className="min-h-dvh bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-xl p-6">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Pebble</h1>
            <p className="text-sm text-neutral-400">Tap = floor. Long-press = stretch.</p>
          </div>
          <BackupMenu />
        </header>

        <section className="grid grid-cols-3 gap-4">
          {habits.map(h => {
            const e = entries[h.id];
            const done = e?.floorDone === true;
            const stretched = e?.stretchDone === true;
            const s = streaks[h.id]?.softStreak ?? 0;

            const longPress = useLongPress(() => toggleStretch(h.id), 400);

            return (
              <button
                key={h.id}
                onClick={() => toggleFloor(h.id)}
                {...longPress}
                className={[
                  'relative aspect-square rounded-2xl flex items-center justify-center text-center',
                  'transition-transform active:scale-95 outline-none focus:ring-2 focus:ring-indigo-400',
                  done ? 'bg-emerald-500/90 text-black' : 'bg-neutral-800'
                ].join(' ')}
                aria-pressed={done}
                aria-label={`${h.name} ${done ? 'done' : 'not done'}`}
              >
                <span className="px-2 text-sm font-medium">{h.name}</span>

                {/* tiny streak bar (width scales up to 100% at 10) */}
                <span className="pointer-events-none absolute left-2 right-2 bottom-1 h-1 bg-white/10 rounded">
                  <span
                    className="absolute left-0 top-0 bottom-0 bg-white/60 rounded"
                    style={{ width: `${Math.min(100, (s / 10) * 100)}%` }}
                    aria-hidden
                  />
                </span>

                {/* stretch badge */}
                {stretched && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-300" aria-hidden />
                )}
              </button>
            );
          })}
        </section>

        {habits.length === 0 && (
          <p className="mt-6 text-neutral-400">No habits yet. Seeding examples…</p>
        )}
      </div>

      {/* Add-habit floating button + modal */}
      <HabitEditor
        onAdded={async () => {
          const all = await db.habits.toArray();
          setHabits(all);
        }}
      />
    </main>
  );
}
