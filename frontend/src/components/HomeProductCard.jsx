import { Image, Button } from "react-bootstrap";

const HomeProductCard = (props) => {
  return (
    <div className="home-product-card">
      <Image src={props.image} className="img-responsive" />
      <div className="centered home-product-card-text">
        <h1>{props.heading}</h1>
        {props.subtext ? (
          <div className="col-sm-12 col-md-4 col-lg-12">
            <Button>{props.subtext}</Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default HomeProductCard;
