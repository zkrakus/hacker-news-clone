import React from "react";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNav: "Top",
    };

    // This matters when we are passing the invocation to another component
    this.updateNav = this.updateNav.bind(this);
  }

  updateNav(selectedNav) {
    this.setState({ selectedNav: selectedNav });
  }

  render() {
    const navs = ["Top", "New"];

    return (
      <ul className="flex-center">
        {navs.map((nav) => (
          <li key={nav}>
            <button
              className="btn-clear nav-link"
              style={
                nav === this.state.selectedNav
                  ? { color: "rgb(187,46, 31)" }
                  : null
              }
              onClick={() => this.updateNav(nav)}
            >
              {nav}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
