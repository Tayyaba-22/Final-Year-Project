import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/addproduct.css";
const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const addProduct = async (e) => {
    e.preventDefault();

    const product = {
      title: enterTitle,
      shortDesc: enterShortDesc,
      description: enterDescription,
      category: enterCategory,
      price: enterPrice,
      imgUrl: enterProductImg,
    };

    toast.success("product successfully added!");

    console.log(product);
  };
  //Database//
  const [title, setTitle] = useState("");
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [title4, setTitle4] = useState("");
  const [title5, setTitle5] = useState("");
  const [file, setFile] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("title2", title2);
    formData.append("title3", title3);
    formData.append("title4", title4);
    formData.append("title5", title5);
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8004/Productdatadetail",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.status === 400) {
        alert("error");
      } else {
        console.log(res);
        alert("Add data Sucessfully");
      }
    } catch (error) {
      alert(error);
    }
  };
  //ending//
  return (
    <section>
      <Container className="addproduct">
        <Row>
          <Col lg="12">
            <h4 className="mb-5">
              <b>Add Product</b>
            </h4>
            <Form onSubmit={submit} encType="multipart/form-data">
              <FormGroup className="form_group">
                <span> Product title</span>
                <input
                  type="text"
                  placeholder="T-shirts"
                  // value={enterTitle}
                  // onChange={(e) => setEnterTitle(e.target.value)}
                  // required
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form_group">
                <span> Short Description</span>
                <input
                  type="text"
                  placeholder="lorem......"
                  // value={enterShortDesc}
                  // onChange={(e) => setEnterShortDesc(e.target.value)}
                  // required
                  onChange={(e) => setTitle2(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup className="form_group">
                <span> Description</span>
                <input
                  type="text"
                  placeholder="Description......"
                  // value={enterDescription}
                  // onChange={(e) => setEnterDescription(e.target.value)}
                  // required
                  onChange={(e) => setTitle3(e.target.value)}
                  required
                />
              </FormGroup>

              <div className="d-flex align-items-center justify-content-between gap-5">
                <FormGroup className="form_group w-50">
                  <span>Price</span>
                  <input
                    type="number"
                    placeholder="$100"
                    // value={enterPrice}
                    // onChange={(e) => setEnterPrice(e.target.value)}
                    // required
                    onChange={(e) => setTitle4(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form_group w-50">
                  <span>Category</span>
                  <select
                    className="w-100 p-2 value={enterPrice}
                    onChange={(e) => setEnterPrice(e.target.value)}"
                    // value={enterCategory}
                    // onChange={(e) => setEnterCategory(e.target.value)}
                    // required
                    onChange={(e) => setTitle5(e.target.value)}
                    required
                  >
                    <option value="T-shirts">T-Shirts</option>
                    <option value="Polo Shirts">Polo Shirts</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Sweatshirts">Sweatshirts</option>
                    <option value="Jackets">Jackets</option>
                  </select>
                </FormGroup>
              </div>

              <div>
                <FormGroup className="form_group">
                  <span>Product Image</span>
                  <input
                    type="file"
                    name="Product_Image"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/png, image/jpeg, image/gif"
                    required
                  />
                </FormGroup>
              </div>

              <button className="buy_btn" type="submit">
                Add Product
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
