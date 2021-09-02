import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';

interface IProps extends LinkProps {
  to: string;
}

const NavLink: React.FC<IProps> = ({ to, children, ...rest }) => {
  return (
    <ChakraLink as={RouterLink} to={to} {...rest}>
      {children}
    </ChakraLink>
  );
};

export default NavLink;
