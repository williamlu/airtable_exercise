import React, { Component } from 'react';
import PropTypes from 'prop-types';


function LeftHandleView (props) {
  const {
    width,
    height,
    id,
    isLeft,
    timeBarWidth,
  } = props;

  let style = {
    borderRadius: `5px`,
    backgroundColor: `black`,
    top: `20px`,
    left: `1px`,
    width: `${width}px`,
    height: `16px`,
    display: `inline-block`,
    position: `absolute`,
    zIndex: `1000`,
  }
  
  return (
    <div
      className = {`Handle-${id}-Left`} 
      style = {style}
    >
    </div>
  );
}

export default LeftHandleView;