import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: () => ({
      button: {
        _focus: {
          boxShadow: 'none !important',
        },
      },
    }),
  },
});

export default theme;
