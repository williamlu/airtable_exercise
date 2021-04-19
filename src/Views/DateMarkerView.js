import React, { Component } from 'react';
import PropTypes from 'prop-types';


function DateMarkerView (props) {
  const {
    dateObj,
    offset,
  } = props;

  let textContainerStyle = {
    height: `16px`,
    position: `absolute`,
    left: `${offset}px`,
  }

  let textStyle = {
    marginTop: `1px`,
  }
  let tickStyle = {
    borderRadius: `5px`,
    backgroundColor: `black`,
    top: `20px`,
    left: `1px`,
    width: `2px`,
    height: `16px`,
    display: `inline-block`,
    position: `absolute`,
    zIndex: `1000`,
  }
  let dateText = `${dateObj.month}/${dateObj.day}`;
  return (
    <div
      className = {`${dateText}-Marker`} 
      style = {textContainerStyle}
    >
      <p
        className = {`${dateText}-Text`}
        style = {textStyle}
      >
        {dateText}
      </p>
      <div
        className = {`${dateText}-Tick`} 
        style = {tickStyle}
      >
      </div>
    </div>
  );
}

export default DateMarkerView;