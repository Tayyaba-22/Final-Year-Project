import React from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import confirmed from "../assets/videos/confirmed.gif";
import { toast } from "react-toastify";
import "../styles/onlinepayment.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcMastercard, faCcVisa } from "@fortawesome/free-brands-svg-icons";

const Checkout = () => {
  const navigate = useNavigate();
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic for form submission here if needed
    toast.success("Your Order is confirmed");
    navigate("/");
  };

  return (
    <Helmet title="Online Payment">
      <CommonSection title="Online Payment" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className=" heading2 mb-4  text-center">
                Online Payment Information
              </h6>
              <Form onSubmit={handleSubmit}>
                <FormGroup className="form_group">
                  <Label for="Master Card">Master Card:</Label>
                  <div className="input-icon">
                    <FontAwesomeIcon icon={faCcMastercard} className="icon1" />
                    <Input
                      type="number"
                      id="number"
                      placeholder="**** **** **** 3129"
                    />
                  </div>
                </FormGroup>

                <FormGroup className="form_group">
                  <Label for="Visa Card">Visa Card:</Label>
                  <div className="input-icon">
                    <FontAwesomeIcon icon={faCcVisa} className="icon" />
                    <Input
                      type="number"
                      id="number"
                      placeholder="**** **** **** 4212"
                    />
                  </div>
                </FormGroup>

                <Label className="Heading">Add New Card</Label>
                <FormGroup className="form_group">
                  <Label for="Name">User Name:</Label>
                  <Input type="name" id="name" placeholder="Name...." />
                </FormGroup>

                <FormGroup className="form_group">
                  <Label for="Number">Card Number:</Label>
                  <Input
                    type="number"
                    id="number"
                    placeholder="**** **** **** ****"
                  />
                </FormGroup>

                <FormGroup className="form_group">
                  <Label for="Expire">Expire:</Label>
                  <Input type="date" id="date" placeholder="" />
                </FormGroup>

                <FormGroup className="form_group">
                  <Label for="Number">Cvv:</Label>
                  <Input type="number" id="number" placeholder="" />
                </FormGroup>

                <button
                  type="submit"
                  className="buy_btn auth_btn w-100"
                  style={{ color: "var(--primary-color)" }}
                >
                  Confirm Order
                </button>
              </Form>
            </Col>
            <Col lg="4 mt-5">
              <div className="checkout_cart">
                <h6>
                  Total Qty: <span>{totalQty} Items</span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Shipping:
                    <br />
                    free shipping
                  </span>
                  <span>$0</span>
                </h6>
                <h6>Free Shipping</h6>
                <h4>
                  Total Cost: <span>${totalAmount}</span>
                </h4>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="confirmed">
                <img
                  src={confirmed}
                  alt="Payment Confirmation"
                  style={{ width: "30rem", height: "30rem" }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
