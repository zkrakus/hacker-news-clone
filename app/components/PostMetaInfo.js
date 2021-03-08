import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import { ThemeConsumer } from "../contexts/theme";

export default function PostMetaInfo({ by, time, id, descendants }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`meta-info-${theme}`}>
          <span>
            by{" "}
            <Link to={{ pathname: "/user", search: `?id=${by}` }}> {by} </Link>
          </span>
          <span>on {formatDate(time)}</span>
          <span>
            with{" "}
            <Link to={{ pathname: "post", search: `?id=${id}` }}>
              {descendants}
            </Link>{" "}
            comments
          </span>
        </div>
      )}
    </ThemeConsumer>
  );
}

PostMetaInfo.propTypes = {
  by: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  descendants: PropTypes.number,
};
