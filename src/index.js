import React from "react";
import {render} from "react-dom";
import timelineItems from "./timelineItems";
import "./index.css";
import TimelineViewModel from "./ViewModels/TimelineViewModel"

const App = () => (
  <div
    className = {`TimelineApp`}
  >
    <h3>{window.innerWidth} x {window.innerHeight}</h3>
    <TimelineViewModel
      windowHeight = {window.innerHeight}
      windowWidth = {window.innerWidth}
      timelineItems = {timelineItems}
    />
  </div>
);

render(<App />, document.getElementById("root"));
