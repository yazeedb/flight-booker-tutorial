import { format } from 'date-fns';
import { validateFlight } from './validateForm';

export type FlightType = 'one-way' | 'return';

export interface State {
  formStatus: 'editing' | 'submitted';
  flight: Flight;
}

type Action =
  | { type: 'SET_FLIGHT_TYPE'; payload: FlightType }
  | { type: 'SET_START_DATE'; payload: string }
  | { type: 'SET_RETURN_DATE'; payload: string }
  | { type: 'SUBMIT' }
  | { type: 'CLOSE_CONFIRMATION' };

export type Flight =
  | { type: 'one-way'; startDate: string }
  | { type: 'return'; startDate: string; returnDate: string };

// Exported for use in integration tests
export const today = format(new Date(), 'yyyy-MM-dd');

export const initialState: State = {
  formStatus: 'editing',
  flight: {
    type: 'one-way',
    startDate: today
  }
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FLIGHT_TYPE':
      if (action.payload === 'one-way') {
        return {
          ...state,
          flight: {
            type: 'one-way',
            startDate: state.flight.startDate
          }
        };
      }

      return {
        ...state,
        flight: {
          type: 'return',
          startDate: state.flight.startDate,
          returnDate: state.flight.startDate
        }
      };

    case 'SET_START_DATE':
      return {
        ...state,
        flight: {
          ...state.flight,
          startDate: action.payload
        }
      };

    case 'SET_RETURN_DATE': {
      if (state.flight.type === 'one-way') {
        return state;
      }

      return {
        ...state,
        flight: {
          ...state.flight,
          returnDate: action.payload
        }
      };
    }

    case 'SUBMIT': {
      const validationErrors = validateFlight(state.flight);

      if (!!validationErrors.startDate || !!validationErrors.returnDate) {
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
