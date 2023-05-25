import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastify = (message, type) => {
  const notify = () => {
    switch (type) {
      case "error":
        toast.error(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
    }
  };

  notify();
  return (
    <>
      <ToastContainer />
    </>
  );
};

export default Toastify;
