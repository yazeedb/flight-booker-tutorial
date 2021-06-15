import {
  isEqual,
  isBefore,
  isValid,
  parseISO,
  isFuture,
  isSameDay
} from 'date-fns';
import { Flight, ValidationErrors } from './state';

const isBeforeOrEqual = (date1: Date, date2: Date) =>
  isBefore(date1, date2) || isEqual(date1, date2);

const isPast = (date: Date) => !isSameDay(date, new Date()) && !isFuture(date);

export const validateFlight = (flight: Flight): ValidationErrors => {
  const sISO = parseISO(flight.startDate);

  if (flight.type === 'one-way') {
    return {
      startDate: validateDate(sISO)
    };
  }

  const rISO = parseISO(flight.returnDate);

  return {
    startDate: validateDate(sISO),
    returnDate: validateDate(rISO) || validateRange(sISO, rISO)
  };
};

const validateDate = (date: Date) => {
  if (!isValid(date)) {
    return 'Invalid date';
  }

  if (isPast(date)) {
    return 'Date cannot be in the past';
  }
};

const validateRange = (d1: Date, d2: Date) => {
  if (!isBeforeOrEqual(d1, d2)) {
    return 'Return date cannot be before start date';
  }
};
