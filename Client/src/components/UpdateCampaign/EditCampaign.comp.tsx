import React, { useState, useEffect } from "react";
import {
  NavigateFunction,
  Params,
  useNavigate,
  useParams,
} from "react-router-dom";
import { updateCampaignInDB } from "../../services/NonProfitRep.services";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import { getCampaignDetails } from "../../services/General.services";
import "./style.css";
import { Campaign } from "../../interfaces/interfaces";
import { Notify } from "../../interfaces/enums";

export const EditCampaign = () => {
  const { campaignID }: Params<string> = useParams<string>();
  const [charactersLeft, setCharactersLeft] = useState<number>(254);
  const [updatedCampaign, setUpdatedCampaign] = useState<Campaign>(
    {} as Campaign
  );
  const Navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    getCampaignDetails(campaignID).then((res: Campaign) => {
      setUpdatedCampaign(res);
    });
  }, []);

  const updateCampaign = () => {
    console.log(updatedCampaign);
    // validation for empty fields
    if (
      !updatedCampaign.CampaignName ||
      !updatedCampaign.CampaignHash ||
      !updatedCampaign.CampaignUrl ||
      !updatedCampaign.CampaignDesc
    ) {
      notify(Notify.Error, "Please fill all the fields");
      return;
    }
    updateCampaignInDB(updatedCampaign)
      .then((updatedSuccessfully: boolean) => {
        if (updatedSuccessfully) {
          notify(Notify.Success, "Campaign updated successfully");
          setTimeout(() => {
            Navigate("/nonProfit/myCampaigns");
          }, 2000);
        } else {
          notify(Notify.Error, "Something went wrong, please try again");
        }
      })
      .catch((err: Error) => {
        notify(Notify.Error, err.message);
      });
  };

  return (
    <div className="admin-homepage-container">
      <h1 className="reports">Edit Campaign</h1>
      <div className="form-border">
        <div className="form-floating mb-3">
          <input
            value={updatedCampaign.CampaignName}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder={"Campaign Name"}
            onChange={(o) => {
              setUpdatedCampaign({
                ...updatedCampaign,
                CampaignName: o.target.value,
              });
            }}
          />
          <label htmlFor="floatingInput">Campaign Name</label>
        </div>
        <div className="form-floating  mb-3">
          <input
            value={updatedCampaign.CampaignHash}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="# Your Hashtag"
            onChange={(o) => {
              setUpdatedCampaign({
                ...updatedCampaign,
                CampaignHash: o.target.value,
              });
            }}
          />
          <label htmlFor="floatingInput">Campaign Hashtag</label>
        </div>
        <div className="form-floating mb-3">
          <input
            value={updatedCampaign.CampaignUrl}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="URL"
            onChange={(o) => {
              setUpdatedCampaign({
                ...updatedCampaign,
                CampaignUrl: o.target.value,
              });
            }}
          />
          <label htmlFor="floatingInput">Campaign Landing Page</label>
        </div>
        <div className="form-floating mb-3">
          <textarea
            value={updatedCampaign.CampaignDesc}
            className="form-control"
            placeholder="About My Campaign"
            id="floatingTextarea"
            onChange={(o) => {
              setUpdatedCampaign({
                ...updatedCampaign,
                CampaignDesc: o.target.value,
              });
              setCharactersLeft(254 - o.target.value.length);
            }}
            onKeyDown={(o) => {
              const textarea = o.target as HTMLTextAreaElement;
              if (textarea.value.length >= 255) {
                o.preventDefault();
              }
            }}
            maxLength={254}
          ></textarea>
          <div className="characters-left">
            {charactersLeft} Characters left
          </div>
          <label htmlFor="floatingTextarea">Description</label>
        </div>
        <button onClick={updateCampaign} className="btn add-product-btn">
          Update
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};
