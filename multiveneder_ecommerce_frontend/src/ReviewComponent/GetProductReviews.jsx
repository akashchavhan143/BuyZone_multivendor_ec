import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import star from "../images/star.png";

const GetProductReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("0.0");

  const { productId } = useParams();

  const retrieveAllReviews = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/review/fetch?productId=" + productId
    );
    return response.data;
  };

  useEffect(() => {
    const getAllReviews = async () => {
      const allReviews = await retrieveAllReviews();

      if (allReviews) {
        setReviews(allReviews.reviews);
        setRating(allReviews.averageRating);
      }
    };

    getAllReviews();
  }, []);

  return (
    <div
      class="list-group  "
      style={{
        height: "30rem",
      }}
    >
      <div class="list-group-item  ">
        <div className="fs-4 ">
          {" "}
          Rating:
          {rating > 3 ? (
            <p className="text-success fs-2 fw-bold">
              {" "}
              {rating} /5 <i className="fa-solid fa-star me-2"></i>
            </p>
          ) : (
            <p className="text-danger fs-2 fw-bold">
              {" "}
              {rating} /5 <i className="fa-solid fa-star me-2"></i>
            </p>
          )}
        </div>
      </div>
      <div
        style={{
          overflowY: "auto",
        }}
      >
        {reviews.map((review) => {
          return (
            <div class="list-group-item list-group-item-action ">
              <b className="text-color1">{review.user.firstName + " "}</b>
              <b className="text-color">{review.star + " /5 "}</b>
              <img
                src={star}
                width="20"
                height="20"
                className="d-inline-block align-top"
                alt=""
              />
              <br />
              <p>{review.review}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GetProductReviews;
