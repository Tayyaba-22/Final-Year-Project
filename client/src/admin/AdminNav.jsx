import React from "react";
import { Container } from "reactstrap";
import userIcon from "../assets/images/user-icon.png";
import { useAuth } from "../customer-hooks/useAuth";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/admin-nav.css";

const admin_nav = [
  // { display: "Dashboard", path: "/dashboard" },
  { display: "Add-Product", path: "/dashboard/add-product" },
  { display: "All-Products", path: "/dashboard/all-products" },
  { display: "Orders", path: "/dashboard/orders" },
  { display: "Users", path: "/dashboard/users" },
  { display: "Issues", path: "/dashboard/issues" },
];

const AdminNav = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <header className="admin_header">
        <div className="admin_nav-top">
          <Container>
            <div className="admin_nav-wrapper-top">
              <div className="logo">
                <h2>DropShop</h2>
              </div>
              <div className="admin_nav-top-right">
                <span>
                  <i className="ri-notification-3-line"></i>
                </span>
                <span>
                  <i className="ri-settings-2-line"></i>
                </span>
                <img src={userIcon} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </header>

      <div className="admin_sidebar">
        <ul className="admin_menu-list">
          {admin_nav.map((item, index) => (
            <li className="admin_menu-item" key={index}>
              <NavLink
                to={item.path}
                className={(navClass) =>
                  navClass.isActive ? "active_admin-menu" : ""
                }
              >
                {item.display}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin_content">
        <Outlet />
      </div>
    </>
  );
};

export default AdminNav;
