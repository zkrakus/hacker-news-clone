import React from "react";
import PropTypes from "prop-types";
import { fetchMainPosts, fetchPosts } from "../utils/api";

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
      posts: {},
      error: null,
    };

    this.updateNav = this.updateNav.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateNav(this.state.selectedNav);
  }

  updateNav(selectedNav) {
    this.setState({
      selectedNav: selectedNav,
      error: null,
    });

    if (!this.state.posts[selectedNav]) {
      fetchMainPosts(selectedNav)
        .then((data) => {
          this.setState(({ posts }) => ({
            posts: {
              ...posts,
              [selectedNav]: data,
            },
          }));
        })
        .catch(() => {
          console.warn("Error fetching posts", error);

          this.setState({
            error: "There was an error fetching the posts.",
          });
        });
    }
  }

  isLoading() {
    const { selectedNav, posts, error } = this.state;

    return !posts[selectedNav] && error === null;
  }

  render() {
    const { selectedNav, posts, error } = this.state;

    return (
      <React.Fragment>
        <NavLinks
          selected={selectedNav}
          onUpdateNav={this.updateNav}
        ></NavLinks>
        {this.isLoading() && <p>LOADING</p>}
        {error && <p>{error}</p>}
        {posts[selectedNav] && (
          <pre>{JSON.stringify(posts[selectedNav], null, 2)}</pre>
        )}
      </React.Fragment>
    );
  }
}

NavLinks.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateNav: PropTypes.func.isRequired,
};
