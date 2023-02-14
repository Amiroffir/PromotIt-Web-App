import React, { useContext, useState, useEffect } from "react";
import { RoleContext } from "../../contexts/contexts";
import { getCampaigns } from "../../services/General.services";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import LinkIcon from "@mui/icons-material/Link";
import { Link } from "react-router-dom";
import "./style.css";

export const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const showCampaignsList = async () => {
    await getCampaigns().then((res) => {
      if (res === null) {
        notify("error", "Server is down, please try again later");
      }
      setCampaigns(res);
    });
  };

  useEffect(() => {
    showCampaignsList();
  }, []);

  const role = useContext(RoleContext);
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
              {role === "Business Rep" && (
                <Link to={`campaigns/${campaign[0]}`}>
                  <button className="btn btn-primary ops-btn">
                    Donate Products
                  </button>
                </Link>
              )}
              {role === "Social Activist" && (
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
