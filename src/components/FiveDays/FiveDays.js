import React from 'react';
import Day from './Day/Day';
import './FiveDays.css';

const fiveDays = props => { 
 return(
      
    <React.Fragment>
      {props.data.length ?
        <div  className="FiveDays">
          {props.data.map((d, index) => 
            <Day 
            key={index}
            days ={props.weekDays[index]}
            icon={d.weather[0].icon}
            weather={d.weather[0].main}
            maxTemp={d.temp.max}
            minTemp={d.temp.min}
            />
          )}
       </div>
    :
    null
    }
    </React.Fragment>
  
  );}

export default fiveDays;