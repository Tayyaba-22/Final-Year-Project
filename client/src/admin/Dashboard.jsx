import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <>
      <section>
        <Container className="dashboard">
          <Row>
            <Col className="lg-3">
              <div className="revenue_box">
                <h5>Total Sales</h5>
                <span>$7890</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="order_box">
                <h5>Orders</h5>
                <span>789</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="products_box">
                <h5>Total Products</h5>
                <span>790</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="user_box">
                <h5>Total Users</h5>
                <span>782</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
