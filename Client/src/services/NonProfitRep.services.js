import axios from "axios";
import { ServerURL } from "../global";
export const addNewCampaign = async (campaign) => {
  try {
    console.log(campaign);
    let endpoint = `${ServerURL}/Campaigns/Add`;
    await axios.post(endpoint, campaign);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getMyCampaigns = async (email) => {
  try {
    let endpoint = `${ServerURL}/Campaigns/GetMyCampaigns/${email}`;
    let response = await axios.get(endpoint);
    let campaigns = Object.entries(response.data);
    return campaigns;
  } catch (error) {
    console.error(error);
    return "error";
  }
};

export const updateCampaignInDB = async (campaign) => {
  try {
    console.log(campaign);
    let endpoint = `${ServerURL}/Campaigns/Update`;
    await axios.put(endpoint, campaign);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteCampaignInDB = async (campaignID) => {
  try {
    console.log(campaignID);
    let endpoint = `${ServerURL}/Campaigns/Delete/${campaignID} `;
    await axios.delete(endpoint);
  } catch (error) {
    console.error(error);
    return "error";
  }
};
