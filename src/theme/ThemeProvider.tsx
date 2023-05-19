import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import { createTheme, CssBaseline } from '@mui/material';

import { RootState } from '../redux/store';

import defaultTheme from './default';

export interface ThemeProviderProps {
  children: React.ReactNode;
  contextTheme: object | null | undefined;
}

const getMuiThemeFromContext = (theme: object) => createTheme({
  ...defaultTheme,
  ...theme,
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, contextTheme }) => (
  <MuiThemeProvider theme={contextTheme ? getMuiThemeFromContext(contextTheme) :  defaultTheme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);

const mapState = (state: RootState) => ({
  contextTheme: state.global.context?.app.theme,
});

export default connect(mapState)(ThemeProvider);
