import React from "react";
import "./style.css";

export const About = () => {
  return (
    <div className="admin-homepage-container">
      <section id="about">
        <header className="section-header text-center mb-5 pb-2">
          <h2>About Us</h2>
          <p>
            We are PromotIt! Our goal is to promote social campaigns. The means
            to do so involve onboarding business organizations that donate
            products, onboarding non-profit organizations that want to promote
            campaigns, and onboarding social activists that can promote those
            campaigns.
          </p>
        </header>

        <div className="row about-cols">
          <div className="col-md-4 wow fadeInUp">
            <div className="about-col">
              <div className="img">
                <img src="" alt="" className="img-fluid" />
                <div className="icon"></div>
              </div>
              <h2 className="title">
                <a href="#">Donate Products</a>
              </h2>
              <p className="text-center">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="about-col">
              <div className="img">
                <img src="" alt="" className="img-fluid" />
                <div className="icon"></div>
              </div>
              <h2 className="title">
                <a href="#">Promote Your Campaigns</a>
              </h2>
              <p className="text-center">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="about-col">
              <div className="img">
                <img src="" alt="" className="img-fluid" />
                <div className="icon"></div>
              </div>
              <h2 className="title">
                <a href="#">Promote & Shop</a>
              </h2>
              <p className="text-center">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="call-to-action">
        <div className="call-to-container text-center">
          <h3>Wants to promote Social Agenda for a better society ?</h3>
          <p className="text-center">
            With PromotIt you can easily promote your social agenda in many ways
            and even earn money from it
          </p>
          <a className="get-started-btn" href="#">
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
};
