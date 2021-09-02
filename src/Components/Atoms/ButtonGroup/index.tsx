import React from 'react';
import { Stack } from '@chakra-ui/react';

const ButtonGroup: React.FC = ({ children }) => {
  return (
    <Stack
      w="100%"
      mt="10px"
      spacing="10px"
      alignItems="center"
      justifyContent="center"
      direction={['column', 'row']}
    >
      {children}
    </Stack>
  );
};

export default ButtonGroup;
