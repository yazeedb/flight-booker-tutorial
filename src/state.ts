import { format } from 'date-fns';
import { validateForm } from './validateForm';

export type FlightType = 'one-way' | 'return';

export interface State {
  formStatus: 'editing' | 'submitted';
  flightType: FlightType;
  startDate: string;
  returnDate: string;
}

type Action =
  | { type: 'SET_FLIGHT_TYPE'; payload: FlightType }
  | { type: 'SET_START_DATE'; payload: string }
  | { type: 'SET_RETURN_DATE'; payload: string }
  | { type: 'SUBMIT' }
  | { type: 'CLOSE_CONFIRMATION' };

const inputDateFormat = 'yyyy-MM-dd';

export const initialState: State = {
  formStatus: 'editing',
  flightType: 'one-way',
  startDate: format(new Date(), inputDateFormat),
  returnDate: format(new Date(), inputDateFormat)
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FLIGHT_TYPE':
      return {
        ...state,
        flightType: action.payload
      };

    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.payload
      };

    case 'SET_RETURN_DATE':
      // User cannot set returnDate if they're
      // booking a one-way flight
      if (state.flightType === 'one-way') {
        return state;
      }

      return {
        ...state,
        returnDate: action.payload
      };

    case 'SUBMIT': {
      const { startDateValid, returnDateValid, dateOrderValid } =
        validateForm(state);

      const formIsValid = startDateValid && returnDateValid && dateOrderValid;

      // Disabled buttons are nice, but we should
      // make it LOGICALLY IMPOSSIBLE to submit
      // an invalid form.
      if (!formIsValid) {
        return state;
      }

      return {
        ...state,
        formStatus: 'submitted'
      };
    }

    case 'CLOSE_CONFIRMATION':
      return {
        ...state,
        formStatus: 'editing'
      };
  }
};
