import axios, { AxiosResponse } from "axios";
import { ServerURL } from "../global";
import { Campaign, CampaignsDict, UserDetails } from "../interfaces/interfaces";

export const handleSignUp = async (
  userToAdd: UserDetails,
  role: string
): Promise<boolean> => {
  try {
    let endpoint = `${ServerURL}/users/Add${role}`;
    await axios.post(endpoint, userToAdd);
    return true;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Error signing up, please try again later");
  }
};

export const checkFirstTime = async (userEmail: string): Promise<boolean> => {
  try {
    let response: Response = await fetch(
      `${ServerURL}/users/checkFirstTime/${userEmail}`
    );
    let isFirstTime: boolean = await response.json();
    return isFirstTime;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Error checking first time, please try again later");
  }
};

export const getCampaigns = async (): Promise<CampaignsDict[]> => {
  try {
    let response: AxiosResponse = await axios.get(`${ServerURL}/Campaigns/Get`);
    let campaigns: CampaignsDict[] = Object.entries(response.data);
    console.log("data", campaigns);
    return campaigns;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Error getting campaigns");
  }
};

export const getCampaignDetails = async (
  campaignId: string | undefined
): Promise<Campaign> => {
  try {
    let response: AxiosResponse = await axios.get(
      `${ServerURL}/Campaigns/GetCampaignDetails/${campaignId}`
    );
    let campaignDetails: Campaign = response.data;
    console.log("data", campaignDetails);
    return campaignDetails;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Error getting campaign details");
  }
};
