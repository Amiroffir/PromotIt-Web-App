import axios, { AxiosResponse } from "axios";
import { ServerURL } from "../global";
import { Delivery, Product } from "../interfaces/interfaces";

export const addNewProducts = async (products: Product[]): Promise<boolean> => {
  try {
    console.log(products);
    let endpoint: string = `${ServerURL}/Products/Add`;
    await axios.post(endpoint, products);
    return true;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Error adding products");
  }
};

export const getDeliveries = async (email: string): Promise<Delivery[]> => {
  try {
    let endpoint = `${ServerURL}/BusinessReps/GetDeliveries/${email}`;
    const response: AxiosResponse = await axios.get(endpoint);
    let deliveries: Delivery[] = response.data;
    return deliveries;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Error getting deliveries");
  }
};

export const updateDelivered = async (id: string): Promise<boolean> => {
  try {
    let endpoint = `${ServerURL}/BusinessReps/UpdateDelivered/${id}`;
    await axios.put(endpoint);
    return true;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Error updating as delivered");
  }
};
