import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProductCarousel from "./ProductCarousel";

const UpdateProductForm = () => {
  const location = useLocation();
  const product = location.state;

  const [categories, setCategories] = useState([]);

  const seller_jwtToken = sessionStorage.getItem("seller-jwtToken");

  const seller = JSON.parse(sessionStorage.getItem("active-seller"));

  let navigate = useNavigate();

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/category/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const resCategory = await retrieveAllCategories();
      if (resCategory) {
        setCategories(resCategory.categories);
      }
    };

    getAllCategories();
  }, []);

  const [selectedImage1, setSelectImage1] = useState(null);
  const [selectedImage2, setSelectImage2] = useState(null);
  const [selectedImage3, setSelectImage3] = useState(null);

  const [updatedProduct, setUpdatedProduct] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    categoryId: product.categoryId,
    sellerId: product.sellerId,
  });

  const handleInput = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const saveProduct = (e) => {
    e.preventDefault();
    if (seller === null) {
      toast.error("Seller Id is missing!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    fetch("http://localhost:8080/api/product/update/detail", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + seller_jwtToken,
      },
      body: JSON.stringify(updatedProduct),
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
              navigate("/seller/product/all");
            }, 2000); // Redirect after 3 seconds
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
              navigate("/seller/product/all");
            }, 2000); // Redirect after 3 seconds
          } else {
            toast.error("It Seems Server is down!!!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              navigate("/seller/product/all");
            }, 2000); // Redirect after 3 seconds
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
    e.preventDefault();
  };

  const updateProductImage = (e) => {
    e.preventDefault();
    if (seller === null) {
      toast.error("Seller Id is missing!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    const formData = new FormData();
    formData.append("image1", selectedImage1);
    formData.append("image2", selectedImage2);
    formData.append("image3", selectedImage3);
    formData.append("id", product.id);

    axios
      .put("http://localhost:8080/api/product/update/image", formData, {
        headers: {
          Authorization: "Bearer " + seller_jwtToken, // Replace with your actual JWT token
        },
      })
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/seller/product/all");
          }, 2000); // Redirect after 3 seconds
        } else if (!response.success) {
          toast.error(response.responseMessage, {
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
          }, 2000); // Redirect after 3 seconds
        } else {
          toast.error("It Seems Server is down!!!", {
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
          }, 2000); // Redirect after 3 seconds
        }
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
        }, 2000); // Redirect after 3 seconds
      });
  };

  return (
    <div className="container-fluid">
      <div class="row mb-5">
        <div class="col-md-3 mt-2">
          <div class="card form-card shadow-lg custom-bg card-img">
            <ProductCarousel
              item={{
                image1: product.image1,
                image2: product.image2,
                image3: product.image3,
              }}
            />
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <div className="card  shadow-lg ">
            <div className="container-fluid">
              <div
                className="card-header btn-cust mt-2 text-center"
                style={{
                  borderRadius: "5px",
                }}
              >
                <h5 className="card-title">Update Product Details</h5>
              </div>
              <div className="card-body text-color">
                <form className="row g-3">
                  <div className="col-md-6 mb-3">
                    <label for="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="name"
                      onChange={handleInput}
                      value={updatedProduct.name}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label for="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      onChange={handleInput}
                      value={updatedProduct.description}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Category</label>

                    <select
                      name="categoryId"
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option value="">Select Category</option>

                      {categories.map((category) => {
                        return (
                          <option value={category.id}> {category.name} </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="quantity" class="form-label">
                      Stock
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      onChange={handleInput}
                      value={updatedProduct.quantity}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="price" class="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      onChange={handleInput}
                      value={updatedProduct.price}
                    />
                  </div>

                  <div className="d-flex aligns-items-center justify-content-center mb-2">
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={saveProduct}
                    >
                      Update Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mt-2">
          <div className="card form-card custom-bg shadow-lg">
            <div className="container-fluid">
              <div
                className="card-header btn-cust mt-2 text-center"
                style={{
                  borderRadius: "5px",
                }}
              >
                <h5 className="card-title">Update Product Image</h5>
              </div>
              <div className="card-body text-color">
                <form className="row">
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      image1
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      name="image1"
                      onChange={(e) => setSelectImage1(e.target.files[0])}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Image2
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      name="image2"
                      onChange={(e) => setSelectImage2(e.target.files[0])}
                    />
                  </div>

                  <div className="mb-3">
                    <label for="formFile" className="form-label">
                      Image2
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      name="image3"
                      onChange={(e) => setSelectImage3(e.target.files[0])}
                    />
                  </div>

                  <div className="d-flex aligns-items-center justify-content-center mb-2">
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={updateProductImage}
                    >
                      Update Image
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductForm;
