import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { RoleContext, identifiedUserContext } from "../../contexts/contexts";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CallIcon from "@mui/icons-material/Call";
import FaceIcon from "@mui/icons-material/Face";
import { Logout, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Wallet } from "../compsIndex";
import "./style.css";

export const Sidebar = () => {
  const role = useContext(RoleContext);
  const { identifiedUser } = useContext(identifiedUserContext);
  const { logout, user } = useAuth0();

  return (
    <div className="container">
      <ul>
        <li>
          <Link className="link" to="/">
            <div className="icon">
              <HomeIcon />
            </div>
            <div className="title">Home</div>
          </Link>
        </li>
        <li>
          <Link className="link" to="/about">
            <div className="icon">
              <InfoIcon />
            </div>
            <div className="title">About</div>
          </Link>
        </li>
        <li>
          <Link className="link" to="/contactus">
            <div>
              <CallIcon />
            </div>
            <div className="title">Contact Us</div>
          </Link>
        </li>
        <li>
          <Link className="link" to="/lasttweets">
            <div>
              <Twitter />
            </div>
            <div className="title">Tweets</div>
          </Link>
        </li>
        {role === "Social Activist" && identifiedUser && (
          <li>
            <div className="social-act-wallet">
              <Wallet />
            </div>
          </li>
        )}
        <li>
          <div className="link">
            <FaceIcon />
            {user.name.split("@")[0]}
          </div>
        </li>
        <li>
          <Link className="link">
            <div>
              <Logout />
            </div>
            <div
              onClick={() => logout({ returnTo: window.location.origin })}
              className="title"
            >
              Logout
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
