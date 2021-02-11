import React from "react";
import { NavLink } from "react-router-dom";

const activeStyle = { color: "rgb(187, 46, 31)" };

export default class Nav extends React.Component {
  render() {
    return (
      <ul className="row nav">
        <li>
          <NavLink
            to="/Top"
            isActive={(match, location) => {
              if (location.pathname === "/Top" || location.pathname === "/")
                return true;
            }}
            activeStyle={activeStyle}
            className="nav-link"
          >
            Top
          </NavLink>
        </li>
        <li>
          <NavLink to="/New" activeStyle={activeStyle} className="nav-link">
            New
          </NavLink>
        </li>
        <li>
          <NavLink to="/Best" activeStyle={activeStyle} className="nav-link">
            Best
          </NavLink>
        </li>
      </ul>
    );
  }
}
