import React from "react";
import {render} from "react-dom";
import timelineItems from "./timelineItems";
import "./index.css";

const App = () => (
  <div>
    <h2>Start editing to see some magical funtimes happen {"\u2728"}</h2>
    <h3>{timelineItems.length} timeline items to render</h3>
  </div>
);

render(<App />, document.getElementById("root"));
