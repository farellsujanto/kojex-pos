/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, { useContext } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import { PathContext } from '../../store/Context';

function DocumentationSideBar() {
  return (
    <Nav className="mb-md-3" navbar>
      <NavItem>
        <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/documentation/overview?ref=adr-admin-sidebar">
          <i className="ni ni-spaceship" />
          Getting started
                </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/documentation/colors?ref=adr-admin-sidebar">
          <i className="ni ni-palette" />
          Foundation
                </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/documentation/alerts?ref=adr-admin-sidebar">
          <i className="ni ni-ui-04" />
          Components
                </NavLink>
      </NavItem>
    </Nav>
  );
}

function UserSidebar() {
  return (
    <Nav className="align-items-center d-md-none">
      <UncontrolledDropdown nav>
        <DropdownToggle nav className="nav-link-icon">
          <i className="ni ni-bell-55" />
        </DropdownToggle>
        <DropdownMenu
          aria-labelledby="navbar-default_dropdown_1"
          className="dropdown-menu-arrow"
          right
        >
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Something else here</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <UncontrolledDropdown nav>
        <DropdownToggle nav>
          <Media className="align-items-center">
            <span className="avatar avatar-sm rounded-circle">
              <img
                alt="..."
                src={require("../../assets/img/theme/team-1-800x800.jpg")}
              />
            </span>
          </Media>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome!</h6>
          </DropdownItem>
          <DropdownItem to="/admin/user-profile">
            <i className="ni ni-single-02" />
            <span>My profile</span>
          </DropdownItem>
          <DropdownItem to="/admin/user-profile">
            <i className="ni ni-settings-gear-65" />
            <span>Settings</span>
          </DropdownItem>
          <DropdownItem to="/admin/user-profile">
            <i className="ni ni-calendar-grid-58" />
            <span>Activity</span>
          </DropdownItem>
          <DropdownItem to="/admin/user-profile">
            <i className="ni ni-support-16" />
            <span>Support</span>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
            <i className="ni ni-user-run" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  );
}

function NavigationItem({ title, path }) {

  const [, setPath] = useContext(PathContext);

  return (
    <NavItem>
      <NavLink
        style={{ cursor: 'pointer' }}
        onClick={() => setPath(path)}
        activeClassName="active"
      >
        <i className="ni ni-tv-2 text-primary" />
        {title}
      </NavLink>
    </NavItem>
  );
}

function Sidebar() {

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        <Collapse navbar isOpen={true}>
          <h6 className="navbar-heading text-muted">Navigation</h6>
          <Nav navbar>

            <NavigationItem
              title="Home"
              path="/"
            />

            <NavigationItem
              title="Cashier"
              path="/cashier"
            />

          </Nav>

        </Collapse>
      </Container>
    </Navbar>
  );

}


export default Sidebar;
