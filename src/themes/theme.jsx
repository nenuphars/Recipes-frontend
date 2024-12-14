import { createTheme } from '@mui/material';
import GowunBatang from '../fonts/Gowun_Batang/GowunBatang-Regular.ttf';
import EduAUVICWANT from '../fonts/Edu_AU_VIC_WA_NT_Hand/EduAUVICWANTHand-VariableFont_wght.ttf';

export const appTheme = createTheme({
  palette: {
    primary: { main: '#55996F' },
    secondary: { main: '#f19dc0' },
    offwhite: { main: '#faf8eb' },
    red: { main: '#dd596b' },
    blue: { main: '#5971DD' },
  },
  typography: {
    fontFamily: [
      'Gowun Batang',
      'serif',
      'Edu AU VIC WA NT',
      'sans-serif',
    ].join(', '),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Gowun Batang';
          font-style: regular;
          src: url(${GowunBatang}) format('ttf');
        }
        @font-face {
          font-family: 'Edu AU VIC WA NT';
          font-style: regular;
          src: url(${EduAUVICWANT}) format('ttf');
        }
      `,
    },
  },
});
