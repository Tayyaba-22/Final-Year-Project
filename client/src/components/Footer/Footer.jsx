import React from "react";
import "./Footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Mastercard from "../../assets/images/mastercard.png";
import VisaCard from "../../assets/images/visacard.jpg";
import Easypaisa from "../../assets/images/easypaisa.jpg";
import CashonDelivery from "../../assets/images/cod.webp";

const Footer = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle navigation and scroll to top
  const navigateAndScroll = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" className="mb-4" md="6">
            <div className="logo">
              <div>
                <h1 className="text-white mt-4">DropShop</h1>
              </div>
            </div>
            <p className="footer_text mt-5">
              Dropshop clothing is a work of art. They are made for the modern
              men in world-class comfortable fabrics and tastefully modern
              designs.
            </p>
          </Col>

          <Col lg="3" md="4">
            <div className="footer_quick-links">
              <h4 className="quick_links-title" style={{ color: "white" }}>
                Useful Links
              </h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <span
                    onClick={() => navigateAndScroll("/shop")}
                    className="link-button"
                  >
                    Shop
                  </span>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <span
                    onClick={() => navigateAndScroll("/cart")}
                    className="link-button"
                  >
                    Cart
                  </span>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <span
                    onClick={() => navigateAndScroll("/login")}
                    className="link-button"
                  >
                    Login
                  </span>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <span
                    onClick={() => navigateAndScroll("/customersupport")}
                    className="link-button"
                  >
                    Customer Support
                  </span>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3" md="4">
            <div className="footer_quick-links">
              <h4 className="quick_links-title" style={{ color: "white" }}>
                Contact
              </h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0 d-flex aligm-items-center gap-2">
                  <span>
                    <i
                      className="ri-map-pin-line"
                      style={{ color: "gray" }}
                    ></i>
                  </span>
                  <p>Shop # 2, Rehman Plaza, BlueArea, Islamabad</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex aligm-items-center gap-2">
                  <span>
                    <i className="ri-phone-line" style={{ color: "gray" }}></i>
                  </span>
                  <p>03145389136</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex aligm-items-center gap-2">
                  <span>
                    <i className="ri-mail-line" style={{ color: "gray" }}></i>
                  </span>
                  <p>dropshop123@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2" md="2">
            <div className="footer_quick-links1">
              <h4 className="quick_links-title" style={{ color: "white" }}>
                We Accept
              </h4>
              <div className="images">
                <img
                  src={Mastercard}
                  alt=""
                  style={{ width: "5rem", height: "5rem" }}
                  className="mastercard"
                />
                <img
                  src={VisaCard}
                  alt=""
                  style={{ width: "5rem", height: "5rem" }}
                  className="visacard"
                />
                <img
                  src={Easypaisa}
                  alt=""
                  style={{ width: "5rem", height: "5rem" }}
                  className="easypaisa"
                />
                <img
                  src={CashonDelivery}
                  alt=""
                  style={{ width: "5rem", height: "5rem" }}
                  className="cod"
                />
              </div>
            </div>
          </Col>
          <Col lg="12">
            <p className="footer_copyright">
              Copyright {year} developed by Tayyaba Saleem and Kashif Riaz. All
              rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
