import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TimelineGridViewModel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      horizontalGridUnitInPixels: this.calculateXGridUnit(),
      verticalGridUnitInPixels: 40,
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
    let horizontalGridUnit = Math.floor((containerWidth) / (dateDifference));
    return horizontalGridUnit
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            //props to pass down to all elements operating in the grid 
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

export default TimelineGridViewModel;