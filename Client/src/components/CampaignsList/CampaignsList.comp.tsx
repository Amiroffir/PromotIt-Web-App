import React, { useContext, useState, useEffect } from "react";
import { RoleContext } from "../../contexts/contexts";
import { getCampaigns } from "../../services/General.services";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import LinkIcon from "@mui/icons-material/Link";
import { Link } from "react-router-dom";
import "./style.css";
import { CampaignsDict } from "../../interfaces/interfaces";
import { Notify, SystemRole } from "../../interfaces/enums";

export const CampaignsList = () => {
  const role: string = useContext<string>(RoleContext);
  const [campaigns, setCampaigns] = useState<CampaignsDict[]>([]);

  const showCampaignsList = async (): Promise<void> => {
    await getCampaigns()
      .then((res: CampaignsDict[]) => {
        if (res === null) {
          notify(Notify.Error, "Server is down, please try again later");
        }
        setCampaigns(res);
      })
      .catch((err: Error) => {
        notify(Notify.Error, err.message);
      });
  };

  useEffect(() => {
    showCampaignsList();
  }, []);

  return (
    <div className="cards-container">
      {campaigns &&
        campaigns.map((campaign) => (
          <div className="card ">
            <h3 className="card-title text-center mt-3">
              {campaign[1].CampaignName}
            </h3>
            <span className="mt-1 text-center">
              <a href={campaign[1].CampaignUrl} className="card-text web-link">
                <LinkIcon /> Explore Our Website
              </a>
            </span>
            <div className="card-body">
              <img
                src={campaign[1].Image}
                className="card-img img-fluid img-thumbnail img-responsive"
                alt="..."
                width={20}
                height={150}
              />
              {role === SystemRole.BusinessRep && (
                <Link to={`campaigns/${campaign[0]}`}>
                  <button className="btn btn-primary ops-btn">
                    Donate Products
                  </button>
                </Link>
              )}
              {role === SystemRole.SocialActivist && (
                <Link to={`campaigns/${campaign[0]}`}>
                  <button className="btn btn-primary ops-btn">
                    Promote & Shop
                  </button>
                </Link>
              )}
            </div>
          </div>
        ))}
      <ToastContainer />
    </div>
  );
};
