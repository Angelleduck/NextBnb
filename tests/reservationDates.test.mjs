import assert from "node:assert/strict";
import test from "node:test";
import {
  getReservationNights,
  parseReservationDate,
} from "../lib/reservationDates.ts";

test("parses a calendar date as UTC regardless of the server timezone", () => {
  assert.equal(
    parseReservationDate("2026-11-12").toISOString(),
    "2026-11-12T00:00:00.000Z",
  );
});

test("rejects malformed and impossible calendar dates", () => {
  for (const date of ["2026-02-30", "2026-2-2", "2026-13-01", "invalid"]) {
    assert.throws(() => parseReservationDate(date), /valid dates/);
  }
});

test("charges the number of nights across month and daylight saving changes", () => {
  assert.equal(
    getReservationNights(
      parseReservationDate("2026-03-07"),
      parseReservationDate("2026-03-10"),
    ),
    3,
  );
});

test("rejects same-day and reversed stays", () => {
  const start = parseReservationDate("2026-11-12");
  assert.throws(() => getReservationNights(start, start), /at least one night/);
  assert.throws(
    () => getReservationNights(start, parseReservationDate("2026-11-11")),
    /at least one night/,
  );
});
