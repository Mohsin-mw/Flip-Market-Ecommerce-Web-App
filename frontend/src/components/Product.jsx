import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className=" my-3 p-3 rounded shadow-sm">
      <Link to={`product/${product._id}`}>
        <Card.Img className="rounded" src={product.image} alt="" />
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
          <i class=" my-4 fa-solid fa-dollar-sign"></i>
          {product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
