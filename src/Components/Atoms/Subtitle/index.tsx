import React from 'react';
import { Heading } from '@chakra-ui/react';

const Subtitle: React.FC = ({ children }) => {
  return (
    <Heading as="h2" size="md">
      {children}
    </Heading>
  );
};

export default Subtitle;
