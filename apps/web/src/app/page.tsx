'use client';

import { useEffect, useMemo, useState } from 'react';
import { db } from '@/lib/db';
import type { Habit, Entry } from '@/lib/types';
import { todayKey } from '@/lib/date';

export default function Page() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [entries, setEntries] = useState<Record<string, Entry>>({});
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

  // Load today's entries
  useEffect(() => {
    (async () => {
      const todays = await db.entries.where('date').equals(today).toArray();
      const map: Record<string, Entry> = {};
      todays.forEach(e => (map[e.habitId] = e));
      setEntries(map);
    })();
  }, [today]);

  const toggleFloor = async (habitId: string) => {
    const existing = entries[habitId];
    if (existing) {
      const updated = { ...existing, floorDone: !existing.floorDone };
      await db.entries.put(updated);
      setEntries(prev => ({ ...prev, [habitId]: updated }));
    } else {
      const created: Entry = {
        id: crypto.randomUUID(),
        habitId,
        date: today,
        floorDone: true
      };
      await db.entries.add(created);
      setEntries(prev => ({ ...prev, [habitId]: created }));
    }
  };

  return (
    <main className="min-h-dvh bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-xl p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Pebble</h1>
          <p className="text-sm text-neutral-400">Tap a pebble to mark the floor action done.</p>
        </header>

        <section className="grid grid-cols-3 gap-4">
          {habits.map(h => {
            const done = entries[h.id]?.floorDone === true;
            return (
              <button
                key={h.id}
                onClick={() => toggleFloor(h.id)}
                className={[
                  'aspect-square rounded-2xl flex items-center justify-center text-center',
                  'transition-transform active:scale-95 outline-none focus:ring-2 focus:ring-indigo-400',
                  done ? 'bg-emerald-500/90 text-black' : 'bg-neutral-800'
                ].join(' ')}
                aria-pressed={done}
              >
                <span className="px-2 text-sm font-medium">{h.name}</span>
              </button>
            );
          })}
        </section>

        {habits.length === 0 && (
          <p className="mt-6 text-neutral-400">No habits yet. Seeding examples…</p>
        )}
      </div>
    </main>
  );
}
