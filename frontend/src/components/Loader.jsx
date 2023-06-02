import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const Loader = () => {
  const app = useSelector((state) => state.app);
  return (
    <div className="loader-body">
      {app.isLoading && (
        <div id="Loader">
          <Spinner animation="grow" />
        </div>
      )}
    </div>
  );
};

export default Loader;
