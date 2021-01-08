import React from "react";

export default class Nav extends React.Component {
  render() {
    const navList = ["Top", "New"];

    return (
      <ul className="flex-center">
        {navList.map((navItem) => (
          <li key={navItem}>
            <button className="btn-clear nav-link">{navItem}</button>
          </li>
        ))}
      </ul>
    );
  }
}
