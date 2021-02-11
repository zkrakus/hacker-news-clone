import React from "react";
import PropTypes from "prop-types";

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

export default function PostsList({ posts }) {
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

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};
