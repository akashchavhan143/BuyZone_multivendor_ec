import { Link } from "react-router-dom";
import RoleNav from "./RoleNav";

import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "../Component/SearchBar";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const deliveryPerson = JSON.parse(sessionStorage.getItem("active-delivery"));
  const seller = JSON.parse(sessionStorage.getItem("active-seller"));
  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/category/fetch/all?start=0&count=12"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const allCategories = await retrieveAllCategories();
      if (allCategories) {
        setCategories(allCategories.categories);
      }
    };

    getAllCategories();
  }, []);

  const getHomePath = () => {
    if (admin != null) {
      return "/user/admin/";
    } else if (seller != null) {
      return "/seller/";
    } else if (deliveryPerson != null) {
      return "/deliveryHome";
    } else if (user != null) {
      return "/";
    } else {
      return "/";
    }
  };
  return (
    <>
      <nav
        className="navbar  navbar-expand-lg bg-dark1 text-light  p-3 sticky-top "
        data-bs-theme="dark"
      >
        <div className="container-fluid ">
          <Link to="/aboutUs">
            <img
              src="/BuyZone2.png"
              className="img-fluid"
              style={{ maxWidth: "160px", height: "auto" }}
              alt="BrandImg"
            />
          </Link>

          <button
            className="navbar-toggler text-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fw-bold ms-md-3"
                  aria-current="page"
                  to={getHomePath()}
                >
                  <i className="fas fa-house"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-link active text-light"
                  aria-current="page"
                >
                  Products
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-light"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </Link>
                <ul className="dropdown-menu ">
                  {categories.map((category) => {
                    return (
                      <li key={category.id}>
                        <Link
                          to={`/product/category/${category.id}/${category.name}`}
                          className="dropdown-item  text-light"
                        >
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
            {/* search bar star here */}
            {/* <div className="col-sm-6 me-3">
              <form action="/search" method="get">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    name="search"
                    placeholder="Search for products here"
                  />
                  <button
                    className="btn btn-success text-dark col-md-2"
                    type="submit"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div> */}

            {/* search bar end here */}
            <RoleNav />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
