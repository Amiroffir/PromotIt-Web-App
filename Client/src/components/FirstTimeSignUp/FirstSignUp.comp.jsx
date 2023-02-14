import React, { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import { RoleContext } from "../../contexts/contexts";
import {
  BusinessRepForm,
  NonProfitRepForm,
  SocialActRepForm,
} from "../../components/UsersSignUpForms/UsersSignUpForms";
import { handleSignUp } from "../../services/General.services";
import "./style.css";

export const FirstSignUp = ({ setFirstSignUp }) => {
  const { logout } = useAuth0();
  const role = useContext(RoleContext);
  const [userToAdd, setUserToAdd] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [newBusinessRep, setBusinessRep] = useState({
    fullName: "",
    email: "",
    company: "",
  });
  const [newNonProfitRep, setNonProfitRep] = useState({
    fullName: "",
    email: "",
    organizationUrl: "",
    organizationName: "",
  });
  const [newSocialActRep, setSocialActRep] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    earningStatus: 0,
    twitterHandle: "",
  });

  useEffect(() => {
    if (role === "Business Rep") {
      setUserToAdd(newBusinessRep);
    } else if (role === "Non Profit Rep") {
      setUserToAdd(newNonProfitRep);
    } else if (role === "Social Activist") {
      setUserToAdd(newSocialActRep);
    }
  }, [newBusinessRep, newNonProfitRep, newSocialActRep]);

  const addUser = () => {
    let isSuccseed = handleSignUp(userToAdd, role);
    if (isSuccseed) {
      notify("success", "You have been signed up successfully");
      setSubmitted(true);
      if (submitted) {
        setFirstSignUp(false);
      }
    } else {
      notify("error", "Server is down, please try again later");
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>First, let's get to know you </h1>
        <p>Please enter your details</p>

        <form className="form-floating mb-3">
          {/* check what form to show */}

          {role === "Business Rep" && (
            <BusinessRepForm
              newBusinessRep={newBusinessRep}
              setBusinessRep={setBusinessRep}
            />
          )}
          {role === "Non Profit Rep" && (
            <NonProfitRepForm
              newNonProfitRep={newNonProfitRep}
              setNonProfitRep={setNonProfitRep}
            />
          )}
          {role === "Social Activist" && (
            <SocialActRepForm
              newSocialActRep={newSocialActRep}
              setSocialActRep={setSocialActRep}
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
