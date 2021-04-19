import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TimelineItemViewModel from './TimelineItemViewModel'

import TimelineRowContainerView from '../Views/TimelineRowContainerView';
import SpacerBetweenItemsView from '../Views/SpacerBetweenItemsView';
import TimeAxisViewModel from './TimeAxisViewModel';

/* This class takes in the list of timeline items and organizes the items into rows
**
*/
class TimelineItemSorterViewModel extends React.Component {
  constructor(props) {
    super(props);

    this.greedyItemSort = this.greedyItemSort.bind(this);
    this.formatRow = this.formatRow.bind(this);
    this.formatRows = this.formatRows.bind(this);
    this.updateRowInfo = this.updateRowInfo.bind(this);

    let rowInfo = this.greedyItemSort();
    this.state = {
      rowInfo: rowInfo
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let newRowInfo = this.greedyItemSort();
    //check if new edit will collide with another item and require an update to the rows
    if(newRowInfo.length != prevState.rowInfo.length) 
    {
      this.updateRowInfo(newRowInfo);
    }
  } 

  calculateLengthOfTimeBar(itemStart, itemEnd) {
    const {
      horizontalGridUnit,
      gridTimeUnit,
    } = this.props;
    return (horizontalGridUnit / gridTimeUnit) * (itemEnd - itemStart + 1)
  }

  updateRowInfo(newRowInfo) {
    this.setState({
      rowInfo: newRowInfo,
    });
  }

  greedyItemSort() {
    const {
      itemList,
      earliestDate,
    } = this.props;

    //if list is empty return
    if(itemList.length == 0) {
      return null;
    }

    let sortedItemList = itemList.sort(function(a, b){
      return a.startNumDays - b.startNumDays;
    })

    let rowInfo = [];
    let firstArr = [];

    //add in first variable
    let timeBarInPixels = this.calculateLengthOfTimeBar(sortedItemList[0].startNumDays, sortedItemList[0].endNumDays)
    firstArr.push(sortedItemList[0])
    rowInfo[0] = {
      itemsInRow: firstArr,
      latestVal: Math.max(timeBarInPixels,sortedItemList[0].textEstimatedLength),
      id: 1,
    };

    //return early if only one item in list
    if(itemList.length == 1) {
      return rowInfo;
    }

    for(let i = 1; i< sortedItemList.length; i++) {
      let curItem = sortedItemList[i];

      let rowNum = 0;
      
      //calculate the amount of pixels from the start of the frame
      let distanceFromStart = this.calculateLengthOfTimeBar(earliestDate, curItem.startNumDays)

      //find what row the current item belongs to
      while (rowNum < rowInfo.length && distanceFromStart < rowInfo[rowNum].latestVal) {
        rowNum++;
      }
      
      timeBarInPixels = this.calculateLengthOfTimeBar(curItem.startNumDays, curItem.endNumDays)
      if (rowNum < rowInfo.length) {
        //edit current row
        rowInfo[rowNum].itemsInRow.push(curItem);

        //update latestVal to represent the rightmost distance
        //choose between which element needs more space the text or the time bar
        rowInfo[rowNum].latestVal = distanceFromStart + Math.max(timeBarInPixels,curItem.textEstimatedLength); 
      } else {
        //add new row
        let newArr = [];
        newArr.push(curItem);
        rowInfo.push({
          itemsInRow: newArr,
          latestVal: distanceFromStart + Math.max(timeBarInPixels,curItem.textEstimatedLength),
          id: rowInfo.length + 1,
        });
      }
    }
    return rowInfo;

  }

  formatRow(curRow) {

    const {
      horizontalGridUnit,
      verticalGridUnit,
      earliestDate,
      gridTimeUnit,
      updateName,
    } = this.props;

    let prevBoundary = earliestDate;

    let formattedItems = curRow.map(
      (item) => {
        let spacerWidth = (item.startNumDays - prevBoundary - 1) * horizontalGridUnit / gridTimeUnit;
        let spacerHeight = verticalGridUnit;
        prevBoundary = item.endNumDays;

        return (
          <React.Fragment
            key = {`${item.id}-${item.name}-Fragment`}
          >
            <SpacerBetweenItemsView
              key = {`${item.id}-${item.name}-Spacer`}
              id = {`${item.id}-${item.name}`}
              width = {spacerWidth}
              height = {spacerHeight}
            >
            </SpacerBetweenItemsView>
            <TimelineItemViewModel
              key = {`${item.id}-${item.name}-Item`}
              horizontalGridUnit = {horizontalGridUnit}
              verticalGridUnit = {verticalGridUnit}
              gridTimeUnit= {gridTimeUnit}
              itemStart = {item.startNumDays}
              itemEnd = {item.endNumDays}
              id = {item.id}
              name= {item.name}
              textWidth = {item.textEstimatedLength}
              updateName = {updateName}
            />
          </React.Fragment>
        );
    })
    return formattedItems;
  }

  formatRows() {
    let formattedRows = this.state.rowInfo.map(
      (row) => {
        let formattedRow = this.formatRow(row.itemsInRow)

        return (
          
          <TimelineRowContainerView
            id = {row.id}
            key = {`timeline-row-${row.id}`}
            width = {this.props.containerWidth}
            height = {this.props.verticalGridUnit}
          >
            {formattedRow}
          </TimelineRowContainerView>
        );
      }
    );
    return formattedRows;
  }

  render() {
    const {
      earliestDate,
      latestDate,
      containerWidth,
      verticalGridUnit,
      dateObjFromNumDays,
      horizontalGridUnit,
      gridTimeUnit,
    } = this.props;

    let formattedRows = this.formatRows()
    return (
      <React.Fragment>
        <TimeAxisViewModel
          dateObjFromNumDays={dateObjFromNumDays}
          earliestDate={earliestDate}
          latestDate={latestDate}
          width={containerWidth}
          height={verticalGridUnit}
          horizontalGridUnit={horizontalGridUnit}
          gridTimeUnit={gridTimeUnit}
        />
        {formattedRows}
      </React.Fragment>
    );
  }
}

TimelineItemSorterViewModel.propTypes = {
  id: PropTypes.number,
  itemList: PropTypes.array,
  updateName: PropTypes.func,
  name: PropTypes.string,
  earliestDate: PropTypes.number,
  latestDate: PropTypes.number,
  containerWidth: PropTypes.number,
  verticalGridUnit: PropTypes.number,
  dateObjFromNumDays: PropTypes.func,
  horizontalGridUnit: PropTypes.number,
  gridTimeUnit: PropTypes.number,
};

export default TimelineItemSorterViewModel;