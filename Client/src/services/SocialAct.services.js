import axios from "axios";
import { ServerURL } from "../global";
export const getProducts = async (campaignID) => {
  try {
    let endpoint = `${ServerURL}/Products/Get/${campaignID}`;
    let response = await axios.get(endpoint);
    let products = response.data;
    console.log(response.data);
    return products;
  } catch (error) {
    console.error(error);
    return "error";
  }
};

export const updateBoughtProductInDB = async (pid, email) => {
  try {
    let endpoint = `${ServerURL}/Products/UpdateBought/${pid}`;
    let response = await axios.put(endpoint, email);
    console.log(response.data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getWalletStatus = async (email) => {
  try {
    let endpoint = `${ServerURL}/SocialActivists/GetWallet/${email}`;
    let response = await axios.get(endpoint);
    let wallet = response.data;
    console.log(response.data);
    return wallet;
  } catch (error) {
    console.error(error);
    return "error";
  }
};

export const updateWalletStatus = async (price, email) => {
  try {
    let endpoint = `${ServerURL}/SocialActivists/UpdateWallet/${email}`;
    let response = await axios.put(endpoint, price);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    return "error";
  }
};
