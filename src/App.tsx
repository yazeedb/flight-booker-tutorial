/*
  Notes:

  ✅ 1. Start/return dates cannot be in the past
  ✅ 2. Hide Return date if one-way flight (also make sure it's impossible to change return date if one-way flight)

  8. Consider using a decoder to guarantee against rogue form elements (select option)

  9. Consider making SET_FLIGHT_TYPE.payload a string, and parse
  it into a flightType. This'll eliminate the need for type-casting
  in the onChange.

  ✅ 10. Make it impossible for one-way flight and returnDate to
  be together.

  ✅ 11. returnDate should be initialized to startDate when user
  picks two-way flight.


  ===============================================================================
  3. TS stopped me from a redundant conditional (disabled={state.flightType === 'one-way'})
    This is a good thing to show during screencast.

  4. Talk about why you should store min possible state, and derive
  as much as possible.


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
  const [{ flight, formStatus, validationErrors }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const formIsValid =
    !validationErrors.startDate && !validationErrors.returnDate;

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
            value={flight.type}
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
          error={!!validationErrors.startDate}
        >
          <TextField
            id={ids.startDate}
            type="date"
            label="Start date"
            value={flight.startDate}
            onChange={(e) => {
              dispatch({
                type: 'SET_START_DATE',
                payload: e.target.value
              });
            }}
          />

          <FormHelperText>{validationErrors.startDate}</FormHelperText>
        </FormControl>

        {flight.type === 'return' && (
          <FormControl
            className={classes.formControl}
            error={!!validationErrors.returnDate}
          >
            <TextField
              id={ids.returnDate}
              type="date"
              label="Return date"
              value={flight.returnDate}
              onChange={(e) => {
                dispatch({
                  type: 'SET_RETURN_DATE',
                  payload: e.target.value
                });
              }}
            />

            <FormHelperText>{validationErrors.returnDate}</FormHelperText>
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
        flight={flight}
        open={formStatus === 'submitted'}
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
