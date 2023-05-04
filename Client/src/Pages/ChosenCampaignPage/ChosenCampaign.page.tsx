import React, { useContext } from "react";
import {
  CampaignDetails,
  ProductsDonationForm,
  ProductsList,
} from "../../components/compsIndex";
import { RoleContext } from "../../contexts/contexts";
import "./style.css";
import { SystemRole } from "../../interfaces/enums";

export const ChosenCampaign = () => {
  const role: string = useContext<string>(RoleContext);
  return (
    <div className="admin-homepage-container">
      <CampaignDetails />
      {role === SystemRole.BusinessRep && <ProductsDonationForm />}
      {role === SystemRole.SocialActivist && <ProductsList />}
    </div>
  );
};
