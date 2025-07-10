import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewMyCart = () => {
  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const [carts, setCarts] = useState([]);
  const [cartAmount, setCartAmount] = useState("0.0");

  const [productCart, setProductCart] = useState({});

  let navigate = useNavigate();

  useEffect(() => {
    const getAllCart = async () => {
      const allCart = await retrieveCart();
      if (allCart) {
        setCarts(allCart.carts);

        if (allCart.totalCartAmount) {
          setCartAmount(allCart.totalCartAmount);
        }
      }
    };

    getAllCart();
  }, []);

  const retrieveCart = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/cart/fetch?userId=" + user.id,
      {
        headers: {
          Authorization: "Bearer " + customer_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const deleteCart = (cartId, e) => {
    const data = { id: cartId, userId: user.id };
    fetch("http://localhost:8080/api/cart/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
  };

  const incrementCart = (cart, e) => {
    const data = { id: cart.id, userId: user.id, quantity: cart.quantity + 1 };
    fetch("http://localhost:8080/api/cart/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
  };

  const decrementCart = (cart, e) => {
    const data = { id: cart.id, userId: user.id, quantity: cart.quantity - 1 };
    fetch("http://localhost:8080/api/cart/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
  };

  const checkout = (e) => {
    e.preventDefault();

    if (carts === null || carts.length < 1) {
      toast.error("No Products In Cart To Order!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }
    navigate("/customer/order/payment", {
      state: { priceToPay: cartAmount },
    });
  };
  // const totalOrderPrice = 1000;
  const totalItems = carts.length;
  return (
    <>
      {/* old cart start hre */}
      {/* <div className="mt-3">
        <div
          className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
          style={{
            height: "40rem",
          }}
        >
          <div
            className="card-header custom-bg-text text-center bg-color"
            style={{
              borderRadius: "1em",
              height: "50px",
            }}
          >
            <h2>My Cart</h2>
          </div>
          <div
            className="card-body"
            style={{
              overflowY: "auto",
            }}
          >
            <div className="table-responsive">
              <table className="table table-hover text-color text-center">
                <thead className="table-bordered border-color bg-color custom-bg-text">
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Seller</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((cart) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={
                              "http://localhost:8080/api/product/" +
                              cart.product.image1
                            }
                            class="img-fluid"
                            alt="product_pic"
                            style={{
                              maxWidth: "90px",
                            }}
                          />
                        </td>
                        <td>
                          <b>{cart.product.name}</b>
                        </td>
                        <td>
                          <b>{cart.product.category.name}</b>
                        </td>
                        <td>
                          <b>{cart.product.seller.firstName}</b>
                        </td>
                        <td>
                          <b>{cart.product.price}</b>
                        </td>
                        <td>
                          <button
                            onClick={() => decrementCart(cart)}
                            className="btn btn-sm bg-color custom-bg-text me-2"
                          >
                            -
                          </button>
                          <b>{cart.quantity}</b>
                          <button
                            onClick={() => incrementCart(cart)}
                            className="btn btn-sm bg-color custom-bg-text ms-2"
                          >
                            +
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => deleteCart(cart.id)}
                            className="btn btn-sm bg-color custom-bg-text ms-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer custom-bg">
            <div className="float-right">
              <div
                className="text-color me-2"
                style={{
                  textAlign: "right",
                }}
              >
                <h5>Total Price: &#8377; {cartAmount}/-</h5>
              </div>

              <div className="float-end me-2">
                <button
                  type="submit"
                  className="btn bg-color custom-bg-text mb-3"
                  onClick={checkout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* old cart end hre */}
      {/* new cart start here */}
      <div className="container-fluid mt-2 mb-5 ">
        <div className="row ">
          <div
            className="mx-auto mt-2 col-md-8 "
            style={{
              height: "600px",
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            <div className="mb-1 mt-2 p-2 col-md-12 btn-cust rounded">
              <div className="text-center">
                <h5 className="fw-bold text-white">CART ITEMS</h5>
              </div>
            </div>

            {carts.length === 0 ? (
              <div style={{ height: "250px" }} className="text-center card">
                <br />
                <br />
                <br />
                <h2 className="text-center text-danger text-shadow fw-bold">
                  Your cart is empty, please add some products!
                </h2>
                <br />
                <Link
                  to="/products"
                  className="btn btn-dark mt-4 col-5 mx-auto"
                >
                  Go To Products
                </Link>
                <br />
              </div>
            ) : (
              carts.map((cart) => (
                <div
                  className="mb-1 mt-2 col-md-12 border border-success card"
                  key={cart.id}
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={
                          "http://localhost:8080/api/product/" +
                          cart.product.image1
                        }
                        className="img-fluid rounded-start"
                        alt="cartimg"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{cart.product.name}</h5>
                        <span className="card-text text-truncate-3-lines">
                          <small className="text-body-secondary">
                            {cart.product.description}
                          </small>
                        </span>
                        <br />
                        <span className="card-text fs-5">
                          <span className="fs-5 fw-medium">
                            Price: ₹{cart.product.price}
                          </span>{" "}
                          <s className="fs-6 fw-light">₹{cart.product.price}</s>{" "}
                          <span className="text-success">0 % Off</span>
                          <br />
                          <span className="fs-5 fw-bold">
                            Total Price: ₹{cart.product.price * cart.quantity}
                          </span>
                        </span>
                        <div className="container">
                          <button
                            className="btn btn-danger btn-sm col-md-1"
                            onClick={() => decrementCart(cart)}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>{" "}
                          <span className="btn btn-secondary btn-sm col-md-1 fw-bold">
                            {cart.quantity}
                          </span>{" "}
                          <button
                            className="btn btn-success btn-sm col-md-1"
                            onClick={() => incrementCart(cart)}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>{" "}
                          <button
                            className="btn btn-danger m-2 ms-6 btn-sm"
                            onClick={() => deleteCart(cart.id)}
                          >
                            <i className="fa-solid fa-trash-arrow-up"></i>{" "}
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {carts.length > 0 && (
            <div
              className="card card-sh mt-3  col-md-3 mx-auto "
              style={{ height: "450px" }}
            >
              <table className="table table-borderless ">
                <tbody>
                  <tr>
                    <td colSpan="2">
                      <small className="text-center fs-5">PRICE DETAILS</small>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan="2">
                      Total item
                    </th>
                    <td>{totalItems}</td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan="2">
                      Total Price ({totalItems} items)
                    </th>
                    <td> &#8377; {cartAmount}/-</td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan="2">
                      Delivery charge
                    </th>
                    <td>₹ 0</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan="2">
                      Total Amount
                    </th>
                    <td> &#8377; {cartAmount}/-</td>
                  </tr>
                </tbody>
              </table>
              <Link
                className="btn btn-warning btn-md fw-bold mt-auto mb-4 col-md-12 text-center"
                href="/user/orders"
                onClick={checkout}
              >
                <i className="fa-solid fa-bag-shopping fa-1.5x"></i> PLACE ORDER
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* end cart start here */}
    </>
  );
};

export default ViewMyCart;
