import React, { Component } from 'react';
import PropTypes from 'prop-types';


function TimeLineItemTextView (props) {
  const {
    width,
    height,
    id,
    name,
  } = props;

  let textContainerStyle = {
    top: `0px`,
    left: `1px`,
    width: `${width}px`,
    height: `$16px`,
   // display: `inline-block`,
    position: `absolute`,
    zIndex: `998`,
    overflow: `visible`,
  }

  let textStyle = {
    marginTop: `1px`,
  }
  
  return (
    <div
      className = {`Timeline-Text-View-${id}`} 
      style = {textContainerStyle}
    >
      <p
        className = {`Timeline-Text-${id}`}
        style = {textStyle}
      >
        {name}
      </p>
    </div>
  );
}

export default TimeLineItemTextView;