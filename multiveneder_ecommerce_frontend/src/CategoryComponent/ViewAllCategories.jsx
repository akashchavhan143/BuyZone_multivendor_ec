import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewAllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    const allCategories = await retrieveAllCategory();
    if (allCategories) {
      setAllCategories(allCategories.categories);
    }
  };

  const retrieveAllCategory = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/category/fetch/all"
    );
    console.log(response.data);
    return response.data;
  };

  const deleteCategory = (categoryId, e) => {
    console.log(" started deleting categoryId", categoryId);
    fetch(
      "http://localhost:8080/api/category/delete?categoryId=" + categoryId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    )
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

            getAllCategory();
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
      });
  };

  const updateCategory = (category) => {
    navigate("/admin/category/update", { state: category });
  };

  return (
    <div className="mt-3">
      <div
        className="card  ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className=" text-center p-1 m-3"
          style={{
            borderRadius: "5px",
            background: "linear-gradient(to right,rgb(233, 232, 246), #e9ecef)",
          }}
        >
          <h2 className="">📁 ALL CATEGORIES</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover  ">
              <thead className="">
                <tr>
                  <th scope="col">Category Id</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Description</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {allCategories.map((category) => {
                  return (
                    <tr>
                      <td>
                        <b>{category.id}</b>
                      </td>
                      <td>{category.name}</td>
                      <td>{category.description}</td>

                      <td style={{ textAlign: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <button
                            onClick={() => updateCategory(category)}
                            className="btn btn-sm btn-success "
                          >
                            Update
                          </button>

                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="btn btn-sm btn-danger ms-2"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllCategories;
