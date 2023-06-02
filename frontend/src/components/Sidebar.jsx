import React, { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

const Sidebar = () => {
  const [active, setActive] = useState(true);
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "scroll initial",
        position: "sticky",
        top: "0",
      }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader
          prefix={
            <i
              className="toggle-button fa fa-bars fa-large"
              onClick={() => (active ? setActive(false) : setActive(true))}
            ></i>
          }
        >
          <img src={logo} alt="" style={{ width: "50px" }} />
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <Form className="d-flex sidebar-form">
            <Form.Control
              type="search"
              placeholder={`${active ? "Search" : ""}`}
              className="me-2 rounded"
              aria-label="Search"
            />
            <Button
              variant="outline-secondary"
              className={active ? "" : "button-icon-position"}
            >
              <i className="fa-solid fa-magnifying-glass" />
            </Button>
          </Form>
          <CDBSidebarMenu>
            <NavLink to="/">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/cart">
              <CDBSidebarMenuItem icon="shop">Cart</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/profile">
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/analytics">
              <CDBSidebarMenuItem icon="chart-line">
                Analytics
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/hero404" target="_blank">
              <CDBSidebarMenuItem icon="exclamation-circle">
                404 page
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            <div
              className={`cbs-footer ${active ? "" : "change-flex"}`}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                margin: "20px 0",
              }}
            >
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-twitter"></i>
            </div>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
