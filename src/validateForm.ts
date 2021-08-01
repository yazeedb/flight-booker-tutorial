import {
  isEqual,
  isBefore,
  isValid,
  parseISO,
  isFuture,
  isSameDay
} from 'date-fns';
import { Flight } from './state';

interface ValidationErrors {
  startDate?: string;
  returnDate?: string;
}

const isBeforeOrEqual = (date1: Date, date2: Date) =>
  isBefore(date1, date2) || isEqual(date1, date2);

/**
 * `date-fns.isPast` compares time, not just date.
 * So `1/1/1 @ 12am` is considered "past" `1/1/1 @ 12:01am`.
 * Flight Booker doesn't care about time, so this function ignores that.
 */
const isPast = (date: Date) => !isSameDay(date, new Date()) && !isFuture(date);

export const validateFlight = (flight: Flight): ValidationErrors => {
  const sISO = parseISO(flight.startDate);

  if (flight.type === 'one-way') {
    return {
      startDate: validateDate(sISO)
    };
  }

  const rISO = parseISO(flight.returnDate);
  const startDateValidation = validateDate(sISO);

  // If startDate is invalid, just show that error first.
  // Let user focus on one error at a time.
  if (startDateValidation) {
    return {
      startDate: startDateValidation
    };
  }

  return {
    startDate: startDateValidation,
    returnDate: validateDate(rISO) || validateRange(sISO, rISO)
  };
};

const validateDate = (date: Date) => {
  if (!isValid(date)) {
    return errorMessages.invalidDate;
  }

  if (isPast(date)) {
    return errorMessages.cannotBePast;
  }
};

const validateRange = (d1: Date, d2: Date) => {
  if (!isBeforeOrEqual(d1, d2)) {
    return errorMessages.datesOutOfOrder;
  }
};

export const errorMessages = {
  cannotBePast: 'Date cannot be in the past',
  invalidDate: 'Invalid date',
  datesOutOfOrder: 'Return date cannot be before start date'
};
