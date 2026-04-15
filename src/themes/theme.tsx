import { createTheme } from '@mui/material';
// import { GowunBatang } from '../fonts/Gowun_Batang';
// import { EduAUVICWANT } from '../fonts/Edu_AU_VIC_WA_NT_Hand/static';

export const appTheme = createTheme({
  palette: {
    primary: { main: '#55996F' },
    secondary: { main: '#f19dc0' },
    background: { default: '#faf8eb' },
    error: { main: '#dd596b' },
    info: { main: '#5971DD' },
  },
  typography: {
    fontFamily: [
      'Gowun Batang',
      'serif',
      'Edu AU VIC WA NT',
      'sans-serif',
    ].join(', '),
    h1: {
      fontFamily: 'Edu AU VIC WA NT, sans-serif',
    },
    h2: {
      fontFamily: 'Edu AU VIC WA NT, sans-serif',
    },
    h3: {
      fontFamily: 'Edu AU VIC WA NT, sans-serif',
    },
    h4: {
      fontFamily: 'Edu AU VIC WA NT, sans-serif',
    },
    h5: {
      fontFamily: 'Edu AU VIC WA NT, sans-serif',
    },
    h6: {
      fontFamily: 'Edu AU VIC WA NT, sans-serif',
    },
  },
  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides: `
  //       @font-face {
  //         font-family: 'Gowun Batang';
  //         font-style: regular;
  //         src: url(${GowunBatang});
  //       }
  //       @font-face {
  //         font-family: 'Edu AU VIC WA NT';
  //         font-style: regular;
  //         src: url(${EduAUVICWANT});
  //       }
  //     `,
  //   },
  // },
});
