import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const query = new URLSearchParams(location.search);
  const source = query.get("source");

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent");
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (source === "loginadmin") {
      navigate("/loginadmin");
    } else {
      navigate("/login");
    }
  };

  return (
    <Helmet title="Forgot Password">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Reset Password</h3>

              <Form className="auth_form" onSubmit={handlePasswordReset}>
                <FormGroup className="form_group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                {loading ? (
                  <Button className="buy_btn auth_btn" disabled>
                    Sending...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="buy_btn auth_btn"
                    style={{ color: "var(--primary-color)" }}
                  >
                    Send Reset Email
                  </Button>
                )}
                <Button
                  className="buy_btn auth_btn"
                  style={{ color: "var(--primary-color)", width: "100%" }}
                  onClick={handleBack}
                >
                  Back
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ForgotPassword;
