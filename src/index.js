import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import ThreeRenderer from "./threeRenderer";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  border: "red",
  borderStyle: "solid",
  borderWidth: "0px",
  height: "100vh",
  alignItems: "center",
  justifyContent: "space-around",
  display: "flex",
  padding: "0px",
  margin: "0px"
};

const App = () => (
  <div style={styles}>
    <ThreeRenderer />
  </div>
);

render(<App />, document.getElementById("root"));
