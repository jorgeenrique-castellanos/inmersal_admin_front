import React from "react";
import PropTypes from "prop-types";
import Icons from "../../../assets/icons";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";

const SidebarNavItem = ({ item, showIcon }) => {
  const icons = Icons();
  let item_icon = showIcon ? icons[item.icon].icon : icons.circle_fill.icon;

  return (
    <NavItem>
      <NavLink tag={RouteNavLink} to={item.view_url}>
        {item.icon && (
          <div
            className={`d-inline-block item-icon-wrapper ${
              !showIcon ? "icon-small" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: item_icon }}
          />
        )}
        {item.title && <span>{item.title}</span>}
        {/* {item.htmlAfter && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
          /> 
        )}*/}
      </NavLink>
    </NavItem>
  );
};

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;
