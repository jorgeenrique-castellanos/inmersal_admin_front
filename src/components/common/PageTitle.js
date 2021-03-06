import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Col } from "shards-react";

const PageTitle = ({ title, subtitle, className, ...attrs }) => {
  const classes = classNames(
    className,
    "text-center",
    // "",
    "mb-sm-0"
  );

  return (
    <Col lg="12" xs="12" sm="4" className={classes} {...attrs}>
      <h3 className="page-title">{title}</h3>
      <span className="page-subtitle">{subtitle}</span>
    </Col>
  );
};

PageTitle.propTypes = {
  /**
   * The page title.
   */
  title: PropTypes.string,
  /**
   * The page subtitle.
   */
  subtitle: PropTypes.string
};

export default PageTitle;
