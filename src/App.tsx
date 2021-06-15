/*
  Notes:

  1. Start/return dates cannot be in the past
  2. Hide Return date if one-way flight (also make sure it's impossible to change return date if one-way flight)
  3. TS stopped me from a redundant conditional (disabled={state.flightType === 'one-way'})
    This is a good thing to show during screencast.

  4. Talk about why you should store min possible state, and derive
  as much as possible.

  5. See how existing form libs handle validation

  6. Consider putting dateOrder error under returnDate 

  7. Consider using something like FormField interface for
  form validation. Also consider storing field label and ID (colocation).

  8. Consider using a decoder to guarantee against rogue form elements (select option)

  9. Consider making SET_FLIGHT_TYPE.payload a string, and parse
  it into a flightType. This'll eliminate the need for type-casting
  in the onChange.

  ✅ 10. Make it impossible for one-way flight and returnDate to
  be together.

  ✅ 11. returnDate should be initialized to startDate when user
  picks two-way flight.

  Bonus upgrades
    1. Use @material-ui/pickers instead of native date input
    2. Immer for cleaner reducer updates
*/

import {
  Select,
  MenuItem,
  InputLabel,
  makeStyles,
  FormControl,
  Button,
  TextField,
  FormHelperText
} from '@material-ui/core';
import { useReducer } from 'react';
import { Confirm } from './Confirm';
import { FlightType, initialState, reducer } from './state';
import { validateForm } from './validateForm';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),

    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 120,
    display: 'block'
  }
}));

export const App = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { startDateValid, returnDateValid, dateOrderValid } = validateForm(
    state.flight
  );

  const formIsValid = startDateValid && returnDateValid && dateOrderValid;

  return (
    <main className={classes.main}>
      <header>
        <h1>Flight Booker</h1>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          dispatch({ type: 'SUBMIT' });
        }}
      >
        <FormControl className={classes.formControl}>
          <InputLabel id={ids.flightType}>Flight type</InputLabel>
          <Select
            labelId={ids.flightType}
            value={state.flight.type}
            autoFocus
            onChange={(e) => {
              const value = e.target.value as FlightType;

              dispatch({ type: 'SET_FLIGHT_TYPE', payload: value });
            }}
          >
            {optionLabels.map((o) => (
              <MenuItem value={o.value} key={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          className={classes.formControl}
          error={!startDateValid || !dateOrderValid}
        >
          <TextField
            id={ids.startDate}
            type="date"
            label="Start date"
            value={state.flight.startDate}
            onChange={(e) => {
              dispatch({
                type: 'SET_START_DATE',
                payload: e.target.value
              });
            }}
          />

          {!startDateValid && <FormHelperText>Invalid date</FormHelperText>}

          {!dateOrderValid && (
            <FormHelperText>
              Start date cannot be after return date
            </FormHelperText>
          )}
        </FormControl>

        {state.flight.type === 'return' && (
          <FormControl className={classes.formControl} error={!returnDateValid}>
            <TextField
              id={ids.returnDate}
              type="date"
              label="Return date"
              value={state.flight.returnDate}
              onChange={(e) => {
                dispatch({
                  type: 'SET_RETURN_DATE',
                  payload: e.target.value
                });
              }}
            />

            {!returnDateValid && <FormHelperText>Invalid date</FormHelperText>}
          </FormControl>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formIsValid}
        >
          Book flight
        </Button>
      </form>

      <Confirm
        {...state}
        open={state.formStatus === 'submitted'}
        onClose={() => dispatch({ type: 'CLOSE_CONFIRMATION' })}
      />
    </main>
  );
};

const ids = {
  flightType: 'flight-type',
  startDate: 'start-date',
  returnDate: 'return-date'
};
interface OptionLabel {
  label: string;
  value: FlightType;
}

const optionLabels: OptionLabel[] = [
  { label: 'One way flight', value: 'one-way' },
  { label: 'Return flight', value: 'return' }
];
