import React, { useContext, useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
import { RoleContext } from "../../contexts/contexts";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import { getCampaignDetails } from "../../services/General.services";
import { Hashtag } from "react-twitter-widgets";
import "./style.css";
import { Campaign } from "../../interfaces/interfaces";
import { Notify, SystemRole } from "../../interfaces/enums";

export const CampaignDetails = () => {
  const { campaignID }: Params<string> = useParams();
  const role: string = useContext<string>(RoleContext);
  const [campaign, setCampaign] = useState<Campaign>({} as Campaign);

  const showCampaignDetails = async (): Promise<void> => {
    await getCampaignDetails(campaignID)
      .then((res: Campaign) => {
        if (res === null) {
          notify(Notify.Error, "Error getting campaign details");
          return;
        }
        setCampaign(res);
      })
      .catch((err: Error) => {
        notify(Notify.Error, err.message);
      });
  };

  useEffect(() => {
    showCampaignDetails();
  }, []);
  return (
    <>
      <div className="details-container">
        <div className="details-container__left">
          <h1>{campaign.CampaignName}</h1>
          <h6>By: {campaign.NonProfitRepID}</h6>
          {role === SystemRole.SocialActivist && (
            <Hashtag
              hashtag={campaign.CampaignHash}
              options={{ url: campaign.CampaignUrl, text: "PromotIt - " }}
            />
          )}
          <p>{campaign.CampaignDesc}</p>
        </div>
        <div className="details-container__right">
          <img
            className="campaign-img"
            src={campaign.Image}
            alt=""
            width={390}
            height={220}
          ></img>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
