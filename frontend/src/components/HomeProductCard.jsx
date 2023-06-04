import { Image, Button, Row, Col } from "react-bootstrap";

const HomeProductCard = (props) => {
  return (
    <div
      className="home-product-card"
      style={{
        backgroundImage: `url(https://cdn.shopify.com/s/files/1/0265/3493/6627/files/slide-bg.jpg?v=1649834146&width=1920)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Row className="d-flex justify-content-center align-items-center w-100">
        <Col
          md
          className="p-5 d-flex justify-content-center align-items-center"
        >
          <div>
            <h3>{props.heading}</h3>
            <h1>{props.off}% OFF</h1>
            <h3>From {props.startingPrice}$</h3>
            {props.subtext ? (
              <div className="">
                <Button>{props.subtext}</Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Col>
        <Col md className="d-flex justify-content-center align-items-center">
          <img src={props.image} alt="" />
        </Col>
      </Row>
    </div>
  );
};

export default HomeProductCard;
