const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function parseReservationDate(value: string): Date {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error("Please select valid dates.");
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error("Please select valid dates.");
  }

  return date;
}

export function getReservationNights(startDate: Date, endDate: Date): number {
  const nights = (endDate.getTime() - startDate.getTime()) / DAY_IN_MS;
  if (!Number.isInteger(nights) || nights < 1) {
    throw new Error("Please select at least one night.");
  }
  return nights;
}
