export type ISODate = string;

export type Habit = {
  id: string;
  name: string;
  floor: string;
  stretch?: string;
  cue?: string;
  color?: string;
  createdAt: ISODate;
  archivedAt?: ISODate;
};

export type Entry = {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  floorDone: boolean;
  stretchDone?: boolean;
  note?: string;
};
