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
import React from "react";
// reactstrap components

import { firebaseApp } from '../../utils/Firebase';

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

function UserNavbar() {

  function signOut() {
    firebaseApp.auth().signOut();
  }

  function getUsername() {
    return firebaseApp.auth().currentUser.email;
  }

  return (
    <Nav className="align-items-center d-none d-md-flex" navbar>
      <UncontrolledDropdown nav>
        <DropdownToggle className="pr-0" nav>
          <Media className="align-items-center">
            <span className="avatar avatar-sm rounded-circle">
              <img
                alt="..."
                src={require("../../assets/img/theme/react.jpg")}
              />
            </span>
            <Media className="ml-2 d-none d-lg-block">
              <span className="mb-0 text-sm font-weight-bold">
                {getUsername()}
              </span>
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome!</h6>
          </DropdownItem>
          <DropdownItem href="#pablo" onClick={signOut}>
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
