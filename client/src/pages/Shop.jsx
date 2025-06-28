import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/shop.css";
import products from "../assets/data/products";
import ProductList from "../components/UI/ProductList";

const Shop = () => {
  const [productsData, setProductData] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    setSelectedCategory(filterValue); // Track selected category for debug

    // Reset to all products if the filter category is "Filter By Category"
    if (filterValue === "Filter By Category") {
      setProductData(products);
    } else {
      const filteredProducts = products.filter(
        (item) => item.category === filterValue
      );
      setProductData(filteredProducts);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductData(searchedProducts);
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    const sortedProducts = [...productsData].sort((a, b) => {
      if (sortValue === "price-low-high") {
        return a.price - b.price;
      } else if (sortValue === "price-high-low") {
        return b.price - a.price;
      }
      return 0;
    });
    setProductData(sortedProducts);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter_widget">
                <select onChange={handleFilter} value={selectedCategory}>
                  <option value="Filter By Category">Filter By Category</option>
                  <option value="Jackets">Jackets</option>
                  <option value="T-shirts">T-shirts</option>
                  <option value="Polo Shirts">Polo Shirts</option>
                  <option value="Hoodies">Hoodies</option>
                  <option value="Sweatshirts">Sweatshirts</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter_widget">
                <select onChange={handleSort}>
                  <option value="">Sort By</option>
                  <option value="price-low-high">Price Low to High</option>
                  <option value="price-high-low">Price High to Low</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search_box">
                <input
                  type="text"
                  placeholder="Search........"
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-4">No products found</h1>
            ) : (
              <ProductList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;

// import React, { useState } from "react";
// import { Container, Row, Col } from "reactstrap";
// import CommonSection from "../components/UI/CommonSection";
// import Helmet from "../components/Helmet/Helmet";

// import "../styles/shop.css";
// import products from "../assets/data/products";
// import ProductList from "../components/UI/ProductList";

// const Shop = () => {
//   const [productsData, setProductData] = useState(products);

//   const handleFilter = (e) => {
//     const filterValue = e.target.value;
//     const filteredProducts = products.filter(
//       (item) => item.category === filterValue
//     );
//     setProductData(filteredProducts);
//   };

//   const handleSearch = (e) => {
//     const searchTerm = e.target.value;
//     const searchedProducts = products.filter((item) =>
//       item.productName.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setProductData(searchedProducts);
//   };

//   const handleSort = (e) => {
//     const sortValue = e.target.value;
//     const sortedProducts = [...productsData].sort((a, b) => {
//       if (sortValue === "price-low-high") {
//         return a.price - b.price; // For ascending order by price
//       } else if (sortValue === "price-high-low") {
//         return b.price - a.price; // For descending order by price
//       }
//       return 0;
//     });
//     setProductData(sortedProducts);
//   };

//   return (
//     <Helmet title="Shop">
//       <CommonSection title="Products" />
//       <section>
//         <Container>
//           <Row>
//             <Col lg="3" md="6">
//               <div className="filter_widget">
//                 <select onChange={handleFilter}>
//                   <option>Filter By Category</option>
//                   <option value="Jackets">Jackets</option>
//                   <option value="T-shirts">T-shirts</option>
//                   <option value="Polo Shirts">Polo Shirts</option>
//                   <option value="Hoodies">Hoodies</option>
//                   <option value="Sweatshirts">Sweatshirts</option>
//                 </select>
//               </div>
//             </Col>
//             <Col lg="3" md="6" className="text-end">
//               <div className="filter_widget">
//                 <select onChange={handleSort}>
//                   <option>Sort By</option>
//                   <option value="price-low-high">Price Low to High</option>
//                   <option value="price-high-low">Price High to Low</option>
//                 </select>
//               </div>
//             </Col>
//             <Col lg="6" md="12">
//               <div className="search_box">
//                 <input
//                   type="text"
//                   placeholder="Search........"
//                   onChange={handleSearch}
//                 />
//                 <span>
//                   <i className="ri-search-line"></i>
//                 </span>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//       <section className="pt-0">
//         <Container>
//           <Row>
//             {productsData.length === 0 ? (
//               <h1 className="text-center fs-4">No products found</h1>
//             ) : (
//               <ProductList data={productsData} />
//             )}
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default Shop;
// import React, { useState } from "react";

// import { Container, Row, Col } from "reactstrap";
// import CommonSection from "../components/UI/CommonSection";
// import Helmet from "../components/Helmet/Helmet";
// import "../styles/shop.css";
// import products from "../assets/data/products";
// import ProductList from "../components/UI/ProductList";

// const Shop = () => {
//   const [productsData, setProductData] = useState(products);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedPriceRange, setSelectedPriceRange] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   const filterProducts = () => {
//     let filteredProducts = products;

//     if (selectedCategory !== "all") {
//       filteredProducts = filteredProducts.filter(
//         (item) => item.category === selectedCategory
//       );
//     }

//     if (selectedPriceRange !== "all") {
//       const [minPrice, maxPrice] = selectedPriceRange
//         .split("-")
//         .map((price) => parseInt(price, 10));
//       filteredProducts = filteredProducts.filter(
//         (item) => item.price >= minPrice && item.price <= maxPrice
//       );
//     }

//     if (searchTerm !== "") {
//       filteredProducts = filteredProducts.filter((item) =>
//         item.productName.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     setProductData(filteredProducts);
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//     filterProducts();
//   };

//   const handlePriceFilter = (e) => {
//     setSelectedPriceRange(e.target.value);
//     filterProducts();
//   };

//   const handleSort = (e) => {
//     const sortValue = e.target.value;
//     const sortedProducts = [...productsData].sort((a, b) => {
//       if (sortValue === "price-low-high") {
//         return a.price - b.price;
//       } else if (sortValue === "price-high-low") {
//         return b.price - a.price;
//       }
//       return 0;
//     });
//     setProductData(sortedProducts);
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     filterProducts();
//   };

//   return (
//     <Helmet title="Shop">
//       <CommonSection title="Products" />
//       <section>
//         <Container>
//           <Row>
//             <Col lg="3" md="6">
//               <div className="filter_widget">
//                 <select
//                   onChange={handleCategoryChange}
//                   value={selectedCategory}
//                 >
//                   <option value="all">All Categories</option>
//                   <option value="T-shirts">Sweatshirts</option>
//                   <option value="Polo Shirts">T-shirts</option>
//                   <option value="Hoodies">Polo Shirts</option>
//                   <option value="Sweatshirts">Hoodies</option>
//                   <option value="Jackets">Jackets</option>
//                 </select>
//               </div>
//             </Col>
//             <Col lg="3" md="6">
//               <div className="filter_widget">
//                 <select onChange={handlePriceFilter} value={selectedPriceRange}>
//                   <option value="all">Filter By Price</option>
//                   <option value="0-50">$0 - $50</option>
//                   <option value="51-100">$51 - $100</option>
//                   <option value="101-200">$101 - $200</option>
//                   {/* <option value="201-300">$201 - $300</option>
//                   <option value="301-400">$301 - $400</option>
//                   <option value="401-500">$401 - $500</option>
//                   <option value="501-600">$501 - $600</option>
//                   <option value="701-800">$701 - $800</option>
//                   <option value="801-900">$801 - $900</option> */}
//                 </select>
//               </div>
//             </Col>
//             <Col lg="3" md="6" className="text-end">
//               <div className="filter_widget">
//                 <select onChange={handleSort}>
//                   <option>Sort By</option>
//                   <option value="price-low-high">Price Low to High</option>
//                   <option value="price-high-low">Price High to Low</option>
//                 </select>
//               </div>
//             </Col>
//             <Col lg="3" md="6">
//               <div className="search_box">
//                 <input
//                   type="text"
//                   placeholder="Search........"
//                   onChange={handleSearch}
//                 />
//                 <span>
//                   <i className="ri-search-line"></i>
//                 </span>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//       <section className="pt-0">
//         <Container>
//           <Row>
//             {productsData.length === 0 ? (
//               <h1 className="text-center fs-4">No products found</h1>
//             ) : (
//               <ProductList data={productsData} />
//             )}
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default Shop;
