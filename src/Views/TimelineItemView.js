import React, { Component } from 'react';
import PropTypes from 'prop-types';


function TimelineItemView (props) {
    const {
      horizontalGridUnit,
      verticalGridUnit,
      gridTimeUnit,
      itemStart,
      itemEnd,
      rowNum,
      name,
      id,
    } = props;

    //let leftMargin = ((itemStart - timelineStart) / gridTimeUnit) * (horizontalGridUnit);
    let itemWidth = (itemEnd - itemStart + 1) * horizontalGridUnit / gridTimeUnit;
    let itemHeight = verticalGridUnit;
    let itemStyle = {
      display: `inline-block`,
      marginTop: `${1}px`,
      width: `${itemWidth}px`,
      height: `${itemHeight}px`,
      borderColor: `blue`,
      zIndex: `500`,
      position: `relative`,
    }
    
    return (
      <span
        className = {`Timeline-Item-${id}`}
        style = {itemStyle}
      >
        {props.children}
      </span>
    );
}


export default TimelineItemView;