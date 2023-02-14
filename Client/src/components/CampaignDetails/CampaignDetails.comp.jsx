import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RoleContext } from "../../contexts/contexts";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import { getCampaignDetails } from "../../services/General.services";
import { Hashtag } from "react-twitter-widgets";
import "./style.css";

export const CampaignDetails = () => {
  const { campaignID } = useParams();
  const role = useContext(RoleContext);
  const [campaign, setCampaign] = useState([]);
  const showCampaignDetails = async () => {
    await getCampaignDetails(campaignID).then((res) => {
      if (res === null) {
        notify("error", "Error getting campaign details");
        return;
      }
      setCampaign(res);
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
          {role === "Social Activist" && (
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
