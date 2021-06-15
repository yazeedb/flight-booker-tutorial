import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import { Flight } from './state';

const prettyDateFormat = 'M/d/yyyy';

interface ConfirmProps {
  open: boolean;
  flight: Flight;
  onClose: () => void;
}

export const Confirm = ({ open, flight, onClose }: ConfirmProps) => {
  const renderMessage = () => {
    const date1 = format(parseISO(flight.startDate), prettyDateFormat);

    if (flight.type === 'one-way') {
      return (
        <>
          You have booked a one-way flight for <b>{date1}</b>.
        </>
      );
    }

    const date2 = format(parseISO(flight.returnDate), prettyDateFormat);

    return (
      <>
        You have booked a two-way flight from <b>{date1}</b> to <b>{date2}</b>.
      </>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      {/* Avoid rendering content until Dialog is open.
        This guards against formatting invalid dates, because the
        form might not be valid yet. */}
      {open && (
        <>
          <DialogTitle id="dialog-title">Success!</DialogTitle>

          <DialogContent>
            <DialogContentText id="dialog-description">
              {renderMessage()}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button color="primary" autoFocus onClick={onClose}>
              Ok
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
