export function calculateWeeklyGrowth(weeklySales: {
  week: string;
  revenue: number;
}[]) {
  if (weeklySales.length < 2) return null;

  const sorted = [...weeklySales].sort(
    (a, b) => new Date(a.week).getTime() - new Date(b.week).getTime()
  );

  const last = sorted[sorted.length - 1].revenue;
  const previous = sorted[sorted.length - 2].revenue;

  if (previous === 0) return null;

  const percentage = ((last - previous) / previous) * 100;

  return percentage.toFixed(1);
}
