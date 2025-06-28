import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Loginadmin from "../pages/Loginadmin";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Customersupport from "../pages/Customersupport";
import AddProducts from "../admin/AddProducts";
import AllProducts from "../admin/AllProducts";
import Dashboard from "../admin/Dashboard";
import Issues from "../admin/Issues";
import Users from "../admin/Users";
import Onlinepayment from "../pages/onlinepayment";
import Response from "../admin/Response";
import Updateproduct from "../admin/UpdateProduct";
import TShirtCustomization from "../pages/TShirtCustomization";
import Customization from "../pages/Customization";
import ForgotPassword from "../pages/ForgotPassword";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Home" />} />
      <Route path="home" element={<Home />} />
      <Route path="Shop" element={<Shop />} />
      <Route path="Shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="customersupport" element={<Customersupport />} />
      <Route path="onlinepayment" element={<Onlinepayment />} />
      <Route path="tshirtcustomization" element={<TShirtCustomization />} />
      <Route path="customization" element={<Customization />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/all-products" element={<AllProducts />} />
        <Route path="dashboard/add-product" element={<AddProducts />} />
        <Route path="dashboard/users" element={<Users />} />
        <Route path="dashboard/issues" element={<Issues />} />
        <Route path="dashboard/response/:id" element={<Response />} />
        <Route path="dashboard/updateproduct/:id" element={<Updateproduct />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="loginadmin" element={<Loginadmin />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default Routers;
