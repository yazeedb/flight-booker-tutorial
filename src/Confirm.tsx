import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import { State } from './state';

const prettyDateFormat = 'M/d/yyyy';

interface ConfirmProps extends State {
  open: boolean;
  onClose: () => void;
}

export const Confirm = ({
  open,
  flightType,
  startDate,
  returnDate,
  onClose
}: ConfirmProps) => {
  const renderMessage = () => {
    const date1 = format(parseISO(startDate), prettyDateFormat);

    if (flightType === 'one-way') {
      return `You have booked a one-way flight for ${date1}.`;
    } else {
      const date2 = format(parseISO(returnDate), prettyDateFormat);

      return `You have booked a two-way flight from ${date1} to ${date2}.`;
    }
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
