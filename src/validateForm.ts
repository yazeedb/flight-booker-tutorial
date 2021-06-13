import { isEqual, isBefore, isValid, parseISO } from 'date-fns';
import { State } from './state';

const isBeforeOrEqual = (date1: Date, date2: Date) =>
  isBefore(date1, date2) || isEqual(date1, date2);

interface ValidationResult {
  startDateValid: boolean;
  returnDateValid: boolean;
  dateOrderValid: boolean;
}

export const validateForm = ({
  startDate,
  returnDate,
  flightType
}: State): ValidationResult => {
  const sISO = parseISO(startDate);
  const rISO = parseISO(returnDate);

  if (flightType === 'one-way') {
    return {
      startDateValid: isValid(sISO),

      // We don't care about returnDate since
      // it's a one-way flight
      returnDateValid: true,
      dateOrderValid: true
    };
  }

  return {
    startDateValid: isValid(sISO),
    returnDateValid: isValid(rISO),
    dateOrderValid: isBeforeOrEqual(sISO, rISO)
  };
};
