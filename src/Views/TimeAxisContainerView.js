import React, { Component } from 'react';
import PropTypes from 'prop-types';


function TimelineContainerView (props) {
    const {
      width,
      height,
    } = props;

    let timeAxisStyle = {
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: `#F6F3E3`,
      postion: `relative`,
      zIndex: `300`,
    }
    let markerContainerStyle = {
      width: `${width}px`,
      height: `${height}px`,
      display: `flex`,
      justifyContent: `space-between`,
      zIndex: `301`,
    }
    
    return (
      <div
        className = {"Time-Axis-Container"} 
        style = {timeAxisStyle}
      >

        {props.children}
        
      </div>
    );
}


export default TimelineContainerView;