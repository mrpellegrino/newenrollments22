import React from 'react';
import { Alert as BaseAlert, AlertIcon, AlertProps } from '@chakra-ui/react';

const Alert: React.FC<AlertProps> = ({ children, ...rest }) => {
  return (
    <BaseAlert borderRadius="5px" {...rest}>
      <AlertIcon />
      {children}
    </BaseAlert>
  );
};

export default Alert;
