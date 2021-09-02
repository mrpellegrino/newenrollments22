import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Routes from 'Routes';
import theme from 'Styles/theme';
import Providers from 'Hooks';

function App(): JSX.Element {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Providers>
          <Routes />
        </Providers>
      </ChakraProvider>
    </Router>
  );
}

export default App;
