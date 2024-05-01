export const nextThreeMonths = () => {
  const nextDate = new Date().setMonth(new Date().getMonth() + 3);

  return new Date(nextDate).toISOString();
}