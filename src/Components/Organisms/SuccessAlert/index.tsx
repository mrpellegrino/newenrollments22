import React from 'react';
import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/react';
import Card from 'Components/Molecules/Card';

const SuccessAlert: React.FC = () => {
  return (
    <Card>
      <Alert status="success">
        <AlertIcon />
        <AlertDescription>Matrícula enviada com sucesso!</AlertDescription>
      </Alert>
    </Card>
  );
};

export default SuccessAlert;
