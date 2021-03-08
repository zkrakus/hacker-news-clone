import React from "react";
import PropTypes from "prop-types";
import { fetchMainPosts } from "../utils/api";
import PostsList from "./PostsList";
import Loading from "./Loading";

// We pull Top posts both for the Top filterId and on the homepage where the match props is empty
function checkDefaultPostType(type) {
  return !type ? "Top" : type;
}

export default class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: {},
      error: null,
      loading: true,
    };

    this.handleFetch = this.handleFetch.bind(this);
  }

  componentDidMount() {
    let type = checkDefaultPostType(this.props.type);
    this.handleFetch(type);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      let type = checkDefaultPostType(this.props.type);
      this.handleFetch(type);
    }
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

  render() {
    const { filterId, posts, error, loading } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return (
      <React.Fragment>
        <PostsList posts={posts[filterId]} />
      </React.Fragment>
    );
  }
}

Posts.propTypes = {
  type: PropTypes.oneOf(["Top", "New", "Best"]),
};
