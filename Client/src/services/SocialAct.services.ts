import axios, { AxiosResponse } from "axios";
import { ServerURL } from "../global";
import { Product } from "../interfaces/interfaces";

export const getProducts = async (
  campaignID: string | undefined
): Promise<Product[]> => {
  try {
    let endpoint: string = `${ServerURL}/Products/Get/${campaignID}`;
    let response: AxiosResponse = await axios.get(endpoint);
    let products: Product[] = response.data;
    console.log(response.data);
    return products;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Error getting products");
  }
};

export const updateBoughtProductInDB = async (
  pid: number,
  email: string
): Promise<boolean> => {
  try {
    let endpoint: string = `${ServerURL}/Products/UpdateBought/${pid}`;
    let response: AxiosResponse = await axios.put(endpoint, email);
    let isUpdated: boolean = response.data;
    return isUpdated;
  } catch (err: any) {
    console.error(err.message);
    return false;
  }
};

export const getWalletStatus = async (email: string): Promise<number> => {
  try {
    let endpoint: string = `${ServerURL}/SocialActivists/GetWallet/${email}`;
    let response: AxiosResponse = await axios.get(endpoint);
    let wallet: number = response.data;
    console.log(response.data);
    return wallet;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Error getting wallet");
  }
};

export const updateWalletStatus = async (
  price: number,
  email: string
): Promise<void> => {
  try {
    let endpoint: string = `${ServerURL}/SocialActivists/UpdateWallet/${email}`;
    await axios.put(endpoint, price);
  } catch (err: any) {
    console.error(err.message);
  }
};
