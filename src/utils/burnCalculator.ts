// src/utils/burnCalculator.ts

type Activity = 'running' | 'cycling' | 'swimming';

interface BurnTimeResult {
  activity: Activity;
  minutes: number;
  label: string;
}

const MET_VALUES: Record<Activity, number> = {
  running: 9.8,
  cycling: 7.5,
  swimming: 8.0,
};

export function getBurnTimeForAllActivities(
  calories: number,
  weightKg = 70
): BurnTimeResult[] {
  const results: BurnTimeResult[] = [];

  for (const activity of Object.keys(MET_VALUES) as Activity[]) {
    const met = MET_VALUES[activity];
    const calsPerMinute = (met * weightKg * 3.5) / 200;
    const minutes = calories / calsPerMinute;
    results.push({
      activity,
      minutes: Math.round(minutes),
      label: `~${Math.round(minutes)} min of ${activity}`,
    });
  }

  return results;
}
