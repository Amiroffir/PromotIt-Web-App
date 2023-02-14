import axios from "axios";
import { ServerURL } from "../global";
export const handleSignUp = async (userToAdd, role) => {
  try {
    let endpoint = `${ServerURL}/users/Add${role}`;
    await axios.post(endpoint, userToAdd);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const checkFirstTime = async (userEmail) => {
  try {
    let response = await fetch(
      `${ServerURL}/users/checkFirstTime/${userEmail}`
    );
    console.log("response", response);
    let data = await response.json();
    console.log("data", data);
    return data;
  } catch {
    console.log("error");
    return null;
  }
};

export const getCampaigns = async () => {
  try {
    let response = await axios.get(`${ServerURL}/Campaigns/Get`);
    console.log("response.data", response.data);
    let campaigns = Object.entries(response.data);
    console.log("data", campaigns);
    return campaigns;
  } catch {
    console.log("error");
    return null;
  }
};

export const getCampaignDetails = async (campaignId) => {
  try {
    let response = await axios.get(
      `${ServerURL}/Campaigns/GetCampaignDetails/${campaignId}`
    );
    console.log("response.data", response.data);
    let campaignDetails = response.data;
    console.log("data", campaignDetails);
    return campaignDetails;
  } catch {
    console.log("error");
    return null;
  }
};
