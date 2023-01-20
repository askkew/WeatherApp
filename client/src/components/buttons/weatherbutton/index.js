import React from 'react'
import { Button, Typography } from '@mui/material'
import CloudIcon from '@mui/icons-material/Cloud';

const Weatherbutton = () => {
  return (
    <>
    <Button sx={{display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column', color: 'rgb(108,168,255)', padding: 0,}}>
        <CloudIcon fontSize='medium'/>
        <Typography>Weather</Typography>
    </Button>
    </>
  )
}

export default Weatherbutton