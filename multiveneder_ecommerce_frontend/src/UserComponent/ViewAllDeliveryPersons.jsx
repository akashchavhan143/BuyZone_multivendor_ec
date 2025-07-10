import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllDeliveryPersons = () => {
  const [allDelivery, setAllDelivery] = useState([]);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllDelivery(allUsers.users);
      }
    };

    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/role-wise?role=Delivery",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header  btn-cust m-3  text-center"
          style={{
            borderRadius: "5px",
          }}
        >
          <h2>ALL DELIVERY PERSONS</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover ">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Sr NO</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Address</th>
                  <th scope="col">Seller</th>
                </tr>
              </thead>
              <tbody>
                {allDelivery.map((delivery, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>{delivery.firstName}</td>
                      <td>{delivery.lastName}</td>
                      <td>{delivery.emailId}</td>
                      <td>{delivery.phoneNo}</td>
                      <td>
                        {delivery.address.street +
                          ", " +
                          delivery.address.city +
                          ", " +
                          delivery.address.pincode}
                      </td>
                      <td>{delivery.seller.firstName}</td>
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

export default ViewAllDeliveryPersons;
