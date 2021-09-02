import React from 'react';
import { Container } from '@chakra-ui/react';

import EnrollmentForm from 'Components/Organisms/EnrollmentForm';

const Home: React.FC = () => {
  return (
    <Container w="100%" maxW="3xl" py="20px">
      <EnrollmentForm />
    </Container>
  );
};

export default Home;
