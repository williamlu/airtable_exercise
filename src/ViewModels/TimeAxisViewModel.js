import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TimeAxisContainerView from '../Views/TimeAxisContainerView';
import DateMarkerView from '../Views/DateMarkerView';

const DAYS_BETWEEN_MARKERS = 7;

class TimeAxisViewModel extends React.Component {
  constructor(props) {
    super(props);
    
    this.formatMarkers= this.formatMarkers.bind(this);

    this.state = {
      totalLengthOfTime: this.props.latestDate - this.props.earliestDate,
    }
  }

  formatMarkers() {
    const {
      dateObjFromNumDays,
      earliestDate,
      latestDate,
      horizontalGridUnit,
      gridTimeUnit,
    } = this.props;

    //grab dates signifying weeks from start
    let timeLengthRemaining = latestDate - earliestDate;
    let curDay = earliestDate;
    let datesToMark = [];
    
    while (timeLengthRemaining > -1 * DAYS_BETWEEN_MARKERS) {
      let curDateObj = dateObjFromNumDays(curDay)
      datesToMark.push(
        {
          dateObj: curDateObj,
          offset: ((this.state.totalLengthOfTime - timeLengthRemaining) / gridTimeUnit) * horizontalGridUnit + 5,
        });
      curDay = curDay + DAYS_BETWEEN_MARKERS;
      timeLengthRemaining = timeLengthRemaining - DAYS_BETWEEN_MARKERS;
    }

    let formattedMarkers = datesToMark.map(

      (date) => {
        return (
          <DateMarkerView
            key={`${date.dateObj.month}-${date.dateObj.day}`}
            dateObj={date.dateObj}
            offset={date.offset}
          />
        );
      }
    );

    return formattedMarkers;
  }


  render() {
      const {
        width,
        height,
        gridTimeUnit,
        horizontalGridUnit,
      } = this.props;

      let markers = this.formatMarkers();
      return (
        <React.Fragment>
          <TimeAxisContainerView
            width={width}
            height={height}
            gridTimeUnit={gridTimeUnit}
            horizontalGridUnit={horizontalGridUnit}
            totalTime= {this.state.totalLengthOfTime}
          >
            {markers}
          </TimeAxisContainerView>
        </React.Fragment>
      )
  }

}

TimeAxisViewModel.propTypes = {
  containerWidth: PropTypes.number,
  earliestDate: PropTypes.number,
  latestDate: PropTypes.number,
  dateObjFromNumDays: PropTypes.func,
  earliestDate: PropTypes.number,
  latestDate: PropTypes.number,
  horizontalGridUnit: PropTypes.number,
  gridTimeUnit: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  gridTimeUnit: PropTypes.number,
  horizontalGridUnit: PropTypes.number,
};

export default TimeAxisViewModel;