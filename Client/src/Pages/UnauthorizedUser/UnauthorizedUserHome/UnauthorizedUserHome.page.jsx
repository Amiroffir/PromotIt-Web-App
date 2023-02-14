import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PromotItHomePage } from "../../../global";
import { Link } from "react-router-dom";
import "./style.css";

export const UnauthorizedUserHome = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <section className="showcase">
        <div className="video-container">
          <video
            src="https://traversymedia.com/downloads/video.mov"
            autoPlay
            muted
            loop
          ></video>
        </div>
        <div className="content">
          <img
            className="logo"
            src="https://res.cloudinary.com/da4o7cwns/image/upload/v1673725689/MyUploads/BBE9B64F-4BA5-444B-896B-4C4F4F346F14_xt6h4q.png"
            alt=""
            width={450}
            height={450}
          />
          <h1 className="unAuth-HL">Welcome To PromotIt</h1>
          <h3>System to promote Social Agenda for a better society</h3>
          <a href="#about" className="get-started-btn">
            About us
          </a>
          <a
            onClick={() => loginWithRedirect(`${PromotItHomePage}`)}
            className="get-started-btn"
          >
            Let's Get Started
          </a>
          <Link to={"/contactus"} className="get-started-btn">
            Contact us
          </Link>
        </div>
      </section>
      <section id="about">
        <h1>About</h1>
        <p>
          Our goal is to promote social campaigns. The means to do so involve
          onboarding business organizations that donate products, onboarding
          non-profit organizations that want to promote campaigns, and
          onboarding social activists that can promote those campaigns.
        </p>
      </section>
    </>
  );
};
