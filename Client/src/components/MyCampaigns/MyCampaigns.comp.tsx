import React, { useState, useEffect } from "react";
import {
  getMyCampaigns,
  deleteCampaignInDB,
} from "../../services/NonProfitRep.services";
import { getProducts } from "../../services/SocialAct.services";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import { User, useAuth0 } from "@auth0/auth0-react";
import "./style.css";
import { CampaignsDict, Product } from "../../interfaces/interfaces";
import { Notify } from "../../interfaces/enums";

export const MyCampaigns = () => {
  const { user }: User | undefined = useAuth0();
  const [myCampaigns, setMyCampaigns] = useState<CampaignsDict[]>([]);

  const showMyCampaigns = async (): Promise<void> => {
    await getMyCampaigns(user.email).then((res: CampaignsDict[]) => {
      setMyCampaigns(res);
    });
  };

  const handleDelete = (campaignID: string) => {
    console.log(campaignID);
    // Option 1: Delete all products in campaign and then delete campaign
    // Option 2: Notify user that as long as there are products in the campaign, it cannot be deleted
    getProducts(campaignID).then((products: Product[]) => {
      if (products.length > 0) {
        notify(
          Notify.Error,
          "Cannot delete campaign as long as there are products in it"
        );
      } else {
        deleteCampaignInDB(campaignID).then(() => {
          showMyCampaigns(); // refresh the page
          notify(Notify.Success, "Campaign deleted successfully");
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
