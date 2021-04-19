import React, { Component } from 'react';
import PropTypes from 'prop-types';


function TimelineItemTextView (props) {
  const {
    width,
    height,
    id,
    name,
    isInputShowing,
    changeInputMode,
    onTextEdit,
    onChange,
    onKeyDown,
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
    zIndex: `1001`,
  }
  let inputStyle = {
    marginTop: `1px`,
    border:`0`,
    background: `transparent`,
    zIndex: `1001`,
  }


  let namePresentation = isInputShowing ? (
    <input
      className = {`Timeline-Input-${id}`}
      style = {inputStyle}
      value = {name}
      onChange = {onChange}
      onKeyDown = {onKeyDown}
    />
  ) : (
    <p
      className = {`Timeline-Text-${id}`}
      style = {textStyle}
      text = {name}
      onClick = {() => changeInputMode()}
    >
      {name}
    </p>
  );

  
  return (
    <div
      className = {`Timeline-Text-View-${id}`} 
      style = {textContainerStyle}
    >
      {namePresentation}
    </div>
  );
}

export default TimelineItemTextView;