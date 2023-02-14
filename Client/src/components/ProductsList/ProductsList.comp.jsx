import React, { useState, useEffect, useContext } from "react";
import {
  getProducts,
  getWalletStatus,
  updateBoughtProductInDB,
  updateWalletStatus,
} from "../../services/SocialAct.services";
import { postTweet } from "../../services/Twitter.services";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import { useParams } from "react-router-dom";
import { walletContext } from "../../contexts/contexts";
import "./style.css";

export const ProductsList = () => {
  const { user } = useAuth0();
  const { campaignID } = useParams();
  const { setWalletUpdate } = useContext(walletContext);
  const [productsList, setProductsList] = useState([]);
  const [chosenProduct, setChosenProduct] = useState({
    id: "",
    price: "",
  });
  const [PostBuyWindow, setPostBuyWindow] = useState(false);

  const checkIfEnoughMoney = async (price) => {
    return await getWalletStatus(user.email).then((res) => {
      if (res >= price) {
        updateWalletStatus(user.email, price);
        return true;
      } else {
        return false;
      }
    });
  };

  const donateBack = (pid) => {
    setPostBuyWindow(false);
    notify("success", "Thank you for your donation");
    issueTweet(pid);
  };

  const issueTweet = (pid) => {
    postTweet(pid).then((res) => {
      console.log("tweet", res);
    });
  };

  const handleBuy = async (pid, price) => {
    setChosenProduct({ id: pid, price: price });
    await checkIfEnoughMoney(price).then((res) => {
      console.log("enoughMoney", res);
      if (res) {
        console.log("I have enough money");
        setPostBuyWindow(true);
        setWalletUpdate(true);
      } else {
        notify("error", "You don't have enough money");
      }
    });
  };

  const updateBoughtProduct = (pid) => {
    setPostBuyWindow(false);
    console.log("chosenP", pid);
    updateBoughtProductInDB(pid, user.email).then((updatedSuccessfully) => {
      if (updatedSuccessfully) {
        notify("success", "Thank you for your purchase");
        issueTweet(pid);
        showProductsList();
      } else {
        notify("error", "Something went wrong, please try again");
      }
    });
  };

  const showProductsList = async () => {
    await getProducts(campaignID).then((res) => {
      if (res === "error") {
        notify("error", "Something went wrong, try again later");
        return;
      }
      setProductsList(res);
    });
  };

  useEffect(() => {
    showProductsList();
  }, []);

  return (
    <div className="prd-container">
      <h2 className="reports">Our Products</h2>
      <div className="cards-container">
        {productsList &&
          productsList.map((product) => (
            <div className="card">
              <img
                src={product.image}
                className="card-img-top"
                alt="..."
                width={20}
                height={175}
              />
              <div className="card-body">
                <h2 className="card-title mb-3">{product.productName}</h2>
                <h4 className="card-subtitle mb-2 text-muted">
                  {product.price}$
                </h4>
                <button
                  onClick={() => handleBuy(product.id, product.price)}
                  className="btn btn-primary ops-btn"
                >
                  Buy
                </button>
                {console.log(PostBuyWindow)}
              </div>
            </div>
          ))}
        {productsList.length === 0 && (
          <h1 className="reports">No products yet</h1>
        )}

        {PostBuyWindow && (
          <div className="modal">
            {/* Modal content */}
            {console.log("I am here")}
            <div className="modal-content">
              <span
                className="close"
                onClick={() => donateBack(chosenProduct.id)}
              >
                &times;
              </span>
              <h2>Thank you!</h2>
              <h5>Hi there, thanks for helping us achieve our goals! </h5>
              <h6>Would you like to help us a little bit more?</h6>
              <p>
                Donate us the product back and help make the world a little
                better.
              </p>
              <button
                className="keep-product-btn"
                onClick={() => updateBoughtProduct(chosenProduct.id)}
              >
                I'll keep it to myself
              </button>
              <button
                onClick={() => donateBack(chosenProduct.id)}
                className="donate-back-btn"
              >
                Donate Product Back
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
