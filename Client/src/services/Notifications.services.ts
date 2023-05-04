import { toast } from "react-toastify";
import { Notify } from "../interfaces/enums";

export const notify = (type: string, text: string): void => {
  if (type === Notify.Success) {
    toast.success(text, {
      position: "bottom-left",
      closeOnClick: true,
      bodyStyle: { color: "green" },
    });
  } else if (type === Notify.Error) {
    toast.error(text, {
      position: "bottom-left",
      closeOnClick: true,
      bodyStyle: { color: "red" },
    });
  }
};
