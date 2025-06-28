import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroVideo from "../assets/videos/hero_video.mp4";
import counterVideo from "../assets/videos/counter_video.mp4"; // Ensure correct path to your video file
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Helmet from "../components/Helmet/Helmet";
import Services from "../services/services";
import ProductList from "../components/UI/ProductList";
import products from "../assets/data/products";
import ReactPlayer from "react-player";
import Clock from "../components/UI/Clock";
import axios from "axios";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [poloshirtProducts, setPoloshirtProducts] = useState([]);
  const [hoodiesProducts, setHoodiesProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const year = new Date().getFullYear();
  const [productData, setProductData] = useState([]);
  console.log("productData", productData);

  // const getdata = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8004/getProductdatadetail");
  //     if (res.status === 201) {
  //       setProductData(res.data);
  //     } else {
  //       alert("Error with status code: " + res.status);
  //     }
  //   } catch (error) {
  //     alert("Error: " + error.message);
  //   }
  // };

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "Jackets"
    );
    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "T-shirts"
    );
    const filteredPoloshirtProducts = products.filter(
      (item) => item.category === "Polo Shirts"
    );
    const filteredHoodiesProducts = products.filter(
      (item) => item.category === "Hoodies"
    );
    const filteredPopularProducts = products.filter(
      (item) => item.category === "Sweatshirts"
    );
    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setPoloshirtProducts(filteredPoloshirtProducts);
    setHoodiesProducts(filteredHoodiesProducts);
    setPopularProducts(filteredPopularProducts);
    //getdata();
  }, []);

  return (
    <Helmet title={"Home"}>
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero_content">
                <p className="hero_subtitle">Trending product in {year}</p>
                <h2>Refined simplicity for the modern wardrobe</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate dolore libero maxime voluptatibus id veritatis
                  vitae pariatur, est magnam necessitatibus.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy_btn">
                  <Link to="shop">SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero_video">
                <ReactPlayer
                  url={heroVideo}
                  playing
                  loop
                  muted
                  width="100%"
                  height="100%"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      {/* {productData.map((item, index) => {
        return <div>{item.Product_Title}</div>;
      })} */}
      {productData.length > 0 && <ProductList data={productData} />}
      {trendingProducts.length > 0 && (
        <section className="trending_products">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section_title">Trending Products</h2>
              </Col>
              <ProductList data={trendingProducts} />
              {/* {popularProducts.length > 0 && ( */}
              <ProductList data={popularProducts.slice(0, 2)} />
              {/* )} */}
            </Row>
          </Container>
        </section>
      )}
      <section className="best_sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section_title">Best Sales</h2>
            </Col>
            <ProductList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>
      <section className="timer_count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count_down-col">
              <div className="clock_top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offer</h4>
                <h3 className="text-white fs-5 mb-3">Quality Shirts</h3>
              </div>
              <Clock />
              <motion.button className="buy_btn store_btn">
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="12" className="text-end counter_img">
              <ReactPlayer
                url={counterVideo}
                playing
                loop
                muted
                width="100%"
                height="100%"
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="new_arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section_title">New Arrivals</h2>
            </Col>
            <ProductList data={poloshirtProducts} />
            {/* {/* {hoodiesProducts.length > 0 && ( */}
            <ProductList data={hoodiesProducts.slice(0, 6)} />
            {/* )}  */}
          </Row>
        </Container>
      </section>
      <section className="popular_category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section_title">Popular in Category</h2>
            </Col>
            {/* {popularProducts.length > 0 && (
              <> */}
            <ProductList data={popularProducts.slice(1, 2)} />
            <ProductList data={hoodiesProducts.slice(6, 9)} />
            {/* </>
            )} */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;

// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import Helmet from "../components/Helmet/Helmet";
// import "../styles/home.css";
// import { Container, Row, Col } from "reactstrap";
// import heroVideo from "../assets/videos/hero_video.mp4";
// import Services from "../services/services";
// import ReactPlayer from "react-player"; // Import statement for ReactPlayer if needed

// const Home = () => {
//   const year = new Date().getFullYear();

//   return (
//     <Helmet title={"Home"}>
//       <section className="hero_section">
//         <Container>
//           <Row>
//             <Col lg="6" md="6">
//               <div className="hero_content">
//                 <p className="hero_subtitle">Trending product in {year}</p>
//                 <h2>Refined simplicity for the modern wardrobe</h2>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                   Cupiditate dolore libero maxime voluptatibus id veritatis
//                   vitae pariatur, est magnam necessitatibus.
//                 </p>
//                 <motion.button whileTap={{ scale: 1.2 }} className="buy_btn">
//                   <Link to="shop">SHOP NOW</Link>
//                 </motion.button>
//               </div>
//             </Col>
//             <Col lg="6" md="6">
//               <div className="hero_video">
//                 <ReactPlayer
//                   url={heroVideo}
//                   playing
//                   loop
//                   muted
//                   width="100%"
//                   height="100%"
//                 />
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//       <Services />
//       <section className="trending_products">
//         <Container>
//           <Row>
//             <Col lg="12" className="text-center">
//               <h2 className="section_title">Trending Products</h2>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default Home;
