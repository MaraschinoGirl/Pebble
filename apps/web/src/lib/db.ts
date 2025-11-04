'use client';

import Dexie, { Table } from 'dexie';
import type { Habit, Entry, StreakState } from '@/lib/types';

/**
 * PebbleDB
 * v1: habits, entries
 * v2: +streaks (primary key = habitId)
 */
class PebbleDB extends Dexie {
  habits!: Table<Habit, string>;
  entries!: Table<Entry, string>;
  streaks!: Table<StreakState, string>;

  constructor() {
    super('pebble-db');

    // Original schema (already on users’ browsers)
    this.version(1).stores({
      habits: 'id,createdAt,archivedAt',
      entries: 'id,habitId,date'
    });

    // Schema upgrade: add streaks
    this.version(2).stores({
      habits: 'id,createdAt,archivedAt',
      entries: 'id,habitId,date',
      streaks: 'habitId' // primary key; one streak row per habit
    });
  }
}

export const db = new PebbleDB();
