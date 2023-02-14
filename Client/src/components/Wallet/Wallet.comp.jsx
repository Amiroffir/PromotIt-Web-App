import React, { useState, useEffect, useContext } from "react";
import { getWalletStatus } from "../../services/SocialAct.services";

import { walletContext } from "../../contexts/contexts";
import Refresh from "@mui/icons-material/Refresh";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.css";

export const Wallet = () => {
  const { user } = useAuth0();
  const [wallet, setWallet] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const { walletUpdate, setWalletUpdate } = useContext(walletContext);

  const getWallet = (user) => {
    getWalletStatus(user).then((res) => {
      setWallet(res);
    });
  };

  if (walletUpdate === true) {
    console.log("walletUpdate", walletUpdate);
    setTimeout(() => {
      getWallet(user.email);
      setWalletUpdate(false);
    }, 10);
  }
  useEffect(() => {
    getWallet(user.email);
  }, []);

  const updateWallet = (email) => {
    setLoading(true);
    setWalletUpdate(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="wallet-div">
      {wallet} $
      <div>
        <button
          className="refresh-btn add-product-btn"
          onClick={() => updateWallet(user.email)}
        >
          {loading ? "Loading..." : <Refresh />}
        </button>
      </div>
    </div>
  );
};
