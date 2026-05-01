import { createTheme } from '@mui/material';
import EduAUVICWANT from '../fonts/Edu_AU_VIC_WA_NT_Hand/EduAUVICWANTHand-VariableFont_wght.ttf';
import GowunBatang from '../fonts/Gowun_Batang/GowunBatang-Regular.ttf';

export const appTheme = createTheme({
  palette: {
    primary: { main: '#55996F' },
    secondary: { main: '#f19dc0' },
    background: { default: '#faf8eb' },
    error: { main: '#dd596b' },
    info: { main: '#5971DD' },
  },
  typography: {
    fontFamily: ['Gowun Batang', 'Edu AU VIC WA NT'].join(', '),
    h1: {
      fontFamily: 'Edu AU VIC WA NT',
    },
    h2: {
      fontFamily: 'Edu AU VIC WA NT',
    },
    h3: {
      fontFamily: 'Edu AU VIC WA NT',
    },
    h4: {
      fontFamily: 'Edu AU VIC WA NT',
    },
    h5: {
      fontFamily: 'Edu AU VIC WA NT',
    },
    h6: {
      fontFamily: 'Edu AU VIC WA NT',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Gowun Batang';
          font-style: regular;
          src: url(${GowunBatang});
        }
        @font-face {
          font-family: 'Edu AU VIC WA NT';
          font-style: regular;
          src: url(${EduAUVICWANT});
        }
      `,
    },
  },
});
