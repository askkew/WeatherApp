import React, {useState, useEffect} from 'react'
import { Card, CardActions, CardContent, Button, Typography, Box, Grid, TextField, Divider, FormControl } from '@mui/material';
import { styled } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Weatherbutton from '../buttons/weatherbutton';
import Settingsbutton from '../buttons/settingsbutton';
import Forecastbutton from '../buttons/forecastbutton';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PacmanLoader from 'react-spinners/PacmanLoader';
import moment from 'moment';
import axios from 'axios';


const Searcharea = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
})

const Primarycard = styled(Card)({
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    // minHeight: 844,
    // backgroundColor: 'rgb(11,18,47)',
    background: 'transparent',
})

const Locationarea = styled(CardContent)({
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: '89px',
})


const Locationgrid = styled(Grid) ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
})

const Weathergrid = styled(Grid) ({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap'
})

const Conditionbox = styled('div')({
    display: 'flex',
    justifyContent: 'left',
    flexDirection: 'row',
})

const Forecast = styled(CardContent)({
    //minHeight: '133.39px',
})

const Temperaturearea = styled(CardContent)({
    paddingTop: 0,
    minHeight: '300px',
})

const Weatherdetails = styled(CardContent)({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '232.56px',
})

const Fourbox = styled(Typography)({
    marginBottom: '5px',
})

const Submitbutton = styled(Button)({
    height: 55,
    marginLeft: 2,
    color: 'white',
    borderColor: 'lightgrey'
})

const CustomTextField = styled(TextField)({
    root: {
        '& label.Mui-focused': {
          color: 'white',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'yellow',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'yellow',
          },
        },
      },
})

const Mainpage = ( { setUseLightMode } ) => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    //basic weather data by city name
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7402bcd03e0b88f6c75855bda3497673`

    //useless
    //const urltwo = `https://api.openweathermap.org/data/3.0/onecall?lat=${data.weather?data.coord?.lat:null}&lon=${data.weather?data.coord?.lon:null}&exclude=hourly,daily&appid=7402bcd03e0b88f6c75855bda3497673`

    //get city location key by name
    //const locationkeyurl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=PJizTO8MMJqt62eaSX2GgHyWiC8zynwp=Jersey%20Village&alias=T`

    //get city 12 hour forecast by location key name
    //const forecasturl = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/2110204?apikey=PJizTO8MMJqt62eaSX2GgHyWiC8zynwp`


    const handleSearch = () => {
        setIsLoading(true);
        axios.get("/fetchWeather")
            .then( response => {
                console.log({ response })
                if (response.statusText === 'OK') {
                    const { data } = response;
                    const { IsDayLight } = data;
                    setIsLoading(false);
                    setUseLightMode(IsDayLight)
                    setData(data)
                }
            })
    }
    

    const cityTemp = data.main?.temp;
    const locationName = data?.name;
    const countryName = data?.sys?.country
    const weatherIcon = data?.weather && data?.weather[0]?.icon ? data?.weather[0]?.icon : <AcUnitIcon />;
    const showPage = data?.main;
    const isData = data.main;

    return (
    <Grid container justifyContent="center">
        <Primarycard elevation={0}>
            <CardContent>
                    {isLoading ?  
                    
                    <PacmanLoader
                        color={'white'}
                        loading={isLoading}
                        size={20}
                        sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}
                    
                    />
                    
                    :
                    <Searcharea>
                        <CustomTextField
                            id="outlined-secondary"
                            label="Enter City Name"
                            variant="outlined"
                            onChange={event => setLocation(event.target.value)}
                            value={location}
                        />
                        <Submitbutton
                            variant="outlined"
                            onClick={location.length > 0 && handleSearch}
                        >
                            Submit
                        </Submitbutton>
                    </Searcharea>}
                <Divider sx={{paddingBottom: 2}}></Divider>
                <Locationarea>
                    <Grid container spacing={2}>
                        <Locationgrid item xs={9}>
                            <Typography>{isData ? <LocationOnIcon /> : null}</Typography>
                            <Typography>{locationName ? <Typography sx={{fontSize: '12px'}}>{locationName},  {countryName}</Typography> : null}</Typography>
                        </Locationgrid>
                        <Grid item xs={3}>
                            {/* <Typography variant="h6">{data.weather ? <img style={{ width: 80, height: 80 }} src={(`https://developer.accuweather.com/sites/default/files/01-s.png`)}></img> : null}</Typography> */}
                            {/* { Number(currentHour) >= 7 && Number(currentHour) <= 19 ? <WbSunnyIcon sx={{transform: 'scale(2)', float: 'right', color: 'goldenrod'}}/> : <NightsStayIcon sx={{transform: 'scale(2)', float: 'right', color: 'rgb(251, 225, 112)'}}/>} */}
                        </Grid>
                    </Grid>
                </Locationarea>
                <Temperaturearea>
                    <Grid container spacing={2}>
                        <Weathergrid item xs={7}>
                            <Typography>{isData ? <Typography sx={{fontSize: '85px'}}>{Math.round(cityTemp)}°</Typography> : null}</Typography>
                            <Conditionbox>
                                {/* <Typography variant="h6">{data.weather ? <img src={(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)}></img> : null}</Typography> */}
                                <Typography variant="h6">{data.weather ? <Typography variant="h6">{data.weather[0].main}</Typography> : null}</Typography>
                            </Conditionbox>
                            <Typography>{isData ? <Typography sx={{fontSize: "13px"}}>Last Updated: {moment().format('LT')}</Typography> : null}</Typography>
                        </Weathergrid>
                        <Grid item xs={5}>
                        </Grid>
                    </Grid>
                </Temperaturearea>
                { showPage && <Divider sx={{paddingBottom: 0.5}}/>}
                <Weatherdetails>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '12px'}}>High:</Fourbox> : null }</Fourbox>
                            <Typography>{isData ? <Typography variant="h6">{Math.round(data.main?.temp_max)}°</Typography> : null}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '12px'}}>Low:</Fourbox> : null }</Fourbox>
                            <Typography>{isData ? <Typography variant="h6">{Math.round(data.main?.temp_min)}°</Typography> : null}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '12px'}}>Feels like:</Fourbox> : null }</Fourbox>
                            <Typography> {isData ? <Typography variant="h6">{Math.round(data.main?.feels_like)}°</Typography> : null}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '12px'}}>Precipitation:</Fourbox> : null }</Fourbox>
                            <Typography> {isData ? <Typography variant="h6">{data.PrecipitationProbability}%</Typography> : null}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '12px'}}>Wind:</Fourbox> : null }</Fourbox>
                            <Typography>{isData ? <Typography variant="h6">{Math.round(data.wind?.speed)} mph</Typography> : null}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Fourbox> {isData ? <Fourbox variant="h6" sx={{fontSize: '12px'}}>Humidity:</Fourbox> : null }</Fourbox>
                            <Typography>{isData ? <Typography variant="h6">{Math.round(data.main?.humidity)}%</Typography> : null}</Typography>
                        </Grid>
                    </Grid>
                </Weatherdetails>
                { showPage && <Divider sx={{paddingBottom: 0.5}}/>}
                { isData && data.forecast && <Forecast>
                    <Grid container spacing={2}>
                        { data.forecast.map((dataPoint, i) => {
                            const {
                                DateTime,
                                Value, 
                                WeatherIcon 
                            } = dataPoint;
                            const UpdatedIcon = WeatherIcon < 10 ? '0' + WeatherIcon : WeatherIcon;
                            let UpdateTime = DateTime;
                            UpdateTime = DateTime.substring(DateTime, DateTime.length - 9);
                            return <Grid item xs={2} key={`${i}/${Value}`}>
                                <Fourbox variant="h6" sx={{fontSize: '14px', marginBottom: 0}}>
                                    {(moment(UpdateTime).format("h A"))}
                                </Fourbox>
                                <Typography variant="h6">{Value}°</Typography>
                                <img style={{ width: 40, height: 25 }} src={(`https://developer.accuweather.com/sites/default/files/${UpdatedIcon}-s.png`)}></img>
                            </Grid>
                        })}
                    </Grid>
                </Forecast> }
            </CardContent>
        </Primarycard>

        </Grid>
    )
}

export default Mainpage