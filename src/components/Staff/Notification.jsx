import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export default Notification = (content, type, close) => {
  return toast(content, {
    type: "" + type,
    autoClose: close,
  });
};
