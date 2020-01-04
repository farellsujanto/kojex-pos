import React, { useContext } from "react";

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

import { RoleContext } from '../../store/Context';

function UserNavbar() {

  const [role] = useContext(RoleContext);

  return (
    <Nav className="align-items-center d-none d-md-flex" navbar>
      <UncontrolledDropdown nav>
        <DropdownToggle className="pr-0" nav>
          <Media className="align-items-center">
            {role} {' '}
            <span className="avatar avatar-sm rounded-circle">
              <img
                alt="..."
                src={require("../../assets/img/theme/react.jpg")}
              />
            </span>
            <Media className="ml-2 d-none d-lg-block">
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome!</h6>
          </DropdownItem>
          <DropdownItem href="#pablo" onClick={() => { }}>
            <i className="ni ni-user-run" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  );
}


function AdminNavbar() {

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>

          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">

          </Form>
          <UserNavbar />
        </Container>
      </Navbar>
    </>
  );

}

export default AdminNavbar;
