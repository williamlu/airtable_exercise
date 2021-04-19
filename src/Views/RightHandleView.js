import React, { Component } from 'react';
import PropTypes from 'prop-types';


function RightHandleView (props) {
  const {
    width,
    height,
    id,
  } = props;


  let style = {
    borderRadius: `5px`,
    backgroundColor: `black`,
    top: `20px`,
    right: `1px`,
    width: `${width}px`,
    height: `16px`,
    display: `inline-block`,
    position: `absolute`,
    zIndex: `1000`,
  }
  
  return (
    <div
      className = {`Handle-${id}-Right`} 
      style = {style}
    >
    </div>
  );
}

export default RightHandleView;