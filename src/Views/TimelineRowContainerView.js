import React, { Component } from 'react';
import PropTypes from 'prop-types';


function TimelineRowContainerView (props) {
  const {
    width,
    height,
    id,
  } = props;

  let color = `#D6FED2`;

  if(id%2==0) {
    color = `#ADEDC1`;
  }
  let style = {
    width: `${width * 2}px`,
    height: `${height}px`,
    zIndex: `100`,
    backgroundColor: `${color}`,
    zIndex: `200`,
  }
  
  return (
    <div
      className = {`Timeline-Row-${id}-Container`} 
      style = {style}
    >
      {props.children}
    </div>
  );
}

export default TimelineRowContainerView