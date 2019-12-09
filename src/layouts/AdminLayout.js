import React from 'react';

import { Container } from "reactstrap";

import AdminNavbar from "../components/Navbars/AdminNavbar.jsx";
import AdminFooter from "../components/Footers/AdminFooter.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";

import Header from "../components/Headers/Header.jsx";

function AdminLayout({ children }) {
  return (
    <>
      <Sidebar
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "..."
        }}
      />
      <div className="main-content">
        <AdminNavbar />
        <Header />
            <Container className="mt--7" fluid>
          {children}
          </Container>

        <Container fluid>
          {/* <AdminFooter /> */}
        </Container>
      </div>
    </>
  );
}

export default AdminLayout;