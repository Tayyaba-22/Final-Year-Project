import React from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { cartActions } from "../Redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th style={{ paddingLeft: "1.5rem" }}>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold">
                    ${totalAmount.toFixed(2)}
                  </span>
                </h6>
              </div>
              <p className="fs-6 mt-2">
                Taxes and shipping will calculate in checkout
              </p>
              <div>
                <button className="buy_btn w-100">
                  <Link to="/checkout">Checkout</Link>
                </button>
                <button className="buy_btn w-100 mt-3">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const incrementQuantity = () => {
    dispatch(cartActions.incrementItem(item.id));
  };

  const decrementQuantity = () => {
    dispatch(cartActions.decrementItem(item.id));
  };

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };

  return (
    <tr>
      <td>
        <img
          src={item.imgUrl}
          alt={item.productName}
          style={{ width: "50px", height: "50px" }}
        />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={decrementQuantity}
            disabled={item.quantity <= 1}
            className="buttons"
          >
            -
          </button>
          <span style={{ margin: "0 10px" }}>{item.quantity}</span>
          <button onClick={incrementQuantity} className="buttons">
            +
          </button>
        </div>
      </td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct}
          className="ri-delete-bin-line"
        ></motion.i>
      </td>
    </tr>
  );
};

export default Cart;
