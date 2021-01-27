import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Nav from "./components/Nav";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Nav />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
