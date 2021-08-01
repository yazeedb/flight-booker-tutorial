import {
  Select,
  Heading,
  FormLabel,
  FormControl,
  Input,
  Flex,
  Box,
  FormErrorMessage
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { useReducer } from 'react';
import { Confirm } from './Confirm';
import { FlightType, initialState, reducer } from './state';
import { validateFlight } from './validateForm';
import { PrimaryButton } from './PrimaryButton';

export const App = () => {
  const [{ flight, formStatus }, dispatch] = useReducer(reducer, initialState);

  const validationErrors = validateFlight(flight);

  const formIsValid =
    !validationErrors.startDate && !validationErrors.returnDate;

  return (
    <>
      <Flex
        as="header"
        alignItems="center"
        color="brand.gray"
        backgroundColor="white"
        borderBottom="3px solid"
        borderBottomColor="brand.shadow"
        borderTop="6px solid"
        borderTopColor="brand.blue"
        paddingX={4}
        paddingY={2}
        marginBottom={2}
      >
        <CalendarIcon marginRight={3} width={5} height={5} />
        <Heading as="h1" fontSize="xx-large">
          Flight Booker
        </Heading>
      </Flex>

      <Box as="main" paddingX={4} paddingY={2} maxWidth={600}>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            dispatch({ type: 'SUBMIT' });
          }}
        >
          <FormControl marginBottom={4}>
            <FormLabel id={formMetadata.flightType.id}>
              {formMetadata.flightType.label}
            </FormLabel>
            <Select
              value={flight.type}
              autoFocus
              onChange={(e) => {
                const value = e.target.value as FlightType;

                dispatch({ type: 'SET_FLIGHT_TYPE', payload: value });
              }}
            >
              {options.map((o) => (
                <option value={o.value} key={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl
            marginBottom={4}
            isInvalid={!!validationErrors.startDate}
          >
            <FormLabel id={formMetadata.startDate.id}>
              {formMetadata.startDate.label}
            </FormLabel>
            <Input
              id={formMetadata.startDate.id}
              type="date"
              value={flight.startDate}
              onChange={(e) => {
                dispatch({
                  type: 'SET_START_DATE',
                  payload: e.target.value
                });
              }}
            />

            <FormErrorMessage>{validationErrors.startDate}</FormErrorMessage>
          </FormControl>

          {flight.type === 'return' && (
            <FormControl
              marginBottom={4}
              isInvalid={!!validationErrors.returnDate}
            >
              <FormLabel id={formMetadata.returnDate.id}>
                {formMetadata.returnDate.label}
              </FormLabel>

              <Input
                id={formMetadata.returnDate.id}
                type="date"
                value={flight.returnDate}
                onChange={(e) => {
                  dispatch({
                    type: 'SET_RETURN_DATE',
                    payload: e.target.value
                  });
                }}
              />

              <FormErrorMessage>{validationErrors.returnDate}</FormErrorMessage>
            </FormControl>
          )}

          <PrimaryButton type="submit" isDisabled={!formIsValid}>
            {formMetadata.submit.label}
          </PrimaryButton>

          <Confirm
            flight={flight}
            open={formStatus === 'submitted'}
            onClose={() => dispatch({ type: 'CLOSE_CONFIRMATION' })}
          />
        </form>
      </Box>
    </>
  );
};

export const formMetadata = {
  flightType: {
    label: 'Flight type',
    id: 'flight-type'
  },
  startDate: {
    label: 'Start date',
    id: 'start-date'
  },
  returnDate: {
    label: 'Return date',
    id: 'return-date'
  },
  submit: {
    label: 'Book Flight',
    testId: 'submit'
  }
};

interface OptionLabel {
  label: string;
  value: FlightType;
}

export const options: OptionLabel[] = [
  { label: 'One way flight', value: 'one-way' },
  { label: 'Return flight', value: 'return' }
];
