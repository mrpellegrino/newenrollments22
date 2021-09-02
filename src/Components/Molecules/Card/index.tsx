import React from 'react';
import { StackProps, useColorModeValue, VStack } from '@chakra-ui/react';

const Card: React.FC<StackProps> = ({ children, ...rest }) => {
  const cardColor = useColorModeValue('white', 'gray.700');

  return (
    <VStack
      p="20px"
      backgroundColor={cardColor}
      boxShadow="0 4px 24px 0 rgb(34 41 47 / 10%)"
      borderRadius="7px"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      spacing="20px"
      {...rest}
    >
      {children}
    </VStack>
  );
};

export default Card;
