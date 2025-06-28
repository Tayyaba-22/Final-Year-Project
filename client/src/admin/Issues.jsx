import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/issue.css";

const Issues = () => {
  const [getcustomerdata, setCustomerdata] = useState([]);
  const navigate = useNavigate();

  const getdata = async () => {
    try {
      const res = await axios.get("http://localhost:8004/Customerdatadetail");
      if (res.status === 201) {
        setCustomerdata(res.data);
      } else {
        alert("Error with status code: " + res.status);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  //delete//
  const deleteuser = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8004/Customerdeletedetail/${id}`
      );
      if (res.status === 201) {
        console.log("Issue Deleted");
        alert("Issue Deleted");
        getdata();
      } else {
        console.log("error");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section>
      <Container className="issue">
        <Row>
          <Col lg="12">
            <h4 className="mb-5">
              <b>Issues</b>
            </h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th style={{ paddingLeft: "1rem" }}>Action</th>
                  <th style={{ paddingLeft: "1.5rem" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {getcustomerdata.map((element, id) => (
                  <tr key={id}>
                    <td>{element.Customer_Name}</td>
                    <td>{element.Customer_Email}</td>
                    <td>{element.Customer_Message}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteuser(element._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          navigate(`/dashboard/response/${element._id}`)
                        }
                      >
                        Respond
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Issues;
