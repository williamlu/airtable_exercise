import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TimelineContainerView from '../Views/TimelineContainerView';
import TimelineItemSorterViewModel from './TimelineItemSorter';
import TimelineGridViewModel from './TimelineGridViewModel';
// variable to track the days in a month e.g January has 31 days
// const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const BUFFER = 5; //BUFFER adds a bit of margin to the timeline container
const ESTMINATED_WIDTH_OF_LETTER = 9;
class TimelineViewModel extends React.Component {
  constructor(props) {
    super(props);
    this.extractDateVariables = this.extractDateVariables.bind(this)
    this.numDaysFromReference = this.numDaysFromReference.bind(this)
    this.updateName = this.updateName.bind(this);

    let initializedTimelineItems = this.initializeTimelineItems(props.timelineItems);

    let firstDate = initializedTimelineItems[0].startNumDays;
    let lastDate = firstDate;

    //extract the earliest and latest dates to identify the boundary of the timeline
    for (let i =0; i < initializedTimelineItems.length; i++) {
      let timelineItem = initializedTimelineItems[i];
      firstDate = Math.min(firstDate,timelineItem.startNumDays, timelineItem.endNumDays);
      lastDate = Math.max(lastDate, timelineItem.startNumDays, timelineItem.endNumDays);
    }

    let containerHeight = props.windowHeight - (2 * BUFFER);
    let containerWidth = props.windowWidth - (2 * BUFFER);

    this.state = {
      timelineItems: initializedTimelineItems,
      earliestDate: firstDate,
      latestDate: lastDate,
      containerHeight: containerHeight,
      containerWidth: containerWidth,
    };
  }

  /*
  */
  updateName(id, newName) {
    let items = this.state.timelineItems;

    for(let i = 0; i < items.length; i++) {
      if(items[i].id==id) {
        items[i].name = newName;
        items[i].textEstimatedLength = newName.length * ESTMINATED_WIDTH_OF_LETTER;
      }
    }
    this.setState({
      timelineItems: items,
    })
  }

  /*  This function converts the initial timeline items into a format that's easier to manipulate
  */
  initializeTimelineItems(itemsArr) {
    let initializedItems = itemsArr.map(
      item => {
        let startDate = this.extractDateVariables(item.start);
        let startNumDays = this.numDaysFromReference(startDate)
        let endDate = this.extractDateVariables(item.end);
        let endNumDays = this.numDaysFromReference(endDate)

        
        return {
          id: item.id,    
          startDate: startDate,
          startNumDays: startNumDays,
          endDate: endDate,
          endNumDays: endNumDays,
          name: item.name,
          textEstimatedLength: item.name.length * ESTMINATED_WIDTH_OF_LETTER,
        }
    });
    return initializedItems;
  }

  /*  This function calculates the difference between the date and an early reference date
  **  reference date: 0000-01-01; this date chosen because it is earliest possible date given the date format
  **  returns integer number of days from the reference date
  */
  numDaysFromReference(dateObj) {
    //lookup table for the xth day of the year e.g. March 30th is the 90th day of the year in a common year
    const dayOfTheYear = [0, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
    let numDays = dateObj.day + dayOfTheYear[dateObj.month] + dateObj.year * 365;

    let numLeapDays = Math.floor(dateObj.year / 4) - Math.floor(dateObj.year / 100) + Math.floor(dateObj.year / 400);
    numDays = numDays + numLeapDays;

    if(this.isLeapYear(dateObj.year) && dateObj.month < 3){
      numDays--;
    }

    return numDays;
  }

  /* 
      common year: 365 days
      leap year: 366 days
      if (year is not divisible by 4) then (it is a common year)
      else if (year is not divisible by 100) then (it is a leap year)
      else if (year is not divisible by 400) then (it is a common year)
      else (it is a leap year)
    */
  isLeapYear(year) {
    if (year % 4 > 0){
      return false;
    } else if (year % 100 > 0) {
      return true;
    } else if ((year) % 400 > 0) {  //The year 2000 was a leap year, for example, but the years 1700, 1800, and 1900 were not. 
      return false;
    } else {
      return true;
    }
  }

  dateObjFromNumDays(numDays) {

    const dayOfTheYear = [0, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
    //need to write more test code to see if this actually works
    let year = Math.floor(numDays / 365.2425);
    let yearsInDays = 365 * year;
    let numLeapDays = Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);
    yearsInDays = yearsInDays + numLeapDays;

    let leftoverDays = numDays - yearsInDays;

    let month = 1;
    while (dayOfTheYear[month] < leftoverDays) {
      month ++;
    }
    month --;
    let day = leftoverDays - dayOfTheYear[month];
    let dateObj = {
      year: year,
      month: month,
      day: day,
    }
    return dateObj
  }

  /*
  **  This function takes in a string with format YYYY-MM-DD
  **  returns year, month, day as integers
  */
  extractDateVariables(dateString) {
    //TODO: handle invalid dates
    // regular expression for YYYY-MM-DD
    var dateRegex = /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
    const extractedDateVariables = dateRegex.exec(dateString);
    let dateObj = {
      year: parseInt(extractedDateVariables[1]),
      month: parseInt(extractedDateVariables[2]),
      day: parseInt(extractedDateVariables[3]),
    }

//    thought about using a date object, but then you couldnt use years before 1970
//    let d = new Date(dateObj.year, dateObj.month, dateObj.day);

    return dateObj;
  }

  render() {
    const {
      containerWidth,
      containerHeight,
    } = this.state
    return (
      <React.Fragment>
        <TimelineContainerView
          width = {containerWidth}
          height = {containerHeight}
          buffer = {BUFFER}
        >
          <TimelineGridViewModel
            earliestDate={this.state.earliestDate}
            latestDate={this.state.latestDate}
            containerWidth={containerWidth}
          >
            <TimelineItemSorterViewModel
              itemList={this.state.timelineItems}
              earliestDate = {this.state.earliestDate}
              latestDate = {this.state.latestDate}
              dateObjFromNumDays = {this.dateObjFromNumDays}
              updateName = {this.updateName}
            >

            </TimelineItemSorterViewModel>
          </TimelineGridViewModel>
        </TimelineContainerView>      
      </React.Fragment>
    );
  }

}

TimelineViewModel.propTypes = {
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  timelineItems: PropTypes.array,
};

export default TimelineViewModel;