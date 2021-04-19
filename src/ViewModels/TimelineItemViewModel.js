import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TimelineItemTextViewModel from './TimelineItemTextViewModel';

import TimelineItemView from '../Views/TimelineItemView';
import LeftHandleView from '../Views/LeftHandleView';
import RightHandleView from '../Views/RightHandleView';
import TimeLengthBarView from '../Views/TimeLengthBarView';

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
      updateName,
    } = this.props;

    //TODO: add dragging by changing the Left and Right Handle views into ViewModels
    let timeBarWidth = (horizontalGridUnit / gridTimeUnit) * (itemEnd - itemStart + 1) - (HANDLE_WIDTH);
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
        <TimelineItemTextViewModel
          containerHeight = {verticalGridUnit}
          textWidth = {textWidth}
          id = {id}
          name = {name}
          updateName = {updateName}
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

TimelineItemViewModel.propTypes = {
  horizontalGridUnit: PropTypes.number,
  verticalGridUnit: PropTypes.number,
  gridTimeUnit: PropTypes.number,
  itemStart: PropTypes.number,
  itemEnd: PropTypes.number,
  id: PropTypes.number,
  name: PropTypes.string,
  textWidth: PropTypes.number,
  updateName: PropTypes.func,
};

export default TimelineItemViewModel;