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
  const { startDateValid, returnDateValid, dateOrderValid } =
    validateForm(state);

  const formIsValid = startDateValid && returnDateValid && dateOrderValid;

  return (
    <main className={classes.main}>
      <h1>Flight Booker</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!formIsValid) {
            return;
          }

          dispatch({ type: 'SUBMIT' });
        }}
      >
        <FormControl className={classes.formControl}>
          <InputLabel id={ids.flightType}>Flight type</InputLabel>
          <Select
            labelId={ids.flightType}
            value={state.flightType}
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
            value={state.startDate}
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

        <FormControl className={classes.formControl} error={!returnDateValid}>
          <TextField
            id={ids.returnDate}
            type="date"
            label="Return date"
            value={state.returnDate}
            disabled={state.flightType === 'one-way'}
            onChange={(e) => {
              dispatch({
                type: 'SET_RETURN_DATE',
                payload: e.target.value
              });
            }}
          />

          {!returnDateValid && <FormHelperText>Invalid date</FormHelperText>}
        </FormControl>

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

/*
  Bonus upgrades
    1. Use @material-ui/pickers instead of native date input
*/
