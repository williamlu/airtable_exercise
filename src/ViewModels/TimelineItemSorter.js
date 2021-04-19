import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TimelineItemViewModel from './TimelineItemViewModel'

import TimelineRowContainerView from '../Views/TimelineRowContainerView';
import SpacerBetweenItemsView from '../Views/SpacerBetweenItemsView';

/* This class takes in the list of timeline items and organizes the items into rows
**
*/
class TimelineItemSorterViewModel extends React.Component {
  constructor(props) {
    super(props);

    this.greedyItemSort = this.greedyItemSort.bind(this);
    this.formatRow = this.formatRow.bind(this);
    this.formatRows = this.formatRows.bind(this);

    let rowInfo = this.greedyItemSort();
    this.state = {
      rowInfo: rowInfo
    }
  }

  calculateLengthOfTimeBar(itemStart, itemEnd) {
    const {
      horizontalGridUnit,
      gridTimeUnit,
    } = this.props;
    return (horizontalGridUnit / gridTimeUnit) * (itemEnd - itemStart + 1)
  }

  greedyItemSort() {
    const {
      itemList,
      earliestDate,
    } = this.props;

    let sortedItemList = itemList.sort(function(a, b){
      return a.startNumDays - b.startNumDays;
    })

    let rowInfo = [];


    let firstArr = [];

    let timeBarInPixels = this.calculateLengthOfTimeBar(sortedItemList[0].startNumDays, sortedItemList[0].endNumDays)
    firstArr.push(sortedItemList[0])
    rowInfo[0] = {
      itemsInRow: firstArr,
      latestVal: Math.max(timeBarInPixels,sortedItemList[0].textEstimatedLength),
      id: 1,
    };

    for(let i = 1; i< sortedItemList.length; i++) {
      let curItem = sortedItemList[i];

      let rowNum = 0;
      //find what row the current item belongs to
      let distanceFromStart = this.calculateLengthOfTimeBar(earliestDate, curItem.startNumDays)
      while (rowNum < rowInfo.length && distanceFromStart < rowInfo[rowNum].latestVal) {
        rowNum++;
      }
      
      timeBarInPixels = this.calculateLengthOfTimeBar(curItem.startNumDays, curItem.endNumDays)
      if (rowNum < rowInfo.length) {
        //edit current row
        rowInfo[rowNum].itemsInRow.push(curItem);
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
    console.log(rowInfo);
    return rowInfo;

  }

  formatRow(curRow) {

    const {
      horizontalGridUnit,
      verticalGridUnit,
      earliestDate,
      latestDate,
      gridTimeUnit,
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
      rowInfo,
    } = this.state;

    let formattedRows = this.formatRows()
    return (
      <React.Fragment>
        {formattedRows}
      </React.Fragment>
    );
  }
}


export default TimelineItemSorterViewModel