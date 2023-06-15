import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Form, Alert, Image, Button } from "react-bootstrap";
import Loader from "../components/loader";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, UpdateProduct } from "../network/endpoints/Products";
import { toggleLoading } from "../store/Slices/App/AppSlice";
import {
  resetCartItems,
  resetShippingAddress,
} from "../store/Slices/Cart/CartSlice";

const ProductEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const app = useSelector((state) => state.app);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const token = userInfo.token;
  const GetProdcut = async () => {
    dispatch(toggleLoading(true));
    await getProduct(id).then((response) => {
      console.log(response.data);
      setName(response.data.name);
      setBrand(response.data.brand);
      setCategory(response.data.category);
      setCountInStock(response.data.countInStock);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setImage(response.data.image);
    });
    setTimeout(() => {
      dispatch(toggleLoading(false));
    }, 100);
  };

  const navigationHandler = () => {
    navigate(-1);
  };

  const updateHandler = () => {
    UpdateProduct(token, id, {
      name: name,
      price: price,
      brand: brand,
      countInStock: Number(countInStock),
      category: category,
      description: description,
    });
  };

  useEffect(() => {
    GetProdcut();
  }, []);
  return (
    <div className="page-screen my-5">
      <Button onClick={navigationHandler}>Go Back</Button>
      {app.isLoading ? (
        <Loader />
      ) : (
        <Card className="p-5 my-3">
          <h3 className="mb-5">User ID: #{id}</h3>
          <Row className="my-4">
            <Col md>
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="my-2 rounded"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col md>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                className="my-2 rounded"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Col>
            <Col md>
              <Form.Label>Category</Form.Label>
              <Form.Control
                className="my-2 rounded"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Col>
            <Row className="my-4">
              <Col md>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  className="my-2 rounded"
                  type="text"
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
              <Col md>
                <Form.Label>CountInStock</Form.Label>
                <Form.Control
                  className="my-2 rounded"
                  type="text"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </Col>

              <Col md>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  className="my-2 rounded"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="my-4">
              <Col md>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Default file input example</Form.Label>
                  <Form.Control
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Button className="my-2" onClick={updateHandler}>
                Update
              </Button>
            </Row>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default ProductEditScreen;
