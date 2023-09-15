import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from '../redux/store';
import LocaleProvider from '../locale/LocaleProvider';
import ThemeProvider from '../theme/ThemeProvider';

import App from './App.tsx';
import './wda.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </ThemeProvider>
  </Provider>,
);
