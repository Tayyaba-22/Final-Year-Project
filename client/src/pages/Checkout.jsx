import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import order from "../assets/videos/order.mp4";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import "../styles/checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { cartActions } from "../Redux/slices/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const initialState = {
    Name: "",
    Email: "",
    Phone: "",
    Address: "",
    City: "",
    PostelCode: "",
    Country: "",
    Payment_Type: "",
  };

  const [uState, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const setdata = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !uState.Email ||
      !uState.Phone ||
      !uState.Address ||
      !uState.City ||
      !uState.PostelCode ||
      !uState.Country ||
      !uState.Payment_Type
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8004/Orderdetails",
        uState
      );
      if (res.status === 201) {
        setState(initialState);
        toast.success("Your Order is confirmed");
        dispatch(cartActions.clearCart());
        uState.Payment_Type === "Online"
          ? navigate("/onlinepayment")
          : navigate("/");
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Name:</Label>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={uState.Name}
                    onChange={setdata}
                    name="Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email:</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={uState.Email}
                    onChange={setdata}
                    name="Email"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Phone:</Label>
                  <Input
                    type="text"
                    placeholder="Phone"
                    value={uState.Phone}
                    onChange={setdata}
                    name="Phone"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Address:</Label>
                  <Input
                    type="text"
                    placeholder="Enter Your Address"
                    value={uState.Address}
                    onChange={setdata}
                    name="Address"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>City:</Label>
                  <Input
                    type="text"
                    placeholder="Enter Your City"
                    value={uState.City}
                    onChange={setdata}
                    name="City"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Postal Code:</Label>
                  <Input
                    type="text"
                    placeholder="Enter Your Postal Code"
                    value={uState.PostelCode}
                    onChange={setdata}
                    name="PostelCode"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Country:</Label>
                  <Input
                    type="text"
                    placeholder="Country"
                    value={uState.Country}
                    onChange={setdata}
                    name="Country"
                  />
                </FormGroup>
                <div>
                  <Input
                    type="radio"
                    name="Payment_Type"
                    value="COD"
                    onChange={setdata}
                    // checked={uState.Payment_Type === "COD"}
                    className="radio1"
                  />
                  Cash on Delivery
                  <Input
                    type="radio"
                    name="Payment_Type"
                    value="Online"
                    onChange={setdata}
                    //checked={uState.Payment_Type === "Online"}
                    className="radio2"
                  />
                  Online Payment
                </div>

                <button
                  type="submit"
                  className="buy_btn auth_btn w-100"
                  style={{ color: "var(--primary-color)" }}
                  disabled={loading}
                >
                  {loading ? "Placing Order..." : "Place an order"}
                </button>
              </Form>
            </Col>
            <Col lg="4" className="mt-5">
              <div className="checkout_cart">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="cart-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <img
                      src={item.imgUrl || "path_to_fallback_image.png"}
                      alt={item.title || "Product Image"}
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "10px",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "path_to_fallback_image.png";
                      }}
                    />
                    <p className="quantity">{item.quantity}</p>
                    <p className="text">{item.productName}</p>
                  </div>
                ))}
                <h6>
                  Total Qty: <span>{totalQty} Items</span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  Shipping: <span>$0 (Free Shipping)</span>
                </h6>
                <h4>
                  Total Cost: <span>${totalAmount}</span>
                </h4>
              </div>
            </Col>
            {/* <Col lg="6" md="6">
              <div className="order" style={{ marginTop: "-39rem" }}>
                <ReactPlayer
                  url={order}
                  playing
                  loop
                  muted
                  width="24rem"
                  height="39rem"
                />
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
