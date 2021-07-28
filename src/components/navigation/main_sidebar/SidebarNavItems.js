import React, { useState } from "react";
import { Nav } from "shards-react";
import Icons from "../../../assets/icons";
import SidebarNavItem from "./SidebarNavItem";
import SidebarNavHeader from "./SidebarNavHeader";
import SidebarSeparator from "./SidebarSeparator";
import { Store } from "../../../flux";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nav_items: Store.getSidebarItems(),
      visibility_sub_items: false,
      current_item_id: false
    };
    this.showSubItems = this.showSubItems.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  showSubItems(value, item) {
    this.setState({ visibility_sub_items: value, current_item_id: item });
  }

  onChange() {
    this.setState({
      ...this.state,
      nav_items: Store.getSidebarItems()
    });
  }

  render() {
    const { nav_items: items } = this.state;
    const { visibility_sub_items: visibility_sub_items } = this.state;
    const { current_item_id: current_item_id } = this.state;
    const icons = Icons();

    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => {
            if (item.sub_items) {
              return (
                <SidebarNavHeader
                  item={item}
                  currentItemId={current_item_id}
                  visibilitySubItems={visibility_sub_items}
                  showSubItems={this.showSubItems}
                >
                  {item.sub_items.map((item, idx) => {
                    // console.log(<SidebarNavItem />);

                    return (
                      <>
                        <SidebarNavItem
                          key={idx}
                          item={item}
                          showIcon={false}
                        />
                      </>
                    );
                  })}
                </SidebarNavHeader>
                // <div className="nav-header">
                //   <a
                //     id={item.id}
                //     href="#"
                //     className="nav-link"
                //     onClick={() => {
                //       item.id === current_item_id
                //         ? this.showSubItems(!visibility_sub_items, item.id)
                //         : this.showSubItems(true, item.id);
                //     }}
                //   >
                //     {item.icon && (
                //       <div
                //         className="d-inline-block item-icon-wrapper"
                //         dangerouslySetInnerHTML={{
                //           __html: icons[item.icon].icon
                //         }}
                //       />
                //     )}
                //     <span>{item.title}</span>
                //     <div
                //       className={`d-inline-block item-icon-wrapper icon-arrow-indicator ${
                //         visibility_sub_items && item.id === current_item_id
                //           ? "rotate-icon"
                //           : ""
                //       }`}
                //       dangerouslySetInnerHTML={{
                //         __html: icons.arrow_right_mini.icon
                //       }}
                //     />
                //   </a>
                //   <div
                //     className={`nav-sub-items ${
                //       visibility_sub_items && item.id === current_item_id
                //         ? "show"
                //         : ""
                //     }`}
                //   >
                //     {item.sub_items.map((item, idx) => {
                //       return (
                //         <SidebarNavItem
                //           key={idx}
                //           item={item}
                //           showIcon={false}
                //         />
                //       );
                //     })}
                //   </div>
                // </div>
              );
            } else if (item.type === "separator") {
              return <SidebarSeparator key={idx} item={item} />;
            } else {
              return <SidebarNavItem key={idx} item={item} showIcon={true} />;
            }
          })}
        </Nav>
      </div>
      // <div className="nav-wrapper">
      //   <Nav className="nav--no-borders flex-column">
      //     {items.map((item, idx) => {
      //       if (item.type === "link") {
      //         return <SidebarNavItem key={idx} item={item} />;
      //       } else if (item.type === "separator") {
      //         return <SidebarSeparatorItem key={idx} item={item} />;
      //       }
      //     })}
      //   </Nav>
      // </div>
    );
  }
}

export default SidebarNavItems;
