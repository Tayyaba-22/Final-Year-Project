import React, { useState } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { toast } from "react-toastify";
import "../styles/Customersupport.css";
import dropshop from "../assets/images/customersupport.webp";

const CustomerSupport = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // Simulating an API call
      setTimeout(() => {
        toast.success("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
      setLoading(false);
    }
  };
  //database//
  // const navigate = useNavigate();
  const initialState = {
    Customer_Name: "",
    Customer_Email: "",
    Customer_Message: "",
  };
  const [uState, setState] = useState(initialState);
  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setState((perval) => {
      return {
        ...perval,
        [name]: value,
      };
    });
  };

  const inadd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8004/Customerdatadetail",
        uState
      );
      if (res.status === 201) {
        setState(initialState);
        // navigate("");
        alert("Add data Sucessfully");
      } else {
        alert("error");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <section className="customer">
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <h3 className="mb-4">Contact Customer Support</h3>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <input
                  // placeholder="Your Name"
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  // required
                  type="text"
                  placeholder="Your Name"
                  value={uState.Customer_Name}
                  onChange={setdata}
                  name="Customer_Name"
                />
              </FormGroup>
              <FormGroup>
                <input
                  // type="email"
                  // placeholder="Your Email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  // required
                  type="text"
                  placeholder="Your Email"
                  value={uState.Customer_Email}
                  onChange={setdata}
                  name="Customer_Email"
                />
              </FormGroup>
              <FormGroup>
                <textarea
                  // placeholder="Your Message"
                  // value={message}
                  // onChange={(e) => setMessage(e.target.value)}
                  // required
                  type="text"
                  placeholder="Your Message"
                  value={uState.Customer_Message}
                  onChange={setdata}
                  name="Customer_Message"
                />
              </FormGroup>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                onClick={inadd}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </Form>
          </Col>
          <Col lg="3" md="4">
            <div className="footer_quick-links">
              <h4 className="quick_links-title">Contact</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i
                      className="ri-map-pin-line"
                      style={{ color: "gray" }}
                    ></i>
                  </span>
                  <p>Shop # 2, Rehman Plaza, BlueArea, Islamabad</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-line" style={{ color: "gray" }}></i>
                  </span>
                  <p>03145389136</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line" style={{ color: "gray" }}></i>
                  </span>
                  <p>dropshop123@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
            <img
              src={dropshop}
              alt="Customer Support"
              className="customer-support-image"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CustomerSupport;
