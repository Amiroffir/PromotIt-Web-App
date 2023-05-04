import axios, { AxiosResponse } from "axios";
import { ServerURL } from "../global";
import { Campaign, CampaignsDict } from "../interfaces/interfaces";

export const addNewCampaign = async (campaign: Campaign): Promise<boolean> => {
  try {
    console.log(campaign);
    let endpoint: string = `${ServerURL}/Campaigns/Add`;
    let isSuccseed: boolean = await axios.post(endpoint, campaign);
    return isSuccseed;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Error adding new campaign");
  }
};

export const getMyCampaigns = async (
  email: string
): Promise<CampaignsDict[]> => {
  try {
    let endpoint: string = `${ServerURL}/Campaigns/GetMyCampaigns/${email}`;
    let response: AxiosResponse = await axios.get(endpoint);
    let campaigns: CampaignsDict[] = Object.entries(response.data);
    return campaigns;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Error getting my campaigns");
  }
};

export const updateCampaignInDB = async (
  campaign: Campaign
): Promise<boolean> => {
  try {
    console.log(campaign);
    let endpoint: string = `${ServerURL}/Campaigns/Update`;
    await axios.put(endpoint, campaign);
    return true;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Error updating campaign");
  }
};

export const deleteCampaignInDB = async (
  campaignID: string
): Promise<boolean> => {
  try {
    console.log(campaignID);
    let endpoint: string = `${ServerURL}/Campaigns/Delete/${campaignID} `;
    let isDeleted: boolean = await axios.delete(endpoint);
    return isDeleted;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Error deleting campaign");
  }
};
