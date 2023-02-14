import axios from "axios";
import { ServerURL } from "../global";
export const addNewProducts = async (products) => {
  try {
    console.log(products);
    let endpoint = `${ServerURL}/Products/Add`;
    await axios.post(endpoint, products);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getDeliveries = async (email) => {
  try {
    let endpoint = `${ServerURL}/BusinessReps/GetDeliveries/${email}`;
    const response = await axios.get(endpoint);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateDelivered = async (id) => {
  try {
    let endpoint = `${ServerURL}/BusinessReps/UpdateDelivered/${id}`;
    await axios.put(endpoint);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
