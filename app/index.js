import React from "react";
import ReactDOM, { render } from "react-dom";
import "./index.css";
import Posts from "./components/Posts";
import User from "./components/User";
import Nav from "./components/Nav";
import Loading from "./components/Loading";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />

          <React.Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route path="/:filterId" component={Posts} />
              <Route path="/user" component={User} />
              <Route
                render={() => {
                  <h1>404</h1>;
                }}
              />
            </Switch>
          </React.Suspense>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
