import React from 'react';
import { Container } from '@chakra-ui/react';

import SuccessAlert from 'Components/Organisms/SuccessAlert';

const Success: React.FC = () => {
  return (
    <Container w="100%" maxW="3xl" py="20px">
      <SuccessAlert />
    </Container>
  );
};

export default Success;
