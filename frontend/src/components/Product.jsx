import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { useSelector } from "react-redux";

const Product = ({ product }) => {
  const { serverUrl } = useSelector((state) => state.app);

  return (
    <div className="h-100 d-flex align-items-stretch">
      <Card className=" my-3 p-3 rounded shadow-sm">
        <Link to={`product/${product._id}`}>
          <Card.Img
            className="rounded"
            src={serverUrl + product.image}
            alt=""
          />
        </Link>
        <Card.Body as="div">
          <Card.Title as="div" className="">
            {product.name}
          </Card.Title>
          <Card.Text as="div">
            <div className="my-3 ">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </div>
          </Card.Text>
          <Card.Text as="h3">
            <i className=" my-4 fa-solid fa-dollar-sign"></i>
            {product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
