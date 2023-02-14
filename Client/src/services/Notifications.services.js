import { toast } from "react-toastify";

export const notify = (type, text) => {
  if (type === "success") {
    toast.success(text, {
      position: "bottom-left",
      closeOnClick: true,
      bodyStyle: { color: "green" },
    });
  } else if (type === "error") {
    toast.error(text, {
      position: "bottom-left",
      closeOnClick: true,
      bodyStyle: { color: "red" },
    });
  }
};
