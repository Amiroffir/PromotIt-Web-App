// Users

export interface UserReport {
  email: string;
  fullName: string;
  userID: number;
  userType: string;
}

export interface SocialActivist extends UserDetails {
  address: string;
  phone: string;
  earningStatus: number;
  twitterHandle: string;
  lastEarningsUpdate: string | null;
}

export interface BusinessRep extends UserDetails {
  company: string;
}

export interface NonProfitRep extends UserDetails {
  organizationUrl: string;
  organizationName: string;
}

export interface UserDetails {
  id: number | null;
  userID: number | null;
  fullName: string;
  email: string;
  [key: string]: string | number | null;
}

export interface Auth0Response {
  id: string;
  name: string;
  description: string;
}

export interface Auth0Role {
  name: string;
}

// Products

export interface Product {
  listID?: string;
  id: number;
  productID: number;
  productName: string;
  price: number;
  donatedBy: number;
  donatedTo: number | string | undefined;
  isBought: boolean;
  buyerID: number | undefined;
  isDelivered: boolean;
  image: string;
}

export interface Delivery {
  ProductSerialNumber: string;
  PID: number;
  FullName: string;
  Email: string;
  Address: string;
  Phone: string;
}

// Campaigns

export interface Campaign {
  id: number | null;
  CampaignName: string;
  CampaignDesc: string;
  CampaignHash: string;
  CampaignUrl: string;
  DonationsAmount: number;
  NonProfitRepID: string;
  Image: string;
}

export type CampaignsDict = [string, Campaign];

export interface TweetReport {
  handle: string;
  tweetsCount: number;
  type: string;
}

export interface TweetByID {
  tweetID: string;
}
