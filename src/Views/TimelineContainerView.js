import React, { Component } from 'react';
import PropTypes from 'prop-types';


function TimelineContainerView (props) {
    const {
      width,
      height,
      buffer,
    } = props;

    let style = {
      margin: `${buffer}px`,
      width: `${width-2*buffer}px`,
      height: `${height-2*buffer}px`,
      overflowX: `scroll`,
      overflowY: `scroll`,
      zIndex: `100`,
    }
    
    return (
      <div
        className = {"Timeline-Container"} 
        style = {style}
      >
        {props.children}
      </div>
    );
}


export default TimelineContainerView;