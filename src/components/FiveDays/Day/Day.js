import React from 'react';

import './Day.css';

const day = props => (

    <div className="Day">
      <div className="Next-Days">{props.days}</div>
      <img alt="" src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}/>
      <h5>{props.weather}</h5>
      <div style={{marginTop: '15px'}}>
        <h6><span>max</span> {Math.round(props.maxTemp) + '°'}</h6>
        <h6><span>min</span> {Math.round(props.minTemp) + '°'}</h6>
      </div>
    </div>
);

export default day;