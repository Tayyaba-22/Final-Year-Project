import React, { useRef, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import "./header.css";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { useAuth } from "../../customer-hooks/useAuth";

const nav_links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/shop",
    display: "Shop",
  },
  {
    path: "/cart",
    display: "Cart",
  },
  {
    path: "/customization",
    display: "Customization",
  },
];

const Header = () => {
  const HeaderRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showProfileActions, setShowProfileActions] = useState(false);

  const navigateToTop = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // This ensures the page will scroll to the top after navigation
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        HeaderRef.current.classList.add("sticky_header");
      } else {
        HeaderRef.current.classList.remove("sticky_header");
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const menuRef = useRef(null);
  const menuToggle = () => menuRef.current.classList.toggle("active_menu");

  const toggleProfileActions = () => {
    setShowProfileActions(!showProfileActions);
    setTimeout(() => {
      setShowProfileActions(false);
    }, 3000);
  };

  return (
    <header className="header" ref={HeaderRef}>
      <Container>
        <Row>
          <div className="nav_wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>DropShop</h1>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      onClick={() => navigateToTop(item.path)}
                      className={({ isActive }) =>
                        isActive ? "nav_active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav_icons ">
              <span
                className="cart_icon mt-2"
                onClick={() => navigateToTop("/cart")}
              >
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={userIcon}
                  alt="User Icon"
                  onClick={toggleProfileActions}
                />
                {showProfileActions && (
                  <div className="profile_actions">
                    {currentUser ? (
                      <span onClick={logout}>Logout</span>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center flex-column">
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/login">Login</Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="mobile_menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
