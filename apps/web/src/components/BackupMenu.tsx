'use client';
import { db } from '@/lib/db';

export default function BackupMenu() {
  const exportAll = async () => {
    const [habits, entries, streaks] = await Promise.all([
      db.habits.toArray(), db.entries.toArray(), db.streaks.toArray()
    ]);
    const blob = new Blob([JSON.stringify({ habits, entries, streaks }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), {
      href: url,
      download: `pebble-backup-${Date.now()}.json`
    });
    a.click();
    URL.revokeObjectURL(url);
  };

  const importAll = async (file: File) => {
    const text = await file.text();
    const data = JSON.parse(text);
    await db.transaction('rw', db.habits, db.entries, db.streaks, async () => {
      await Promise.all([db.habits.clear(), db.entries.clear(), db.streaks.clear()]);
      if (data.habits) await db.habits.bulkPut(data.habits);
      if (data.entries) await db.entries.bulkPut(data.entries);
      if (data.streaks) await db.streaks.bulkPut(data.streaks);
    });
    alert('Import complete.');
  };

  return (
    <div className="flex gap-2">
      <button onClick={exportAll} className="rounded bg-neutral-800 px-3 py-2 text-sm">Export</button>
      <label className="rounded bg-neutral-800 px-3 py-2 text-sm cursor-pointer">
        Import
        <input
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && importAll(e.target.files[0])}
        />
      </label>
    </div>
  );
}
