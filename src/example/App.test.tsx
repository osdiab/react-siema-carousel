import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";

it("renders the examples app without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
