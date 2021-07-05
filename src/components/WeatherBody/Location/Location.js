import React from 'react';

import './Location.css';

const location = (props) => (
  <div className="Location">
      <h1>{props.city}</h1>
      <h1>{props.country}</h1>  
  </div>
);

export default location;