import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
const Updateproduct = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const Updateproduct1 = async (e) => {
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
  //   //Database//
  //   const [title, setTitle] = useState("");
  //   const [title2, setTitle2] = useState("");
  //   const [title3, setTitle3] = useState("");
  //   const [title4, setTitle4] = useState("");
  //   const [title5, setTitle5] = useState("");
  //   const [file, setFile] = useState("");
  //   const submit = async (e) => {
  //     e.preventDefault();
  //     const formData = new FormData();
  //     formData.append("title", title);
  //     formData.append("title2", title2);
  //     formData.append("title3", title3);
  //     formData.append("title4", title4);
  //     formData.append("title5", title5);
  //     formData.append("file", file);

  //     try {
  //       const res = await axios.post(
  //         "http://localhost:8004/Productdatadetail",
  //         formData,
  //         {
  //           headers: { "Content-Type": "multipart/form-data" },
  //         }
  //       );
  //       if (res.status === 400) {
  //         alert("error");
  //       } else {
  //         console.log(res);
  //         alert("Add data Sucessfully");
  //       }
  //     } catch (error) {
  //       alert(error);
  //     }
  //   };
  //   //ending//
  //const navigate = useNavigate();
  const [uState, setState] = useState({
    Product_Title: "",
    Short_Description: "",
    Description: "",
    Price: "",
    Category: "",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check if the input field allows only text
    if (
      name === " Product_Title" ||
      name === "Short_Description" ||
      name === " Description" ||
      name === " Category"
    ) {
      // Regular expression to match only alphabetic characters
      const regex = /^[a-zA-Z\s]*$/;

      // Check if the input value contains only alphabetic characters
      if ((value.length <= 30 && regex.test(value)) || value === "") {
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  //Fetching Data//
  const { id } = useParams("");
  const getdata1 = async () => {
    const res = await fetch(
      `http://localhost:8004/individualgetproductdata/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.status === 400 || !data) {
      console.log("error");
    } else {
      setState(data);
      console.log("get data");
    }
  };
  useEffect(() => {
    getdata1();
  }, []);
  ////
  //Update Data//
  const updateuser = async (e) => {
    e.preventDefault();

    const { Product_Title, Short_Description, Description, Price, Category } =
      uState;
    const res2 = await fetch(`http://localhost:8004/Updateproducts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Product_Title,
        Short_Description,
        Description,
        Price,
        Category,
      }),
    });
    const data2 = await res2.json();
    console.log(data2);
    if (res2.status === 400 || !data2) {
      console.log("error ");
      alert("error");
    } else {
      alert("Update data Sucessfully");
      console.log("Update data Sucessfully");
      // navigate('/studentpage1');
    }
  };
  ////
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="mb-5">Update Product</h4>
            <Form encType="multipart/form-data">
              <FormGroup className="form_group">
                <span> Product title</span>
                <input
                  type="text"
                  placeholder="T-shirts"
                  // value={enterTitle}
                  // onChange={(e) => setEnterTitle(e.target.value)}
                  // required
                  value={uState.Product_Title}
                  onChange={setdata}
                  name="Product_Title"
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
                  value={uState.Short_Description}
                  onChange={setdata}
                  name="Short_Description"
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
                  value={uState.Description}
                  onChange={setdata}
                  name="Description"
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
                    value={uState.Price}
                    onChange={setdata}
                    name="Price"
                  />
                </FormGroup>
                <FormGroup className="form_group w-50">
                  <span>Category</span>
                  <select
                    className="w-100 p-2 "
                    // value={enterPrice}
                    // onChange={(e) => setEnterPrice(e.target.value)}
                    // value={enterCategory}
                    // onChange={(e) => setEnterCategory(e.target.value)}
                    // required
                    value={uState.Category}
                    onChange={setdata}
                    name="Category"
                  >
                    <option value="T-shirts">T-Shirts</option>
                    <option value="Polo Shirts">Polo Shirts</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Sweatshirts">Sweatshirts</option>
                    <option value="Jackets">Jackets</option>
                  </select>
                </FormGroup>
              </div>

              {/* <div>
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
              </div> */}

              <button className="buy_btn" type="submit" onClick={updateuser}>
                Update Product
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Updateproduct;
