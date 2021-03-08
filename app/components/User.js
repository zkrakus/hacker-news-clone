import React from "react";
import queryString from "query-string";
import { fetchUser, fetchPosts } from "../utils/api";
import { formatDate } from "../utils/helpers";
import PostsList from "./PostsList";

// function formatDate(date) {
//   return (
//     date.getMonth() +
//     "/" +
//     date.getDate() +
//     "/" +
//     date.getFullYear() +
//     "," +
//     " " +
//     (date.getHours() === 12 || date.getHours() === 0
//       ? 12
//       : date.getHours() % 12) +
//     ":" +
//     date.getMinutes().toLocaleString("en-US", {
//       minimumIntegerDigits: 2,
//       useGrouping: false,
//     }) +
//     " " +
//     (date.getHours() > 11 ? "PM" : "AM")
//   );
// }

export default class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
      user: null,
      posts: null,
    };

    this.handleFetch = this.handleFetch.bind(this);
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);

    this.handleFetch(id);
  }

  handleFetch(id) {
    fetchUser(id)
      .then((user) => {
        this.setState({
          loading: false,
          error: null,
          user: user,
        });

        return fetchPosts(user.submitted.slice(0, 30));
      })
      .then((posts) => {
        this.setState({
          posts: posts,
          error: null,
        });
      })
      .catch(({ message }) => {
        console.warn("Error fetching user", message);

        this.setState({
          error: message,
          loading: false,
        });
      });
  }

  render() {
    const { user, posts } = this.state;

    return (
      <React.Fragment>
        <h1 className="header">{user && user.id}</h1>
        <div className="meta-info-light">
          <span>
            joined&nbsp;
            {/* <b>{user && formatDate(new Date(user.created * 1000))}&nbsp;</b> */}
            <b>{user && formatDate(new Date(user.created))}&nbsp;</b>
            has&nbsp;
            <b>{user && user.karma}&nbsp;</b>
            karma
          </span>
        </div>
        <h2>Posts</h2>
        {posts && <PostsList posts={posts} />}
      </React.Fragment>
    );
  }
}
