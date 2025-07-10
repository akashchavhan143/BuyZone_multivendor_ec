import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import RoleNav from "./RoleNav";

const HeaderUser = () => {
  let navigate = useNavigate();

  // State to store the username and cart count
  const [username, setUsername] = useState("");
  const [cartCount, setCartCount] = useState(0);

  let user = JSON.parse(sessionStorage.getItem("active-customer"));
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  // Function to log out the user
  const userLogout = () => {
    toast.success("logged out successfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-customer");
    sessionStorage.removeItem("customer-jwtToken");
    //window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 2000); // Redirect after 2 seconds
  };

  // Function to retrieve the cart count
  useEffect(() => {
    if (user) {
      setUsername(user.firstName); //  firstName

      const retrieveCartCount = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/cart/fetch?userId=" + user.id,
            {
              headers: {
                Authorization: "Bearer " + customer_jwtToken,
              },
            }
          );
          if (response.data && response.data.carts) {
            setCartCount(response.data.carts.length);
          }
        } catch (error) {
          console.error("Error fetching cart count:", error);
          toast.error("Failed to retrieve cart count.");
        }
      };
      retrieveCartCount();
    }
  }, [user, customer_jwtToken]);

  return (
    // <>
    //   {user && <h1>hi akash</h1>}
    //   <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
    //     {/* Cart Link with Dynamic Cart Count */}
    //     <li className="nav-item">
    //       <Link
    //         to="/customer/cart"
    //         className="nav-link active"
    //         aria-current="page"
    //       >
    //         <FaShoppingCart /> Cart
    //         <span className="badge bg-danger text-white">{cartCount}</span>
    //       </Link>
    //     </li>

    //     {/* Logout Link */}
    //     <li className="nav-item dropdown">
    //       <Link
    //         className="nav-link dropdown-toggle active"
    //         to="#"
    //         role="button"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         {/* Dynamic Username Display */}
    //         {username}
    //       </Link>

    //       <ul className="dropdown-menu">
    //         <li>
    //           {/* My Orders Link */}
    //           <Link className="dropdown-item" to="/customer/order">
    //             My Orders
    //           </Link>
    //         </li>
    //         <li>
    //           <Link className="dropdown-item" to="#">
    //             Profile
    //           </Link>
    //         </li>

    //         <li>
    //           <Link
    //             to=""
    //             className="dropdown-item"
    //             aria-current="page"
    //             onClick={userLogout}
    //           >
    //             Logout
    //           </Link>
    //         </li>
    //       </ul>

    //       <ToastContainer />
    //     </li>
    //   </ul>
    // </>

    <>
      {user ? (
        <>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
            <li className="nav-item">
              <Link to="/customer/cart" className="nav-link active">
                <FaShoppingCart /> Cart
                <span className="badge bg-danger text-white">{cartCount}</span>
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle active"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                {username}
              </Link>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/customer/order">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="" className="dropdown-item" onClick={userLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </>
      ) : (
        <RoleNav />
      )}
      <ToastContainer />
    </>
  );
};

export default HeaderUser;
