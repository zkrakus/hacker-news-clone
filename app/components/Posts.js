import React from "react";
import PropTypes from "prop-types";
import { fetchMainPosts } from "../utils/api";
import Loading from "./Loading";

function formatDate(date) {
  return (
    date.getMonth() +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    "," +
    " " +
    (date.getHours() === 12 || date.getHours() === 0
      ? 12
      : date.getHours() % 12) +
    ":" +
    date.getMinutes().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    " " +
    (date.getHours() > 11 ? "PM" : "AM")
  );
}

function NavLinks({ selected, onUpdateNav }) {
  const navs = ["Top", "New", "Best"];

  return (
    <nav className="row space-between">
      <ul className="row nav">
        {navs.map((nav) => (
          <li key={nav}>
            <a
              className="nav-link"
              style={nav === selected ? { color: "rgb(187,46, 31)" } : null}
              onClick={() => onUpdateNav(nav)}
            >
              {nav}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function PostsLists({ posts }) {
  //console.log(posts);

  return (
    <ul className="list space-around">
      {posts.map((post) => {
        const { title, by, time, descendants, id, kids, url } = post;
        let post_dateTime = new Date(time * 1000); // convert to milliseconds

        return (
          <li key={id} className="post">
            <a className="link" href={url}>
              {/* Be sure to link to a comments when there is no URL */}
              {title}
            </a>
            <div className="meta-info-light">
              <span>
                by&nbsp;
                <a href={"/"}>{by}</a>
              </span>
              <span>
                on&nbsp;
                {formatDate(post_dateTime)}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

PostsLists.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default class Posts extends React.Component {
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
        {this.isLoading() && <Loading speed={300} text="Loading" />}
        {error && <p>{error}</p>}
        {posts[selectedNav] && <PostsLists posts={posts[selectedNav]} />}
      </React.Fragment>
    );
  }
}

NavLinks.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateNav: PropTypes.func.isRequired,
};
