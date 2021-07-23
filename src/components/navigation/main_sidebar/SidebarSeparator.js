import React from "react";
import PropTypes from "prop-types";
// import { NavLink as RouteNavLink } from "react-router-dom";
// import { NavItem, NavLink } from "shards-react";

const SidebarSeparator = ({ item }) => {
  return <h6 className="main-sidebar__nav-title text-center py-2 m-1">separador</h6>;
};

SidebarSeparator.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarSeparator;
