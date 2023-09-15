import { createTheme } from '@mui/material';

export default createTheme({
  typography: {
    fontFamily: 'Muli',
  },
  palette: {
    primary: {
      main: '#203890',
      light: '#2048a0',
      dark: '#102880',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: 'primary',
      },
    },
  },
});
