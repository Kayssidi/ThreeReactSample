import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import ThreeRenderer from "./threeRenderer";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  border: "red",
  borderStyle: "solid",
  borderWidth: "2px",
  height: "100vh",
  alignItems: "center",
  justifyContent: "space-around",
  display: "flex"
};

const App = () => (
  <div style={styles}>
    <ThreeRenderer />
  </div>
);

render(<App />, document.getElementById("root"));
