import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/product-details.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { cartActions } from "../Redux/slices/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import ProductsList from "../components/UI/ProductList";
import StarRatings from "react-star-ratings"; // Ensure this package is installed

const ProductDetails = () => {
  const [rating, setRating] = useState(0);
  const reviewUser = useRef(null);
  const reviewMsg = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find((item) => String(item.id) === id);

  const {
    imgUrl,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
    category,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category);

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value.trim();
    const reviewUserMsg = reviewMsg.current.value.trim();

    if (!rating || !reviewUserName || !reviewUserMsg) {
      toast.error("Please provide both a rating and a review message.");
      return;
    }

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };

    console.log(reviewObj);
    toast.success("Review submitted");

    reviewUser.current.value = "";
    reviewMsg.current.value = "";
    setRating(0);
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );
    toast.success("Review added successfully");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);
  //database//
  const initialState = {
    Rating: "",
    Name: "",
    Review: "",
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
        "http://localhost:8004/Reviewdatadetail",
        uState
      );
      if (res.status === 201) {
        setState(initialState);
        // navigate("");
        alert("Add Review Sucessfully");
      } else {
        alert("error");
      }
    } catch (error) {
      alert(error);
    }
  };
  //ending//

  //get database//
  const [getreviewdata, setReviewdata] = useState([]);

  const getdata = async () => {
    try {
      const res = await axios.get("http://localhost:8004/Reviewdatadetails");
      if (res.status === 201) {
        setReviewdata(res.data);
      } else {
        alert("Error with status code: " + res.status);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []); // Add an empty dependency array to prevent infinite loop
  //ending//
  const handleCustomization = () => {
    navigate("/customization", { state: { product } });
  };

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img
                src={imgUrl}
                alt={productName}
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
            <Col lg="6">
              <div className="product_details">
                <h2>{productName}</h2>
                <div className="product_rating">
                  <StarRatings
                    rating={avgRating}
                    starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="gold"
                  />
                  <span className="ms-2">({avgRating} out of 5)</span>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product-price">${price}</span>
                  <span>Category: {category}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>
                <p className="mt-3">{description}</p>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy_btn"
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
                {/* <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy_btn"
                  onClick={handleCustomization}
                  style={{ marginLeft: "1rem" }}
                >
                  Customization
                </motion.button> */}
              </div>
            </Col>
          </Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Rating</th>
                  <th>Name</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody>
                {getreviewdata.map((element, id) => (
                  <tr key={id}>
                    <td>{element.Rating}</td>
                    <td>{element.Name}</td>
                    <td>{element.Review}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
          <Row>
            <Col lg="12 mt-3">
              <Form onSubmit={submitHandler}>
                <FormGroup>
                  <label htmlFor="rating">Rating</label>
                  <select
                    className="form-control"
                    // value={rating}
                    // onChange={(e) => setRating(Number(e.target.value))}
                    // required
                    type="text"
                    value={uState.Rating}
                    onChange={setdata}
                    name="Rating"
                  >
                    <option value="">Select a rating</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>Name:</label>
                  <input
                    //type="text"
                    className="form-control"
                    // ref={reviewUser}
                    // required
                    type="text"
                    value={uState.Name}
                    onChange={setdata}
                    name="Name"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Review:</label>
                  <textarea
                    className="form-control"
                    // ref={reviewMsg}
                    // required
                    type="text"
                    placeholder="Your Review"
                    value={uState.Review}
                    onChange={setdata}
                    name="Review"
                  ></textarea>
                </FormGroup>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={inadd}
                >
                  Submit Review
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mt-1">
              <h2 className="related_title">You might also like</h2>
            </Col>

            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;

// import React, { useState, useRef, useEffect } from "react";
// import { Container, Row, Col, Form, FormGroup } from "reactstrap";
// import { useParams } from "react-router-dom";
// import products from "../assets/data/products";
// import Helmet from "../components/Helmet/Helmet";
// import CommonSection from "../components/UI/CommonSection";
// import "../styles/product-details.css";
// import { motion } from "framer-motion";
// import { useDispatch } from "react-redux";
// import { cartActions } from "../Redux/slices/cartSlice";
// import { toast } from "react-toastify";
// import StarRatings from "react-star-ratings";

// import ProductsList from "../components/UI/ProductList";

// const ProductDetails = () => {
//   const [tab, setTab] = useState("desc");
//   const reviewUser = useRef(null);
//   const reviewMsg = useRef(null);
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const product = products.find((item) => String(item.id) === id);

//   const {
//     imgUrl,
//     productName,
//     price,
//     avgRating,
//     reviews,
//     description,
//     shortDesc,
//     category,
//   } = product;

//   const relatedProducts = products.filter((item) => item.category === category);

//   const [rating, setRating] = useState(null);

//   const submitHandler = (e) => {
//     e.preventDefault();

//     const reviewUserName = reviewUser.current.value.trim();
//     const reviewUserMsg = reviewMsg.current.value.trim();

//     if (!rating || !reviewUserName || !reviewUserMsg) {
//       toast.error("Please provide both a rating and a review message.");
//       return;
//     }

//     const reviewObj = {
//       userName: reviewUserName,
//       text: reviewUserMsg,
//       rating,
//     };

//     console.log(reviewObj);
//     toast.success("Review submitted");

//     // Clear input fields after submission
//     reviewUser.current.value = "";
//     reviewMsg.current.value = "";
//     setRating(null);
//   };

//   const addToCart = () => {
//     dispatch(
//       cartActions.addItem({
//         id,
//         image: imgUrl,
//         productName,
//         price,
//       })
//     );
//     toast.success("Product added successfully");
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [product]);

//   return (
//     <Helmet title={productName}>
//       <CommonSection title={productName} />
//       <section className="pt-0">
//         <Container>
//           <Row>
//             <Col lg="6">
//               <img
//                 src={imgUrl}
//                 alt=""
//                 style={{ width: "100%", height: "100%" }}
//               />
//             </Col>
//             <Col lg="6">
//               <div className="product_details">
//                 <h2>{productName}</h2>
//                 <div className="product_rating">Display average rating</div>
//                 <div className="d-flex align-items-center gap-5">
//                   <span className="product_price">${price}</span>
//                   <span>Category : {category}</span>
//                 </div>
//                 <p className="mt-3">{shortDesc}</p>
//                 <div className="product_rating">
//                   <StarRatings
//                     rating={avgRating}
//                     starDimension="20px"
//                     starSpacing="2px"
//                     starRatedColor="gold"
//                   />
//                   <span className="ms-2">({avgRating} out of 5)</span>
//                 </div>
//                 <p className="mt-3">{description}</p>
//                 <motion.button
//                   whileTap={{ scale: 1.2 }}
//                   className="buy_btn"
//                   onClick={addToCart}
//                 >
//                   Add to Cart
//                 </motion.button>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//       <section>
//         <Container>
//           <Row>
//             <Col lg="12">
//               {/* Tab navigation */}
//               {/* Tab content based on selected tab */}
//             </Col>
//             <Col lg="12" className="mt-5">
//               <h2 className="related_title">You might also like</h2>
//             </Col>
//             {/* Rendering related products */}
//             <ProductsList data={relatedProducts} />
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default ProductDetails;
