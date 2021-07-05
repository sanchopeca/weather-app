import React from 'react';
import Location from './Location/Location';
import CurrentTemp from './CurrentTemp/CurrentTemp';
import './WeatherBody.css'

const weatherBody = (props) =>  {
return(
  <div className="Weather-Wrapper">
    <Location city={props.weatherData.city} country={props.weatherData.country}/>
    <div className="Date">{props.currentDate.date}</div>
    <div className="Current-day">{props.currentDate.day}</div>
    <CurrentTemp icon={props.weatherData.icon} temp={props.weatherData.temp} weather={props.weatherData.weather}/>
  </div>
)};

export default weatherBody;