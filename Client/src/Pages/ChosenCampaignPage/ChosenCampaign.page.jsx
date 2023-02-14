import React, { useContext } from "react";
import {
  CampaignDetails,
  ProductsDonationForm,
  ProductsList,
} from "../../components/compsIndex";
import { RoleContext } from "../../contexts/contexts";
import "./style.css";

export const ChosenCampaign = () => {
  const role = useContext(RoleContext);
  return (
    <div className="admin-homepage-container">
      <CampaignDetails />
      {role === "Business Rep" && <ProductsDonationForm />}
      {role === "Social Activist" && <ProductsList />}
    </div>
  );
};
