import React, { useState, useEffect } from "react";
import {
  getMyCampaigns,
  deleteCampaignInDB,
} from "../../services/NonProfitRep.services";
import { getProducts } from "../../services/SocialAct.services";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.css";

export const MyCampaigns = () => {
  const { user } = useAuth0();
  const [myCampaigns, setMyCampaigns] = useState([]);
  const showMyCampaigns = async () => {
    await getMyCampaigns(user.email).then((res) => {
      setMyCampaigns(res);
    });
  };

  const handleDelete = (campaignID) => {
    console.log(campaignID);
    // Option 1: Delete all products in campaign and then delete campaign
    // Option 2: Notify user that as long as there are products in the campaign, it cannot be deleted
    getProducts(campaignID).then((products) => {
      if (products.length > 0) {
        notify(
          "error",
          "Cannot delete campaign as long as there are products in it"
        );
      } else {
        deleteCampaignInDB(campaignID).then(() => {
          showMyCampaigns(); // refresh the page
          notify("Campaign deleted successfully", "success");
        });
      }
    });
  };

  useEffect(() => {
    showMyCampaigns();
  }, []);

  return (
    <div className="admin-homepage-container prd-tbl">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Hashtag</th>
            <th scope="col">Donations</th>
            <th colSpan={2}>Operations</th>
          </tr>
        </thead>
        <tbody>
          {myCampaigns &&
            myCampaigns.map((campaign) => {
              return (
                <tr>
                  <td>{campaign[1].CampaignName}</td>
                  <td id="CampaignHash">{campaign[1].CampaignHash}</td>
                  <td>{campaign[1].DonationsAmount}</td>
                  <td>
                    <div className="btn-group">
                      <Link to={`/campaigns/edit/${campaign[0]}`}>
                        <button
                          style={{ color: "white" }}
                          className="btn btn-warning btn-sm"
                        >
                          Edit Details
                        </button>
                      </Link>
                      <div>
                        <button
                          onClick={() => handleDelete(campaign[0])}
                          className="btn btn-danger btn-sm"
                        >
                          Delete Campaign
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};
