import { differenceInCalendarDays } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { DateRange, Range } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface CalendarProps {
  price: number;
  disabledDates: Date[];
  handleTotalPrice: Dispatch<SetStateAction<number>>;
  setState: Dispatch<SetStateAction<Range[]>>;
  state: Range[];
}

export default function Calendar({
  price,
  disabledDates,
  handleTotalPrice,
  state,
  setState,
}: CalendarProps) {
  return (
    <>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => {
          setState([item.selection]);

          //The two date will never be undefined but to make
          //typscript happy
          if (!item.selection.endDate || !item.selection.startDate) return;

          const days = differenceInCalendarDays(
            item.selection.endDate,
            item.selection.startDate
          );
          if (days) {
            handleTotalPrice((state) => state * days);
          } else {
            handleTotalPrice(price);
          }
        }}
        moveRangeOnFirstSelection={false}
        showDateDisplay={false}
        ranges={state}
        minDate={new Date()}
        disabledDates={disabledDates}
      />

      {/* <button onClick={handleReservation}>submit</button> */}
    </>
  );
}
