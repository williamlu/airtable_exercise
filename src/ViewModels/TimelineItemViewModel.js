import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TimelineItemView from '../Views/TimelineItemView';
import LeftHandleView from '../Views/LeftHandleView';
import RightHandleView from '../Views/RightHandleView';
import TimeLengthBarView from '../Views/TimeLengthBarView';
import TimeLineItemTextView from '../Views/TimelineItemTextView';

const HANDLE_WIDTH = 5

class TimelineItemViewModel extends React.Component {
  constructor(props) {
    super(props);

  }

  render () {
    const {
      horizontalGridUnit,
      verticalGridUnit,
      gridTimeUnit,
      itemStart,
      itemEnd,
      id,
      name,
      textWidth,
    } = this.props;

    let timeBarWidth = (horizontalGridUnit / gridTimeUnit) * (itemEnd - itemStart + 1) - ( HANDLE_WIDTH);
    return (
      <TimelineItemView
        horizontalGridUnit = {horizontalGridUnit}
        verticalGridUnit = {verticalGridUnit}
        gridTimeUnit= {gridTimeUnit}
        itemStart = {itemStart}
        itemEnd = {itemEnd}
        id = {id}
        name= {name}
      >
        <LeftHandleView
          width = {HANDLE_WIDTH}
          height = {verticalGridUnit - 2 * HANDLE_WIDTH}
          id = {id}
        />
        <TimeLineItemTextView
          containerHeight = {verticalGridUnit}
          width = {textWidth}
          id = {id}
          name = {name}
        />
        <TimeLengthBarView
          containerHeight = {verticalGridUnit}
          width = {timeBarWidth}
          height = {HANDLE_WIDTH}
          id = {id}
        />
        <RightHandleView
          width = {HANDLE_WIDTH}
          height = {verticalGridUnit - 2 * HANDLE_WIDTH}
          id = {id}
        />
      </TimelineItemView>
    );
  }
}


export default TimelineItemViewModel;