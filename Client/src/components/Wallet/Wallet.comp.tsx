import React, { useState, useEffect, useContext } from "react";
import { getWalletStatus } from "../../services/SocialAct.services";
import { walletContext } from "../../contexts/contexts";
import Refresh from "@mui/icons-material/Refresh";
import { User, useAuth0 } from "@auth0/auth0-react";
import "./style.css";

export const Wallet = () => {
  const { user }: User = useAuth0();
  const [wallet, setWallet] = useState<number>(0.0);
  const [loading, setLoading] = useState<boolean>(false);
  const { walletUpdate, setWalletUpdate } = useContext<any>(walletContext); // Still have to figure out how to fix this any

  const getWallet = (userEmail: string): void => {
    getWalletStatus(userEmail).then((res: number) => {
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

  const updateWallet = (): void => {
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
          onClick={() => updateWallet()}
        >
          {loading ? "Loading..." : <Refresh />}
        </button>
      </div>
    </div>
  );
};
