import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { App } from './App';
import '@fontsource/roboto';

ReactDOM.render(
  <StrictMode>
    <CssBaseline>
      <App />
    </CssBaseline>
  </StrictMode>,
  document.getElementById('root')
);
