import React from 'react'
import { Button, Typography } from '@mui/material'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

const Forecastbutton = () => {
  return (
    <>
      <Button 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column', 
          color: 'lightgrey',
          alignItems: 'center',
          padding: 0,
        }}>
          <ThunderstormIcon fontSize='medium'/>
          <Typography>Forecast</Typography>
      </Button>
    </>
  )
}

export default Forecastbutton