import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TimelineItemTextView from '../Views/TimelineItemTextView';

const HANDLE_WIDTH = 5
const keyPress = {
  ENTER: 13,
  UP: 38,
  DOWN: 40,
  TAB: 9,
};

class TimelineItemViewModel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameText: this.props.name,
      inputMode: false,
    }

    this.changeInputMode = this.changeInputMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  // event handlers
  changeInputMode(){
    this.setState({
      inputMode: true,
    });
  }

  onChange = (e) => {
    this.setState({
      nameText:e.target.value,
    }); 
  }

  onKeyDown = (e) => {
    if (e.keyCode === keyPress.ENTER) {
      this.handleSubmit(this.state.nameText)
    }
  }

  handleSubmit(text) {
    this.props.updateName(this.props.id, text);
    this.setState({
      inputMode:false,
    });
  }

  render () {
    const {
      verticalGridUnit,
      id,
      textWidth,
    } = this.props;
    
    return (
        <TimelineItemTextView
          isInputShowing = {this.state.inputMode}
          containerHeight = {verticalGridUnit}
          width = {textWidth}
          id = {id}
          name = {this.state.nameText}
          changeInputMode = {this.changeInputMode}
          onTextEdit = {this.onTextEdit}
          onChange = {this.onChange}
          onKeyDown = {this.onKeyDown}
        />
    );
  }
}


TimelineItemViewModel.propTypes = {
  verticalGridUnit: PropTypes.number,
  id: PropTypes.number,
  textWidth: PropTypes.number,
  updateName: PropTypes.func,
  name: PropTypes.string,
};

export default TimelineItemViewModel;