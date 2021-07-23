import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar } from "shards-react";

import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./navbar_nav/NavbarNav";
import NavbarToggle from "./NavbarToggle";

const MainNavbar = ({ layout, stickyTop }) => {
  const classes = classNames(
    "main-navbar",
    "bg-white",
    stickyTop && "sticky-top"
  );

  var months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

  let today = new Date();
  let date = `${today.toLocaleTimeString()}, ${today.getDate()} de ${
    months[today.getMonth()]
  } del ${today.getFullYear()}`;

  // let state = {
  //   date: date
  // };

  return (
    <div className={classes}>
      <Container className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          {/* <NavbarSearch /> */}
          <div className="main-navbar__company">
            <span>{date}</span>
            <h5 className="mb-0">Marval SA</h5>
          </div>
          <NavbarNav />
          <NavbarToggle />
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
