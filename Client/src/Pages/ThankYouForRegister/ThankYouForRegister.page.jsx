import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.css";

export const ThankYouForRegister = () => {
  const { logout } = useAuth0();
  return (
    <>
      <div className="view">
        <div className="thanks-container">
          <img
            className="thankYou"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82974/yep.png"
          />
          <p className="tagline">
            Thanks for registering with PromotIt. Please wait for your account
            to be approved.
          </p>
        </div>
        <div className="actions">
          <a onClick={() => logout()} className="logout-button">
            Log Me Out
          </a>
        </div>
      </div>
    </>
  );
};
