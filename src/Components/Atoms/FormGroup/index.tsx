import React from 'react';
import { VStack } from '@chakra-ui/react';

const FormGroup: React.FC = ({ children }) => {
  return (
    <VStack w="100%" spacing="10px">
      {children}
    </VStack>
  );
};

export default FormGroup;
