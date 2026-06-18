import { TZDate } from "@date-fns/tz";
import { addMinutes, addDays, setHours, setMinutes, setSeconds, setMilliseconds } from "date-fns";

export interface AccountScheduleConfig {
  timezone: string;
  sendWindowStart: number; // hour 0-23, inclusive
  sendWindowEnd: number;   // hour 0-23, exclusive
  sendIntervalMinutes: number;
  sendJitterMinutes: number;
}

/**
 * Returns the next UTC Date when a message should be sent for the given account.
 *
 * Pass `referenceTime` as the previously computed slot when scheduling multiple
 * messages in sequence — this spaces them correctly rather than all landing
 * at the same time.
 */
export function computeNextSlot(
  config: AccountScheduleConfig,
  referenceTime: Date = new Date()
): Date {
  const { timezone, sendWindowStart, sendWindowEnd, sendIntervalMinutes, sendJitterMinutes } = config;

  // Represent referenceTime in the account's local timezone.
  const local = new TZDate(referenceTime, timezone);
  const localHour = local.getHours();

  let candidate: TZDate;

  if (localHour < sendWindowStart) {
    // Before window: schedule at window open today
    candidate = new TZDate(
      setMilliseconds(setSeconds(setMinutes(setHours(local, sendWindowStart), 0), 0), 0),
      timezone
    );
  } else if (localHour >= sendWindowEnd) {
    // Past window: schedule at window open tomorrow
    const tomorrow = addDays(local, 1);
    candidate = new TZDate(
      setMilliseconds(setSeconds(setMinutes(setHours(tomorrow, sendWindowStart), 0), 0), 0),
      timezone
    );
  } else {
    // Within window: reference + interval + random jitter
    const jitter = Math.floor(Math.random() * (sendJitterMinutes + 1));
    const advanced = addMinutes(local, sendIntervalMinutes + jitter);
    const advancedLocal = new TZDate(advanced, timezone);
    const advancedHour = advancedLocal.getHours();

    if (advancedHour >= sendWindowEnd) {
      // Overshot end of window — push to tomorrow's opening
      const tomorrow = addDays(local, 1);
      candidate = new TZDate(
        setMilliseconds(setSeconds(setMinutes(setHours(tomorrow, sendWindowStart), 0), 0), 0),
        timezone
      );
    } else {
      candidate = new TZDate(advanced, timezone);
    }
  }

  // TZDate extends Date, so getTime() returns UTC milliseconds.
  return new Date(candidate.getTime());
}
