import { db } from '@/lib/db';
import type { StreakState } from '@/lib/types';

export const MAX_GRACE = 2;

const weekKey = (dayKey: string) => {
  const d = new Date(`${dayKey}T00:00:00Z`);
  const dow = d.getUTCDay(); // Sunday=0
  const sunday = new Date(d);
  sunday.setUTCDate(d.getUTCDate() - dow);
  return sunday.toISOString().slice(0, 10);
};

export async function updateStreakFor(habitId: string, dayKey: string, didHitToday: boolean) {
  const prev = await db.streaks.get(habitId);
  if (!prev) {
    const init: StreakState = {
      habitId,
      softStreak: didHitToday ? 1 : 0,
      graceBank: MAX_GRACE,
      lastComputedDay: dayKey
    };
    await db.streaks.put(init);
    return init;
  }

  let grace = prev.graceBank;
  let soft = prev.softStreak;

  // Refill grace at week boundary
  const prevWeek = weekKey(prev.lastComputedDay);
  const currWeek = weekKey(dayKey);
  if (prevWeek !== currWeek) {
    grace = MAX_GRACE;
  }

  if (didHitToday) {
    soft = soft + 1;
  } else {
    if (grace > 0) {
      grace = grace - 1;  // forgive one miss
    } else {
      soft = Math.max(0, soft - 1);
    }
  }

  const next: StreakState = {
    habitId,
    softStreak: soft,
    graceBank: grace,
    lastComputedDay: dayKey
  };
  await db.streaks.put(next);
  return next;
}
