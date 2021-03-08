import React from "react";
import queryString from "query-string";
import { fetchItem, fetchComments } from "../utils/api";
import PostMetaInfo from "./PostMetaInfo";
import Title from "./Title";
import Comment from "./Comment";

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingPost: true,
      loadingComments: true,
      post: null,
      comments: null,
      error: null,
    };

    this.handleFetch = this.handleFetch.bind(this);
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);

    this.handleFetch(id);
  }

  handleFetch(id) {
    fetchItem(id)
      .then((post) => {
        this.setState({
          post,
          error: null,
          loadingPost: false,
        });

        return fetchComments(post.kids || []);
      })
      .then((comments) => {
        this.setState({
          loadingComments: false,
          error: null,
          comments,
        });
      })
      .catch((message) => {
        this.setState({
          error: message,
          loadingPost: false,
          loadingComments: false,
        });
      });
  }

  render() {
    const { post, comments, loadingComments, loadingPost, error } = this.state;

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return (
      <React.Fragment>
        {!loadingPost && (
          <React.Fragment>
            <h1 className="header">
              <Title url={post.url} title={post.title} id={post.id} />
            </h1>
            <PostMetaInfo
              by={post.by}
              time={post.time}
              id={post.id}
              descendants={post.descendants}
            />
          </React.Fragment>
        )}
        {!loadingPost &&
          !loadingComments &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </React.Fragment>
    );
  }
}
