import './App.css';
import React, {useState, useEffect} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid } from '@mui/material'
import Weatherbutton from './components/buttons/weatherbutton';
import Settingsbutton from './components/buttons/settingsbutton';
import Forecastbutton from './components/buttons/forecastbutton';
import { styled } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import Mainpage from './components/mainpage';
import { light } from '@mui/material/styles/createPalette';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#00e676',
    },
  }
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#00e676',
    },
  },
})

const Footer = styled('div')({
  width: '100%',
  bottom: 0,
  position: 'absolute',
  display: 'flex !important',
  flexDirection: 'row',
  margin: 0,
  padding: 0,
  marginBottom: 15,
});

const FooterButtonContainer = styled('div')({
  display: 'flex',
  width: '33%',
  justifyContent: 'center',
  padding: 0,
  margin: 0,
})

function App() {

  const[useLightMode, setUseLightMode] = useState(true);

  const lightBackground = "url(https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722376/after_noon.png)";
  const nightBackground = "url(https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722375/night.png)";


  return (
    <ThemeProvider theme={useLightMode === true ? lightTheme : darkTheme }>
      <CssBaseline />

      {/* <div style={{ height: '100vh', background: 'linear-gradient(to right bottom, darkcyan, blue)' }}> */}
      {/* <div style={{ height: '100vh', backgroundImage: 'url(https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722375/night.png)', backgroundSize : "125% auto" }}> */}
      <div style={{ 
        height: '100vh', 
        backgroundImage: `${useLightMode === true ? lightBackground : nightBackground}`, backgroundSize : "125% auto" 
      }}>
        <Mainpage setUseLightMode={ setUseLightMode } />

        {/* <Footer container spacing={2} >
          <FooterButtonContainer>
              <Weatherbutton />
          </FooterButtonContainer>
          <FooterButtonContainer>
              <Forecastbutton />
          </FooterButtonContainer>
          <FooterButtonContainer>
              <Settingsbutton />
          </FooterButtonContainer>
        </Footer> */}
      </div>

    </ThemeProvider>

  );
}

export default App;
