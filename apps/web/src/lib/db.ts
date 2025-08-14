'use client';

import Dexie, { Table } from 'dexie';
import type { Habit, Entry } from './types';

class PebbleDB extends Dexie {
  habits!: Table<Habit, string>;
  entries!: Table<Entry, string>;

  constructor() {
    super('pebble-db');
    this.version(1).stores({
      habits: 'id,createdAt,archivedAt',
      entries: 'id,habitId,date'
    });
  }
}

export const db = new PebbleDB();
