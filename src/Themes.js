
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: "#252836"
        },
        cardColor: {
            main: '#1F1D2B'
        },
        themeCardColor: {
            main: '#1F1D2B',
            light: '#2D303E'
        },
        primary: {
            main: '#8212F4'
        },
        secondary: {
            main: '#FF00F5'
        }
    },
});




let lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: "#F8F8F8"
        },
        cardColor: {
            main: '#1F1D2B'
        },
        themeCardColor: {
            main: '#FFFFFF',
            light: '#F8F8F8'
        },
        primary: {
            main: '#8212F4'
        },
        secondary: {
            main: '#FF00F5'
        }
    },
});


darkTheme = responsiveFontSizes(darkTheme);
lightTheme = responsiveFontSizes(lightTheme);


export {darkTheme, lightTheme};