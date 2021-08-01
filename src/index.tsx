import '@fontsource/roboto';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'roboto',
    body: 'roboto'
  },
  colors: {
    brand: {
      blue: {
        normal: '#0967D2',
        hover: '#3a85db'
      },
      gray: '#52606D',
      shadow: '#E4E7EB'
    }
  },
  components: {
    Button: {
      variants: {
        primary: {
          color: 'white',
          backgroundColor: 'brand.blue.normal',
          fontWeight: 'bold',
          _disabled: { backgroundColor: 'brand.blue.hover' },
          _hover: {
            backgroundColor: 'brand.blue.hover',
            _disabled: { backgroundColor: 'brand.blue.hover' }
          }
        }
      }
    },
    FormLabel: {
      variants: {
        primary: { fontWeight: 'bold' }
      }
    }
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
