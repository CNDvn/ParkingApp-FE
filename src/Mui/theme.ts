import { createTheme } from '@mui/material/styles';
import { Breakpoint } from '../constants/breakpoint';

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    // Define your new color here
    lightGrey: string;
    backgroundColorLogin: string;
    orange: string;
    successDark: string;
    backgroundColorAdmin: string;
    backgroundColorDashboard: string;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    dimension: {
      appBarHeight: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    dimension: {
      appBarHeight: string;
    };
  }
}

const colors = {
  black: '#130F26',
  white: '#FFFFFF',
  grey: '#716F7D',
  lightGrey: '#FBFCFC',
  backgroundColorLogin: 'rgb(227, 242, 253)',
  orange: '#e65100',
  successDark: 'rgb(94, 53, 177)',
  successLight: 'rgb(237, 231, 246)',
  backgroundColorAdmin: 'rgb(255, 255, 255)',
  backgroundColorDashboard: 'rgb(227, 242, 253)',
};

const defaultTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 768,
      lg: 1440,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#3da9fc',
      contrastText: colors.white,
    },
    common: {
      backgroundColorLogin: colors.backgroundColorLogin,
      backgroundColorAdmin: colors.backgroundColorAdmin,
      backgroundColorDashboard: colors.backgroundColorDashboard,
    },
    secondary: {
      main: '#000',
      contrastText: colors.orange,
    },
    error: {
      main: '#ff604f',
    },
    success: {
      main: colors.successDark,
      contrastText: colors.successLight,
    },
  },
  dimension: {
    appBarHeight: '80px',
  },
});

const theme = createTheme({
  ...defaultTheme,
  typography: {
    //   mediumAvatar: {
    //     width: '34px',
    //     height: '34px',
    //     fontSize: '1.2rem'
    // },
    // largeAvatar: {
    //     width: '44px',
    //     height: '44px',
    //     fontSize: '1.5rem'
    // },
    fontFamily: '"SF Pro Display", sans-serif',
    allVariants: {
      color: colors.black,
    },
    h1: {
      fontSize: 64,
      lineHeight: 1.25,
      fontWeight: 700,

      [defaultTheme.breakpoints.down(Breakpoint.md)]: {
        fontSize: 48,
        lineHeight: 'calc(64 / 48)',
        fontWeight: 700,
      },

      [defaultTheme.breakpoints.down(Breakpoint.sm)]: {
        fontSize: 32,
        lineHeight: 1.5,
        fontWeight: 700,
      },
    },
    h2: {
      fontSize: 48,
      lineHeight: 'calc(64 / 48)',
      fontWeight: 700,

      [defaultTheme.breakpoints.down(Breakpoint.md)]: {
        fontSize: 32,
        lineHeight: 1.5,
        fontWeight: 700,
      },

      [defaultTheme.breakpoints.down(Breakpoint.sm)]: {
        fontSize: 24,
        lineHeight: 1.5,
        fontWeight: 700,
      },
    },
    h3: {
      fontSize: 32,
      lineHeight: 1.5,
      fontWeight: 700,

      [defaultTheme.breakpoints.down(Breakpoint.md)]: {
        fontSize: 24,
        lineHeight: 1.5,
        fontWeight: 700,
      },

      [defaultTheme.breakpoints.down(Breakpoint.sm)]: {
        fontSize: 20,
        lineHeight: 1.6,
        fontWeight: 700,
      },
    },
    h4: {
      fontSize: 24,
      lineHeight: 1.5,
      fontWeight: 700,

      [defaultTheme.breakpoints.down(Breakpoint.md)]: {
        fontSize: 20,
        lineHeight: 1.6,
        fontWeight: 700,
      },

      [defaultTheme.breakpoints.down(Breakpoint.sm)]: {
        fontSize: 18,
        lineHeight: 'calc(28 / 18)',
        fontWeight: 700,
      },
    },
    h5: {
      fontSize: 20,
      lineHeight: 1.6,
      fontWeight: 700,
    },
    h6: {
      fontSize: 18,
      lineHeight: 'calc(28 / 18)',
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: 20,
      lineHeight: 1.6,
      fontWeight: 700,
    },
    body1: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 500,
    },
    body2: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 400,
      color: colors.grey,
    },
    button: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 700,
    },
    caption: {
      fontSize: 12,
      lineHeight: 'calc(16 / 12)',
      fontWeight: 700,
    },
    overline: {
      fontSize: 12,
      lineHeight: 'calc(16 / 12)',
      letterSpacing: '1px',
      fontWeight: 400,
      color: colors.grey,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'unset',
        },
        sizeLarge: {
          padding: defaultTheme.spacing(2, 6),

          [defaultTheme.breakpoints.down(Breakpoint.sm)]: {
            padding: defaultTheme.spacing(1, 2),
          },
        },
        sizeMedium: {
          padding: defaultTheme.spacing(1, 2),
        },
        sizeSmall: {
          padding: defaultTheme.spacing(0.5, 2),
        },
      },
      defaultProps: {
        size: 'large',
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          alignItems: 'center',
        },
      },
    },
  },
});

export default theme;
