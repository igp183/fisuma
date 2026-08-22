/**
 * Parse an ISO datetime as wall-clock time, ignoring its timezone offset.
 *
 * A class scheduled for 18:15 should show as 18:15 for every viewer, so we take
 * the time exactly as written in the calendar rather than converting it to the
 * browser's timezone (which would shift it by the local UTC offset).
 */
export function wallClockDate(iso: string): Date {
  const [datePart, timePart = "00:00:00"] = iso.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [h, min] = timePart.split(":").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1, h ?? 0, min ?? 0);
}
