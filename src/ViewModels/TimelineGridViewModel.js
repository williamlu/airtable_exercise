import React, { Component } from 'react';
import PropTypes from 'prop-types';

const MIN_GRID_UNIT = 5;

class TimelineGridViewModel extends React.Component {
  constructor(props) {
    super(props);

    
    this.state = {
      horizontalGridUnitInPixels: this.calculateXGridUnit(),
      verticalGridUnitInPixels: 40,

      //variable for tracking how much time is represented in each grid unit
      //fixed at 1 for the time being 
      //TODO: figure out scaling for when when grid needs additional time
      gridTimeUnit: 1, 
    }
  }

  calculateXGridUnit() {
    const {
      containerWidth,
      earliestDate,
      latestDate,
    } = this.props;

    let dateDifference = latestDate - earliestDate + 1;

    //text will bleed out of container if I don't decrement by 1 
    //TODO: find a more robust way of calculating the appropriate width
    let horizontalGridUnit = Math.floor((containerWidth) / (dateDifference) - 1); 
    return Math.max(horizontalGridUnit, MIN_GRID_UNIT);
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            //props to pass down to all elements operating in the grid
            //this implementation is only a shallow mapping
            //TODO: figure out how to apply to all children
            horizontalGridUnit: this.state.horizontalGridUnitInPixels,
            verticalGridUnit: this.state.verticalGridUnitInPixels,
            gridTimeUnit: this.state.gridTimeUnit
          });
        }
        return child;
      });
      return (
        <React.Fragment>
          {childrenWithProps}
        </React.Fragment>
      )
  }

}

TimelineGridViewModel.propTypes = {
  containerWidth: PropTypes.number,
  earliestDate: PropTypes.number,
  latestDate: PropTypes.number,
};

export default TimelineGridViewModel;