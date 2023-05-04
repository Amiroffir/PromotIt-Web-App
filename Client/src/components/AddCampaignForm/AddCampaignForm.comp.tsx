import React, { useState } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
import { addNewCampaign } from "../../services/NonProfitRep.services";
import { notify } from "../../services/Notifications.services";
import { ToastContainer } from "react-toastify";
import "./style.css";
import { Campaign } from "../../interfaces/interfaces";
import { Notify } from "../../interfaces/enums";

export const AddCampaignForm = () => {
  const { user }: User | undefined = useAuth0();
  const [charactersLeft, setCharactersLeft] = useState<number>(254);
  const [newCampaign, setNewCampaign] = useState<Campaign>({
    id: null,
  } as Campaign);

  const addCampaign = (): void => {
    // validation for empty fields
    if (
      !newCampaign.CampaignName ||
      !newCampaign.CampaignHash ||
      !newCampaign.CampaignUrl ||
      !newCampaign.CampaignDesc
    ) {
      console.log(newCampaign);
      notify(Notify.Error, "Please fill all fields"); // show error notification
      return;
    }

    addNewCampaign(newCampaign)
      .then((isSuccsseed: boolean) => {
        if (isSuccsseed) {
          notify(Notify.Success, "Campaign added successfully"); // show success notification
        } else {
          notify(Notify.Error, "Something went wrong"); // show error notification
        }
      })
      .catch((err: Error) => {
        notify(Notify.Error, err.message); // show error notification
      });

    // clear the form
    document
      .querySelectorAll("input")
      .forEach((input: HTMLInputElement) => (input.value = ""));
    document
      .querySelectorAll("textarea")
      .forEach((input: HTMLTextAreaElement) => (input.value = ""));
    // clear the state
    setNewCampaign({
      id: null,
    } as Campaign);
    console.log(newCampaign);
  };

  return (
    <div className="admin-homepage-container">
      <h1 className="reports">Add New Campaign</h1>
      <div className="form-border">
        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Campaign Name"
            onChange={(o) => {
              setNewCampaign({ ...newCampaign, CampaignName: o.target.value });
            }}
          />
          <label htmlFor="floatingInput">Campaign Name</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="# Your Hashtag"
            onChange={(o) => {
              setNewCampaign({ ...newCampaign, CampaignHash: o.target.value });
            }}
          />
          <label htmlFor="floatingInput">Campaign Hashtag</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="URL"
            onChange={(o) => {
              setNewCampaign({
                ...newCampaign,
                CampaignUrl: o.target.value,
              });
            }}
          />
          <label htmlFor="floatingInput">Campaign Landing Page</label>
        </div>
        <div className="form-floating mb-2">
          <textarea
            className="form-control"
            placeholder="About My Campaign"
            id="floatingTextarea"
            onChange={(o) => {
              setNewCampaign({
                ...newCampaign,
                CampaignDesc: o.target.value,
              });
              setCharactersLeft(254 - o.target.value.length);
            }}
            onKeyDown={(o) => {
              const textarea: HTMLTextAreaElement =
                o.target as HTMLTextAreaElement;
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
        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Image"
            onChange={(o) => {
              setNewCampaign({
                ...newCampaign,
                Image: o.target.value,
              });
            }}
          />
          <label htmlFor="floatingInput">Campaign Image Url</label>
        </div>
        <button onClick={addCampaign} className="btn add-product-btn">
          Add My Campaign
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};
