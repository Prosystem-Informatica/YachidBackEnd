import { DateTime } from "luxon";

export function nowUTC(): DateTime {
  return DateTime.utc();
}

export function parseISO(date: string): DateTime {
  return DateTime.fromISO(date, { zone: "utc" });
}

export function diffInDays(start: DateTime, end: DateTime): number {
  return end.diff(start, "days").days;
}

export function formatDateZ(date: DateTime): string {
  return date.toUTC().toISO() ?? "";
}
