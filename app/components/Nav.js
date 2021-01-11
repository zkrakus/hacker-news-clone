import React from "react";
import PropTypes from "prop-types";

function NavLinks({ selected, onUpdateNav }) {
  const navs = ["Top", "New", "Best"];

  return (
    <ul className="flex-center">
      {navs.map((nav) => (
        <li key={nav}>
          <button
            className="btn-clear nav-link"
            style={nav === selected ? { color: "rgb(187,46, 31)" } : null}
            onClick={() => onUpdateNav(nav)}
          >
            {nav}
          </button>
        </li>
      ))}
    </ul>
  );
}

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
    const { selectedNav } = this.state;

    return (
      <React.Fragment>
        <NavLinks
          selected={selectedNav}
          onUpdateNav={this.updateNav}
        ></NavLinks>
      </React.Fragment>
    );
  }
}

NavLinks.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateNav: PropTypes.func.isRequired,
};
