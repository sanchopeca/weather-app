import React from 'react';

import './CurrentTemp.css';

const currentTemp = (props) => (
  <React.Fragment>
    {props.temp ? 
    <div className="Temp">
      <img alt="" style={{display: 'block', maxWidth: '100px'}} 
      src={`http://openweathermap.org/img/wn/${props.icon.slice(0,2)}d@2x.png`} />
      {Math.round(props.temp) + '°'}
      <h1 style={{fontSize: '25px'}}>{props.weather}</h1>
    </div> : 
    null}
  </React.Fragment>
);

export default currentTemp;