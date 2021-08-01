import { Button, ButtonProps } from '@chakra-ui/react';

export const PrimaryButton = (props: ButtonProps) => (
  <Button
    color="white"
    backgroundColor="brand.blue"
    fontWeight="bold"
    {...props}
  />
);
