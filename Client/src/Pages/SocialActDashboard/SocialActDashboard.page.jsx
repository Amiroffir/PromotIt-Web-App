import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { walletContext, identifiedUserContext } from "../../contexts/contexts";
import {
  ChosenCampaign,
  ContactUs,
  SocialActHomePage,
  About,
  LastTweets,
} from "../pagesIndex";
import { checkFirstTime } from "../../services/General.services";
import { FirstSignUp, Sidebar } from "../../components/compsIndex";
import "./style.css";

export const SocialActDashboard = () => {
  // Use effect to get the user's details from the database and decide if it's his first time or not
  // If it's his first time, show another registering page
  const [showFirstSignUp, setFirstSignUp] = useState(false);
  const [walletUpdate, setWalletUpdate] = useState(false);
  const [identifiedUser, setIdentifiedUser] = useState(false);
  const { user } = useAuth0();

  useEffect(() => {
    console.log("user", user);
    checkFirstTime(user.email).then((res) => {
      console.log("res", res);
      if (res === false) setFirstSignUp(true);
      else setIdentifiedUser(true);
    });
  }, []);

  return (
    <identifiedUserContext.Provider value={{ identifiedUser }}>
      <walletContext.Provider value={{ walletUpdate, setWalletUpdate }}>
        <div className="social-dash-container">
          <Sidebar />
          <>
            {showFirstSignUp && (
              <FirstSignUp setFirstSignUp={setFirstSignUp}></FirstSignUp>
            )}
            <Routes>
              <Route path="/" element={<SocialActHomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/lasttweets" element={<LastTweets />} />
              <Route
                path="campaigns/:campaignID"
                element={<ChosenCampaign />}
              />
            </Routes>
          </>
        </div>
      </walletContext.Provider>
    </identifiedUserContext.Provider>
  );
};
