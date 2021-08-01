import '@fontsource/roboto';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      blue: '#0967D2',
      gray: '#52606D',
      shadow: '#E4E7EB'
    }
  },
  fonts: {
    heading: 'roboto',
    body: 'roboto'
  }
});

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
