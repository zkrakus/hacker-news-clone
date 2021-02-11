import React from "react";
import PropTypes from "prop-types";
import { fetchMainPosts } from "../utils/api";
import PostsList from "./PostsList";

// We pull Top posts both for the Top filterId and on the homepage where the match props is empty
function getFilterIdFromProps(props) {
  return "filterId" in props.match.params ? props.match.params.filterId : "Top";
}

export default class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: {},
      error: null,
      loading: true,
      filterId: getFilterIdFromProps(props),
    };

    this.handleFetch = this.handleFetch.bind(this);
    // this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.handleFetch(this.state.filterId);
  }

  componentDidUpdate(prevProps, prevState) {
    let filterId = getFilterIdFromProps(this.props);
    let prevFilterId = getFilterIdFromProps(prevProps);

    if (
      filterId !== prevFilterId &&
      !this.state.posts[filterId] &&
      this.state.loading !== true
    )
      this.handleFetch(filterId);

    if (this.state.filterId != filterId) this.setState({ filterId });
  }

  handleFetch(filterId) {
    this.setState({
      error: null,
      loading: true,
    });

    fetchMainPosts(filterId)
      .then((data) => {
        this.setState(({ posts }) => ({
          posts: {
            ...posts,
            [filterId]: data,
          },
          filterId,
          loading: false,
          error: false,
        }));
      })
      .catch(({ message }) => {
        console.warn("Error fetching posts", message);

        this.setState({
          error: message,
          loading: false,
        });
      });
  }

  // isLoading() {
  //   const { selectedNav, posts, error } = this.state;

  //   return !posts[selectedNav] && error === null;
  // }

  render() {
    const { filterId, posts, error } = this.state;

    return (
      <React.Fragment>
        {/* {{this.isLoading() && <Loading speed={300} text="Loading" />} */}
        {/* {error && <p>{error}</p>} */}
        {posts[filterId] && <PostsList posts={posts[filterId]} />}
      </React.Fragment>
    );
  }
}

// NavLinks.propTypes = {
//   selected: PropTypes.string.isRequired,
//   onUpdatePosts: PropTypes.func.isRequired,
// };
