import React, {
  useState,
  useContext,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import { RoleContext } from "../../contexts/contexts";
import {
  BusinessRepForm,
  NonProfitRepForm,
  SocialActRepForm,
} from "../UsersSignUpForms/UsersSignUpForms";
import { handleSignUp } from "../../services/General.services";
import "./style.css";
import {
  BusinessRep,
  NonProfitRep,
  SocialActivist,
  UserDetails,
} from "../../interfaces/interfaces";
import { Notify, SystemRole } from "../../interfaces/enums";

interface SignUpProps {
  setFirstSignUp: Dispatch<SetStateAction<boolean>>;
}

export const FirstSignUp = ({ setFirstSignUp }: SignUpProps) => {
  const { logout } = useAuth0();
  const role: string = useContext<string>(RoleContext);
  const [userToAdd, setUserToAdd] = useState<UserDetails>({} as UserDetails);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [newBusinessRep, setBusinessRep] = useState<UserDetails>({
    id: null,
    userID: null,
  } as BusinessRep);
  const [newNonProfitRep, setNonProfitRep] = useState<UserDetails>({
    id: null,
    userID: null,
  } as NonProfitRep);
  const [newSocialActRep, setSocialActRep] = useState<UserDetails>({
    id: null,
    userID: null,
  } as SocialActivist);

  useEffect(() => {
    if (role === SystemRole.BusinessRep) {
      setUserToAdd(newBusinessRep);
    } else if (role === SystemRole.NonProfitRep) {
      setUserToAdd(newNonProfitRep);
    } else if (role === SystemRole.SocialActivist) {
      setUserToAdd(newSocialActRep);
    }
  }, [newBusinessRep, newNonProfitRep, newSocialActRep]);

  const addUser = () => {
    handleSignUp(userToAdd, role).then((isSuccsseed) => {
      if (isSuccsseed) {
        notify(Notify.Success, "You have been signed up successfully");
        setSubmitted(true);
        if (submitted) {
          setFirstSignUp(false);
        }
      } else {
        notify(Notify.Error, "Server is down, please try again later");
      }
    });
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>First, let's get to know you </h1>
        <p>Please enter your details</p>

        <form className="form-floating mb-3">
          {/* check what form to show */}

          {role === SystemRole.BusinessRep && (
            <BusinessRepForm
              newUser={newBusinessRep}
              setNewUser={setBusinessRep}
            />
          )}
          {role === SystemRole.NonProfitRep && (
            <NonProfitRepForm
              newUser={newNonProfitRep}
              setNewUser={setNonProfitRep}
            />
          )}
          {role === SystemRole.SocialActivist && (
            <SocialActRepForm
              newUser={newSocialActRep}
              setNewUser={setSocialActRep}
            />
          )}
          <div>
            <button
              className="btn btn-success btn-sm mt-3"
              type="submit"
              onClick={addUser}
            >
              Sign Up
            </button>
            <button onClick={() => logout()}>logout</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
