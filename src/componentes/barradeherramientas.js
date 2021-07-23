import React, { useState } from "react";

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse,
  Button
} from "shards-react";


export default ({ titulo }) => {
  const [estado, setEstado] = useState({ dropdownOpen: false, collapseOpen: false });

  const toggleNavbar = () => setEstado({
    ...estado,
    collapseOpen: !estado.collapseOpen
  });

  const toggleDropdown = () => setEstado({
    ...estado,
    dropdownOpen: !estado.dropdownOpen
  });

  return (
    <Navbar type="dark" theme="primary" expand="md">
      <NavbarBrand href="#">{titulo}</NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />

      <Collapse open={estado.collapseOpen} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink active href="#">
              Active
              </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" disabled>
              Disabled
              </NavLink>
          </NavItem>
          <Dropdown
            open={estado.dropdownOpen}
            toggle={toggleDropdown}
          >
            <DropdownToggle nav caret>
              Dropdown
              </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </Dropdown>
      
        </Nav>

        <Nav navbar className="ml-auto">
          <InputGroup size="sm" seamless>
            <InputGroupAddon type="prepend">
              <InputGroupText>
                {/* <FontAwesomeIcon icon={faSearch} /> */}
              </InputGroupText>
            </InputGroupAddon>
            <FormInput className="border-0" placeholder="Search..." />
          </InputGroup>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
