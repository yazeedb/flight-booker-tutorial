import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { PrimaryButton } from './PrimaryButton';
import { Flight } from './state';

export const getPrettyDate = (date: string) =>
  format(parseISO(date), 'M/d/yyyy');

interface ConfirmProps {
  open: boolean;
  flight: Flight;
  onClose: () => void;
}

export const Confirm = ({ open, flight, onClose }: ConfirmProps) => {
  const renderMessage = () => {
    if (flight.type === 'one-way') {
      return (
        <>
          You have booked a one-way flight for{' '}
          <b>{getPrettyDate(flight.startDate)}</b>.
        </>
      );
    }

    return (
      <>
        You have booked a two-way flight from{' '}
        <b>{getPrettyDate(flight.startDate)}</b> to{' '}
        <b>{getPrettyDate(flight.returnDate)}</b>.
      </>
    );
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Success!</ModalHeader>
        <ModalCloseButton />

        {/* Avoid rendering content until Modal opens.
        This guards against formatting invalid dates, because the
        form might not be valid yet. */}
        <ModalBody>{open && renderMessage()}</ModalBody>

        <ModalFooter>
          <PrimaryButton autoFocus onClick={onClose}>
            Ok
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const testIds = {
  dialog: 'success',
  successMessage: 'success-message'
};
