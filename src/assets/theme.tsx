import { PaletteMode } from "@mui/material";
import { alpha } from "@mui/material";

export const getThemeDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: {
          main: '#3b82f6',
        },
      }
      : {
        // palette values for dark mode
        primary: {
          main: '#00F89C',
        },
        secondary: {
          main: '#8e9799',
        },
        background: {
          paper: alpha('#383c3d', 0.9),
          default: '#383c3d',
        },
      }),
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            transition: 'all 2s linear',
          },
        },
      },
    },
  },
  //Background gradient overrides
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: mode === 'dark' ? "linear-gradient(to right, #232526, #414345)" : '',


        },
      },
    },
  }
});

