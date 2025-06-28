import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import "../styles/Login.css";

const Loginadmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    if (!email.includes("dropshop")) {
      toast.error("Login failed. Please use a valid email.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log(user);
      setLoading(false);
      toast.success("Successfully logged in");
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);

      if (error.code === "auth/user-not-found") {
        toast.error("User not found. Please check your email.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Invalid password. Please try again.");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <Helmet title="Admin Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Admin Login</h3>

              <Form className="auth_form" onSubmit={signIn}>
                <FormGroup className="form_group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form_group">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                {loading ? (
                  <button className="buy_btn auth_btn" disabled>
                    Logging in...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="buy_btn auth_btn"
                    style={{ color: "var(--primary-color)" }}
                  >
                    Login
                  </button>
                )}

                <p>
                  Don't have an account?{" "}
                  <Link to="/signup">Create an account</Link>
                </p>
                <p>
                  Forgot your password?{" "}
                  <Link to="/forgotpassword?source=loginadmin">
                    Reset password
                  </Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Loginadmin;
