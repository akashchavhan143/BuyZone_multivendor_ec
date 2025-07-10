import { Routes, Route } from "react-router-dom";
import Header from "./NavbarComponent/Header";
import AdminRegisterForm from "./UserComponent/AdminRegisterForm";
import UserLoginForm from "./UserComponent/UserLoginForm";
import UserRegister from "./UserComponent/UserRegister";
import AboutUs from "./PageComponent/AboutUs";
import ContactUs from "./PageComponent/ContactUs";

import AddCategoryForm from "./CategoryComponent/AddCategoryForm";
import AddProductForm from "./ProductComponent/AddProductForm";
import Product from "./ProductComponent/Product";
import AddProductReview from "./ReviewComponent/AddProductReview";
import GetProductReviews from "./ReviewComponent/GetProductReviews";
import SellerProducts from "./ProductComponent/SellerProducts";
import ViewSellerProducts from "./ProductComponent/ViewSellerProducts";
import UpdateProductForm from "./ProductComponent/UpdateProductForm";
import ViewAllCategories from "./CategoryComponent/ViewAllCategories";
import UpdateCategoryForm from "./CategoryComponent/UpdateCategoryForm";
import ViewAllProducts from "./ProductComponent/ViewAllProducts";
import AddCardDetails from "./OrderComponent/AddCardDetails";
import ViewMyOrders from "./OrderComponent/ViewMyOrders";
import ViewAllOrders from "./OrderComponent/ViewAllOrders";
import ViewSellerDeliveryPerson from "./UserComponent/ViewSellerDeliveryPerson";
import ViewSellerOrders from "./OrderComponent/ViewSellerOrders";
import ViewAllSellers from "./UserComponent/ViewAllSellers";
import ViewAllDeliveryPersons from "./UserComponent/ViewAllDeliveryPersons";
import ViewAllCustomers from "./UserComponent/ViewAllCustomers";
import ViewDeliveryOrders from "./OrderComponent/ViewDeliveryOrders";
import ViewMyCart from "./CartComponent/ViewMyCart";
import Footer from "./NavbarComponent/Footer";
import AdminHome from "./UserComponent/AdminHome";
import ForgotPassword from "./Component/ForgotPassword";
import Home from "./Component/Home";
import "./App.css";
import AdminProtectedRoute from "./security/AdminProtectedRoute";
import SellerHome from "./PageComponent/SellerHome";
import DeliveryPersonHome from "./PageComponent/DeliveryPersonHome";
import Products from "./PageComponent/Products";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/user/admin/register" element={<AdminRegisterForm />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route
          path="/user/admin/*"
          element={
            <AdminProtectedRoute>
              <AdminHome />
            </AdminProtectedRoute>
          }
        />
        <Route path="/seller/" element={<SellerHome />} />
        <Route path="/delivery/" element={<DeliveryPersonHome />} />
        {/* <Route path="/user/admin/" element={<AdminHome />} /> */}
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/user/customer/register" element={<UserRegister />} />
        <Route path="/user/seller/register" element={<UserRegister />} />
        <Route path="/seller/delivery/register" element={<UserRegister />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route
          path="/product/category/:categoryId/:categoryName"
          element={<Products />}
        />
        <Route path="/category/add" element={<AddCategoryForm />} />
        <Route path="/product/add" element={<AddProductForm />} />
        <Route
          path="/product/:productId/category/:categoryId"
          element={<Product />}
        />
        <Route
          path="/product/:productId/review/add"
          element={<AddProductReview />}
        />
        <Route path="/product/review/fetch" element={<GetProductReviews />} />

        <Route
          path="/product/seller/:sellerId/:sellerName"
          element={<SellerProducts />}
        />
        <Route
          path="/product/seller/:sellerId/:sellerName/category/:categoryId/:categoryName"
          element={<SellerProducts />}
        />
        <Route path="/seller/product/all" element={<ViewSellerProducts />} />
        <Route path="/seller/product/update" element={<UpdateProductForm />} />
        <Route path="/admin/category/all" element={<ViewAllCategories />} />
        <Route path="/admin/category/update" element={<UpdateCategoryForm />} />
        <Route path="/admin/product/all" element={<ViewAllProducts />} />
        <Route path="/customer/order/payment" element={<AddCardDetails />} />
        <Route path="/customer/cart" element={<ViewMyCart />} />
        <Route path="/customer/order" element={<ViewMyOrders />} />
        <Route path="/admin/order/all" element={<ViewAllOrders />} />
        <Route
          path="/seller/delivery-person/all"
          element={<ViewSellerDeliveryPerson />}
        />
        <Route path="/seller/order/all" element={<ViewSellerOrders />} />
        <Route path="/admin/seller/all" element={<ViewAllSellers />} />
        <Route
          path="/admin/delivery-person/all"
          element={<ViewAllDeliveryPersons />}
        />
        <Route path="/admin/customer/all" element={<ViewAllCustomers />} />
        {/* <Route path="/admin/" element={<AdminHome />} /> */}
        <Route
          path="/delivery-person/order/all"
          element={<ViewDeliveryOrders />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
