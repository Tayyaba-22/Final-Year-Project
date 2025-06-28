// import React, { useState, useEffect } from "react";
// import { Container, Row, Col } from "reactstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const AllProducts = () => {
//   const [getuserdata, setUserdata] = useState([]);
//   const navigate = useNavigate();
//   const getdata = async () => {
//     try {
//       const res = await axios.get("http://localhost:8004/getProductdatadetail");
//       if (res.status === 201) {
//         setUserdata(res.data);
//       } else {
//         alert("Error with status code: " + res.status);
//       }
//     } catch (error) {
//       alert("Error: " + error.message);
//     }
//   };

//   useEffect(() => {
//     getdata();
//   }, []); // Add an empty dependency array to prevent infinite loop

//   //delete//
//   const deleteuser = async (id) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:8004/Productdeletedetail/${id}`
//       );
//       if (res.status === 201) {
//         console.log("user Deleted");
//         alert("User Deleted");
//         getdata();
//       } else {
//         console.log("error");
//       }
//     } catch (error) {
//       alert(error);
//     }
//   };
//   ////

//   return (
//     <section>
//       <Container>
//         <Row>
//           <Col lg="12">
//             <div className="search_box">
//               <input
//                 type="text"
//                 placeholder="Search........"
//                 onChange={handleSearch}
//               />
//               <span>
//                 <i className="ri-search-line"></i>
//               </span>
//             </div>
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Image</th>
//                   <th>Title</th>
//                   <th>Category</th>
//                   <th>Price</th>
//                   <th>Action</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {getuserdata.map((element, id) => (
//                   <tr key={id}>
//                     <td>
//                       <img
//                         src={element.Product_Image}
//                         alt={element.Product_Title}
//                         style={{ width: "100px" }}
//                       />
//                     </td>
//                     <td>{element.Product_Title}</td>
//                     <td>{element.Category}</td>
//                     <td>${element.Price}</td>
//                     <td>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => deleteuser(element._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         className="btn btn-primary"
//                         onClick={() =>
//                           navigate(`/dashboard/updateproduct/${element._id}`)
//                         }
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default AllProducts;
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/allproduct.css";
const AllProducts = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getdata = async () => {
    try {
      const res = await axios.get("http://localhost:8004/getProductdatadetail");
      setUserdata(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please try again.");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = getuserdata.filter((item) => {
    return item.Product_Title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const deleteuser = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8004/Productdeletedetail/${id}`
      );
      if (res.status === 200) {
        console.log("user Deleted");
        alert("User Deleted");
        getdata();
      } else {
        console.log("error");
        alert("Error deleting user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user. Please try again.");
    }
  };

  return (
    <section>
      <Container className="allproduct">
        <Row>
          <Col lg="12">
            <h4 className="mb-5">
              <b>All Product</b>
            </h4>
            <div className="search_box1">
              <input
                type="text"
                placeholder="Search........"
                onChange={handleSearch}
                value={searchTerm}
              />
              <span>
                <i className="ri-search-line"></i>
              </span>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((element, id) => (
                  <tr key={id}>
                    <td>
                      <img
                        src={element.Product_Image}
                        alt={element.Product_Title}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{element.Product_Title}</td>
                    <td>{element.Category}</td>
                    <td>${element.Price}</td>
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
                        className="btn btn-primary"
                        onClick={() =>
                          navigate(`/dashboard/updateproduct/${element._id}`)
                        }
                      >
                        Edit
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

export default AllProducts;
