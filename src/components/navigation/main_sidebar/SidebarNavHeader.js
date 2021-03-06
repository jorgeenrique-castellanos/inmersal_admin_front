import React, { Children } from "react";
import PropTypes from "prop-types";
import Icons from "../../../assets/icons";
import classNames from "classnames";
// import { NavLink as RouteNavLink } from "react-router-dom";
// import { NavItem, NavLink } from "shards-react";

const SidebarNavHeader = ({
  item,
  currentItemId,
  visibilitySubItems,
  children,
  showSubItems
}) => {
  const icons = Icons();

  return (
    <div className="nav-header">
      <a
        id={item.id}
        href="#"
        className="nav-link"
        onClick={() => {
          item.id === currentItemId
            ? showSubItems(!visibilitySubItems, item.id)
            : showSubItems(true, item.id);
        }}
      >
        {item.icon && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{
              __html: icons[item.icon].icon
            }}
          />
        )}
        <span>{item.title}</span>
        <div
          className={`d-inline-block item-icon-wrapper icon-arrow-indicator ${
            visibilitySubItems && item.id === currentItemId ? "rotate-icon" : ""
          }`}
          dangerouslySetInnerHTML={{
            __html: icons.arrow_right_mini.icon
          }}
        />
      </a>
      <div
        className={`nav-sub-items ${
          visibilitySubItems && item.id === currentItemId ? "show" : ""
        }`}
      >
        {children}
        {/* {console.log(item)}
        {console.log(item.sub_items)} */}

        {/* {children === item.id } */}
      </div>
    </div>  
  );
};

SidebarNavHeader.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavHeader;
