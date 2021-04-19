import React, { Component } from 'react';
import PropTypes from 'prop-types';


function TimeLengthBarView (props) {
  const {
    width,
    height,
    containerHeight,
    id,
  } = props;

  let style = {
    backgroundColor: `black`,
    width: `${width}px`,
    height: `${height}px`,
    top: `26px`,
    left: `1px`,
    display: `inline-block`,
    position: `absolute`,
    zIndex: `990`,
  }
  
  return (
    <div
      className = {`Time-Bar-${id}`} 
      style = {style}
    >
    </div>
  );
}

export default TimeLengthBarView;