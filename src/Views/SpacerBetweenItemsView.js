import React, { Component } from 'react';
import PropTypes from 'prop-types';


function SpacerBetweenItemsView (props) {
  const {
    width,
    height,
    id,
  } = props;

  let style = {
    width: `${width}px`,
    height: `${height}px`,
    display: `inline-block`,
    zIndex: `500`,
  }
  
  return (
    <span
      className = {`Spacer-${id}`} 
      style = {style}
    >
    </span>
  );
}

export default SpacerBetweenItemsView;