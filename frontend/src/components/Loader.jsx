import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const Loader = () => {
  const app = useSelector((state) => state.app);
  return (
    <>
      {app.isLoading && (
        <div id="Loader">
          <Spinner animation="grow" />
          <h3>Please wait...</h3>
        </div>
      )}
    </>
  );
};

export default Loader;
