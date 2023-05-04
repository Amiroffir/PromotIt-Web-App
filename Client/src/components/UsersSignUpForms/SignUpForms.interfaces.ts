import { Dispatch, SetStateAction } from "react";
import { UserDetails } from "../../interfaces/interfaces";

export interface FormProps {
  newUser: UserDetails;
  setNewUser: Dispatch<SetStateAction<UserDetails>>;
}
