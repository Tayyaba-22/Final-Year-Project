import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import "../styles/response.css";
const Response = () => {
  const [loading, setLoading] = useState(false);
  const [uState, setState] = useState({
    Customer_Name: "",
    Customer_Email: "",
    Customer_Message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Add your form submission logic here

    // Example: simulate a network request
    setTimeout(() => {
      setLoading(false);
      alert("Message sent!");
    }, 2000);
  };

  const setdata = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { id } = useParams();
  const getdata1 = async () => {
    try {
      const res = await fetch(
        `http://localhost:8004/individualgetcustomertdata/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Error: ${res.status} ${res.statusText} - ${errorText}`
        );
      }

      const contentType = res.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response");
      }

      const data = await res.json();
      setState(data); // Assuming data matches the structure of uState
      console.log("get data");
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getdata1();
  }, [id]);

  return (
    <section>
      <Container className="response">
        <Row>
          <Col lg="8" className="m-auto text-center">
            <h3 className="mb-4">
              <b>Admin Response</b>
            </h3>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <input
                  placeholder="Your Name"
                  className="form-control"
                  value={uState.Customer_Name}
                  onChange={setdata}
                  name="Customer_Name"
                />
              </FormGroup>
              <FormGroup>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="form-control"
                  value={uState.Customer_Email}
                  onChange={setdata}
                  name="Customer_Email"
                />
              </FormGroup>
              <FormGroup>
                <textarea
                  placeholder="Your Message"
                  className="form-control"
                  // value={uState.Customer_Message}
                  // onChange={setdata}
                  name="Customer_Message"
                />
              </FormGroup>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Response;
