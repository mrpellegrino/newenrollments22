import React from 'react';
import { HStack } from '@chakra-ui/react';

const InputGroup: React.FC = ({ children }) => {
  return (
    <HStack w="100%" spacing="10px">
      {children}
    </HStack>
  );
};

export default InputGroup;
